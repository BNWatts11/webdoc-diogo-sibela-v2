<!--
  Preparation / Process gets its own dedicated route for the same reason
  tania-carvalho and post-dance do: nothing else on the site needs a
  dual-column, phase-by-phase comparison of two dancers' rehearsals, a
  full-length climax video, and its own hover-gallery, so those four sections
  live here instead of bloating the generic [chapter] template.
-->
<script lang="ts">
	import { getChapter } from '$lib/content/chapters';
	import { reveal } from '$lib/actions/reveal';
	import ParallelWorkspace from '$lib/components/content/ParallelWorkspace.svelte';
	import ProcessGallery from '$lib/components/content/ProcessGallery.svelte';
	import VideoCard from '$lib/components/media/VideoCard.svelte';
	import { t, chapterTitle } from '$lib/i18n';
	import { language } from '$lib/stores/language';
	import { localizeChapter } from '$lib/i18n/chapterContent';

	const rawChapter = getChapter('process')!;
	const chapter = $derived(localizeChapter(rawChapter, $language));
	const title = $derived(chapterTitle(chapter, $language));
	const pageTitle = $derived(`${title} · Sibela & Digoo`);

	// Section 1 — grid-shutter hero reveal. A grid of tiles sits over the
	// photo and shrinks away on load, staggered by index; pure CSS
	// (animation ... both), so there's nothing to wire up in script beyond
	// building the grid itself.
	const HERO_COLS = 8;
	const HERO_ROWS = 4;
	const heroTiles = Array.from({ length: HERO_COLS * HERO_ROWS }, (_, i) => ({
		i,
		row: Math.floor(i / HERO_COLS)
	}));
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

<article class="process">
	<!-- Section 1 — hero, grid-shutter reveal -->
	<header class="hero">
		<span class="ix"
			><span class="ix-track">{$t('nav.track-performance-short')}</span> · 05 / 09</span
		>
		<figure class="hero-figure">
			<img class="hero-img" src={chapter.heroMedia.src} alt={chapter.heroMedia.alt} />
			<div class="hero-grid" aria-hidden="true">
				{#each heroTiles as tile (tile.i)}
					<span
						class="hero-tile"
						style="--i: {tile.i}; transform-origin: {tile.row % 2 === 0 ? 'right' : 'left'};"
					></span>
				{/each}
			</div>
			<h1 class="hero-title">{title}</h1>
		</figure>
		{#if chapter.poetic}
			<p class="poetic">{chapter.poetic}</p>
		{/if}
	</header>

	<!-- Section 2 — the parallel rehearsal & evolution workspace -->
	<ParallelWorkspace />

	<!-- Section 3 — the climax: full dress rehearsal -->
	<section class="climax" use:reveal>
		<h2>{$t('process.climax-h2')}</h2>
		<div class="climax-frame">
			<VideoCard
				subtitle={$t('process.climax-subtitle')}
				framing={$t('process.climax-framing')}
				src="/videos/process/dress-rehearsal.mp4"
				poster="/photos/process/posters/dress-rehearsal.jpg"
				alt="Excerpt from the full dress rehearsal of Sibela & Digoo, on stage"
			/>
		</div>
	</section>

	<!-- Section 4 — interactive photo gallery -->
	<ProcessGallery />
</article>

<style>
	.process {
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
	}
	.hero-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 30%;
	}
	.hero-grid {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: repeat(4, 1fr);
	}
	.hero-tile {
		background: var(--stage-deep);
		animation: hero-tile-reveal 0.5s var(--ease-heavy) both;
		animation-delay: calc(var(--i) * 22ms);
	}
	@keyframes hero-tile-reveal {
		from {
			transform: scaleX(1);
		}
		to {
			transform: scaleX(0);
		}
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
		.hero-tile {
			animation: none;
			transform: scaleX(0);
		}
	}
	:global(html.motion-still) .hero-tile {
		animation: none !important;
		transform: scaleX(0) !important;
	}

	/* ===== Section 3 — dress rehearsal climax ===== */
	.climax {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.climax h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 24px;
		color: var(--bone);
	}
	.climax-frame {
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.7s var(--ease-settle),
			transform 0.7s var(--ease-settle);
	}
	.climax:global(.is-visible) .climax-frame {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.climax-frame {
			transition: none;
			opacity: 1;
			transform: none;
		}
	}
	:global(html.motion-still) .climax-frame {
		transition: none !important;
		opacity: 1 !important;
		transform: none !important;
	}
</style>
