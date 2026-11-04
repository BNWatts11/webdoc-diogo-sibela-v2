<script lang="ts">
	import { resolve } from '$app/paths';
	import NavSpine from '$lib/components/shell/NavSpine.svelte';
	import MacroPlate from '$lib/components/media/MacroPlate.svelte';
	import VideoCard from '$lib/components/media/VideoCard.svelte';
	import Countdown from '$lib/components/content/Countdown.svelte';
	import { t } from '$lib/i18n';

	const image = '/photos/inclusive-dance/company-group.jpg';

	// Every visible string comes from the shared dictionary ($t, reactive to the
	// language store) — the same system the sidebar, chapters and About page
	// use — so switching EN/PT re-renders this whole page, <head> included.

	// Narrative hook — the synopsis, teaser, and gallery that used to live
	// buried in the Performance chapter (order 8), where a visitor had to dig
	// through seven earlier chapters to reach them. This is the one video that
	// shows the actual production (not either dancer's own teaser), so it works
	// as a shared, balanced entry point rather than favouring one solo.
	const teaser = {
		src: '/videos/company/project-15-sibela-digoo.mp4',
		poster: '/photos/company/posters/project-15-sibela-digoo.jpg'
	};
	// captions reuse the Performance chapter's already-translated photo labels
	const stagePhotos = $derived([
		{
			src: '/photos/performance/isabela-silhouette-chair.jpg',
			alt: $t('home.photo-sibela-alt'),
			label: $t('performance.photo-sibela')
		},
		{
			src: '/photos/performance/diogo-silhouette-box.jpg',
			alt: $t('home.photo-digoo-alt'),
			label: $t('performance.photo-digoo')
		},
		{
			src: '/photos/performance/tour-viriato.jpg',
			alt: $t('home.photo-viseu-alt'),
			label: $t('performance.photo-viseu')
		},
		{
			src: '/photos/performance/tour-jose.jpg',
			alt: $t('home.photo-leiria-alt'),
			label: $t('performance.photo-leiria')
		},
		{
			src: '/photos/performance/tour-teatro.jpg',
			alt: $t('home.photo-evora-alt'),
			label: $t('performance.photo-evora')
		}
	]);

	// Premiere widget — target date is a plain configurable prop on
	// Countdown. The visible date line is the 'home.premiere-date' string, so
	// change both together.
	const premiereDate = '2026-10-30T21:00:00';
</script>

<svelte:head>
	<title>{$t('home.title')}</title>
	<meta name="description" content={$t('home.synopsis')} />
	<meta property="og:title" content={$t('home.title')} />
	<meta property="og:description" content={$t('home.synopsis')} />
	<meta property="og:image" content={image} />
	<meta name="twitter:title" content={$t('home.title')} />
	<meta name="twitter:description" content={$t('home.synopsis')} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<section class="hero">
	<div class="wrap">
		<span class="delv">Dançando com a Diferença</span>
		<h1>Sibela <em>&amp;</em> Digoo</h1>
		<p class="sub">{$t('home.byline')}</p>

		<div class="ways-in">
			<a class="way" href={resolve('/isabel')}>
				<span class="way-eyebrow cool">{$t('home.way-isabel')}</span>
				<span class="way-name">Isabel</span>
			</a>
			<a class="way" href={resolve('/diogo')}>
				<span class="way-eyebrow">{$t('home.way-diogo')}</span>
				<span class="way-name">Diogo</span>
			</a>
		</div>
	</div>
</section>

