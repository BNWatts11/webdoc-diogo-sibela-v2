<!--
  A scroll-scrubbed reel. The section is tall (350vh) with a viewport-height
  sticky frame inside it; as the visitor scrolls down through that height,
  the fraction scrolled maps directly to `video.currentTime` on a paused
  <video> (never `.play()` — the scrub *is* the playback, driven only by the
  visitor's own scroll, so there's nothing here for prefers-reduced-motion to
  switch off). Floating hotspots sit at fixed points along that timeline;
  opening one freezes the scrub (the scroll handler no-ops while a popup is
  open) and either plays a dedicated clip or, for the audio-only interview,
  links out to it — there's no local file for that one, just the RTP page.
  The section's own "Work within the Company" heading lives in the parent
  page now, alongside "Behind the Gestures" above it.
-->
<script lang="ts">
	import { t } from '$lib/i18n';
	import { language } from '$lib/stores/language';

	interface Hotspot {
		position: number; // 0..1 fraction along the reel
		label: string;
		caption: string;
		clip?: { src: string; poster: string };
		/** used when there's no local file to embed — a link out instead */
		externalUrl?: string;
		externalLabel?: string;
	}

	const hotspotsEn: Hotspot[] = [
		{
			position: 0.32,
			label: 'Tânia, on this gesture',
			caption: 'Tânia directing the rehearsal for the show.',
			clip: {
				src: '/videos/tania-carvalho/tania-rehearsal-clip.mp4',
				poster: '/photos/tania-carvalho/posters/tania-rehearsal-clip.jpg'
			}
		},
		{
			position: 0.68,
			label: 'Tânia, on the premiere',
			caption:
				"Tânia on the show's premiere at the 14th NANT Dance Festival — New Age, New Time — at the Viriato Theater, Viseu.",
			externalUrl:
				'https://madeira.rtp.pt/cultura/sibela-e-digoo-sobe-ao-palco-hoje-em-viseu-audio/',
			externalLabel: 'Listen to the interview'
		}
	];
	const hotspotsPt: Partial<Pick<Hotspot, 'label' | 'caption' | 'externalLabel'>>[] = [
		{
			label: 'Tânia, sobre este gesto',
			caption: 'Tânia a dirigir o ensaio para o espetáculo.'
		},
		{
			label: 'Tânia, sobre a estreia',
			caption:
				'Tânia sobre a estreia do espetáculo no 14.º Festival de Dança NANT — New Age, New Time — no Teatro Viriato, Viseu.',
			externalLabel: 'Ouvir a entrevista'
		}
	];
	const hotspots = $derived(
		$language === 'pt' ? hotspotsEn.map((h, i) => ({ ...h, ...hotspotsPt[i] })) : hotspotsEn
	);

	const SCRUB_VH = 350;

	let wrapEl = $state<HTMLElement>();
	let videoEl = $state<HTMLVideoElement>();
	let progress = $state(0);
	let activeHotspot = $state<number | null>(null);
	let popupCloseEl = $state<HTMLButtonElement>();
	let lastFocused: HTMLElement | null = null;

	let ticking = false;
	function onScroll() {
		if (ticking || activeHotspot !== null) return;
		ticking = true;
		requestAnimationFrame(updateProgress);
	}
	function updateProgress() {
		ticking = false;
		if (!wrapEl) return;
		const rect = wrapEl.getBoundingClientRect();
		const total = rect.height - window.innerHeight;
		const raw = total > 0 ? -rect.top / total : 0;
		progress = Math.min(1, Math.max(0, raw));
		// Read `duration` itself rather than tracking a separate "ready" flag —
		// on a fast local file the native loadedmetadata event can fire before
		// this component's own listener is attached, so a flag set only by that
		// listener can permanently miss it. `duration` is NaN until metadata is
		// actually in, so it's a safe, race-free gate on its own.
		if (videoEl && videoEl.duration) {
			videoEl.currentTime = progress * videoEl.duration;
		}
	}

	function onVideoMeta() {
		// Belt-and-braces: if metadata genuinely does arrive after the visitor
		// has already scrolled, sync immediately rather than waiting for the
		// next scroll event.
		updateProgress();
	}

	function openHotspot(i: number) {
		lastFocused = document.activeElement as HTMLElement | null;
		activeHotspot = i;
	}
	function closeHotspot() {
		activeHotspot = null;
		lastFocused?.focus();
	}
	function onPopupKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeHotspot();
	}

	$effect(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		onScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	// Move focus into the popup the moment it opens, so keyboard users land
	// somewhere sensible instead of on a document that silently changed under
	// them; closeHotspot() already restores focus to the hotspot on the way out.
	$effect(() => {
		if (activeHotspot !== null) popupCloseEl?.focus();
	});
</script>

<section class="reel-wrap" bind:this={wrapEl} style="height: {SCRUB_VH}vh">
	<div class="reel-sticky">
		<div class="reel-frame">
			<video
				bind:this={videoEl}
				src="/videos/tania-carvalho/sibela-chair-scrub.mp4"
				poster="/photos/tania-carvalho/posters/sibela-chair-scrub.jpg"
				muted
				playsinline
				preload="auto"
				aria-label="Isabel performing the geometric movements of Sibela, scrubbed by scroll position"
				onloadedmetadata={onVideoMeta}
			></video>
			<div class="reel-scrim" aria-hidden="true"></div>

			{#each hotspots as spot, i (i)}
				<button
					type="button"
					class="hotspot"
					style="left: {spot.position * 100}%"
					onclick={() => openHotspot(i)}
					aria-label={spot.label}
				>
					<span class="hotspot-ring" aria-hidden="true"></span>
					<span class="hotspot-dot" aria-hidden="true"></span>
				</button>
			{/each}

			<div class="reel-progress" aria-hidden="true">
				<div class="reel-progress-fill" style="width: {progress * 100}%"></div>
				{#each hotspots as spot, i (i)}
					<span class="reel-progress-mark" style="left: {spot.position * 100}%"></span>
				{/each}
			</div>
			<p class="reel-hint">{$t('tania.reel-hint')}</p>
		</div>
	</div>
</section>

{#if activeHotspot !== null}
	{@const spot = hotspots[activeHotspot]}
	<div
		class="popup-overlay"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) closeHotspot();
		}}
		onkeydown={onPopupKeydown}
	>
		<div class="popup-panel" role="dialog" aria-modal="true" aria-label={spot.label} tabindex="-1">
			<button
				bind:this={popupCloseEl}
				type="button"
				class="popup-close"
				onclick={closeHotspot}
				aria-label={$t('tania.popup-close-aria')}
			>
				✕
			</button>
			{#if spot.clip}
				<video src={spot.clip.src} poster={spot.clip.poster} controls autoplay playsinline>
					<track kind="captions" />
				</video>
			{:else if spot.externalUrl}
				<div class="popup-audio">
					<svg class="popup-waveform" viewBox="0 0 100 60" aria-hidden="true">
						<rect x="4" y="24" width="6" height="12" />
						<rect x="16" y="16" width="6" height="28" />
						<rect x="28" y="6" width="6" height="48" />
						<rect x="40" y="20" width="6" height="20" />
						<rect x="52" y="10" width="6" height="40" />
						<rect x="64" y="22" width="6" height="16" />
						<rect x="76" y="4" width="6" height="52" />
						<rect x="88" y="18" width="6" height="24" />
					</svg>
				</div>
			{/if}
			<p class="popup-caption">{spot.caption}</p>
			{#if spot.externalUrl}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={spot.externalUrl} target="_blank" rel="noopener noreferrer" class="popup-link">
					<span>{spot.externalLabel ?? $t('tania.listen-interview')}</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	</div>
{/if}

<style>
	.reel-wrap {
		position: relative;
		margin-top: 80px;
	}
	.reel-sticky {
		position: sticky;
		top: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 28px;
	}
	.reel-frame {
		position: relative;
		width: 100%;
		max-width: 1140px;
		margin: 0 auto;
		aspect-ratio: 16 / 9;
		max-height: 74vh;
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
	}
	.reel-frame video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.reel-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(16, 12, 9, 0.6) 0%, transparent 30%);
		pointer-events: none;
	}
	.reel-hint {
		position: absolute;
		top: 18px;
		right: 22px;
		margin: 0;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
		opacity: 0.85;
	}

	.hotspot {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 36px;
		height: 36px;
		border: 0;
		background: none;
		cursor: pointer;
		padding: 0;
	}
	.hotspot-dot {
		position: absolute;
		inset: 12px;
		border-radius: 50%;
		background: var(--moment-gold, #e3b657);
	}
	.hotspot-ring {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1px solid var(--moment-gold, #e3b657);
		opacity: 0.7;
		animation: hotspot-pulse 2.2s ease-out infinite;
	}
	.hotspot:hover .hotspot-ring,
	.hotspot:focus-visible .hotspot-ring {
		animation-play-state: paused;
		opacity: 1;
		inset: -4px;
	}
	@keyframes hotspot-pulse {
		0% {
			transform: scale(0.7);
			opacity: 0.8;
		}
		100% {
			transform: scale(1.6);
			opacity: 0;
		}
	}

	.reel-progress {
		position: absolute;
		left: 22px;
		right: 22px;
		bottom: 18px;
		height: 2px;
		background: var(--line-strong);
		border-radius: 2px;
	}
	.reel-progress-fill {
		height: 100%;
		background: var(--moment-gold, #e3b657);
		border-radius: 2px;
	}
	.reel-progress-mark {
		position: absolute;
		top: 50%;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--bone);
		transform: translate(-50%, -50%);
	}

	@media (prefers-reduced-motion: reduce) {
		.hotspot-ring {
			animation: none;
		}
	}
	:global(html.motion-still) .hotspot-ring {
		animation: none !important;
	}

	/* ===== hotspot popup ===== */
	.popup-overlay {
		position: fixed;
		inset: 0;
		z-index: 60;
		background: rgba(8, 6, 4, 0.82);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
	}
	.popup-panel {
		position: relative;
		width: 100%;
		max-width: 720px;
		background: var(--stage-deep);
		border: 1px solid var(--line-strong);
		border-radius: 8px;
		padding: 20px;
	}
	.popup-panel video {
		width: 100%;
		border-radius: 4px;
		display: block;
		background: #000;
	}
	.popup-close {
		position: absolute;
		top: -14px;
		right: -14px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid var(--line-strong);
		background: var(--ink);
		color: var(--bone);
		cursor: pointer;
		font-size: 14px;
	}
	.popup-close:hover,
	.popup-close:focus-visible {
		border-color: var(--kraft);
		color: var(--kraft);
	}
	.popup-caption {
		margin: 14px 0 0;
		color: var(--ash);
		font-size: 0.95rem;
	}
	.popup-audio {
		background: var(--ink);
		border-radius: 4px;
		padding: 32px 0;
	}
	.popup-waveform {
		width: 40%;
		height: 90px;
		margin: 0 auto;
		display: block;
		fill: var(--moment-gold, #e3b657);
	}
	.popup-link {
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
	.popup-link:hover,
	.popup-link:focus-visible {
		color: var(--bone);
	}
</style>
