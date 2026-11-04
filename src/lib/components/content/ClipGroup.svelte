<script lang="ts">
	import type { ChapterMedia, ExtraClip } from '$lib/content/schema';
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/i18n';

	let {
		heading,
		introVideo,
		clips,
		externalUrl,
		externalLabel,
		variant = 'default',
		quote,
		quoteAfterIndex
	}: {
		heading?: string;
		introVideo?: ChapterMedia;
		clips: ExtraClip[];
		externalUrl?: string;
		externalLabel?: string;
		/** presentation-only choreography — 'diagonal' alternates entrance
		 * direction by column, 'timeline' pins the intro video and cascades
		 * cards with a rock + scroll-linked fade-out, 'intimate' expands cards
		 * from centre on a slow, heavy easing. 'default' matches chapter 1. */
		variant?: 'default' | 'diagonal' | 'timeline' | 'intimate';
		/** a pull quote threaded into the clip grid instead of sitting above
		 * or below it — a break partway through, not a caption for it */
		quote?: { text: string; attribution: string };
		/** 0-based: the quote renders as its own full-width row right after
		 * the clip at this index */
		quoteAfterIndex?: number;
	} = $props();

	const clipDelay = (i: number) => (variant === 'intimate' ? i * 350 : i * 90);
</script>

