<!--
  "Landmark Moments" — an invisibility-themed click-to-reveal timeline. Each
  moment starts as a title only; clicking (or activating via keyboard) its
  title reveals a star-masked clip and its bold summary, with a synthesised
  "magic reveal" chime (audio.ts) firing once per reveal. A native <button>
  click handles both mouse and keyboard activation identically.
-->
<script lang="ts">
	import type { LandmarkMoment } from '$lib/content/schema';
	import { audio } from '$lib/stores/audio';
	import { t } from '$lib/i18n';

	let { heading, moments }: { heading: string; moments: LandmarkMoment[] } = $props();

	let activeIndex = $state<number | null>(null);
	let videoEls: (HTMLVideoElement | undefined)[] = $state([]);

	function toggle(i: number) {
		const prev = activeIndex;
		if (prev === i) {
			activeIndex = null;
			videoEls[i]?.pause();
			return;
		}
		activeIndex = i;
		audio.playReveal();
		if (prev !== null) videoEls[prev]?.pause();
		videoEls[i]?.play().catch(() => {});
	}
</script>

<section class="moments">
	<h2>{heading}</h2>
	<ol class="moments-list">
		{#each moments as moment, i (i)}
			<li class="moment" class:active={activeIndex === i}>
				<button
					type="button"
					class="moment-title"
					onclick={() => toggle(i)}
					aria-expanded={activeIndex === i}
				>
					<span class="moment-title-text">{moment.title}</span>
					<span class="moment-title-chevron" aria-hidden="true"
						>{activeIndex === i ? '▲' : '▼'}</span
					>
				</button>
				<div class="moment-reveal" inert={activeIndex !== i}>
					<div class="moment-star">
						{#if moment.isAudio && (!moment.media || moment.media.alt.startsWith('[PLACEHOLDER'))}
							<svg class="moment-waveform" viewBox="0 0 100 60" aria-hidden="true">
								<rect x="4" y="24" width="6" height="12" />
								<rect x="16" y="16" width="6" height="28" />
								<rect x="28" y="6" width="6" height="48" />
								<rect x="40" y="20" width="6" height="20" />
								<rect x="52" y="10" width="6" height="40" />
								<rect x="64" y="22" width="6" height="16" />
								<rect x="76" y="4" width="6" height="52" />
								<rect x="88" y="18" width="6" height="24" />
							</svg>
						{:else if moment.media?.type === 'video'}
							<video
								bind:this={videoEls[i]}
								src={moment.media.src}
								poster={moment.media.poster}
								aria-label={moment.media.alt}
								muted
								loop
								playsinline
								preload="none"
							></video>
						{:else if moment.media}
							<img src={moment.media.src} alt={moment.media.alt} />
						{/if}
					</div>
					{#if moment.media?.alt.startsWith('[PLACEHOLDER')}
						<p class="moment-placeholder-note">{moment.media.alt}</p>
					{/if}
					<p class="moment-summary"><strong>{moment.summary}</strong></p>
					{#if moment.externalUrl}
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							href={moment.externalUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="moment-link"
						>
							{moment.externalLabel ?? $t('label.watch-full-video')}
							<span aria-hidden="true">↗</span>
						</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.moments {
		--moment-gold: #e3b657;
		margin: 56px 0;
		border-top: 1px solid var(--line);
		padding-top: 40px;
	}
	.moments h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 28px;
		color: var(--bone);
	}
	.moments-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.moment {
		border-top: 1px solid var(--line);
		padding: 32px 0;
	}
	.moment:first-child {
		border-top: none;
		padding-top: 0;
	}
	.moment-title {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
		width: 100%;
		text-align: left;
		background: none;
		border: 0;
		border-bottom: 1px solid var(--moment-gold);
		padding: 0 0 10px;
		cursor: pointer;
		font-family: var(--serif);
		font-weight: 700;
		font-size: 1.15rem;
		color: var(--moment-gold);
		transition:
			color 0.3s ease,
			border-color 0.3s ease;
	}
	.moment-title:hover,
	.moment-title:focus-visible {
		color: var(--bone);
		border-color: var(--line-strong);
	}
	.moment.active .moment-title {
		color: var(--bone);
		border-color: var(--line-strong);
	}
	.moment-title-chevron {
		flex: none;
		font-size: 0.7em;
		transition: transform 0.3s ease;
	}

	.moment-reveal {
		margin-top: 0;
		max-height: 0;
		overflow: hidden;
		transition: margin-top 0.5s var(--ease-settle);
	}
	.moment.active .moment-reveal {
		margin-top: 20px;
		max-height: none;
	}

	.moment-star {
		width: clamp(160px, 32vw, 240px);
		aspect-ratio: 1;
		clip-path: polygon(
			50% 0%,
			61% 35%,
			98% 35%,
			68% 57%,
			79% 91%,
			50% 70%,
			21% 91%,
			32% 57%,
			2% 35%,
			39% 35%
		);
		background: var(--stage-deep);
		opacity: 0;
		transform: scale(0.7);
		transition:
			opacity 0.5s var(--ease-settle),
			transform 0.5s var(--ease-settle);
	}
	.moment.active .moment-star {
		opacity: 1;
		transform: scale(1);
	}
	.moment-star video,
	.moment-star img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.moment-waveform {
		width: 60%;
		height: 60%;
		margin: 20% auto 0;
		display: block;
		fill: var(--kraft);
	}

	.moment-placeholder-note {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--ash-dim);
		letter-spacing: 0.02em;
		max-width: 42ch;
		margin: 14px 0 0;
	}
	.moment-summary {
		font-size: 0.98rem;
		color: var(--ash);
		max-width: 48ch;
		margin: 14px 0 0;
		opacity: 0;
		transition: opacity 0.5s var(--ease-settle) 0.1s;
	}
	.moment.active .moment-summary {
		opacity: 1;
	}
	.moment-summary strong {
		color: var(--bone);
		font-weight: 600;
	}
	.moment-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-top: 14px;
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
	.moment-link:hover,
	.moment-link:focus-visible {
		color: var(--bone);
	}

	@media (prefers-reduced-motion: reduce) {
		.moment-reveal,
		.moment-star,
		.moment-summary {
			transition: none;
		}
	}
	:global(html.motion-still) .moment-reveal,
	:global(html.motion-still) .moment-star,
	:global(html.motion-still) .moment-summary {
		transition: none !important;
	}
</style>
