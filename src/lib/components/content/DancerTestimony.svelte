<!--
  Several dancers speaking in their own words, given a block of its own
  instead of sitting in the generic clip-group grid beside director/academic
  material. Video on one side; on the other, the lines worth stopping at —
  each one cues the film to the second it's said, and the line currently
  playing is marked as the film runs. Stacks to one column under 720px.
-->
<script lang="ts">
	import type { DancerTestimony } from '$lib/content/schema';
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/i18n';
	import VideoCard from '$lib/components/media/VideoCard.svelte';

	let { testimony }: { testimony: DancerTestimony } = $props();

	let videoEl = $state<HTMLVideoElement>();
	let currentTime = $state(0);

	$effect(() => {
		const el = videoEl;
		if (!el) return;
		const onTime = () => (currentTime = el.currentTime);
		el.addEventListener('timeupdate', onTime);
		el.addEventListener('seeked', onTime);
		return () => {
			el.removeEventListener('timeupdate', onTime);
			el.removeEventListener('seeked', onTime);
		};
	});

	// the last line whose start time has passed; nothing is marked before the
	// first line begins
	const activeIndex = $derived(testimony.moments.findLastIndex((m) => currentTime >= m.time));

	function mmss(seconds: number) {
		const m = Math.floor(seconds / 60);
		const s = Math.floor(seconds % 60);
		return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
	}

	function cue(time: number) {
		if (!videoEl) return;
		videoEl.currentTime = time;
		videoEl.play().catch(() => {});
	}
</script>

<section class="testimony" use:reveal aria-label={testimony.subtitle}>
	<div class="testimony-video-col">
		<VideoCard
			bind:videoEl
			subtitle={testimony.subtitle}
			framing={testimony.framing}
			src={testimony.video.src}
			poster={testimony.video.poster}
			alt={testimony.video.alt}
			transcript={testimony.transcript}
		/>
		<p class="credit">{testimony.credit}</p>
	</div>

	<div class="testimony-moments">
		<ol class="moment-list" aria-label={$t('testimony.list-aria')}>
			{#each testimony.moments as moment, i (moment.time)}
				<li>
					<button
						type="button"
						class="moment"
						class:active={i === activeIndex}
						aria-current={i === activeIndex ? 'true' : undefined}
						onclick={() => cue(moment.time)}
					>
						<span class="moment-time">{mmss(moment.time)}</span>
						<span class="moment-text">{moment.text}</span>
					</button>
				</li>
			{/each}
		</ol>
		<p class="moment-note">{$t('testimony.subtitle-note')}</p>
	</div>
</section>

<style>
	.testimony {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 32px;
		align-items: start;

		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s var(--ease-settle),
			transform 0.7s var(--ease-settle);
	}
	.testimony:global(.is-visible) {
		opacity: 1;
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.testimony {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .testimony {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	.testimony-video-col {
		margin: 0;
	}
	.credit {
		margin: 10px 0 0;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ash-dim);
	}

	.moment-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.moment {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: 0;
		border-left: 2px solid var(--kraft-deep);
		padding: 10px 12px 10px 18px;
		cursor: pointer;
		color: inherit;
		font: inherit;
		opacity: 0.62;
		transition:
			opacity 0.3s ease,
			background 0.3s ease,
			border-color 0.3s ease;
	}
	.moment:hover,
	.moment:focus-visible {
		opacity: 1;
		background: rgba(255, 255, 255, 0.03);
	}
	.moment.active {
		opacity: 1;
		border-left-color: var(--kraft);
		background: rgba(255, 181, 77, 0.06);
	}
	.moment-time {
		display: block;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.1em;
		color: var(--kraft);
		margin: 0 0 4px;
	}
	.moment-text {
		display: block;
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: 1.15rem;
		line-height: 1.4;
		color: var(--bone);
	}
	.moment-note {
		margin: 14px 0 0 20px;
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--ash-dim);
	}

	@media (prefers-reduced-motion: reduce) {
		.moment {
			transition: none;
		}
	}
	:global(html.motion-still) .moment {
		transition: none !important;
	}

	@media (max-width: 720px) {
		.testimony {
			grid-template-columns: 1fr;
		}
	}
</style>
