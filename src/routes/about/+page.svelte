<!--
  The Author Note / About page — the one place on the site that speaks in
  the researcher's own voice rather than the documentary's. Deliberately
  plain: no hero photo, no dancer-pole theming, no motif — just readable
  sections. Kept as its own top-level route rather than a 10th entry in
  chapters.ts, so it can never be mistaken for a stop on the nine-chapter
  thread or thrown off the order-based track badges/breadcrumbs that assume
  exactly nine chapters.
-->
<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';

	const pageTitle = 'About This Project · Sibela & Digoo';
	const pageDescription =
		'About this project — thesis context, authorship, and how Kinetic Boxes handles camera data.';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
</svelte:head>

<article class="about">
	<header class="about-hero">
		<span class="kicker">{$t('about.kicker')}</span>
		<h1>{$t('about.title')}</h1>
		<p class="intro">{$t('about.intro')}</p>
	</header>

	<section class="about-block" use:reveal>
		<h2>{$t('about.identity-h2')}</h2>
		<span class="thesis-label">{$t('about.identity-thesis-label')}</span>
		<p class="thesis-title">{$t('about.identity-thesis-title')}</p>
		<p>{$t('about.identity-goal')}</p>
	</section>

	<section class="about-block" use:reveal>
		<h2>{$t('about.authorship-h2')}</h2>
		<p>{$t('about.authorship-text')}</p>
	</section>

	<section class="about-block" use:reveal>
		<h2>{$t('about.context-h2')}</h2>
		<p>{$t('about.context-text')}</p>
	</section>

	<section class="about-block" use:reveal>
		<h2>{$t('about.rationale-h2')}</h2>
		<p>{$t('about.rationale-text')}</p>
	</section>

	<section class="privacy-box" use:reveal>
		<span class="kicker">{$t('about.privacy-kicker')}</span>
		<h2>{$t('about.privacy-h2')}</h2>
		<p>{$t('about.privacy-text')}</p>
	</section>
</article>

<style>
	.about {
		max-width: 760px;
		margin: 0 auto;
		padding: 0 0 120px;
	}

	/* ===== Hero ===== */
	.about-hero {
		padding: 70px 28px 0;
	}
	.kicker {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--kraft);
		margin: 0 0 18px;
	}
	h1 {
		font-weight: 300;
		font-size: clamp(2.2rem, 5.5vw, 3.2rem);
		line-height: 1.05;
		letter-spacing: -0.01em;
		margin: 0 0 18px;
	}
	.intro {
		font-size: 1.05rem;
		color: var(--ash);
		max-width: 58ch;
		margin: 0;
	}

	/* ===== Content blocks ===== */
	.about-block {
		margin: 64px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 40px;

		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.6s var(--ease-settle),
			transform 0.6s var(--ease-settle);
	}
	.about-block:global(.is-visible) {
		opacity: 1;
		transform: none;
	}
	.about-block h2 {
		font-weight: 300;
		font-size: clamp(1.5rem, 3.2vw, 1.9rem);
		margin: 0 0 14px;
		color: var(--bone);
	}
	.about-block p {
		font-size: 1.02rem;
		line-height: 1.7;
		color: var(--ash);
		max-width: 62ch;
		margin: 0 0 14px;
	}
	.about-block p:last-child {
		margin-bottom: 0;
	}
	.thesis-label {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ash-dim);
		margin-bottom: 6px;
	}
	.thesis-title {
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: 1.3rem;
		color: var(--bone);
		margin: 0 0 20px;
	}

	/* ===== Technical & privacy disclosure ===== */
	.privacy-box {
		margin: 64px 28px 0;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 32px 30px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);

		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.6s var(--ease-settle),
			transform 0.6s var(--ease-settle);
	}
	.privacy-box:global(.is-visible) {
		opacity: 1;
		transform: none;
	}
	.privacy-box .kicker {
		margin-bottom: 12px;
	}
	.privacy-box h2 {
		font-weight: 300;
		font-size: clamp(1.3rem, 2.8vw, 1.6rem);
		margin: 0 0 14px;
		color: var(--bone);
	}
	.privacy-box p {
		font-size: 0.98rem;
		line-height: 1.65;
		color: var(--ash);
		margin: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.about-block,
		.privacy-box {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .about-block,
	:global(html.motion-still) .privacy-box {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}
</style>