<section class="hook-section">
	<div class="wrap">
		<p class="synopsis">{$t('home.synopsis')}</p>

		<div class="teaser">
			<VideoCard
				subtitle={$t('home.teaser-subtitle')}
				framing={$t('home.teaser-framing')}
				src={teaser.src}
				poster={teaser.poster}
				alt={$t('home.teaser-alt')}
			/>
		</div>

		<div class="gallery-grid">
			{#each stagePhotos as photo (photo.src)}
				<MacroPlate src={photo.src} alt={photo.alt} label={photo.label} />
			{/each}
		</div>
	</div>
</section>

<section class="premiere-section">
	<div class="wrap">
		<div class="premiere-card">
			<!-- the block's title is deliberately Portuguese in both languages, as
			     specified for the premiere widget; venue is a proper name -->
			<h2>Encontrar o Espetáculo</h2>
			<p class="premiere-venue">Teatro Municipal Baltazar Dias, Funchal</p>
			<p class="premiere-date">{$t('home.premiere-date')}</p>
			<Countdown targetDate={premiereDate} />
		</div>
	</div>
</section>

<section class="onboarding-section">
	<div class="wrap">
		<h2>{$t('home.start-h2')}</h2>
		<div class="track-ctas">
			<a class="track-cta performance" href={resolve('/tania-carvalho')}>
				<span class="track-cta-eyebrow">{$t('home.track1-eyebrow')}</span>
				<span class="track-cta-label">{$t('home.track1-label')}</span>
			</a>
			<a class="track-cta context" href={resolve('/inclusive-dance')}>
				<span class="track-cta-eyebrow">{$t('home.track2-eyebrow')}</span>
				<span class="track-cta-label">{$t('home.track2-label')}</span>
			</a>
		</div>
	</div>
</section>

<section class="spine-section">
	<div class="wrap">
		<h2>{$t('home.spine-h2')}</h2>
		<p class="spine-intro">
			{$t('home.spine-a')} <strong>{$t('nav.track-performance')}</strong>
			{$t('home.spine-b')}
			<strong>{$t('nav.track-context')}</strong>
			{$t('home.spine-c')}
		</p>
		<NavSpine />
	</div>
</section>

<style>
	.hero {
		padding: 80px 0 60px;
	}
	.delv {
		display: inline-block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--kraft);
		border: 1px solid var(--kraft-deep);
		border-radius: 99px;
		padding: 5px 13px;
		margin-bottom: 26px;
	}
	h1 {
		font-weight: 300;
		font-size: clamp(2.8rem, 7vw, 5rem);
		line-height: 0.98;
		letter-spacing: -0.02em;
		margin: 0 0 16px;
	}
	h1 em {
		font-style: italic;
		color: var(--kraft);
	}
	.sub {
		font-size: 1.18rem;
		color: var(--ash);
		max-width: 62ch;
		margin: 0 0 40px;
	}

	.ways-in {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		max-width: 720px;
	}
	.way {
		display: flex;
		flex-direction: column;
		gap: 4px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 22px 24px;
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent);
		transition:
			border-color 0.3s ease,
			transform 0.3s var(--ease-heavy);
	}
	.way:hover,
	.way:focus-visible {
		border-color: var(--kraft-deep);
		transform: translateY(-2px);
	}
	.way:nth-child(1):hover,
	.way:nth-child(1):focus-visible {
		border-color: var(--breath-deep);
	}
	.way-eyebrow {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--kraft);
	}
	.way-eyebrow.cool {
		color: var(--breath);
	}
	.way-name {
		font-family: var(--serif);
		font-weight: 400;
		font-size: 1.6rem;
	}

	.spine-section {
		padding: 40px 0 80px;
		border-top: 1px solid var(--line);
	}
	h2 {
		font-weight: 300;
		font-size: clamp(1.8rem, 3.8vw, 2.6rem);
		margin: 0 0 8px;
	}
	.spine-intro {
		font-size: 1.02rem;
		color: var(--ash);
		max-width: 62ch;
		margin: 0 0 32px;
	}
	.spine-intro strong {
		color: var(--bone);
		font-weight: 500;
	}

	/* ===== Narrative hook ===== */
	.hook-section {
		padding: 0 0 60px;
	}
	.synopsis {
		font-family: var(--serif);
		font-weight: 300;
		font-size: clamp(1.3rem, 2.6vw, 1.7rem);
		line-height: 1.5;
		color: var(--bone);
		max-width: 62ch;
		margin: 0 0 36px;
	}
	.teaser {
		margin: 0 0 28px;
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 18px;
	}

	/* ===== Premiere widget ===== */
	.premiere-section {
		padding: 0 0 60px;
	}
	.premiere-card {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 40px 36px;
		text-align: center;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
	}
	.premiere-card h2 {
		margin: 0 0 10px;
	}
	.premiere-venue {
		font-size: 1.05rem;
		color: var(--ash);
		margin: 0 0 4px;
	}
	.premiere-date {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ash-dim);
		margin: 0 0 30px;
	}

	/* ===== Onboarding CTA ===== */
	.onboarding-section {
		padding: 0 0 80px;
	}
	.track-ctas {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		max-width: 780px;
	}
	.track-cta {
		display: flex;
		flex-direction: column;
		gap: 8px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 26px 26px;
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent);
		transition:
			border-color 0.3s ease,
			transform 0.3s var(--ease-heavy);
	}
	.track-cta:hover,
	.track-cta:focus-visible {
		transform: translateY(-2px);
	}
	.track-cta.performance:hover,
	.track-cta.performance:focus-visible {
		border-color: var(--kraft-deep);
	}
	.track-cta.context:hover,
	.track-cta.context:focus-visible {
		border-color: var(--line-strong);
	}
	.track-cta-eyebrow {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ash-dim);
	}
	.track-cta.performance .track-cta-eyebrow {
		color: var(--kraft);
	}
	.track-cta-label {
		font-family: var(--serif);
		font-weight: 400;
		font-size: 1.3rem;
		color: var(--bone);
	}

	@media (max-width: 640px) {
		.ways-in {
			grid-template-columns: 1fr;
		}
		.track-ctas {
			grid-template-columns: 1fr;
		}
	}
</style>