<div class="clip-group">
	{#if heading || externalUrl}
		<div class="clip-group-head" use:reveal>
			{#if heading}<h3>{heading}</h3>{/if}
			{#if externalUrl}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={externalUrl} target="_blank" rel="noopener noreferrer" class="full-video-link">
					{externalLabel ?? $t('label.watch-full-video')} <span aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	{/if}
	{#if introVideo}
		<figure class="clip-intro" class:clip-intro-pinned={variant === 'timeline'} use:reveal>
			<video
				src={introVideo.src}
				poster={introVideo.poster}
				aria-label={introVideo.alt}
				controls
				preload="metadata"
			>
				<track kind="captions" />
			</video>
		</figure>
	{/if}
	<div class="clip-row" class:variant-diagonal={variant === 'diagonal'}>
		{#each clips as clip, i (clip.video.src)}
			<figure class="clip-card variant-{variant}" use:reveal style="--delay: {clipDelay(i)}ms">
				<video
					src={clip.video.src}
					poster={clip.video.poster}
					aria-label={clip.video.alt}
					controls
					preload="metadata"
				>
					<track kind="captions" />
				</video>
				{#if clip.title}<figcaption>{clip.title}</figcaption>{/if}
			</figure>
			{#if quote && i === quoteAfterIndex}
				<blockquote class="clip-quote" use:reveal>
					<p>{quote.text}</p>
					<cite>{quote.attribution}</cite>
				</blockquote>
			{/if}
		{/each}
	</div>
</div>

<style>
	.clip-group {
		margin: 0 0 40px;
	}
	.clip-group:last-child {
		margin-bottom: 0;
	}
	.clip-group-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px 20px;
		margin: 0 0 16px;

		opacity: 0;
		transition: opacity 0.9s var(--ease-settle);
	}
	.clip-group-head:global(.is-visible) {
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.clip-group-head {
			opacity: 1;
			transition: none;
		}
	}
	:global(html.motion-still) .clip-group-head {
		opacity: 1 !important;
		transition: none !important;
	}
	h3 {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		margin: 0;
	}
	.full-video-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		text-decoration: none;
		padding-bottom: 3px;
		transition: color 0.3s ease;
	}
	.full-video-link::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: var(--kraft-deep);
		transform: scaleX(0.34);
		transition: transform 0.4s var(--ease-heavy);
	}
	.full-video-link:hover,
	.full-video-link:focus-visible {
		color: var(--bone);
	}
	.full-video-link:hover::after,
	.full-video-link:focus-visible::after {
		transform: scaleX(1);
	}
	@media (prefers-reduced-motion: reduce) {
		.full-video-link::after {
			transition: none;
		}
	}
	:global(html.motion-still) .full-video-link::after {
		transition: none !important;
	}
	.clip-intro {
		margin: 0 0 20px;

		opacity: 0;
		transition: opacity 0.9s var(--ease-settle);
	}
	.clip-intro:global(.is-visible) {
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.clip-intro {
			opacity: 1;
			transition: none;
		}
	}
	:global(html.motion-still) .clip-intro {
		opacity: 1 !important;
		transition: none !important;
	}
	.clip-intro video {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 8px;
		background: var(--stage-deep);
	}

	/* Timeline variant's intro clip: a tall scroll track with the video
	   itself pinned partway down it, so it briefly "locks" as the horizon
	   for the chronology that follows, then fades in as it's approached. */
	.clip-intro.clip-intro-pinned {
		height: 130vh;
		margin: 0 0 48px;
		opacity: 1;
		transition: none;
	}
	.clip-intro.clip-intro-pinned video {
		position: sticky;
		top: 70px;
		height: 62vh;
		aspect-ratio: auto;
	}
	@supports (animation-timeline: view()) {
		.clip-intro.clip-intro-pinned video {
			opacity: 0;
			animation: clip-intro-horizon linear both;
			animation-timeline: view();
			animation-range: entry 0% entry 55%;
		}
	}
	@keyframes clip-intro-horizon {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.clip-intro.clip-intro-pinned video {
			position: static;
			height: auto;
			aspect-ratio: 16 / 9;
			animation: none;
			opacity: 1;
		}
	}
	:global(html.motion-still) .clip-intro.clip-intro-pinned video {
		position: static !important;
		height: auto !important;
		aspect-ratio: 16 / 9 !important;
		animation: none !important;
		opacity: 1 !important;
	}

	/* A pull quote threaded mid-grid (chapter 2's Projects timeline) — a
	   deliberate contrast to PullQuote.svelte's own left-border-grows/slides-
	   in-from-the-side treatment: this one is centred, spans the full row,
	   and settles in with a plain scale+fade rather than a directional move,
	   so it reads as a pause in the timeline rather than more of the same
	   left-aligned prose. */
	.clip-quote {
		grid-column: 1 / -1;
		margin: 12px 0;
		padding: 36px 24px;
		text-align: center;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);

		opacity: 0;
		transform: scale(0.94);
		transition:
			opacity 0.9s var(--ease-settle),
			transform 0.9s var(--ease-settle);
	}
	.clip-quote:global(.is-visible) {
		opacity: 1;
		transform: scale(1);
	}
	.clip-quote p {
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: clamp(1.3rem, 3vw, 1.8rem);
		line-height: 1.4;
		color: var(--bone);
		max-width: 56ch;
		margin: 0 auto 12px;
	}
	.clip-quote cite {
		font-family: var(--mono);
		font-style: normal;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
	}
	@media (prefers-reduced-motion: reduce) {
		.clip-quote {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .clip-quote {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	.clip-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
	}

	.clip-card {
		margin: 0;

		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s var(--ease-settle) var(--delay, 0ms),
			transform 0.7s var(--ease-settle) var(--delay, 0ms);
	}
	.clip-card:global(.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.clip-card {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .clip-card {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	.clip-card video {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 6px;
		background: var(--stage-deep);
		outline: 2px solid transparent;
		outline-offset: 2px;
		transition:
			transform 0.35s var(--ease-heavy),
			outline-color 0.35s var(--ease-heavy);
	}
	.clip-card video:hover,
	.clip-card video:focus-visible {
		transform: scale(1.015);
		outline-color: var(--kraft-deep);
	}
	@media (prefers-reduced-motion: reduce) {
		.clip-card video:hover,
		.clip-card video:focus-visible {
			transform: none;
		}
	}
	:global(html.motion-still) .clip-card video:hover,
	:global(html.motion-still) .clip-card video:focus-visible {
		transform: none !important;
	}
	figcaption {
		font-size: 0.88rem;
		color: var(--ash);
		margin-top: 8px;
		line-height: 1.4;
	}

	/* Diagonal variant (the 5 informational clips): alternating entrance —
	   odd cards glide up from the bottom-left, even cards from the
	   bottom-right — plus a hover spotlight that dims the rest of the row. */
	.clip-card.variant-diagonal {
		transform: translate(-30px, 30px);
	}
	.clip-card.variant-diagonal:nth-child(even) {
		transform: translate(30px, 30px);
	}
	.clip-card.variant-diagonal:global(.is-visible) {
		transform: translate(0, 0);
	}
	.variant-diagonal video {
		transition:
			transform 0.4s var(--ease-heavy),
			filter 0.4s var(--ease-heavy),
			outline-color 0.35s var(--ease-heavy);
	}
	.variant-diagonal video:hover,
	.variant-diagonal video:focus-visible {
		filter: brightness(1.1) saturate(1.05);
	}
	.clip-row:has(.variant-diagonal video:hover) .variant-diagonal video:not(:hover),
	.clip-row:has(.variant-diagonal video:focus-visible) .variant-diagonal video:not(:focus-visible) {
		filter: brightness(0.86) saturate(0.85);
	}
	@media (prefers-reduced-motion: reduce) {
		.variant-diagonal video:hover,
		.variant-diagonal video:focus-visible,
		.clip-row:has(.variant-diagonal video:hover) .variant-diagonal video:not(:hover) {
			filter: none;
		}
	}
	:global(html.motion-still) .variant-diagonal video:hover,
	:global(html.motion-still) .variant-diagonal video:focus-visible,
	:global(html.motion-still)
		.clip-row:has(.variant-diagonal video:hover)
		.variant-diagonal
		video:not(:hover) {
		filter: none !important;
	}

	/* Timeline variant (the 10 Projetos clips): a chronological cascade —
	   cards rock in from alternating sides, then dim as they scroll past,
	   keeping focus on whichever row is currently "current". Falls back to
	   the plain one-shot reveal in browsers without view() timelines. */
	.clip-card.variant-timeline:nth-child(odd) {
		transform: translateY(26px) rotate(-1.6deg);
	}
	.clip-card.variant-timeline:nth-child(even) {
		transform: translateY(26px) rotate(1.6deg);
	}
	.clip-card.variant-timeline:global(.is-visible) {
		transform: translateY(0) rotate(0deg);
	}
	@supports (animation-timeline: view()) {
		.clip-card.variant-timeline {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.clip-card.variant-timeline:nth-child(odd) {
			animation: cascade-left linear both;
			animation-timeline: view();
			animation-range: entry 0% exit 95%;
		}
		.clip-card.variant-timeline:nth-child(even) {
			animation: cascade-right linear both;
			animation-timeline: view();
			animation-range: entry 0% exit 95%;
		}
	}
	@keyframes cascade-left {
		0% {
			opacity: 0;
			transform: translateY(26px) rotate(-1.6deg);
		}
		18% {
			opacity: 1;
			transform: translateY(0) rotate(0deg);
		}
		82% {
			opacity: 1;
		}
		100% {
			opacity: 0.4;
		}
	}
	@keyframes cascade-right {
		0% {
			opacity: 0;
			transform: translateY(26px) rotate(1.6deg);
		}
		18% {
			opacity: 1;
			transform: translateY(0) rotate(0deg);
		}
		82% {
			opacity: 1;
		}
		100% {
			opacity: 0.4;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.clip-card.variant-timeline {
			animation: none !important;
			opacity: 1;
			transform: none;
		}
	}
	:global(html.motion-still) .clip-card.variant-timeline {
		animation: none !important;
		opacity: 1 !important;
		transform: none !important;
	}

	/* Intimate variant (Telmo's Story): the two clips expand from their own
	   centre on a slow, heavily-dampened ease, rather than sliding in. */
	.clip-card.variant-intimate {
		transform: scale(0.82);
		transition:
			opacity 1.6s var(--ease-heavy) var(--delay, 0ms),
			transform 1.6s var(--ease-heavy) var(--delay, 0ms);
	}
	.clip-card.variant-intimate:global(.is-visible) {
		transform: scale(1);
	}
</style>
