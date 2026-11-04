<!--
  Diogo Freitas gets his own dedicated route for the same reason tania-
  carvalho, process, and post-dance do: an architectural, grid-first visual
  language, plus a timeline/gallery treatment shared with Isabel's own
  dedicated page, doesn't fit the shared [chapter] template's linear layout.
-->
<script lang="ts">
	import { getChapter } from '$lib/content/chapters';
	import CueSequence from '$lib/components/content/CueSequence.svelte';
	import MacroPlate from '$lib/components/media/MacroPlate.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/i18n';
	import { language } from '$lib/stores/language';
	import { localizeChapter } from '$lib/i18n/chapterContent';

	const rawChapter = getChapter('diogo')!;
	const chapter = $derived(localizeChapter(rawChapter, $language));
	const pageTitle = $derived(`${chapter.title} · Sibela & Digoo`);

	// Section 2 — milestones, a plain vertical timeline (matching Isabel's
	// chapter) rather than a card grid — the costume callout and supporting
	// photo carry the visuals instead, in their own column.
	const milestones = $derived([
		{
			year: '2013',
			label: $t('diogo.milestone1-label'),
			detail: $t('diogo.milestone1-detail')
		},
		{
			year: '2026',
			label: $t('diogo.milestone2-label'),
			detail: $t('diogo.milestone2-detail')
		},
		{
			year: $t('diogo.milestone3-year'),
			label: $t('diogo.milestone3-label'),
			detail: $t('diogo.milestone3-detail')
		}
	]);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content="Diogo Freitas — his solo Digoo, choreographed by Tânia Carvalho."
	/>
	<meta property="og:title" content={pageTitle} />
	<meta property="og:image" content={chapter.heroMedia.src} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:image" content={chapter.heroMedia.src} />
</svelte:head>

