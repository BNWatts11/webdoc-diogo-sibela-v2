<!--
  "Behind the Gestures" — a circular lens tracks the pointer over a real
  studio photo (from "Doesdicon", 2016); inside the lens, a hidden video
  layer of raw footage shows through via
  `clip-path: circle(... at var(--lx) var(--ly))`, updated through CSS custom
  properties (rAF-throttled) rather than re-rendering anything, so it stays
  smooth even on modest hardware. The video only plays while the pointer is
  actually over the frame; a link below the frame, clear of it, points to the
  full source video. The section's own heading now lives in the parent page
  (it introduces this lens together with the Sibela reel below it under one
  "Work within the Company" title), so this component starts straight at the
  lede.
-->
<script lang="ts">
	import { t } from '$lib/i18n';

	let frameEl = $state<HTMLElement>();
	let videoEl = $state<HTMLVideoElement>();
	let lensX = $state(0);
	let lensY = $state(0);
	let hovering = $state(false);

	let pendingX = 0;
	let pendingY = 0;
	let rafId: number | null = null;

	function apply() {
		lensX = pendingX;
		lensY = pendingY;
		rafId = null;
	}
	function onMove(e: PointerEvent) {
		const rect = frameEl!.getBoundingClientRect();
		pendingX = e.clientX - rect.left;
		pendingY = e.clientY - rect.top;
		if (rafId === null) rafId = requestAnimationFrame(apply);
	}
	function onEnter(e: PointerEvent) {
		hovering = true;
		onMove(e);
		videoEl?.play().catch(() => {});
	}
	function onLeave() {
		hovering = false;
		videoEl?.pause();
	}
</script>

<section class="lens-section">
	<p class="lens-lede">{$t('tania.lens-lede')}</p>

	<div
		class="lens-frame"
		role="presentation"
		bind:this={frameEl}
		onpointermove={onMove}
		onpointerenter={onEnter}
		onpointerleave={onLeave}
	>
		<img
			class="lens-base"
			src="/photos/tania-carvalho/behind-gestures-base.jpg"
			alt="Dancers in green-lit costume and face paint, mid-gesture on stage in Doesdicon"
		/>
		<video
			bind:this={videoEl}
			class="lens-hidden"
			class:on={hovering}
			style="--lx: {lensX}px; --ly: {lensY}px;"
			src="/videos/tania-carvalho/tania-behind-gestures-lens.mp4"
			poster="/photos/tania-carvalho/posters/tania-behind-gestures-lens.jpg"
			aria-label="Raw footage and an interview with Tânia Carvalho, revealed inside the lens"
			muted
			loop
			playsinline
			preload="none"
		></video>
		<div class="lens-ring" class:on={hovering} style="--lx: {lensX}px; --ly: {lensY}px;"></div>
	</div>

	<div class="lens-info">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a
			href="https://www.youtube.com/watch?v=cX63ywKd69M"
			target="_blank"
			rel="noopener noreferrer"
			class="lens-link"
		>
			<span>{$t('label.watch-full-video')}</span>
			<span class="lens-link-arrow" aria-hidden="true">↗</span>
		</a>
	</div>
</section>

<style>
	.lens-section {
		/* nested inside the parent page's "Work within the Company" wrapper,
		   which already owns the horizontal gutter and the top separator —
		   this just needs a small gap under the subtitle above it */
		margin: 0;
	}
	.lens-lede {
		color: var(--ash);
		margin: 0 0 20px;
	}
	.lens-frame {
		position: relative;
		height: min(60vh, 500px);
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
		cursor: none;
	}
	.lens-base,
	.lens-hidden {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.lens-hidden {
		opacity: 0;
		clip-path: circle(130px at var(--lx, 50%) var(--ly, 50%));
		transition: opacity 0.25s ease;
	}
	.lens-hidden.on {
		opacity: 1;
	}
	.lens-ring {
		position: absolute;
		width: 260px;
		height: 260px;
		left: var(--lx, 50%);
		top: var(--ly, 50%);
		transform: translate(-50%, -50%);
		border-radius: 50%;
		border: 1px solid var(--moment-gold, #e3b657);
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition: opacity 0.25s ease;
		pointer-events: none;
	}
	.lens-ring.on {
		opacity: 0.85;
	}

	.lens-info {
		display: flex;
		margin-top: 18px;
	}
	.lens-link {
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
		transition:
			background 0.3s ease,
			transform 0.3s var(--ease-heavy),
			box-shadow 0.3s var(--ease-heavy);
	}
	.lens-link:hover,
	.lens-link:focus-visible {
		background: var(--bone);
		transform: translateY(-3px);
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
	}
	.lens-link-arrow {
		display: inline-block;
		transition: transform 0.3s var(--ease-heavy);
	}
	.lens-link:hover .lens-link-arrow,
	.lens-link:focus-visible .lens-link-arrow {
		transform: translate(2px, -2px);
	}
	@media (prefers-reduced-motion: reduce) {
		.lens-link:hover,
		.lens-link:focus-visible {
			transform: none;
		}
	}
	:global(html.motion-still) .lens-link:hover {
		transform: none !important;
	}
</style>
