<!--
  A numbered lighting/sound/movement score — the production's own cue sheet,
  presented as an accessible tab pattern (WAI-ARIA APG "tabs, automatic
  activation"): one large stage view driven by a scrollable rail of cue
  buttons. Arrow keys move focus and selection together; Home/End jump to
  the first/last cue. Cues without a still (documented on video/audio only)
  show a small illustrative animation instead of an empty image box — a
  singing bird, vibrating cello strings, or falling rain, matched to that
  cue's own text — keyed on the cue index so it replays each time the cue
  is (re)selected.

  Cues that carry their own `audio` preview play on hover/focus of their
  rail button through one shared <audio> element — never one per cue — so
  there is only ever a single active playback to manage. A monotonic token
  on each fade guards against overlap: hovering a second cue before the
  first one's fade-out finishes cancels that stale fade outright rather
  than letting two ramps fight over the same element's volume.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import type { SequenceCue } from '$lib/content/schema';
	import { t } from '$lib/i18n';
	import { language } from '$lib/stores/language';

	let { title, meta, cues }: { title: string; meta: string; cues: SequenceCue[] } = $props();

	// Rain drops are seeded (not Math.random()) so server and client render
	// the same markup and hydration never mismatches.
	function seeded(i: number, salt: number) {
		const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
		return x - Math.floor(x);
	}
	const RAIN_DROPS = Array.from({ length: 22 }, (_, i) => ({
		i,
		left: seeded(i, 1) * 100,
		delay: seeded(i, 2) * 1.6,
		duration: 0.9 + seeded(i, 3) * 0.6,
		drift: (seeded(i, 4) - 0.5) * 14
	}));

	let activeIndex = $state(0);
	let tabEls: HTMLButtonElement[] = $state([]);

	const active = $derived(cues[activeIndex]);

	// A shared link like #cue-tab-8 opens straight on that cue. The fragment
	// never reaches the server (browsers strip it before the request), so
	// page.url.hash from $app/state can't be trusted here — read the real
	// browser hash directly, once mounted on the client.
	onMount(() => {
		const m = /^#cue-tab-(\d+)$/.exec(window.location.hash);
		if (!m) return;
		const i = cues.findIndex((c) => c.n === Number(m[1]));
		if (i >= 0) activeIndex = i;
	});

	// Only rewrites the URL once a visitor actually steps through the score —
	// loading the page fresh must not silently append a hash nobody asked for.
	// A native history.replaceState (not SvelteKit's $app/navigation wrapper,
	// which is for route navigation) — this is a same-page fragment update,
	// no navigation or load functions involved.
	function updateHash(i: number) {
		history.replaceState(null, '', `#cue-tab-${cues[i].n}`);
	}

	function select(i: number) {
		activeIndex = i;
		updateHash(i);
	}
	function onKeydown(e: KeyboardEvent, i: number) {
		let next: number;
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(i + 1, cues.length - 1);
		else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(i - 1, 0);
		else if (e.key === 'Home') next = 0;
		else if (e.key === 'End') next = cues.length - 1;
		else return;
		e.preventDefault();
		activeIndex = next;
		tabEls[next]?.focus();
		updateHash(next);
	}

	// --- hover/focus audio preview -------------------------------------
	// One <audio> element for the whole rail. `playingIndex` drives both the
	// soundwave hover state and which cue currently owns the fade.
	let previewEl = $state<HTMLAudioElement>();
	let playingIndex = $state<number | null>(null);
	const FADE_MS = 220;
	let fadeToken = 0;

	function fadeTo(target: number, onDone?: () => void) {
		const el = previewEl;
		if (!el) return;
		const myToken = ++fadeToken;
		const start = el.volume;
		const startTime = performance.now();
		function step(now: number) {
			if (myToken !== fadeToken) return; // superseded by a newer fade
			const t = Math.min(1, (now - startTime) / FADE_MS);
			el!.volume = start + (target - start) * t;
			if (t < 1) {
				requestAnimationFrame(step);
			} else {
				onDone?.();
			}
		}
		requestAnimationFrame(step);
	}

	function previewIn(i: number) {
		const cue = cues[i];
		if (!cue.audio || !previewEl) return;
		// A pointerenter that fires again for the cue already previewing (e.g.
		// a redundant event while the pointer is still over the same button)
		// must not restart the fade from 0 — that's the "clipping" the volume
		// ramp exists to prevent in the first place.
		if (playingIndex === i) return;
		playingIndex = i;
		if (previewEl.src !== new URL(cue.audio, window.location.href).href) {
			previewEl.src = cue.audio;
		}
		previewEl.currentTime = 0;
		previewEl.volume = 0;
		// Only ramp volume up once playback genuinely starts — if the browser
		// blocks the play() (autoplay policy, no prior interaction yet), the
		// soundwave/pulse state has nothing real to reflect, so it shouldn't
		// silently fade a muted-anyway element up to full volume.
		previewEl
			.play()
			.then(() => {
				if (playingIndex === i) fadeTo(1);
			})
			.catch(() => {});
	}

	function previewOut(i: number) {
		if (playingIndex !== i) return;
		fadeTo(0, () => {
			if (playingIndex === i) {
				previewEl?.pause();
				playingIndex = null;
			}
		});
	}
</script>

<audio bind:this={previewEl} preload="none"></audio>

<div class="cue-sequence">
	<div class="cue-head">
		<h3>{title}</h3>
		<span class="cue-meta">{meta}</span>
	</div>

	<div class="cue-stage">
		{#if active.image}
			<img src={active.image} alt="Cue {active.n} — {active.text}" />
		{:else}
			{#key activeIndex}
				<div class="cue-stage-empty" role="img" aria-label="Cue {active.n} — {active.text}">
					{#if active.visual === 'bird'}
						<svg class="cue-visual bird-visual" viewBox="0 0 120 100" aria-hidden="true">
							<g class="bird-flight">
								<g transform="translate(45,58) scale(0.85)">
									<path class="bird-tail" d="M7,17 L-8,14 L9,22 Z" />
									<ellipse class="bird-body" cx="18" cy="18" rx="12" ry="9" />
									<g class="bird-wing">
										<path d="M8,16 Q10,0 26,2 Q18,12 8,16 Z" />
									</g>
									<circle class="bird-head" cx="32" cy="9" r="7" />
									<path class="bird-beak" d="M38,5 L47,1 L39,9 Z" />
									<path class="bird-beak" d="M38,11 L46,12 L39,15 Z" />
									<circle class="bird-eye" cx="34" cy="5" r="0.9" />
								</g>
							</g>
							<line class="burst-ray ray-a" x1="94" y1="44" x2="103" y2="36" />
							<line class="burst-ray ray-b" x1="98" y1="52" x2="108" y2="51" />
							<line class="burst-ray ray-c" x1="90" y1="36" x2="95" y2="28" />
							<text class="bird-note note-a" x="88" y="46">♪</text>
							<text class="bird-note note-b" x="98" y="54">♫</text>
							<text class="bird-note note-c" x="90" y="36">♪</text>
						</svg>
					{:else if active.visual === 'cello'}
						<svg class="cue-visual cello-visual" viewBox="0 0 120 100" aria-hidden="true">
							<line class="string s1" x1="38" y1="8" x2="38" y2="92" />
							<line class="string s2" x1="53" y1="8" x2="53" y2="92" />
							<line class="string s3" x1="68" y1="8" x2="68" y2="92" />
							<line class="string s4" x1="83" y1="8" x2="83" y2="92" />
						</svg>
					{:else if active.visual === 'rain'}
						<div class="cue-visual rain-visual">
							{#each RAIN_DROPS as drop (drop.i)}
								<span
									class="drop"
									style="left: {drop.left}%; animation-delay: {drop.delay}s; animation-duration: {drop.duration}s; --drift: {drop.drift}px;"
								></span>
							{/each}
						</div>
					{/if}
				</div>
			{/key}
		{/if}
		<p class="cue-caption">
			<span class="cue-badge">{$t('cue.badge-prefix')} {active.n}</span>{active.text}
		</p>
		{#if active.audio}
			<p class="cue-audio-note">
				{active.audioIsPlaceholder ? $t('cue.audio-hint-placeholder') : $t('cue.audio-hint')}
			</p>
		{/if}
	</div>

	<div class="cue-rail" role="tablist" aria-label="{title} {$t('cue.rail-aria-suffix')}">
		{#each cues as cue, i (cue.n)}
			<button
				bind:this={tabEls[i]}
				role="tab"
				id="cue-tab-{cue.n}"
				aria-selected={i === activeIndex}
				aria-label={cue.audio
					? $language === 'pt'
						? `Deixa ${cue.n}: ${cue.text} — com pré-audição sonora`
						: `Cue ${cue.n}: ${cue.text} — has an audio preview`
					: $language === 'pt'
						? `Deixa ${cue.n}: ${cue.text}`
						: `Cue ${cue.n}: ${cue.text}`}
				tabindex={i === activeIndex ? 0 : -1}
				class="cue-btn"
				class:on={i === activeIndex}
				class:has-audio={!!cue.audio}
				class:playing={playingIndex === i}
				onclick={() => select(i)}
				onkeydown={(e) => onKeydown(e, i)}
				onpointerenter={() => previewIn(i)}
				onpointerleave={() => previewOut(i)}
				onfocus={() => previewIn(i)}
				onblur={() => previewOut(i)}
			>
				{#if cue.image}
					<img src={cue.image} alt="" aria-hidden="true" />
				{:else}
					<span class="no-still" aria-hidden="true">
						<span class="note-glyph">♪</span>
						{#if cue.audio}
							<span class="soundwave">
								<span></span><span></span><span></span>
							</span>
						{/if}
					</span>
				{/if}
				<span class="cue-n">{cue.n}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.cue-sequence {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 24px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent);
	}
	.cue-head {
		display: flex;
		align-items: baseline;
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: 16px;
	}
	.cue-head h3 {
		font-family: var(--serif);
		font-weight: 400;
		font-size: 1.3rem;
		margin: 0;
	}
	.cue-meta {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash-dim);
	}

	.cue-stage {
		position: relative;
		border-radius: 6px;
		overflow: hidden;
		background: var(--stage-deep);
		aspect-ratio: 16/9;
		margin-bottom: 8px;
	}
	.cue-stage img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.cue-stage-empty {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		text-align: center;
	}
	.cue-visual {
		width: min(100%, 340px);
		animation: cue-visual-in 0.5s var(--ease-settle) both;
	}
	@keyframes cue-visual-in {
		from {
			opacity: 0;
			transform: scale(0.85);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* --- bird: a solid silhouette that flies on the spot, its one visible
	   wing flapping fast, while it sings a few floating notes and flashes of
	   light --- */
	.bird-flight {
		transform-origin: 65px 68px;
		animation: bird-flight 1.6s ease-in-out infinite;
	}
	.bird-body,
	.bird-tail {
		fill: var(--kraft);
	}
	.bird-head {
		fill: var(--kraft);
	}
	.bird-wing path {
		fill: var(--kraft-deep);
	}
	.bird-wing {
		transform-box: fill-box;
		transform-origin: 0% 100%;
		animation: bird-wing-flap 0.5s ease-in-out infinite;
	}
	.bird-beak {
		fill: var(--kraft-deep);
	}
	.bird-eye {
		fill: var(--stage-deep);
	}
	@keyframes bird-flight {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		50% {
			transform: translate(5px, -8px) rotate(-4deg);
		}
	}
	@keyframes bird-wing-flap {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-32deg);
		}
	}
	.burst-ray {
		stroke: var(--kraft);
		stroke-width: 1.6;
		stroke-linecap: round;
		opacity: 0;
		animation: burst-fade 1.6s ease-out infinite;
	}
	.ray-a {
		animation-delay: 0.1s;
	}
	.ray-b {
		animation-delay: 0.5s;
	}
	.ray-c {
		animation-delay: 0.9s;
	}
	@keyframes burst-fade {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}
		30% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(1.25);
		}
	}
	.bird-note {
		font-size: 13px;
		fill: var(--kraft);
		opacity: 0;
		animation: bird-note-float 1.6s ease-out infinite;
	}
	.note-a {
		animation-delay: 0.3s;
	}
	.note-b {
		animation-delay: 0.8s;
	}
	.note-c {
		animation-delay: 1.3s;
	}
	@keyframes bird-note-float {
		0% {
			opacity: 0;
			transform: translateY(0) scale(0.8);
		}
		25% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(-16px) scale(1.1);
		}
	}

	/* --- cello: strings fade in, then vibrate as if just bowed --- */
	.cello-visual .string {
		stroke: var(--kraft);
		stroke-width: 1.6;
		stroke-linecap: round;
		transform-box: fill-box;
		animation: cello-vibrate 0.18s ease-in-out 0.3s 14 alternate;
	}
	.cello-visual .s2 {
		animation-delay: 0.34s;
	}
	.cello-visual .s3 {
		animation-delay: 0.38s;
	}
	.cello-visual .s4 {
		animation-delay: 0.42s;
	}
	@keyframes cello-vibrate {
		from {
			transform: translateX(-3px);
		}
		to {
			transform: translateX(3px);
		}
	}

	/* --- rain: drops seeded, not random, so hydration never mismatches --- */
	.rain-visual {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.rain-visual .drop {
		position: absolute;
		top: -10%;
		width: 2px;
		height: 16px;
		border-radius: 2px;
		background: linear-gradient(180deg, transparent, var(--breath, #8fb7c9));
		animation: rain-fall linear infinite;
	}
	@keyframes rain-fall {
		from {
			transform: translate(0, 0);
			opacity: 0;
		}
		10% {
			opacity: 0.9;
		}
		90% {
			opacity: 0.9;
		}
		to {
			transform: translate(var(--drift), 340px);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cue-visual {
			animation: none;
		}
		.bird-flight,
		.bird-wing,
		.burst-ray,
		.bird-note,
		.cello-visual .string,
		.rain-visual .drop {
			animation: none !important;
			opacity: 1;
		}
	}
	:global(html.motion-still) .cue-visual {
		animation: none !important;
	}
	:global(html.motion-still) .bird-flight,
	:global(html.motion-still) .bird-wing,
	:global(html.motion-still) .burst-ray,
	:global(html.motion-still) .bird-note,
	:global(html.motion-still) .cello-visual .string,
	:global(html.motion-still) .rain-visual .drop {
		animation: none !important;
		opacity: 1 !important;
	}

	.cue-caption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0;
		padding: 12px 16px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.72), transparent);
		font-size: 0.94rem;
		color: var(--bone);
	}
	.cue-badge {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		margin-right: 10px;
	}
	.cue-audio-note {
		margin: 0 0 14px;
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.03em;
		color: var(--ash-dim);
	}

	.cue-rail {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding-bottom: 4px;
	}
	.cue-btn {
		position: relative;
		flex: 0 0 auto;
		width: 64px;
		height: 46px;
		border-radius: 4px;
		overflow: hidden;
		border: 1px solid var(--line-strong);
		background: var(--penumbra);
		cursor: pointer;
		padding: 0;
		transition:
			border-color 0.3s ease,
			transform 0.3s var(--ease-heavy);
	}
	.cue-btn img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}
	.cue-btn .no-still {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: var(--ash-dim);
		font-size: 14px;
	}
	.cue-btn .cue-n {
		position: absolute;
		right: 3px;
		bottom: 2px;
		font-family: var(--mono);
		font-size: 9px;
		color: var(--bone);
		background: rgba(0, 0, 0, 0.55);
		border-radius: 3px;
		padding: 1px 4px;
	}
	.cue-btn:hover {
		border-color: var(--kraft-deep);
		transform: translateY(-1px);
	}
	.cue-btn:hover img {
		opacity: 0.85;
	}
	/* Audio-preview buttons skip the hover lift specifically — shifting the
	   box right as the pointer arrives can nudge it out from under the
	   cursor, firing a spurious leave/re-enter that would restart the fade
	   (the pulse ring already signals hover here, so no lift is needed). */
	.cue-btn.has-audio:hover {
		transform: none;
	}
	.cue-btn.on {
		border-color: var(--kraft);
	}
	.cue-btn.on img {
		opacity: 1;
	}

	/* Cues with an audio preview get a slow ambient pulse ring at rest — an
	   invitation to hover — then a livelier soundwave once actually playing. */
	.cue-btn.has-audio {
		color: var(--kraft);
	}
	.cue-btn.has-audio::before {
		content: '';
		position: absolute;
		inset: 6px;
		border-radius: 50%;
		border: 1px solid var(--kraft-deep);
		opacity: 0.5;
		animation: cue-audio-invite 2.6s ease-in-out infinite;
	}
	@keyframes cue-audio-invite {
		0%,
		100% {
			transform: scale(0.85);
			opacity: 0.35;
		}
		50% {
			transform: scale(1.05);
			opacity: 0.7;
		}
	}
	.cue-btn.has-audio.playing::before {
		animation: none;
		opacity: 0;
	}
	.note-glyph {
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}
	.cue-btn.playing .note-glyph {
		opacity: 0;
		transform: scale(0.7);
	}
	.soundwave {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3px;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	.cue-btn.playing .soundwave {
		opacity: 1;
	}
	.soundwave span {
		display: block;
		width: 3px;
		height: 8px;
		border-radius: 2px;
		background: var(--kraft);
		animation: cue-soundwave 0.7s ease-in-out infinite;
	}
	.soundwave span:nth-child(2) {
		animation-delay: 0.12s;
	}
	.soundwave span:nth-child(3) {
		animation-delay: 0.24s;
	}
	@keyframes cue-soundwave {
		0%,
		100% {
			transform: scaleY(0.4);
		}
		50% {
			transform: scaleY(1.6);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cue-btn {
			transition: none;
		}
		.cue-btn:hover {
			transform: none;
		}
		.cue-btn.has-audio::before {
			animation: none;
			opacity: 0.5;
		}
		.soundwave span {
			animation: none;
			transform: scaleY(1);
		}
	}
	:global(html.motion-still) .cue-btn {
		transition: none !important;
	}
	:global(html.motion-still) .cue-btn:hover {
		transform: none !important;
	}
	:global(html.motion-still) .cue-btn.has-audio::before {
		animation: none !important;
		opacity: 0.5;
	}
	:global(html.motion-still) .soundwave span {
		animation: none !important;
		transform: scaleY(1);
	}
</style>
