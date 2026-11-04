<!--
  Interactive Post Dance gets a full rebuild as an "R&D lab" rather than a
  restaging of the show: a playful light↔boxes sandbox bridging both solos,
  the two real post-show storyboards (Inner Flow VR for Isabel, Kinetic
  Boxes MediaPipe for Diogo) walked through step by step, and the one real
  working prototype that exists today, honestly framed as an early build.
-->
<script lang="ts">
	import { getChapter } from '$lib/content/chapters';
	import { reveal } from '$lib/actions/reveal';
	import LightToBoxes from '$lib/components/content/LightToBoxes.svelte';
	import { t, chapterTitle } from '$lib/i18n';
	import { language } from '$lib/stores/language';

	const chapter = getChapter('post-dance')!;
	const title = $derived(chapterTitle(chapter, $language));
	const pageTitle = $derived(`${title} · Sibela & Digoo`);

	type StepBox = { left: number; top: number; width: number; height: number };
	interface Step {
		title: string;
		detail: string;
		box: StepBox;
	}
	interface Track {
		id: string;
		label: string;
		tone: 'cool' | 'warm';
		solo: string;
		tech: string;
		sheet: string;
		sheetAlt: string;
		steps: Step[];
	}

	const tracks = $derived<Track[]>([
		{
			id: 'inner-flow',
			label: '1. Inner Flow',
			tone: 'cool',
			solo: $t('postdance.if.solo'),
			tech: $t('postdance.if.tech'),
			sheet: '/photos/post-dance/storyboard-inner-flow.jpg',
			sheetAlt:
				"Full post-show VR storyboard sheet for Inner Flow, Isabel's track, showing all six steps",
			steps: [
				{
					title: $t('postdance.if.step1.title'),
					detail: $t('postdance.if.step1.detail'),
					box: { left: 25, top: 5, width: 18.5, height: 28 }
				},
				{
					title: $t('postdance.if.step2.title'),
					detail: $t('postdance.if.step2.detail'),
					box: { left: 49, top: 5, width: 21, height: 28 }
				},
				{
					title: $t('postdance.if.step3.title'),
					detail: $t('postdance.if.step3.detail'),
					box: { left: 74, top: 2, width: 21.5, height: 32 }
				},
				{
					title: $t('postdance.if.step4.title'),
					detail: $t('postdance.if.step4.detail'),
					box: { left: 25, top: 52, width: 18.5, height: 28 }
				},
				{
					title: $t('postdance.if.step5.title'),
					detail: $t('postdance.if.step5.detail'),
					box: { left: 50, top: 52, width: 19.5, height: 28 }
				},
				{
					title: $t('postdance.if.step6.title'),
					detail: $t('postdance.if.step6.detail'),
					box: { left: 74, top: 52, width: 19, height: 28 }
				}
			]
		},
		{
			id: 'kinetic-boxes',
			label: '1. Kinetic Boxes',
			tone: 'warm',
			solo: $t('postdance.kb.solo'),
			tech: $t('postdance.kb.tech'),
			sheet: '/photos/post-dance/storyboard-kinetic-boxes.jpg',
			sheetAlt:
				"Full post-show MediaPipe storyboard sheet for Kinetic Boxes, Diogo's track, showing all six steps",
			steps: [
				{
					title: $t('postdance.kb.step1.title'),
					detail: $t('postdance.kb.step1.detail'),
					box: { left: 25, top: 5, width: 18.5, height: 28 }
				},
				{
					title: $t('postdance.kb.step2.title'),
					detail: $t('postdance.kb.step2.detail'),
					box: { left: 49, top: 5, width: 21, height: 28 }
				},
				{
					title: $t('postdance.kb.step3.title'),
					detail: $t('postdance.kb.step3.detail'),
					box: { left: 74, top: 2, width: 21.5, height: 32 }
				},
				{
					title: $t('postdance.kb.step4.title'),
					detail: $t('postdance.kb.step4.detail'),
					box: { left: 25, top: 52, width: 18.5, height: 28 }
				},
				{
					title: $t('postdance.kb.step5.title'),
					detail: $t('postdance.kb.step5.detail'),
					box: { left: 50, top: 52, width: 19.5, height: 28 }
				},
				{
					title: $t('postdance.kb.step6.title'),
					detail: $t('postdance.kb.step6.detail'),
					box: { left: 74, top: 52, width: 19, height: 28 }
				}
			]
		}
	]);

	let activeTrack: string = $state('inner-flow');
	let activeStep: Record<string, number> = $state({ 'inner-flow': 0, 'kinetic-boxes': 0 });

	function selectStep(trackId: string, i: number) {
		activeStep = { ...activeStep, [trackId]: i };
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content="Interactive Post Dance — the R&D lab behind the post-performance installation, translating both solos into accessible digital experiences."
	/>
	<meta property="og:title" content={pageTitle} />
	<meta property="og:image" content={chapter.heroMedia.src} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:image" content={chapter.heroMedia.src} />
</svelte:head>

<article class="post-dance">
	<!-- Section 1 — Hero & Concept Intro -->
	<header class="hero">
		<span class="ix"
			><span class="ix-track">{$t('nav.track-performance-short')}</span> · 09 / 09</span
		>
		<figure class="hero-figure">
			<img class="hero-img" src={chapter.heroMedia.src} alt={chapter.heroMedia.alt} />
			<div class="hero-title-scrim" aria-hidden="true"></div>
			<h1 class="hero-title">{title}</h1>
		</figure>
	</header>

	<!-- Section 2 — Playful Artistic Transition: Light to Boxes -->
	<section class="transition-section" use:reveal>
		<h2>{$t('postdance.light-to-boxes-h2')}</h2>
		<LightToBoxes />
	</section>

	<!-- Section 3 — Storyboard Design Lab -->
	<section class="storyboard-lab" use:reveal>
		<h2>{$t('postdance.lab-h2')}</h2>

		<div class="track-tabs" role="tablist" aria-label={$t('postdance.track-tablist-aria')}>
			{#each tracks as track (track.id)}
				<button
					type="button"
					role="tab"
					class="track-tab {track.tone}"
					class:on={activeTrack === track.id}
					aria-selected={activeTrack === track.id}
					onclick={() => (activeTrack = track.id)}
				>
					{track.label}
				</button>
			{/each}
		</div>

		{#each tracks.filter((t) => t.id === activeTrack) as track (track.id)}
			<div class="track-body">
				<p class="track-meta">
					<span class="track-solo">{track.solo}</span>
					<span class="track-tech">{track.tech}</span>
				</p>
				<div class="sheet-frame">
					<img src={track.sheet} alt={track.sheetAlt} loading="lazy" />
					{#each track.steps as step, i (i)}
						{#if activeStep[track.id] === i}
							<div
								class="sheet-spotlight {track.tone}"
								style="left:{step.box.left}%; top:{step.box.top}%; width:{step.box
									.width}%; height:{step.box.height}%;"
								aria-hidden="true"
							></div>
						{/if}
					{/each}
				</div>
				<div
					class="step-rail"
					role="tablist"
					aria-label={$t('postdance.step-rail-aria').replace('{label}', track.label)}
				>
					{#each track.steps as step, i (i)}
						<button
							type="button"
							role="tab"
							class="step-btn {track.tone}"
							class:on={activeStep[track.id] === i}
							aria-selected={activeStep[track.id] === i}
							aria-label={$t('postdance.step-aria')
								.replace('{n}', String(i + 1))
								.replace('{title}', step.title)}
							onclick={() => selectStep(track.id, i)}
						>
							{i + 1}
						</button>
					{/each}
				</div>
				{#each track.steps as step, i (i)}
					{#if activeStep[track.id] === i}
						<div class="step-detail">
							<span class="step-number"
								>{$t('postdance.step-number').replace('{n}', String(i + 1))}</span
							>
							<h3>{step.title}</h3>
							<p>{step.detail}</p>
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</section>

	<!-- Section 4 — Prototype: Kinetic Boxes -->
	<section class="prototype-section" use:reveal>
		<h2>{$t('postdance.prototype-h2')}</h2>
		<p class="lede">
			{$t('postdance.prototype-lede')}
		</p>
		<!-- a static asset outside the route tree, not a SvelteKit route — see the
		     same pattern in SpotlightVideo.svelte's fallback download link -->
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a class="try-btn" href="/installation/index.html" target="_blank" rel="noopener noreferrer">
			{$t('postdance.try-installation')}
		</a>
	</section>
</article>

<style>
	.post-dance {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 0 100px;
	}
	h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 10px;
		color: var(--bone);
	}
	/* ===== Section 1 — hero ===== */
	.hero {
		padding: 50px 28px 0;
	}
	.ix {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.16em;
		color: var(--kraft);
	}
	.ix-track {
		text-transform: uppercase;
	}
	.hero-figure {
		position: relative;
		margin: 18px 0 0;
		height: min(64vh, 520px);
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
	}
	.hero-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 20%;
		clip-path: circle(0% at 50% 30%);
		animation: iris-reveal 1.4s var(--ease-settle) both;
	}
	@keyframes iris-reveal {
		to {
			clip-path: circle(85% at 50% 30%);
		}
	}
	.hero-title-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(16, 12, 9, 0) 50%, rgba(16, 12, 9, 0.82) 100%);
		pointer-events: none;
	}
	.hero-title {
		position: absolute;
		left: 28px;
		right: 28px;
		bottom: 28px;
		margin: 0;
		font-family: var(--serif);
		font-weight: 600;
		font-size: clamp(2rem, 6.4vw, 4rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--on-scrim);
		text-shadow: 0 3px 22px rgba(0, 0, 0, 0.65);
		z-index: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-img {
			animation: none;
			clip-path: none;
		}
	}
	:global(html.motion-still) .hero-img {
		animation: none !important;
		clip-path: none !important;
	}

	/* ===== Section 2 — Light to Boxes ===== */
	.transition-section {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}

	/* ===== Section 3 — Storyboard Design Lab ===== */
	.storyboard-lab {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.track-tabs {
		display: flex;
		gap: 10px;
		margin-bottom: 24px;
	}
	.track-tab {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 11px 18px;
		border-radius: 99px;
		background: none;
		cursor: pointer;
	}
	.track-tab.cool {
		border: 1px solid var(--breath-deep);
		color: var(--breath);
	}
	.track-tab.cool.on {
		background: var(--breath);
		color: var(--ink);
	}
	.track-tab.warm {
		border: 1px solid var(--kraft-deep);
		color: var(--kraft);
	}
	.track-tab.warm.on {
		background: var(--kraft);
		color: var(--ink);
	}
	.track-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 16px;
		margin: 0 0 16px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.03em;
		color: var(--ash-dim);
	}
	.track-tech {
		color: var(--ash);
	}
	.sheet-frame {
		position: relative;
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
	}
	.sheet-frame img {
		width: 100%;
		display: block;
	}
	.sheet-spotlight {
		position: absolute;
		border-radius: 4px;
		border: 2px solid var(--kraft);
		box-shadow:
			0 0 0 2000px rgba(16, 12, 9, 0.55),
			0 0 18px 2px rgba(196, 136, 90, 0.5);
		transition:
			left 0.4s var(--ease-settle),
			top 0.4s var(--ease-settle),
			width 0.4s var(--ease-settle),
			height 0.4s var(--ease-settle);
		pointer-events: none;
	}
	.sheet-spotlight.cool {
		border-color: var(--breath);
		box-shadow:
			0 0 0 2000px rgba(16, 12, 9, 0.55),
			0 0 18px 2px rgba(168, 186, 184, 0.5);
	}
	.step-rail {
		display: flex;
		gap: 8px;
		margin: 18px 0 0;
		flex-wrap: wrap;
	}
	.step-btn {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: none;
		font-family: var(--mono);
		font-size: 12px;
		cursor: pointer;
	}
	.step-btn.cool {
		border: 1px solid var(--breath-deep);
		color: var(--breath);
	}
	.step-btn.cool.on {
		background: var(--breath);
		color: var(--ink);
	}
	.step-btn.warm {
		border: 1px solid var(--kraft-deep);
		color: var(--kraft);
	}
	.step-btn.warm.on {
		background: var(--kraft);
		color: var(--ink);
	}
	.step-detail {
		margin-top: 18px;
		padding: 18px 20px;
		border-radius: 6px;
		background: var(--penumbra);
		border: 1px solid var(--line);
		animation: step-in 0.35s var(--ease-settle) both;
	}
	@keyframes step-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.step-number {
		display: block;
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
		margin-bottom: 6px;
	}
	.step-detail h3 {
		margin: 0 0 8px;
		font-weight: 600;
		font-size: 1.1rem;
		color: var(--bone);
	}
	.step-detail p {
		margin: 0;
		color: var(--ash);
		font-size: 0.95rem;
		line-height: 1.6;
	}
	@media (prefers-reduced-motion: reduce) {
		.step-detail {
			animation: none;
		}
	}
	:global(html.motion-still) .step-detail {
		animation: none !important;
	}

	/* ===== Section 4 — Prototype Spotlight ===== */
	.prototype-section {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.lede {
		color: var(--ash);
		max-width: 64ch;
		margin: 0 0 20px;
	}
	.try-btn {
		display: inline-block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--kraft);
		border: 1px solid var(--kraft-deep);
		border-radius: 99px;
		padding: 13px 24px;
		text-decoration: none;
		transition:
			border-color 0.3s ease,
			transform 0.3s var(--ease-heavy);
	}
	.try-btn:hover,
	.try-btn:focus-visible {
		border-color: var(--kraft);
		transform: translateY(-2px);
	}
	:global(html.motion-still) .try-btn:hover {
		transform: none;
	}
</style>
