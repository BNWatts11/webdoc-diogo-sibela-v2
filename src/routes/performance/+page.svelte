<!--
  Performance gets its own dedicated route for the same reason tania-
  carvalho, process, diogo, and isabel do: nothing here fits the shared
  [chapter] template. This chapter drops the behind-the-scenes register of
  the earlier ones entirely and puts the reader inside the show itself — a
  darkened split-screen entrance with the two real teaser tracks crossfading
  on hover, a looping stage mural whose circles open the two real teaser
  videos, a draggable wall of press clippings linking out to the real
  reviews, and a stop-by-stop tour map with the real venue photos and links.
  Text stays short everywhere.
-->
<script lang="ts">
	import { getChapter } from '$lib/content/chapters';
	import MacroPlate from '$lib/components/media/MacroPlate.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/i18n';
	import { language } from '$lib/stores/language';

	const chapter = getChapter('performance')!;
	const pageTitle = `${chapter.title} · Sibela & Digoo`;

	function clamp(v: number, min: number, max: number) {
		return Math.min(max, Math.max(min, v));
	}

	// ===== Section 1 — The Black Box (split hero) =====
	// Two real <audio> elements, one per solo's own teaser track — hovering a
	// side crossfades to that track; leaving both fades out. Never more than
	// one plays at a time, so there's no risk of stacked playback.
	type HeroSideId = 'sibela' | 'digoo';
	const heroSides = $derived<
		{
			id: HeroSideId;
			label: string;
			sub: string;
			img: string;
			alt: string;
			tone: 'cool' | 'warm';
		}[]
	>([
		{
			id: 'sibela',
			label: 'SIBELA',
			sub: $t('performance.side-sub-sibela'),
			img: '/photos/performance/isabela-silhouette-chair.jpg',
			alt: 'Isabel in silhouette against green light, the chair beside her, arms open',
			tone: 'cool'
		},
		{
			id: 'digoo',
			label: 'DIGOO',
			sub: $t('performance.side-sub-digoo'),
			img: '/photos/performance/diogo-silhouette-box.jpg',
			alt: 'Diogo in silhouette against amber light, hand resting on a stacked box',
			tone: 'warm'
		}
	]);

	let heroAudioSibela: HTMLAudioElement | undefined = $state();
	let heroAudioDigoo: HTMLAudioElement | undefined = $state();
	let heroActiveSide: 'sibela' | 'digoo' | null = null;

	function heroEl(side: 'sibela' | 'digoo') {
		return side === 'sibela' ? heroAudioSibela : heroAudioDigoo;
	}

	function fadeVolume(el: HTMLAudioElement, to: number, ms: number) {
		const from = el.volume;
		const start = performance.now();
		function step(now: number) {
			const t = Math.min(1, (now - start) / ms);
			el.volume = from + (to - from) * t;
			if (t < 1) requestAnimationFrame(step);
			else if (to === 0) el.pause();
		}
		requestAnimationFrame(step);
	}

	function activateSide(side: 'sibela' | 'digoo', targetVolume: number, ms: number) {
		const el = heroEl(side);
		if (!el) return;
		if (heroActiveSide && heroActiveSide !== side) {
			const other = heroEl(heroActiveSide);
			if (other) fadeVolume(other, 0, 500);
		}
		heroActiveSide = side;
		if (el.paused) {
			el.volume = 0;
			el.play()
				.then(() => fadeVolume(el, targetVolume, ms))
				.catch(() => {
					if (heroActiveSide === side) heroActiveSide = null;
				});
		} else {
			fadeVolume(el, targetVolume, ms);
		}
	}

	function focusSide(side: 'sibela' | 'digoo') {
		activateSide(side, 0.5, 700);
	}

	function leaveHero() {
		if (!heroActiveSide) return;
		const el = heroEl(heroActiveSide);
		if (el) fadeVolume(el, 0, 700);
		heroActiveSide = null;
	}

	let stageSectionEl: HTMLElement | undefined = $state();
	function enterChapter(side: 'sibela' | 'digoo') {
		activateSide(side, 0.16, 900);
		stageSectionEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// ===== Section 2 — The Stage Experience (teaser videos) =====
	// The background mural is still a crossfading stand-in (no wide trailer
	// footage is sourced locally), but each circle now opens a real teaser.
	const stageHotspots = [
		{
			id: 'digoo',
			x: 28,
			y: 60,
			name: 'Diogo',
			role: 'Digoo',
			video: '/videos/performance/teaser-digoo.mp4',
			poster: '/photos/performance/posters/teaser-digoo.jpg'
		},
		{
			id: 'sibela',
			x: 72,
			y: 60,
			name: 'Isabel',
			role: 'Sibela',
			video: '/videos/performance/teaser-sibela.mp4',
			poster: '/photos/performance/posters/teaser-sibela.jpg'
		}
	];
	let activeHotspot: string | null = $state(null);
	function toggleHotspot(id: string) {
		activeHotspot = activeHotspot === id ? null : id;
	}

	// ===== Section 3 — Press Feedback (draggable clipping wall) =====
	// `en`/`pt` are each outlet's real wording, not a translation of one
	// another: the DNoticias line is the verified original Portuguese quote
	// from the article; the Público line couldn't be fetched (403/paywall),
	// so its `pt` is a careful rendering of the same short line rather than a
	// confirmed original quote.
	const clippingsSource = [
		{
			id: 'publico',
			outlet: 'Público',
			en: '"Sibela and Digoo, by Dançando com a Diferença, is melancholy, rage, catharsis."',
			pt: '"Sibela e Digoo, da Dançando com a Diferença, é melancolia, raiva, catarse."',
			attribution: '— Público',
			url: 'https://www.publico.pt/2026/01/21/culturaipsilon/fotogaleria/sibela-digoo-dancando-diferenca-414981',
			tilt: -3
		},
		{
			id: 'dnoticias',
			outlet: 'DNOTICIAS.PT',
			en: '"It reveals territories of creation where each performer explores and gives shape to their own singularity within a rigorous, sensitive creative process."',
			pt: '"Revela territórios de criação onde cada intérprete explora e materializa a sua própria singularidade dentro de um processo criativo rigoroso e sensível."',
			attribution: '— Henrique Amoedo, DNOTICIAS.PT',
			url: 'https://www.dnoticias.pt/2026/7/22/500025-dancando-com-a-diferenca-apresenta-sibela-e-digoo-em-evora/',
			tilt: 2.5
		}
	];
	const clippings = $derived(
		clippingsSource.map((c) => ({ ...c, en: $language === 'pt' ? c.pt : c.en }))
	);
	type DragOffset = { dx: number; dy: number; dragging: boolean };
	let dragState: Record<string, DragOffset> = $state({});
	const dragStart: Record<string, { x: number; y: number; baseDx: number; baseDy: number }> = {};
	function offsetFor(id: string): DragOffset {
		return dragState[id] ?? { dx: 0, dy: 0, dragging: false };
	}
	function onCardPointerDown(e: PointerEvent, id: string) {
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		const cur = offsetFor(id);
		dragStart[id] = { x: e.clientX, y: e.clientY, baseDx: cur.dx, baseDy: cur.dy };
		dragState = { ...dragState, [id]: { dx: cur.dx, dy: cur.dy, dragging: true } };
	}
	function onCardPointerMove(e: PointerEvent, id: string) {
		const st = dragStart[id];
		if (!st || !offsetFor(id).dragging) return;
		const dx = clamp(st.baseDx + (e.clientX - st.x), -36, 36);
		const dy = clamp(st.baseDy + (e.clientY - st.y), -24, 24);
		dragState = { ...dragState, [id]: { dx, dy, dragging: true } };
	}
	function onCardPointerUp(id: string) {
		dragState = { ...dragState, [id]: { dx: 0, dy: 0, dragging: false } };
	}

	// ===== Section 4 — The 2026 National Tour (stylized map) =====
	// A schematic north-to-south strip standing in for a geographic map of
	// Portugal — the three stops keep their real relative order (Viseu,
	// north-central; Leiria, central; Évora, south).
	const tourStops = $derived([
		{
			id: 'viseu',
			city: 'Viseu',
			venue: 'Teatro Viriato',
			when: $t('performance.tour-viseu-when'),
			detail: $t('performance.tour-viseu-detail'),
			photo: '/photos/performance/tour-viriato.jpg',
			alt: 'Isabel, Tânia Carvalho, and Diogo together on stage at the Viseu premiere',
			url: 'https://www.teatroviriato.com/pt/programacao/espetaculo/sibela-e-digoo'
		},
		{
			id: 'leiria',
			city: 'Leiria',
			venue: 'Teatro José Lúcio da Silva',
			when: $t('performance.tour-leiria-when'),
			detail: null,
			photo: '/photos/performance/tour-jose.jpg',
			alt: 'Isabel and Diogo holding hands on stage, boxes behind them, in blue light',
			url: 'https://www.facebook.com/dancandodiferenca/posts/o-espet%C3%A1culo-sibela-e-digoo-sobe-ao-palco-do-teatro-jos%C3%A9-l%C3%BAcio-da-silva-amanh%C3%A3-%C3%A0/1316044730562870/'
		},
		{
			id: 'evora',
			city: 'Évora',
			venue: 'Teatro Garcia de Resende · Cendrev',
			when: $t('performance.tour-evora-when'),
			detail: null,
			photo: '/photos/performance/tour-teatro.jpg',
			alt: 'Diogo mid-motion on stage, blurred, boxes behind him, in blue light',
			url: 'https://cendrev.pt/danca-sibela-e-digoo/'
		}
	]);
	let activeStop: string | null = $state(null);
	function toggleStop(id: string) {
		activeStop = activeStop === id ? null : id;
	}

	// ===== Final Gallery =====
	const showPhotos = $derived([
		{
			src: '/photos/performance/isabela-silhouette-chair.jpg',
			alt: 'Isabel in silhouette against green light, the chair beside her, arms open',
			label: $t('performance.photo-sibela')
		},
		{
			src: '/photos/performance/diogo-silhouette-box.jpg',
			alt: 'Diogo in silhouette against amber light, hand resting on a stacked box',
			label: $t('performance.photo-digoo')
		},
		{
			src: '/photos/performance/tour-viriato.jpg',
			alt: 'Isabel, Tânia Carvalho, and Diogo together on stage at the Viseu premiere',
			label: $t('performance.photo-viseu')
		},
		{
			src: '/photos/performance/tour-jose.jpg',
			alt: 'Isabel and Diogo holding hands on stage, boxes behind them, in blue light',
			label: $t('performance.photo-leiria')
		},
		{
			src: '/photos/performance/tour-teatro.jpg',
			alt: 'Diogo mid-motion on stage, blurred, boxes behind him, in blue light',
			label: $t('performance.photo-evora')
		}
	]);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content="Performance — inside Sibela &amp; Digoo on stage: the show, the press, the 2026 national tour."
	/>
	<meta property="og:title" content={pageTitle} />
	<meta property="og:image" content={chapter.heroMedia.src} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:image" content={chapter.heroMedia.src} />
</svelte:head>

<audio bind:this={heroAudioSibela} src="/audio/performance/teaser-sibela.mp3" loop preload="none"
></audio>
<audio bind:this={heroAudioDigoo} src="/audio/performance/teaser-digoo.mp3" loop preload="none"
></audio>

<article class="performance">
	<!-- Section 1 — The Black Box -->
	<header
		class="blackbox"
		role="group"
		aria-label={$t('performance.choose-solo-aria')}
		onpointerleave={leaveHero}
	>
		<span class="ix"
			><span class="ix-track">{$t('nav.track-performance-short')}</span> · 08 / 09</span
		>
		<div class="blackbox-sides">
			{#each heroSides as side (side.id)}
				<button
					type="button"
					class="bb-side {side.tone}"
					onpointerenter={() => focusSide(side.id)}
					onfocus={() => focusSide(side.id)}
					onclick={() => enterChapter(side.id)}
					aria-label="{side.label} — {side.sub}. {$t('performance.select-to-enter')}"
				>
					<img src={side.img} alt={side.alt} loading="lazy" />
					<span class="bb-scrim" aria-hidden="true"></span>
					<span class="bb-label">{side.label}</span>
					<span class="bb-sub">{side.sub}</span>
				</button>
			{/each}
		</div>
		<p class="bb-hint">{$t('performance.choose-side-hint')}</p>
		<p class="bb-note">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				href="https://diogoalvim.com/pt/portfolio/music-for-sibela-e-digoo/"
				target="_blank"
				rel="noopener noreferrer">{$t('performance.composer-credit')}</a
			>
		</p>
	</header>

	<!-- Section 2 — Teaser -->
	<section class="stage-experience" bind:this={stageSectionEl} use:reveal>
		<h2>Teaser</h2>
		<div class="mural" class:dimmed={activeHotspot !== null}>
			<img class="mural-layer a" src="/photos/performance/isabela-silhouette-chair.jpg" alt="" />
			<img class="mural-layer b" src="/photos/performance/diogo-silhouette-box.jpg" alt="" />
			<div class="mural-sweep" aria-hidden="true"></div>
			{#each stageHotspots as spot (spot.id)}
				<button
					type="button"
					class="hotspot"
					class:active={activeHotspot === spot.id}
					style="left:{spot.x}%; top:{spot.y}%;"
					aria-expanded={activeHotspot === spot.id}
					aria-label={$t('performance.play-teaser-aria')
						.replace('{name}', spot.name)
						.replace('{role}', spot.role)}
					onclick={() => toggleHotspot(spot.id)}
				>
					<span class="hotspot-ring" aria-hidden="true"></span>
				</button>
			{/each}
			{#if !activeHotspot}
				<p class="mural-caption">{$t('performance.mural-caption')}</p>
			{/if}
			{#each stageHotspots.filter((s) => s.id === activeHotspot) as spot (spot.id)}
				<div class="mural-video">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video src={spot.video} poster={spot.poster} controls autoplay playsinline></video>
					<button
						type="button"
						class="mural-video-close"
						onclick={() => toggleHotspot(spot.id)}
						aria-label={$t('performance.close-teaser-aria')}
					>
						✕
					</button>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section 3 — Press Feedback & Critical Echoes -->
	<section class="press-wall" use:reveal>
		<h2>{$t('performance.critical-echoes-h2')}</h2>
		<div class="clip-board">
			{#each clippings as c (c.id)}
				{@const off = offsetFor(c.id)}
				<div
					class="clip-card"
					role="note"
					style="transform: translate({off.dx}px, {off.dy}px) rotate({c.tilt}deg); transition: {off.dragging
						? 'none'
						: 'transform 0.45s var(--ease-settle)'};"
					onpointerdown={(e) => onCardPointerDown(e, c.id)}
					onpointermove={(e) => onCardPointerMove(e, c.id)}
					onpointerup={() => onCardPointerUp(c.id)}
					onpointercancel={() => onCardPointerUp(c.id)}
				>
					<span class="clip-outlet">{c.outlet}</span>
					<p class="clip-en">{c.en}</p>
					<span class="clip-attr">{c.attribution}</span>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a class="clip-link" href={c.url} target="_blank" rel="noopener noreferrer"
						>{$t('performance.read-review')}</a
					>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section 4 — The 2026 National Tour -->
	<section class="tour" use:reveal>
		<h2>{$t('performance.tour-h2')}</h2>
		<div class="tour-map">
			{#each tourStops as stop, i (stop.id)}
				<div class="tour-stop">
					<button
						type="button"
						class="stop-btn"
						aria-expanded={activeStop === stop.id}
						onclick={() => toggleStop(stop.id)}
					>
						<span class="stop-dot" aria-hidden="true"></span>
						<span class="stop-city">{stop.city}</span>
						<span class="stop-when">{stop.when}</span>
					</button>
					{#if i < tourStops.length - 1}<span class="stop-connector" aria-hidden="true"></span>{/if}
					{#if activeStop === stop.id}
						<div class="stop-panel">
							<img class="stop-photo" src={stop.photo} alt={stop.alt} loading="lazy" />
							<p class="stop-venue">{stop.venue}</p>
							{#if stop.detail}<p class="stop-detail">{stop.detail}</p>{/if}
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								class="stop-external-link"
								href={stop.url}
								target="_blank"
								rel="noopener noreferrer">{$t('performance.see-show-page')}</a
							>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Final Gallery -->
	<section class="final-gallery" use:reveal>
		<h2>{$t('performance.gallery-h2')}</h2>
		<div class="gallery-grid">
			{#each showPhotos as photo, i (i)}
				<div class="gallery-item" style="--i:{i}">
					<MacroPlate src={photo.src} alt={photo.alt} label={photo.label} />
				</div>
			{/each}
		</div>
	</section>
</article>

<style>
	.performance {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 0 100px;
	}
	h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 10px;
		color: var(--bone);
	}
	/* ===== Section 1 — The Black Box ===== */
	.blackbox {
		padding: 50px 28px 40px;
		background: var(--stage-deep);
	}
	.ix {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.16em;
		color: var(--ash-dim);
	}
	.ix-track {
		text-transform: uppercase;
	}
	.blackbox-sides {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2px;
		margin: 18px 0 0;
		height: min(70vh, 560px);
		border-radius: 8px;
		overflow: hidden;
	}
	.bb-side {
		position: relative;
		border: none;
		padding: 0;
		cursor: pointer;
		overflow: hidden;
		background: #000;
		font-family: inherit;
	}
	.bb-side img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.4;
		filter: grayscale(0.3) brightness(0.6);
		transition:
			opacity 0.5s var(--ease-settle),
			filter 0.5s var(--ease-settle),
			transform 6s linear;
	}
	.bb-side:hover img,
	.bb-side:focus-visible img {
		opacity: 0.85;
		filter: grayscale(0) brightness(0.85);
		transform: scale(1.04);
	}
	.bb-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.75) 100%);
	}
	.bb-label {
		position: absolute;
		left: 50%;
		top: 44%;
		transform: translate(-50%, -50%);
		font-family: var(--serif);
		font-weight: 600;
		font-size: clamp(1.8rem, 4.5vw, 3rem);
		letter-spacing: 0.06em;
		color: var(--on-scrim);
		opacity: 0.8;
		transition: opacity 0.4s ease;
	}
	.bb-side:hover .bb-label,
	.bb-side:focus-visible .bb-label {
		opacity: 1;
	}
	.bb-sub {
		position: absolute;
		left: 50%;
		top: 44%;
		transform: translate(-50%, 14px);
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--on-scrim-dim);
		white-space: nowrap;
	}
	.bb-side.cool:hover .bb-scrim,
	.bb-side.cool:focus-visible .bb-scrim {
		background: linear-gradient(180deg, rgba(10, 22, 26, 0.05) 40%, rgba(10, 22, 26, 0.7) 100%);
	}
	.bb-side.warm:hover .bb-scrim,
	.bb-side.warm:focus-visible .bb-scrim {
		background: linear-gradient(180deg, rgba(26, 16, 8, 0.05) 40%, rgba(26, 16, 8, 0.7) 100%);
	}
	.bb-hint {
		margin: 16px 0 0;
		text-align: center;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		color: var(--ash-dim);
	}
	.bb-note {
		margin: 6px 0 0;
		text-align: center;
		font-family: var(--mono);
		font-size: 10px;
	}
	.bb-note a {
		color: var(--kraft);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* ===== Section 2 — The Stage Experience ===== */
	.stage-experience {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.mural {
		position: relative;
		aspect-ratio: 16 / 8;
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
	}
	.mural-layer {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.55) saturate(0.9);
	}
	.mural-layer.a {
		animation: mural-cross 14s ease-in-out infinite;
	}
	.mural-layer.b {
		animation: mural-cross 14s ease-in-out infinite reverse;
	}
	@keyframes mural-cross {
		0%,
		42% {
			opacity: 1;
		}
		50%,
		92% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	.mural-sweep {
		position: absolute;
		inset: -20% -60%;
		background: linear-gradient(
			100deg,
			transparent 40%,
			rgba(255, 240, 220, 0.09) 50%,
			transparent 60%
		);
		animation: mural-sweep 7s linear infinite;
	}
	@keyframes mural-sweep {
		from {
			transform: translateX(-20%);
		}
		to {
			transform: translateX(20%);
		}
	}
	.mural.dimmed .mural-layer,
	.mural.dimmed .mural-sweep {
		opacity: 0.25;
		transition: opacity 0.4s ease;
	}
	.hotspot {
		position: absolute;
		width: 34px;
		height: 34px;
		margin: -17px 0 0 -17px;
		border-radius: 50%;
		border: none;
		background: rgba(236, 228, 214, 0.18);
		cursor: pointer;
	}
	.hotspot-ring {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1.5px solid var(--bone);
		animation: hotspot-pulse 2.2s ease-out infinite;
	}
	@keyframes hotspot-pulse {
		0% {
			transform: scale(0.6);
			opacity: 0.9;
		}
		100% {
			transform: scale(1.9);
			opacity: 0;
		}
	}
	.hotspot.active .hotspot-ring {
		border-color: var(--kraft);
		animation-play-state: paused;
		transform: scale(1.1);
		opacity: 1;
	}
	.mural-caption {
		position: absolute;
		left: 14px;
		bottom: 12px;
		right: 14px;
		margin: 0;
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.02em;
		color: var(--on-scrim-dim);
		opacity: 0.85;
	}
	.mural-video {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		animation: cue-visual-in 0.3s var(--ease-settle) both;
	}
	.mural-video video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: #000;
	}
	.mural-video-close {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid rgba(236, 228, 214, 0.4);
		background: rgba(16, 12, 9, 0.65);
		color: var(--on-scrim);
		font-size: 14px;
		line-height: 1;
		cursor: pointer;
	}
	.mural-video-close:hover,
	.mural-video-close:focus-visible {
		background: rgba(16, 12, 9, 0.9);
		border-color: var(--on-scrim);
	}
	@keyframes cue-visual-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ===== Section 3 — Critical Echoes ===== */
	.press-wall {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.clip-board {
		display: flex;
		flex-wrap: wrap;
		gap: 28px;
		padding: 10px 0 30px;
	}
	.clip-card {
		width: min(100%, 340px);
		padding: 22px 20px;
		background: var(--newsprint);
		color: var(--charcoal);
		border-radius: 2px;
		box-shadow: 0 16px 30px -18px rgba(0, 0, 0, 0.7);
		cursor: grab;
		touch-action: none;
		user-select: none;
	}
	.clip-card:active {
		cursor: grabbing;
	}
	.clip-outlet {
		display: block;
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--wood);
		margin-bottom: 10px;
	}
	.clip-en {
		font-family: var(--serif);
		font-size: 1.1rem;
		line-height: 1.45;
		margin: 0 0 12px;
	}
	.clip-attr {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--wood-deep);
		margin-bottom: 10px;
	}
	.clip-link {
		display: inline-block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.03em;
		color: var(--wood);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* ===== Section 4 — The 2026 National Tour ===== */
	.tour {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.tour-map {
		display: flex;
		flex-direction: column;
		max-width: 420px;
	}
	.tour-stop {
		position: relative;
		padding-bottom: 8px;
	}
	.stop-btn {
		display: flex;
		align-items: baseline;
		gap: 12px;
		width: 100%;
		background: none;
		border: none;
		padding: 10px 0;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
	}
	.stop-dot {
		flex: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--breath);
		border: 2px solid var(--breath-deep);
	}
	.stop-city {
		font-family: var(--serif);
		font-size: 1.25rem;
		color: var(--bone);
	}
	.stop-when {
		margin-left: auto;
		font-family: var(--mono);
		font-size: 11px;
		color: var(--ash-dim);
	}
	.stop-connector {
		position: absolute;
		left: 5px;
		top: 32px;
		width: 2px;
		height: calc(100% - 14px);
		background: var(--line-strong);
	}
	.stop-panel {
		margin: 4px 0 20px 24px;
		padding: 14px 16px;
		border-radius: 6px;
		background: var(--penumbra);
		border: 1px solid var(--line);
		animation: cue-visual-in 0.35s var(--ease-settle) both;
	}
	.stop-photo {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 4px;
		margin-bottom: 12px;
		display: block;
	}
	.stop-venue {
		margin: 0 0 6px;
		font-weight: 600;
		color: var(--bone);
	}
	.stop-detail {
		margin: 0 0 10px;
		color: var(--ash);
		font-size: 0.92rem;
		line-height: 1.5;
	}
	.stop-external-link {
		display: inline-block;
		background: none;
		border: none;
		padding: 0;
		color: var(--kraft);
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (prefers-reduced-motion: reduce) {
		.bb-side img,
		.mural-layer,
		.mural-sweep,
		.hotspot-ring {
			animation: none !important;
			transition: none !important;
		}
	}
	:global(html.motion-still) .bb-side img,
	:global(html.motion-still) .mural-layer,
	:global(html.motion-still) .mural-sweep,
	:global(html.motion-still) .hotspot-ring {
		animation: none !important;
	}

	/* ===== Final Gallery ===== */
	.final-gallery {
		margin: 60px 28px 0;
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
	}
	.gallery-item {
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.5s var(--ease-settle),
			transform 0.5s var(--ease-settle);
		transition-delay: calc(var(--i) * 90ms);
	}
	:global(.final-gallery.is-visible) .gallery-item {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.gallery-item {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .gallery-item {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	@media (max-width: 640px) {
		.blackbox-sides {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			height: min(80vh, 640px);
		}
	}
</style>
