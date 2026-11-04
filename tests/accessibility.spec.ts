import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * A smoke test, not full coverage: every real route gets scanned against the
 * WCAG 2.0/2.1 A+AA rule sets (not axe's looser "best-practice" tags, which
 * would flag deliberate choices like the Final Map's role="application").
 * Runs across Chromium, Firefox, and WebKit (see playwright.config.ts).
 * Run with `npm run test:a11y` — builds the site and serves that build
 * (see playwright.config.ts).
 */

// axe reads each element's *current* computed colour, so scanning while an
// entrance fade is mid-flight (a panel animating in from opacity 0) reports a
// contrast failure that no visitor ever sees — it was the cause of a rotating,
// load-dependent flake across routes. Let every finite, time-based animation
// or transition finish first. Left alone on purpose: looping ones (pulses,
// drifts) and scroll-driven ones (`animation-timeline: view()`), which only
// progress as the page scrolls and would never finish here. Capped so a stray
// animation can slow the scan down but never hang it.
async function settleAnimations(page: Page) {
	await page.evaluate(async () => {
		const settled = (async () => {
			for (let pass = 0; pass < 4; pass++) {
				const running = document
					.getAnimations()
					.filter(
						(a) =>
							a.timeline instanceof DocumentTimeline &&
							a.playState === 'running' &&
							a.effect?.getComputedTiming().iterations !== Infinity
					);
				if (!running.length) return;
				await Promise.all(running.map((a) => a.finished.catch(() => {})));
			}
		})();
		await Promise.race([settled, new Promise((r) => setTimeout(r, 3000))]);
	});
}

// The dev server can do one full reload right after first load (Vite
// re-optimising a dependency), which destroys the page context mid-scan —
// wait for the reload to land and scan again instead of failing.
async function scan(page: Page) {
	for (let attempt = 0; ; attempt++) {
		try {
			await settleAnimations(page);
			return await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
				.analyze();
		} catch (err) {
			if (attempt >= 2 || !/context was destroyed|navigation/i.test(String(err))) throw err;
			await page.waitForLoadState('load');
		}
	}
}

async function assertNoViolations(page: Page) {
	const results = await scan(page);

	const violations = results.violations.map((v) => ({
		id: v.id,
		impact: v.impact,
		help: v.help,
		nodes: v.nodes.map((n) => n.target.join(' '))
	}));

	expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
}

const routes = [
	'/',
	'/inclusive-dance',
	'/company',
	'/o-ciclo-da-invisibilidade',
	'/tania-carvalho',
	'/process',
	'/diogo',
	'/isabel',
	'/performance',
	'/post-dance',
	'/about'
];

for (const route of routes) {
	test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
		await page.goto(route);
		await assertNoViolations(page);
	});
}

// These two only exist once open — a page-load-only scan would never see them.
// The click is retried via toPass(): right after goto() the button can be
// visible before Svelte finishes attaching its handler (a real hydration
// race, not flakiness — it reproduced consistently on Chromium/WebKit).
test('House Console open state has no WCAG A/AA violations', async ({ page }) => {
	await page.goto('/');
	const grid = page.locator('#house-console-grid');
	await expect(async () => {
		await page.locator('.console .disclose').click();
		await expect(grid).toBeVisible({ timeout: 1000 });
	}).toPass();
	await assertNoViolations(page);
});

test('Mobile nav expanded state has no WCAG A/AA violations', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('/diogo');
	const list = page.locator('#nav-spine-list');
	await expect(async () => {
		await page.locator('.mobile-toggle').click();
		await expect(list).toBeVisible({ timeout: 1000 });
	}).toPass();
	await assertNoViolations(page);
});