<article class="diogo">
	<!-- Section 1 — hero, a circular iris opens onto the portrait (matching
	     Isabel's chapter — the block-assembly jigsaw tried here first didn't
	     render the photo cleanly) -->
	<header class="hero">
		<span class="ix"
			><span class="ix-track">{$t('nav.track-performance-short')}</span> · 06 / 09</span
		>
		<figure class="hero-figure">
			<img class="hero-img" src={chapter.heroMedia.src} alt={chapter.heroMedia.alt} />
			<div class="hero-title-scrim" aria-hidden="true"></div>
			<h1 class="hero-title">Diogo Freitas</h1>
		</figure>
	</header>

	<!-- Section 2 — "Who is Diogo?" -->
	<section class="who">
		<h2>{$t('diogo.who-h2')}</h2>

		<div class="who-grid">
			<div class="who-copy">
				<p class="who-line">{$t('diogo.who-line')}</p>

				<div class="milestones">
					{#each milestones as m (m.label)}
						<div class="milestone">
							<span class="milestone-year">{m.year}</span>
							<span class="milestone-label">{m.label}</span>
							<p class="milestone-detail">{m.detail}</p>
						</div>
					{/each}
				</div>
			</div>

			<div class="who-media">
				<div class="costume-callout">
					<img
						src="/photos/diogo/costume-clothes.jpg"
						alt="Diogo on stage in his own hand-drawn costume shirt, warm amber light, boxes behind him"
						loading="lazy"
					/>
					<div class="costume-callout-tag">
						<span class="costume-callout-label">{$t('diogo.costume-label')}</span>
						<p>{$t('diogo.costume-caption')}</p>
					</div>
				</div>

				<figure class="joy-photo">
					<img
						src="/photos/diogo/rehearsal-gesture.jpg"
						alt="Diogo grinning and pumping his fists beside a tall tower of stacked boxes"
						loading="lazy"
					/>
					<figcaption>{$t('diogo.joy-caption')}</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<!-- Section 3 — Interactive Production Score -->
	{#if chapter.sequence}
		<section class="score" use:reveal>
			<CueSequence
				title={chapter.sequence.title}
				meta={chapter.sequence.meta}
				cues={chapter.sequence.cues}
			/>
		</section>
	{/if}

	<!-- Section 4 — Objects Study Gallery -->
	{#if chapter.gallery?.length}
		<section class="objects">
			<h2>{$t('gallery.objects-study-h2')}</h2>
			<div class="objects-grid">
				{#each chapter.gallery as item, i (i)}
					<div class="objects-item">
						<MacroPlate
							src={item.src}
							alt={item.alt}
							label={item.label ?? $t('gallery.object-study').replace('{n}', String(i + 1))}
						/>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</article>

<style>
	.diogo {
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
		object-position: 50% 0%;
		clip-path: circle(0% at 50% 18%);
		animation: iris-reveal 1.4s var(--ease-settle) both;
	}
	@keyframes iris-reveal {
		to {
			clip-path: circle(85% at 50% 18%);
		}
	}
	.hero-title-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(16, 12, 9, 0) 55%, rgba(16, 12, 9, 0.75) 100%);
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

	/* ===== Section 2 — Who is Diogo? ===== */
	.who {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.who h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 28px;
		color: var(--bone);
	}
	.who-grid {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 40px;
	}
	.who-line {
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--ash);
		max-width: 60ch;
		margin: 0 0 14px;
	}
	.who-line:first-child {
		color: var(--bone);
	}

	.milestones {
		margin-top: 32px;
		border-left: 2px solid var(--kraft-deep);
		padding-left: 24px;
	}
	.milestone {
		margin-bottom: 26px;
	}
	.milestone:last-child {
		margin-bottom: 0;
	}
	.milestone-year {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--kraft);
	}
	.milestone-label {
		display: block;
		font-family: var(--serif);
		font-weight: 600;
		font-size: 1.1rem;
		color: var(--bone);
		margin-top: 4px;
	}
	.milestone-detail {
		margin: 6px 0 0;
		color: var(--ash);
		font-size: 0.92rem;
		line-height: 1.55;
		max-width: 44ch;
	}

	.who-media {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.costume-callout {
		position: relative;
		border-radius: 8px;
		overflow: hidden;
		aspect-ratio: 3 / 4;
		background: var(--stage-deep);
	}
	.costume-callout img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.costume-callout-tag {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 16px;
		background: linear-gradient(0deg, rgba(16, 12, 9, 0.88) 0%, transparent 100%);
	}
	.costume-callout-label {
		display: inline-block;
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--on-scrim);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
		margin-bottom: 6px;
	}
	.costume-callout-tag p {
		margin: 0;
		color: var(--on-scrim);
		font-size: 0.95rem;
	}

	.joy-photo {
		margin: 0;
	}
	.joy-photo img {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 8px;
		display: block;
		background: var(--stage-deep);
	}
	.joy-photo figcaption {
		margin: 10px 0 0;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.03em;
		color: var(--ash-dim);
	}

	@media (max-width: 720px) {
		.who-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ===== Section 3 — score ===== */
	.score {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}

	/* ===== Section 4 — objects study, the same soft blur-to-focus reveal
	   used in Isabel's chapter, for a consistent feel across both. ===== */
	.objects {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.objects h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 28px;
		color: var(--bone);
	}
	.objects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
	}
	.objects-item {
		filter: blur(2px) saturate(0.8);
		transform: scale(0.97);
		opacity: 0.88;
		transition:
			filter 0.5s var(--ease-settle),
			transform 0.5s var(--ease-settle),
			opacity 0.5s var(--ease-settle);
	}
	.objects-item:hover,
	.objects-item:focus-within {
		filter: blur(0) saturate(1);
		transform: scale(1.02);
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.objects-item {
			filter: none;
			transform: none;
			opacity: 1;
			transition: none;
		}
	}
	:global(html.motion-still) .objects-item {
		filter: none !important;
		transform: none !important;
		opacity: 1 !important;
		transition: none !important;
	}
</style>
