<!--
  The standardized video container the advisors asked for: every instance
  carries its own intro header (a short subtitle plus a 1-2 sentence framing
  line explaining what the clip is and why it's here) instead of a bare
  <video> dropped into the page, an accessible label, and — only when the
  clip actually has one — a transcript toggle. Controls that would be
  disabled are left out rather than shown dead. Deliberately not a bordered
  "section" of its own: it nests inside whatever layout calls it (a grid
  column, a plain page section, another card), so it brings no outer
  decoration, just the header + player + optional controls.
-->
<script lang="ts">
	import { t } from '$lib/i18n';

	let {
		subtitle,
		framing,
		src,
		poster,
		alt,
		transcript,
		externalUrl,
		externalLabel,
		videoEl = $bindable()
	}: {
		/** short descriptive subtitle, e.g. "Dancer Testimony" */
		subtitle: string;
		/** 1-2 sentences: what this footage is and why it's placed here */
		framing: string;
		src: string;
		poster?: string;
		/** accessible label for the <video> itself */
		alt: string;
		/** full transcript text; the toggle only appears when this is given */
		transcript?: string;
		/** link to the full-length source, if this clip is an excerpt */
		externalUrl?: string;
		externalLabel?: string;
		/** the underlying <video>, for parents that need to cue/seek it */
		videoEl?: HTMLVideoElement;
	} = $props();

	const uid = `video-card-${Math.random().toString(36).slice(2, 9)}`;

	let transcriptOpen = $state(false);
</script>

<figure class="video-card">
	<header class="video-card-intro">
		<span class="subtitle">{subtitle}</span>
		<p class="framing">{framing}</p>
	</header>

	<div class="video-card-media">
		<video bind:this={videoEl} {src} {poster} controls preload="metadata" aria-label={alt}>
			<track kind="captions" />
		</video>

		{#if transcript || externalUrl}
			<div class="video-card-controls">
				{#if transcript}
					<button
						type="button"
						class="toggle-btn"
						aria-expanded={transcriptOpen}
						aria-controls="{uid}-transcript"
						aria-label={transcriptOpen
							? $t('video.hide-transcript-aria')
							: $t('video.show-transcript-aria')}
						onclick={() => (transcriptOpen = !transcriptOpen)}
					>
						{$t('video.transcript-label')}
					</button>
				{/if}
				{#if externalUrl}
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<a href={externalUrl} target="_blank" rel="noopener noreferrer" class="full-video-link">
						{externalLabel ?? $t('label.watch-full-video')} <span aria-hidden="true">↗</span>
					</a>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{/if}
			</div>
		{/if}

		{#if transcript && transcriptOpen}
			<div class="video-card-transcript" id="{uid}-transcript">
				<p>{transcript}</p>
			</div>
		{/if}
	</div>
</figure>

<style>
	.video-card {
		margin: 0;
	}
	.video-card-intro {
		margin: 0 0 12px;
	}
	.subtitle {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		margin: 0 0 6px;
	}
	.framing {
		font-size: 0.96rem;
		line-height: 1.55;
		color: var(--ash);
		max-width: 60ch;
		margin: 0;
	}

	.video-card-media video {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 8px;
		background: var(--stage-deep);
	}

	.video-card-controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin-top: 10px;
	}
	.toggle-btn {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
		background: none;
		border: 1px solid var(--line);
		border-radius: 99px;
		padding: 5px 12px;
		cursor: pointer;
		transition:
			border-color 0.25s ease,
			color 0.25s ease;
	}
	.toggle-btn:hover,
	.toggle-btn:focus-visible {
		border-color: var(--kraft-deep);
		color: var(--bone);
	}
	.toggle-btn[aria-expanded='true'] {
		border-color: var(--kraft-deep);
		color: var(--kraft);
	}

	.full-video-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--kraft);
		text-decoration: none;
		border-bottom: 1px solid var(--kraft-deep);
		padding-bottom: 2px;
		margin-left: auto;
		transition: color 0.3s ease;
	}
	.full-video-link:hover,
	.full-video-link:focus-visible {
		color: var(--bone);
	}

	.video-card-transcript {
		margin-top: 12px;
		padding: 16px 18px;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: var(--penumbra);
	}
	.video-card-transcript p {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--ash);
		max-width: 62ch;
	}
</style>
