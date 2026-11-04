<!--
  A compact row of short, self-contained video highlights — built for the
  advisors' second note: favour small original synthesis clips over long
  lists of "watch the full video" links. Each pill is a real embedded
  excerpt with its own accessible label, not a thumbnail that just forwards
  to an external site. Scrolls horizontally as a single row instead of
  wrapping into a large grid, to read as "highlights", not another full
  clip-group.
-->
<script lang="ts">
	import type { ChapterMedia } from '$lib/content/schema';
	import { t } from '$lib/i18n';

	let {
		heading,
		intro,
		items,
		externalUrl,
		externalLabel
	}: {
		heading?: string;
		/** 1-2 sentences framing why these particular highlights are here */
		intro?: string;
		items: { title: string; video: ChapterMedia }[];
		/** the full-length source, offered once for the whole set rather than
		 * repeated per pill */
		externalUrl?: string;
		externalLabel?: string;
	} = $props();
</script>

<section class="synthesis-grid">
	{#if heading || intro}
		<header class="synthesis-head">
			{#if heading}<h3>{heading}</h3>{/if}
			{#if intro}<p class="synthesis-intro">{intro}</p>{/if}
		</header>
	{/if}

	<div class="pill-row">
		{#each items as item (item.video.src)}
			<figure class="pill">
				<video
					src={item.video.src}
					poster={item.video.poster}
					controls
					preload="metadata"
					aria-label={item.video.alt}
				>
					<track kind="captions" />
				</video>
				<figcaption>{item.title}</figcaption>
			</figure>
		{/each}
	</div>

	{#if externalUrl}
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a href={externalUrl} target="_blank" rel="noopener noreferrer" class="synthesis-link">
			{externalLabel ?? $t('label.watch-full-video')} <span aria-hidden="true">↗</span>
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{/if}
</section>

<style>
	.synthesis-grid {
		margin: 0;
	}
	.synthesis-head {
		margin: 0 0 16px;
	}
	.synthesis-head h3 {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		margin: 0 0 8px;
	}
	.synthesis-intro {
		font-size: 0.96rem;
		line-height: 1.55;
		color: var(--ash);
		max-width: 60ch;
		margin: 0;
	}

	.pill-row {
		display: flex;
		gap: 16px;
		overflow-x: auto;
		padding-bottom: 6px;
		scroll-snap-type: x proximity;
		-webkit-overflow-scrolling: touch;
	}
	.pill {
		flex: 0 0 auto;
		width: min(72vw, 260px);
		margin: 0;
		scroll-snap-align: start;
	}
	.pill video {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 10px;
		background: var(--stage-deep);
		border: 1px solid var(--line);
	}
	.pill figcaption {
		font-size: 0.86rem;
		color: var(--ash);
		margin-top: 8px;
		line-height: 1.4;
	}

	.synthesis-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-top: 16px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--kraft);
		text-decoration: none;
		border-bottom: 1px solid var(--kraft-deep);
		padding-bottom: 2px;
		transition: color 0.3s ease;
	}
	.synthesis-link:hover,
	.synthesis-link:focus-visible {
		color: var(--bone);
	}
</style>
