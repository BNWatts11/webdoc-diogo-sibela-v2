<script lang="ts">
	import { get } from 'svelte/store';
	import SpotlightVideo from '$lib/components/media/SpotlightVideo.svelte';
	import MacroPlate from '$lib/components/media/MacroPlate.svelte';
	import PullQuote from '$lib/components/content/PullQuote.svelte';
	import ReferenceCompanies from '$lib/components/content/ReferenceCompanies.svelte';
	import ClipGroup from '$lib/components/content/ClipGroup.svelte';
	import MomentsTimeline from '$lib/components/content/MomentsTimeline.svelte';
	import DancerTestimony from '$lib/components/content/DancerTestimony.svelte';
	import PhilosophyBlock from '$lib/components/content/PhilosophyBlock.svelte';
	import CaseStudyBlock from '$lib/components/content/CaseStudyBlock.svelte';
	import SynthesisGrid from '$lib/components/content/SynthesisGrid.svelte';
	import { reducedMotion } from '$lib/stores/motion';
	import { reveal } from '$lib/actions/reveal';
	import { audio } from '$lib/stores/audio';
	import { language } from '$lib/stores/language';
	import { localizeChapter } from '$lib/i18n/chapterContent';
	import { t, chapterTitle } from '$lib/i18n';

	let { data } = $props();
	const chapter = $derived(localizeChapter(data.chapter, $language));
	const title = $derived(chapterTitle(chapter, $language));

	// A shared link like #gallery-3 scrolls to and highlights that item. The
	// gallery has no single "selected" item the way CueSequence does — every
	// item shows at once — so this is read-only: nothing writes the hash back.
	// Reads window.location.hash directly since that's always accurate here,
	// unlike SvelteKit's page.url.hash on the very first hydration pass.
	// Two triggers, not one: `chapter` changing covers a client-side nav
	// between chapters (this route component is reused across the dynamic
	// [chapter] param); the hashchange listener covers navigating between two
	// hashes on the *same* path, which browsers treat as a same-document
	// fragment jump — no reload, so nothing else here would ever re-run.
	let highlightedGalleryIndex = $state<number | null>(null);
	$effect(() => {
		void chapter;

		function computeHighlight() {
			highlightedGalleryIndex = null;
			const m = /^#gallery-(\d+)$/.exec(window.location.hash);
			if (!m || !chapter.gallery) return;
			const i = Number(m[1]) - 1;
			if (i < 0 || i >= chapter.gallery.length) return;
			highlightedGalleryIndex = i;
			const id = `gallery-${i + 1}`;
			requestAnimationFrame(() => {
				document
					.getElementById(id)
					?.scrollIntoView({ behavior: get(reducedMotion) ? 'auto' : 'smooth', block: 'center' });
			});
		}

		computeHighlight();
		window.addEventListener('hashchange', computeHighlight);
		return () => window.removeEventListener('hashchange', computeHighlight);
	});

	// The opening chapter's hero runs image-forward with no spoken tagline —
	// an animated reveal stands in for it instead of the italic poetic line.
	const immersiveHero = $derived(chapter.id === 'inclusive-dance');
	// Chapter 2 gets its own hero treatment (cinematic blur/desaturate) and
	// its own text-reveal style, deliberately distinct from chapter 1's, but
	// keeps its poetic line and reuses the pull-quote's line-grow animation.
	const isCompany = $derived(chapter.id === 'company');
	const missionAnimated = $derived(immersiveHero || isCompany);
	// Chapter 2's two remaining clip groups (informational, Projetos) each
	// get their own choreography; every other chapter keeps the plain
	// chapter-1-style reveal. (Telmo's story used to be a third group here,
	// with the 'intimate' variant — it's now its own CaseStudyBlock instead.)
	const companyClipVariants = ['diagonal', 'timeline'] as const;
	const clipVariant = (i: number) =>
		isCompany ? (companyClipVariants[i] ?? 'default') : 'default';
	// Chapter 3 has no pull quote and no spoken tagline — its own identity is
	// the title's flicker-into-visibility reveal, playing on the chapter's
	// own theme instead of reusing chapter 1 or 2's text treatment.
	const isCiclo = $derived(chapter.id === 'o-ciclo-da-invisibilidade');
	// Chapters 1–3 overlay their title on the hero image itself (matching
	// Tânia Carvalho's and Process's dedicated pages) instead of setting it
	// as a heading above the image — each chapter keeps its own entrance
	// animation on the title, just repositioned onto the frame.
	const titleOverlay = $derived(immersiveHero || isCompany || isCiclo);
	// Chapter 3's own hero plays on its "(in)visibility" theme literally: the
	// intro video starts invisible and silent behind a "Click here" prompt,
	// only appearing (and starting playback) once the visitor clicks it.
	let heroRevealed = $state(false);
	let heroVideoWrapEl = $state<HTMLDivElement>();
	function revealHero() {
		if (heroRevealed) return;
		heroRevealed = true;
		audio.playReveal();
		heroVideoWrapEl
			?.querySelector('video')
			?.play()
			.catch(() => {});
	}

	const pageTitle = $derived(`${title} · Sibela & Digoo`);
	const ogImage = $derived(
		chapter.heroMedia.type === 'image'
			? chapter.heroMedia.src
			: (chapter.heroMedia.poster ?? '/placeholder/stage-generic.svg')
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={chapter.poetic} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={chapter.poetic} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={chapter.poetic} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<article
	class="chapter-page"
	class:immersive={immersiveHero}
	class:company-reveal={isCompany}
	class:ciclo-reveal={isCiclo}
>
	<header class="chapter-hero">
		<span class="ix"
			><span class="ix-track"
				>{$t(
					chapter.track === 'performance'
						? 'nav.track-performance-short'
						: 'nav.track-context-short'
				)}</span
			>
			· {String(chapter.order).padStart(2, '0')} / 09</span
		>
		{#if !immersiveHero && chapter.poetic}
			<p class="poetic">{chapter.poetic}</p>
		{/if}
		{#if !titleOverlay}
			<h1 use:reveal>{title}</h1>
		{/if}

		<div
			class="hero-media"
			class:hero-media-reveal={immersiveHero}
			class:hero-media-cinematic={isCompany}
			class:hero-media-invisible={isCiclo}
			class:hero-media-revealed={isCiclo && heroRevealed}
		>
			<div class="hero-video-wrap" bind:this={heroVideoWrapEl} inert={isCiclo && !heroRevealed}>
				{#if chapter.heroMedia.type === 'video'}
					<SpotlightVideo
						src={chapter.heroMedia.src}
						poster={chapter.heroMedia.poster}
						alt={chapter.heroMedia.alt}
						variant="spotlight"
					/>
				{:else}
					<figure class="hero-image">
						<img src={chapter.heroMedia.src} alt={chapter.heroMedia.alt} />
					</figure>
				{/if}
			</div>
			{#if titleOverlay}
				<div class="hero-title-scrim" aria-hidden="true"></div>
				<h1 class="hero-title-overlay" use:reveal>{title}</h1>
			{/if}
			{#if isCiclo && !heroRevealed}
				<button
					type="button"
					class="hero-click-reveal"
					onclick={revealHero}
					aria-label={$t('ciclo.click-reveal-aria')}
				>
					{$t('ciclo.click-here')}
				</button>
			{/if}
		</div>
		{#if chapter.heroMedia.alt.startsWith('[PLACEHOLDER')}
			<p class="placeholder-note">{chapter.heroMedia.alt}</p>
		{/if}
	</header>

	{#if chapter.secondaryHero}
		<figure class="secondary-hero" use:reveal>
			{#if chapter.secondaryHeroTitle}
				<figcaption class="secondary-hero-title">{chapter.secondaryHeroTitle}</figcaption>
			{/if}
			{#if chapter.secondaryHero.type === 'video'}
				<video
					src={chapter.secondaryHero.src}
					poster={chapter.secondaryHero.poster}
					aria-label={chapter.secondaryHero.alt}
					controls
					preload="metadata"
				>
					<track kind="captions" />
				</video>
			{:else}
				<img src={chapter.secondaryHero.src} alt={chapter.secondaryHero.alt} />
			{/if}
		</figure>
	{/if}

	{#if chapter.editions?.length}
		{#each chapter.editions as edition, i (i)}
			<section class="edition-block" use:reveal>
				<h2 class="edition-title-{edition.titleVariant ?? 'flicker'}">{edition.heading}</h2>
				{#if edition.poster}
					<figure class="edition-poster">
						<img src={edition.poster.src} alt={edition.poster.alt} />
					</figure>
				{/if}
				{#if edition.video}
					<figure class="edition-video">
						{#if edition.video.type === 'video'}
							<video
								src={edition.video.src}
								poster={edition.video.poster}
								aria-label={edition.video.alt}
								controls
								preload="metadata"
							>
								<track kind="captions" />
							</video>
						{:else}
							<img src={edition.video.src} alt={edition.video.alt} />
						{/if}
					</figure>
				{/if}
				{#if edition.interviewUrl || edition.programUrl}
					<div class="edition-links">
						{#if edition.interviewUrl}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={edition.interviewUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="edition-link"
							>
								{edition.interviewLabel ?? $t('label.watch-full-interview')}
								<span aria-hidden="true">↗</span>
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/if}
						{#if edition.programUrl}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={edition.programUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="edition-link edition-link-program"
							>
								{edition.programLabel ?? $t('label.see-programme')}
								<span aria-hidden="true">↗</span>
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						{/if}
					</div>
				{/if}
			</section>
		{/each}
	{/if}

	{#if chapter.moments?.length}
		<MomentsTimeline
			heading={chapter.momentsHeading ?? 'Momentos Marcantes'}
			moments={chapter.moments}
		/>
	{/if}

	<div class="body-copy">
		{#each chapter.body as paragraph, i (i)}
			<p use:reveal style="--delay: {i * 120}ms" class:placeholder-note={paragraph.startsWith('[')}>
				{paragraph}
			</p>
		{/each}
	</div>

	{#if chapter.dancerTestimony}
		<DancerTestimony testimony={chapter.dancerTestimony} />
	{/if}

	{#if chapter.philosophy}
		<PhilosophyBlock philosophy={chapter.philosophy} />
	{/if}

	{#if chapter.pullQuote && !chapter.pullQuoteInline && chapter.pullQuotePosition !== 'end'}
		<PullQuote
			text={chapter.pullQuote.text}
			attribution={chapter.pullQuote.attribution}
			animated={missionAnimated}
		/>
	{/if}

	{#if chapter.referenceCompanies?.length}
		<section class="reference-section">
			<h2>{$t('section.reference-companies')}</h2>
			<ReferenceCompanies companies={chapter.referenceCompanies} />
		</section>
	{/if}

	{#if chapter.extraClipGroups?.length}
		<section class="clips-section">
			{#if chapter.extraClipGroupsHeading}
				<h2>{chapter.extraClipGroupsHeading}</h2>
			{/if}
			{#each chapter.extraClipGroups as group, i (i)}
				<ClipGroup
					heading={group.heading}
					introVideo={group.introVideo}
					clips={group.clips}
					externalUrl={group.externalUrl}
					externalLabel={group.externalLabel}
					variant={clipVariant(i)}
					quote={chapter.pullQuoteInline && chapter.pullQuoteInline.groupHeading === group.heading
						? chapter.pullQuote
						: undefined}
					quoteAfterIndex={chapter.pullQuoteInline &&
					chapter.pullQuoteInline.groupHeading === group.heading
						? chapter.pullQuoteInline.afterClipIndex
						: undefined}
				/>
			{/each}
		</section>
	{/if}

	{#if chapter.synthesisHighlights}
		<section class="synthesis-section">
			<SynthesisGrid
				heading={chapter.synthesisHighlights.heading}
				intro={chapter.synthesisHighlights.intro}
				items={chapter.synthesisHighlights.items}
				externalUrl={chapter.synthesisHighlights.externalUrl}
				externalLabel={chapter.synthesisHighlights.externalLabel}
			/>
		</section>
	{/if}

	{#if chapter.caseStudy}
		<CaseStudyBlock caseStudy={chapter.caseStudy} />
	{/if}

	{#if chapter.gallery?.length}
		<div class="gallery">
			{#each chapter.gallery as item, i (i)}
				<div
					class="gallery-item"
					class:highlighted={highlightedGalleryIndex === i}
					id="gallery-{i + 1}"
				>
					{#if item.type === 'video'}
						<SpotlightVideo src={item.src} poster={item.poster} alt={item.alt} variant="aperture" />
					{:else}
						<MacroPlate
							src={item.src}
							alt={item.alt}
							label={item.label ?? `Object study ${i + 1}`}
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	{#if chapter.pullQuote && !chapter.pullQuoteInline && chapter.pullQuotePosition === 'end'}
		<PullQuote
			text={chapter.pullQuote.text}
			attribution={chapter.pullQuote.attribution}
			animated={missionAnimated}
		/>
	{/if}
</article>

<style>
	.chapter-page {
		padding: 50px 28px 80px;
		max-width: 860px;
		margin: 0 auto;
		/* entrance animations start offset sideways (the diagonal clip cards sit
		   30px off-axis until revealed), which otherwise makes the whole page
		   scroll horizontally on mobile. `clip`, not `hidden`, so the sticky
		   intro video inside still works. */
		overflow-x: clip;
	}
	.chapter-hero {
		margin-bottom: 40px;
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
	.poetic {
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: 1.5rem;
		color: var(--ash);
		margin: 10px 0 2px;
	}
	h1 {
		font-weight: 300;
		font-size: clamp(2.4rem, 6vw, 3.6rem);
		letter-spacing: -0.02em;
		margin: 0 0 26px;
		line-height: 1;
	}

	.hero-media {
		height: 420px;
		position: relative;
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
	}
	.hero-image {
		margin: 0;
		width: 100%;
		height: 100%;
	}
	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: var(--stage-deep);
	}

	/* Chapters 1–3's title sits on the hero frame itself instead of above
	   it, matching Tânia Carvalho's and Process's dedicated pages — a scrim
	   plus text-shadow keep it legible over whatever the photo/video is
	   doing underneath. Each chapter's own entrance animation (below) still
	   applies to this same h1, just at its new position. */
	.hero-title-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(16, 12, 9, 0) 55%, rgba(16, 12, 9, 0.75) 100%);
		pointer-events: none;
	}
	.hero-title-overlay {
		position: absolute;
		left: 28px;
		right: 28px;
		bottom: 24px;
		z-index: 1;
		margin: 0;
		color: var(--on-scrim);
		text-shadow: 0 3px 22px rgba(0, 0, 0, 0.6);
	}

	.secondary-hero {
		margin: 32px 0 40px;

		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s var(--ease-settle),
			transform 0.7s var(--ease-settle);
	}
	.secondary-hero:global(.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.secondary-hero {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .secondary-hero {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}
	.secondary-hero-title {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		margin: 0 0 12px;
	}
	.secondary-hero video,
	.secondary-hero img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 8px;
		background: var(--stage-deep);
	}

	/* Opening chapter's image-forward hero: a settle-in reveal on entrance
	   (scale + blur clearing to opaque), plus a scroll-driven continuation
	   in browsers that support view() timelines — the image drifts upward
	   more slowly than the page scrolls (a parallax read) while it dims
	   slightly, rather than cutting off flatly. */
	@keyframes hero-reveal {
		from {
			opacity: 0;
			transform: scale(1.05);
			filter: blur(14px);
		}
		to {
			opacity: 1;
			transform: scale(1);
			filter: blur(0);
		}
	}
	.hero-media-reveal .hero-image img {
		animation: hero-reveal 1.3s var(--ease-settle) both;
	}
	@supports (animation-timeline: view()) {
		.hero-media-reveal .hero-image img {
			animation:
				hero-reveal 1.3s var(--ease-settle) both,
				hero-scroll-drift linear both;
			animation-timeline: auto, view();
			animation-range:
				normal,
				entry 0% cover 60%;
		}
	}
	@keyframes hero-scroll-drift {
		from {
			transform: scale(1) translateY(0);
			opacity: 1;
		}
		to {
			transform: scale(1.06) translateY(-18px);
			opacity: 0.82;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-media-reveal .hero-image img {
			animation: none;
		}
	}
	:global(html.motion-still) .hero-media-reveal .hero-image img {
		animation: none !important;
	}

	/* Chapter 2's hero: a distinct cinematic language from chapter 1's —
	   the image blurs, desaturates, and sits slightly oversized, then
	   sharpens and scales down to 1 as it's scrolled into view, scrubbed
	   directly by scroll position rather than firing once on a timer. */
	@keyframes hero-cinematic {
		from {
			opacity: 0.2;
			transform: scale(1.06);
			filter: blur(9px) saturate(0.15);
		}
		to {
			opacity: 1;
			transform: scale(1);
			filter: blur(0) saturate(1);
		}
	}
	.hero-media-cinematic .hero-image img {
		animation: hero-cinematic 1.4s var(--ease-settle) both;
	}
	@supports (animation-timeline: view()) {
		.hero-media-cinematic .hero-image img {
			animation: hero-cinematic linear both;
			animation-timeline: view();
			animation-range: entry 0% entry 85%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-media-cinematic .hero-image img {
			animation: none;
		}
	}
	:global(html.motion-still) .hero-media-cinematic .hero-image img {
		animation: none !important;
	}

	.placeholder-note {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--ash-dim);
		letter-spacing: 0.02em;
		margin: 10px 0 0;
	}

	.body-copy {
		margin: 36px 0;
	}
	.body-copy p {
		font-size: 1.08rem;
		line-height: 1.7;
		color: var(--ash);
		max-width: 66ch;
	}
	.body-copy p:first-child {
		color: var(--bone);
	}
	.body-copy p.placeholder-note {
		font-family: var(--mono);
		font-size: 11px;
		line-height: 1.6;
		color: var(--ash-dim);
		letter-spacing: 0.02em;
	}

	/* Opening chapter's title + intro paragraphs read in on a staggered
	   fade-up as each scrolls into view, instead of appearing all at once. */
	.immersive .chapter-hero h1,
	.immersive .body-copy p {
		opacity: 0;
		transform: translateY(18px);
		transition:
			opacity 0.7s var(--ease-settle) var(--delay, 0ms),
			transform 0.7s var(--ease-settle) var(--delay, 0ms);
	}
	.immersive .chapter-hero h1:global(.is-visible),
	.immersive .body-copy p:global(.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.immersive .chapter-hero h1,
		.immersive .body-copy p {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .immersive .chapter-hero h1,
	:global(html.motion-still) .immersive .body-copy p {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	/* Chapter 2's text reveal: a blur-clear slide in from the left, distinct
	   from chapter 1's vertical fade-up, staggered the same way. */
	.company-reveal .chapter-hero h1,
	.company-reveal .body-copy p {
		opacity: 0;
		transform: translateX(-16px);
		filter: blur(5px);
		transition:
			opacity 0.8s var(--ease-settle) var(--delay, 0ms),
			transform 0.8s var(--ease-settle) var(--delay, 0ms),
			filter 0.8s var(--ease-settle) var(--delay, 0ms);
	}
	.company-reveal .chapter-hero h1:global(.is-visible),
	.company-reveal .body-copy p:global(.is-visible) {
		opacity: 1;
		transform: translateX(0);
		filter: blur(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.company-reveal .chapter-hero h1,
		.company-reveal .body-copy p {
			opacity: 1;
			transform: none;
			filter: none;
			transition: none;
		}
	}
	:global(html.motion-still) .company-reveal .chapter-hero h1,
	:global(html.motion-still) .company-reveal .body-copy p {
		opacity: 1 !important;
		transform: none !important;
		filter: none !important;
		transition: none !important;
	}

	/* Chapter 3's title plays its own theme on entrance: it flickers between
	   visible and near-invisible a few times before settling — "the cycle of
	   (in)visibility" rendered directly in how the name arrives on screen,
	   rather than a plain fade or slide like chapters 1 and 2. */
	@keyframes ciclo-title-cycle {
		0% {
			opacity: 0;
			filter: blur(9px);
		}
		11% {
			opacity: 1;
			filter: blur(0);
		}
		19% {
			opacity: 0.15;
		}
		27% {
			opacity: 1;
		}
		36% {
			opacity: 0.2;
		}
		45% {
			opacity: 1;
		}
		56% {
			opacity: 0.3;
		}
		67% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}
	.ciclo-reveal .chapter-hero h1 {
		animation: ciclo-title-cycle 2.1s var(--ease-settle) both;
	}
	@media (prefers-reduced-motion: reduce) {
		.ciclo-reveal .chapter-hero h1 {
			animation: none;
		}
	}
	:global(html.motion-still) .ciclo-reveal .chapter-hero h1 {
		animation: none !important;
	}

	/* Chapter 3's hero video literalises the chapter's own theme: the clip is
	   fully invisible and silent behind a "Click here" prompt, only fading in
	   and starting playback once the visitor clicks — the same click-to-reveal
	   idea as the Landmark Moments timeline, applied to the very first video
	   on the page. */
	.hero-media-invisible .hero-video-wrap {
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.8s var(--ease-settle);
	}
	.hero-media-revealed .hero-video-wrap {
		opacity: 1;
		pointer-events: auto;
	}
	.hero-click-reveal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		background: none;
		border: 0;
		cursor: pointer;
		font-family: var(--serif);
		font-weight: 700;
		font-size: clamp(1.3rem, 4vw, 1.9rem);
		color: #e3b657;
		letter-spacing: 0.01em;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.7);
		animation: hero-click-pulse 2.6s ease-in-out infinite;
	}
	@keyframes hero-click-pulse {
		0%,
		100% {
			opacity: 0.72;
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.05);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-media-invisible .hero-video-wrap {
			transition: none;
		}
		.hero-click-reveal {
			animation: none;
			opacity: 1;
		}
	}
	:global(html.motion-still) .hero-media-invisible .hero-video-wrap {
		transition: none !important;
	}
	:global(html.motion-still) .hero-click-reveal {
		animation: none !important;
		opacity: 1;
	}

	/* Edition subsections (chapter 3): fade up as a block, then the heading
	   replays a shorter version of the chapter's own flicker cycle — tying
	   each edition back to the page's identity without repeating the full
	   opening flourish. */
	.edition-block {
		margin: 56px 0;
		border-top: 1px solid var(--line);
		padding-top: 40px;

		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s var(--ease-settle),
			transform 0.7s var(--ease-settle);
	}
	.edition-block:global(.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.edition-block {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .edition-block {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}
	.edition-block h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 24px;
	}

	/* Edition 1's title: replays the chapter's own flicker-into-visibility
	   cycle, just shorter than the page title's opening flourish. */
	.edition-title-flicker {
		animation: ciclo-title-cycle 1.5s var(--ease-settle) both;
		animation-play-state: paused;
	}
	.edition-block:global(.is-visible) .edition-title-flicker {
		animation-play-state: running;
	}

	/* Edition 2's title: a mechanically different reveal — a clip-path wipe
	   sweeps the name in left-to-right while it's very slightly oversized,
	   then settles to true scale, instead of flickering opacity. */
	@keyframes edition-title-wipe {
		0% {
			clip-path: inset(0 100% 0 0);
			transform: scale(1.04);
		}
		70% {
			clip-path: inset(0 0% 0 0);
			transform: scale(1.04);
		}
		100% {
			clip-path: inset(0 0% 0 0);
			transform: scale(1);
		}
	}
	.edition-title-wipe {
		display: inline-block;
		animation: edition-title-wipe 1.3s var(--ease-heavy) both;
		animation-play-state: paused;
	}
	.edition-block:global(.is-visible) .edition-title-wipe {
		animation-play-state: running;
	}

	@media (prefers-reduced-motion: reduce) {
		.edition-title-flicker,
		.edition-title-wipe {
			animation: none;
			opacity: 1;
			clip-path: none;
			transform: none;
		}
	}
	:global(html.motion-still) .edition-title-flicker,
	:global(html.motion-still) .edition-title-wipe {
		animation: none !important;
		opacity: 1 !important;
		clip-path: none !important;
		transform: none !important;
	}

	.edition-poster {
		margin: 0 0 24px;
	}
	.edition-poster img {
		display: block;
		width: 100%;
		max-width: 480px;
		border-radius: 8px;
		background: var(--stage-deep);
	}
	.edition-video {
		margin: 0 0 20px;
	}
	.edition-video video,
	.edition-video img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 8px;
		background: var(--stage-deep);
	}

	.edition-links {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 12px 28px;
	}
	.edition-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
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
	.edition-link:hover,
	.edition-link:focus-visible {
		color: var(--bone);
	}
	.edition-link.edition-link-program {
		font-family: var(--sans, inherit);
		font-size: 0.96rem;
		letter-spacing: normal;
		text-transform: none;
		color: var(--ash);
		border-bottom-color: var(--line-strong);
	}
	.edition-link.edition-link-program:hover,
	.edition-link.edition-link-program:focus-visible {
		color: var(--bone);
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		margin: 40px 0;
	}
	.gallery-item {
		border-radius: 6px;
		outline: 2px solid transparent;
		outline-offset: 4px;
		transition: outline-color 0.4s var(--ease-heavy);
	}
	.gallery-item.highlighted {
		outline-color: var(--kraft);
	}
	:global(html.motion-still) .gallery-item {
		transition: none;
	}

	.reference-section,
	.clips-section,
	.synthesis-section {
		margin: 56px 0;
		border-top: 1px solid var(--line);
		padding-top: 40px;
	}
	.reference-section h2,
	.clips-section h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 8px 0 24px;
	}
</style>
