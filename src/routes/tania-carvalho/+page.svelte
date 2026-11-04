<!--
  Tânia Carvalho's chapter gets its own dedicated route (same reason as
  post-dance's Final Map) rather than the shared [chapter] template: nothing
  else on the site needs a distorting hero, a video mural, a scroll-scrubbed
  horizontal reel, a cursor-tracked lens, or scattering kinetic type, so those
  five sections live here instead of bloating the generic page.
-->
<script lang="ts">
	import { getChapter } from '$lib/content/chapters';
	import { reveal } from '$lib/actions/reveal';
	import ExpressionsMural from '$lib/components/content/ExpressionsMural.svelte';
	import SibelaScrollReel from '$lib/components/content/SibelaScrollReel.svelte';
	import GestureLens from '$lib/components/content/GestureLens.svelte';
	import { t } from '$lib/i18n';
	import { language } from '$lib/stores/language';
	import { localizeChapter } from '$lib/i18n/chapterContent';

	const rawChapter = getChapter('tania-carvalho')!;
	const chapter = $derived(localizeChapter(rawChapter, $language));
	const pageTitle = $derived(`${chapter.title} · Sibela & Digoo`);

	// Section 1 — cursor-trail shadow over the hero portrait. Three blobs at
	// different smoothing rates read as one soft trail rather than a single
	// dot snapping to the pointer. One rAF loop drives all three; it only
	// runs while the pointer is actually over the image.
	let heroFigureEl = $state<HTMLElement>();
	let trailActive = $state(false);
	const trail = [
		{ x: 0, y: 0, ease: 0.35 },
		{ x: 0, y: 0, ease: 0.18 },
		{ x: 0, y: 0, ease: 0.09 }
	];
	let targetX = 0;
	let targetY = 0;
	let rafId: number | null = null;

	function stepTrail() {
		let moving = false;
		for (const dot of trail) {
			const dx = targetX - dot.x;
			const dy = targetY - dot.y;
			if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) moving = true;
			dot.x += dx * dot.ease;
			dot.y += dy * dot.ease;
		}
		trail[0] = trail[0];
		trail[1] = trail[1];
		trail[2] = trail[2];
		rafId = moving || trailActive ? requestAnimationFrame(stepTrail) : null;
	}

	function onHeroPointerMove(e: PointerEvent) {
		const rect = heroFigureEl!.getBoundingClientRect();
		targetX = e.clientX - rect.left;
		targetY = e.clientY - rect.top;
		if (rafId === null) rafId = requestAnimationFrame(stepTrail);
	}
	function onHeroPointerEnter() {
		trailActive = true;
	}
	function onHeroPointerLeave() {
		trailActive = false;
	}

	// Section 5 — kinetic outro. Each word gets a small, deterministic-enough
	// scatter (offset + rotation) it animates out of on reveal; index-seeded
	// so it varies word to word without needing real randomness.
	const quoteWords = $derived((chapter.pullQuote?.text ?? '').split(' '));
	function scatterStyle(i: number) {
		const dx = (((i * 37) % 13) - 6) * 14;
		const dy = (((i * 53) % 9) - 4) * 12;
		const rot = (((i * 29) % 11) - 5) * 6;
		return `--dx: ${dx}px; --dy: ${dy}px; --dr: ${rot}deg; transition-delay: ${i * 28}ms;`;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={chapter.poetic} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={chapter.poetic} />
	<meta property="og:image" content={chapter.heroMedia.src} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={chapter.poetic} />
	<meta name="twitter:image" content={chapter.heroMedia.src} />
</svelte:head>

<article class="tania">
	<!-- Section 1 — the expressionist intro -->
	<header class="hero">
		<span class="ix"
			><span class="ix-track">{$t('nav.track-performance-short')}</span> · 04 / 09</span
		>
		<figure
			class="hero-figure"
			bind:this={heroFigureEl}
			onpointermove={onHeroPointerMove}
			onpointerenter={onHeroPointerEnter}
			onpointerleave={onHeroPointerLeave}
		>
			<img class="hero-img" src={chapter.heroMedia.src} alt={chapter.heroMedia.alt} />
			<div class="hero-veil" aria-hidden="true"></div>
			{#each trail as dot, i (i)}
				<div
					class="hero-trail-dot"
					aria-hidden="true"
					class:on={trailActive}
					style="--tx: {dot.x}px; --ty: {dot.y}px; --scale: {1 - i * 0.22};"
				></div>
			{/each}
			<h1 class="hero-title">Tânia Carvalho</h1>
		</figure>
		{#if chapter.poetic}
			<p class="poetic">{chapter.poetic}</p>
		{/if}
	</header>

	<!-- Section 2 — mural of expressions / visual soundboard -->
	<ExpressionsMural />

	<!-- Section 3/4 — "Work within the Company": the gesture lens first
	     (Doesdicon, 2016), then the Sibela scroll-scrub reel (Sibela & Digoo,
	     2026) — one company, two shows, told in that order. -->
	<section class="company-work">
		<h2>{$t('tania.work-heading')}</h2>
		<h3 class="company-work-subtitle">{$t('tania.work-subtitle')}</h3>
		<GestureLens />
		<p class="company-work-note">{$t('tania.note-doesdicon')}</p>
		<p class="company-work-note">{$t('tania.note-sibela-digoo')}</p>
	</section>
	<SibelaScrollReel />

	<!-- Section 5 — kinetic outro, the closing quote -->
	{#if chapter.pullQuote}
		<section class="outro" use:reveal>
			<p class="outro-quote">
				{#each quoteWords as word, i (i)}<span class="w" style={scatterStyle(i)}
						>{word}{i < quoteWords.length - 1 ? ' ' : ''}</span
					>{/each}
			</p>
			<p class="outro-attribution">{chapter.pullQuote.attribution}</p>
			{#if chapter.pullQuote.externalUrl}
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={chapter.pullQuote.externalUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="outro-link"
				>
					<span>{chapter.pullQuote.externalLabel ?? $t('label.read-full-interview')}</span>
					<span aria-hidden="true">↗</span>
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{/if}
		</section>
	{/if}
</article>

<style>
	.tania {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 0 100px;
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
		height: min(78vh, 640px);
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
		cursor: default;
	}
	.hero-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 20%;
		/* on-load: arrives distorted/soft, settles into focus */
		animation: hero-focus 1.6s var(--ease-settle) both;
	}
	@keyframes hero-focus {
		0% {
			filter: blur(18px) saturate(0.6) contrast(0.85);
			transform: scale(1.06);
		}
		100% {
			filter: blur(0) saturate(1) contrast(1);
			transform: scale(1);
		}
	}
	.hero-veil {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(16, 12, 9, 0.15) 0%, rgba(16, 12, 9, 0.55) 100%);
		pointer-events: none;
	}
	.hero-trail-dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 180px;
		height: 180px;
		border-radius: 50%;
		pointer-events: none;
		background: radial-gradient(circle, rgba(16, 12, 9, 0.55) 0%, transparent 72%);
		transform: translate(var(--tx), var(--ty)) translate(-50%, -50%) scale(var(--scale));
		opacity: 0;
		transition: opacity 0.4s ease;
		will-change: transform;
	}
	.hero-trail-dot.on {
		opacity: 1;
	}
	.hero-title {
		position: absolute;
		left: 28px;
		right: 28px;
		bottom: 28px;
		margin: 0;
		font-family: var(--serif);
		font-weight: 600;
		font-size: clamp(2.4rem, 8vw, 5.2rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--on-scrim);
		text-shadow: 0 3px 22px rgba(0, 0, 0, 0.6);
	}
	.poetic {
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: 1.3rem;
		color: var(--ash);
		margin: 18px 0 0;
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-img {
			animation: none;
		}
		.hero-trail-dot {
			display: none;
		}
	}
	:global(html.motion-still) .hero-img {
		animation: none !important;
	}
	:global(html.motion-still) .hero-trail-dot {
		display: none !important;
	}

	/* ===== Section 3/4 — Work within the Company ===== */
	.company-work {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.company-work h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0;
		color: var(--bone);
	}
	.company-work-subtitle {
		font-family: var(--mono);
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--kraft);
		margin: 10px 0 20px;
	}
	.company-work-note {
		color: var(--ash);
		max-width: 64ch;
		margin: 28px 0 0;
	}

	/* ===== Section 5 — kinetic outro ===== */
	.outro {
		margin: 90px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
		text-align: center;
		/* the words start scattered sideways by up to ~84px until revealed,
		   which made the page scroll horizontally before you ever reached them */
		overflow-x: clip;
	}
	.outro-quote {
		font-family: var(--serif);
		font-weight: 300;
		font-size: clamp(1.5rem, 3.6vw, 2.3rem);
		line-height: 1.5;
		color: var(--bone);
		max-width: 46ch;
		margin: 0 auto;
	}
	.outro-quote .w {
		display: inline-block;
		opacity: 0;
		transform: translate(var(--dx), var(--dy)) rotate(var(--dr));
		transition:
			opacity 0.6s var(--ease-settle),
			transform 0.7s var(--ease-settle);
	}
	.outro:global(.is-visible) .outro-quote .w {
		opacity: 1;
		transform: translate(0, 0) rotate(0deg);
	}
	.outro-attribution {
		margin: 22px 0 0;
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ash-dim);
	}
	.outro-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-top: 16px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		text-decoration: none;
		border-bottom: 1px solid var(--kraft-deep);
		padding-bottom: 2px;
		transition: color 0.3s ease;
	}
	.outro-link:hover,
	.outro-link:focus-visible {
		color: var(--bone);
	}
	@media (prefers-reduced-motion: reduce) {
		.outro-quote .w {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .outro-quote .w {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}
</style>
