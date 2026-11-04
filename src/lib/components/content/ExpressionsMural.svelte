<!--
  "Who is Tânia Carvalho?" — a minimalist 4-keyword panel. Clicking a keyword
  swaps the section's background to that facet's clip and starts it playing
  right away (unmuted, with native controls so the visitor can pause/adjust
  volume afterwards) — a direct click is a real user gesture, so browsers
  allow the unmuted autoplay here. A synthesised "reveal" chime marks the
  switch (never re-fires for the same still-active keyword, so it can't
  stack). No caption text sits over the video itself — the one-sentence
  description lives in the video's own aria-label instead; the only visible
  copy is below the frame, clear of it: a short phrase on the left, the
  "watch the full video" link on the right.
-->
<script lang="ts">
	import { audio } from '$lib/stores/audio';
	import { t } from '$lib/i18n';
	import { language } from '$lib/stores/language';

	interface Panel {
		key: string;
		label: string;
		/** used only as the video's own aria-label — never printed on screen */
		summary: string;
		/** the short phrase shown to the left of the "watch the full video" link */
		phrase: string;
		video: { src: string; poster: string };
		/** link to the full-length source video */
		externalUrl: string;
		/** defaults to "Watch the full video" when absent */
		externalLabel?: string;
	}

	const panelsEn: Panel[] = [
		{
			key: 'coreografa',
			label: 'The Choreographer',
			summary:
				'Her choreography favours dancers moving out of sync with one another over unison, building meaning through layered movement rather than a spelled-out story.',
			phrase: 'Choreography as a vehicle for interpretation',
			video: {
				src: '/videos/tania-carvalho/tania-choreographer-solo.mp4',
				poster: '/photos/tania-carvalho/posters/tania-choreographer-solo.jpg'
			},
			externalUrl: 'https://www.youtube.com/watch?v=MHRmRPCA1-U',
			externalLabel: 'Watch the full video'
		},
		{
			key: 'musicista',
			label: 'The Musician',
			summary:
				'Music is also my great passion. I create music in much the same way that I create dance routines and structures.',
			phrase: 'Her deep love of music has never left her',
			video: {
				src: '/videos/tania-carvalho/tania-musician-interview.mp4',
				poster: '/photos/tania-carvalho/posters/tania-musician-interview.jpg'
			},
			externalUrl: 'https://www.youtube.com/watch?v=CaZ-VTQVoXs',
			externalLabel: 'Watch the full video'
		},
		{
			key: 'desenho',
			label: 'The Drawing',
			summary:
				'Before training in dance, she studied art and design — a visual eye that still shapes how she builds light, space and objects into a piece.',
			phrase:
				'She has always been a creative person, getting started in the visual arts at a very young age.',
			video: {
				src: '/videos/tania-carvalho/tania-drawing-interview.mp4',
				poster: '/photos/tania-carvalho/posters/tania-drawing-interview.jpg'
			},
			externalUrl: 'https://www.youtube.com/watch?v=_CcTy0kNd1o',
			externalLabel: 'Watch the full video'
		},
		{
			key: 'identidade',
			label: 'The Identity',
			summary:
				'She moves between independent pieces and major companies like the Lyon Opera Ballet without changing method — the same eye for asynchrony and space either way.',
			phrase: 'Its identity encompasses a wide range of performing arts',
			video: {
				src: '/videos/tania-carvalho/tania-identity-performance.mp4',
				poster: '/photos/tania-carvalho/posters/tania-identity-performance.jpg'
			},
			externalUrl: 'https://www.youtube.com/watch?v=ZkDYN_Z-FMs',
			externalLabel: 'Watch the full video'
		}
	];

	/** PT overlay keyed by panel.key — label/phrase are visible text,
	 * externalLabel is the "watch the full video" pill; summary stays English
	 * in both languages since it's screen-reader-only video description. */
	const panelsPt: Record<string, Partial<Pick<Panel, 'label' | 'phrase' | 'externalLabel'>>> = {
		coreografa: {
			label: 'A Coreógrafa',
			phrase: 'A coreografia como veículo de interpretação',
			externalLabel: 'Ver o vídeo completo'
		},
		musicista: {
			label: 'A Musicista',
			phrase: 'O seu profundo amor pela música nunca a abandonou',
			externalLabel: 'Ver o vídeo completo'
		},
		desenho: {
			label: 'O Desenho',
			phrase: 'Sempre foi uma pessoa criativa, iniciando-se nas artes visuais desde muito nova.',
			externalLabel: 'Ver o vídeo completo'
		},
		identidade: {
			label: 'A Identidade',
			phrase: 'A sua identidade abrange um vasto leque de artes performativas',
			externalLabel: 'Ver o vídeo completo'
		}
	};
	const panels = $derived(
		$language === 'pt' ? panelsEn.map((p) => ({ ...p, ...panelsPt[p.key] })) : panelsEn
	);

	let activeIndex = $state<number | null>(null);
	let videoEls: (HTMLVideoElement | undefined)[] = $state([]);

	function select(i: number) {
		if (activeIndex === i) return;
		const prev = activeIndex;
		activeIndex = i;
		audio.playReveal();
		if (prev !== null) videoEls[prev]?.pause();
		videoEls[i]?.play().catch(() => {});
	}
</script>

