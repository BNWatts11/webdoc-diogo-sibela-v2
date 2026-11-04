import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	fullyParallel: true,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:4174'
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } }
	],
	// Tests run against the production build, not `vite dev`: the dev server
	// can force a full page reload mid-scan (HMR / dependency re-optimising),
	// which destroys the page under axe, and it isn't what visitors get anyway.
	// A fixed, separate port so it never picks up a dev server left running on
	// 5173 (or a stale preview), and always rebuilds first.
	webServer: {
		command: 'npm run build && npm run preview -- --port 4174 --strictPort',
		url: 'http://localhost:4174',
		reuseExistingServer: false,
		timeout: 240_000
	}
});