<section class="mural">
	<h2>{$t('tania.mural-h2')}</h2>
	<p class="mural-lede">{$t('tania.mural-lede')}</p>

	<div class="mural-stage">
		{#each panels as panel, i (panel.key)}
			<div class="mural-bg" class:active={activeIndex === i} aria-hidden={activeIndex !== i}>
				<video
					bind:this={videoEls[i]}
					src={panel.video.src}
					poster={panel.video.poster}
					aria-label={panel.summary}
					controls
					playsinline
					preload="metadata"
				>
					<track kind="captions" />
				</video>
			</div>
		{/each}
	</div>

	{#key activeIndex}
		<div class="mural-info">
			{#if activeIndex !== null}
				{@const panel = panels[activeIndex]}
				<p class="mural-phrase">{panel.phrase}</p>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={panel.externalUrl} target="_blank" rel="noopener noreferrer" class="mural-link">
					<span>{panel.externalLabel ?? $t('label.watch-full-video')}</span>
					<span class="mural-link-arrow" aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	{/key}

	<div class="mural-keys" role="group" aria-label={$t('tania.mural-group-aria')}>
		{#each panels as panel, i (panel.key)}
			<button
				type="button"
				class="mural-key"
				class:active={activeIndex === i}
				onclick={() => select(i)}
				aria-pressed={activeIndex === i}
			>
				{panel.label}
			</button>
		{/each}
	</div>
</section>

<style>
	.mural {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.mural h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 8px;
		color: var(--bone);
	}
	.mural-lede {
		color: var(--ash);
		margin: 0 0 20px;
	}
	.mural-stage {
		position: relative;
		height: min(56vh, 460px);
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
	}
	.mural-bg {
		position: absolute;
		inset: 0;
		opacity: 0;
		/* invisible does not mean unclickable — without this, whichever facet
		   sits later in the DOM silently intercepts every click/tap meant for
		   the active video's own controls underneath it, so pause/mute/volume
		   stop working the moment more than one facet has real footage. */
		pointer-events: none;
		transition: opacity 0.6s var(--ease-settle);
	}
	.mural-bg.active {
		opacity: 1;
		pointer-events: auto;
	}
	.mural-bg video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* The copy left once a facet is chosen — pinned clear of the video frame
	   instead of floating over it: a short phrase on the left, the "watch the
	   full video" link (a gold pill — deliberately reads as a call to action,
	   not a caption) pinned to the right via its own margin-left:auto, so it
	   stays right-aligned whether or not the row wraps on narrow screens.
	   Re-keyed on activeIndex so both pieces re-play their entrance each time
	   the facet changes, echoing the reveal chime and the clip swap. */
	.mural-info {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 14px 24px;
		min-height: 44px;
		margin-top: 18px;
	}
	.mural-phrase {
		margin: 0;
		color: var(--bone);
		font-size: 1.05rem;
		max-width: 46ch;
		opacity: 0;
		transform: translateY(8px);
		animation: mural-link-in 0.5s var(--ease-settle) forwards;
	}
	.mural-link {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border-radius: 999px;
		background: var(--moment-gold, #e3b657);
		color: var(--ink);
		font-family: var(--mono);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		text-decoration: none;
		opacity: 0;
		transform: translateY(8px);
		animation: mural-link-in 0.5s var(--ease-settle) forwards;
		transition:
			background 0.3s ease,
			transform 0.3s var(--ease-heavy),
			box-shadow 0.3s var(--ease-heavy);
	}
	.mural-link:hover,
	.mural-link:focus-visible {
		background: var(--bone);
		transform: translateY(-3px);
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
	}
	.mural-link-arrow {
		display: inline-block;
		transition: transform 0.3s var(--ease-heavy);
	}
	.mural-link:hover .mural-link-arrow,
	.mural-link:focus-visible .mural-link-arrow {
		transform: translate(2px, -2px);
	}
	@keyframes mural-link-in {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mural-keys {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 10px;
		margin-top: 8px;
	}
	.mural-key {
		font-family: var(--serif);
		font-weight: 700;
		font-size: 1.05rem;
		color: var(--moment-gold, #e3b657);
		background: none;
		border: 1px solid var(--line);
		border-radius: 6px;
		padding: 16px 14px;
		cursor: pointer;
		text-align: center;
		transition:
			color 0.3s ease,
			border-color 0.3s ease,
			background 0.3s ease;
	}
	.mural-key:hover,
	.mural-key:focus-visible {
		color: var(--bone);
		border-color: var(--line-strong);
	}
	.mural-key.active {
		color: var(--bone);
		border-color: var(--kraft-deep);
		background: rgba(196, 136, 90, 0.1);
	}

	@media (prefers-reduced-motion: reduce) {
		.mural-bg {
			transition: none;
		}
		.mural-link,
		.mural-phrase {
			animation: none;
			opacity: 1;
			transform: none;
		}
		.mural-link:hover,
		.mural-link:focus-visible {
			transform: none;
		}
	}
	:global(html.motion-still) .mural-bg {
		transition: none !important;
	}
	:global(html.motion-still) .mural-link,
	:global(html.motion-still) .mural-phrase {
		animation: none !important;
		opacity: 1 !important;
		transform: none !important;
	}
	:global(html.motion-still) .mural-link:hover {
		transform: none !important;
	}
</style>
