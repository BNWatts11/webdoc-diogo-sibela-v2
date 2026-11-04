<!--
  The persistent chapter menu — nine flattened-cardboard-box markers on a
  soft-blurred thread, ported from reference/06-navigation-spine.html.
  Every stop shares the same warm kraft box, each marked with a small line
  icon for its chapter. Real <a> elements so navigation works without JS;
  hover/focus trigger the drag/rustle sound cues; arrow keys move along the
  thread. The lean-and-settle motion is disabled entirely under reduced
  motion, not just sped up (matches the reference exactly).

  `compact` renders the slim persistent-rail version used in the layout;
  the full two-column spine + reader panel (the home page's presentation)
  is the default.
-->
<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { chapters } from '$lib/content/chapters';
	import { audio } from '$lib/stores/audio';
	import { reveal } from '$lib/actions/reveal';
	import { language } from '$lib/stores/language';
	import { t, chapterTitle } from '$lib/i18n';

	let { compact = false }: { compact?: boolean } = $props();

	let markerEls: HTMLAnchorElement[] = $state([]);
	let hoveredIndex = $state<number | null>(null);
	// Below ~900px the compact rail collapses behind this disclosure so a
	// visitor lands on chapter content first, not nine stops of nav — closes
	// itself on every navigation (link click, back/forward, anything).
	let mobileOpen = $state(false);

	const currentIndex = $derived(chapters.findIndex((c) => page.url.pathname === `/${c.id}`));
	const previewIndex = $derived(hoveredIndex ?? (currentIndex >= 0 ? currentIndex : 0));
	const previewChapter = $derived(chapters[previewIndex]);
	const currentChapter = $derived(currentIndex >= 0 ? chapters[currentIndex] : null);

	// Two distinct content tracks (per the advisors' navigation review): the
	// chronological performance chapters and the surrounding context/
	// organization chapters. Grouping happens only at render time — `i` stays
	// the flat index into `chapters` so keyboard nav, the stagger delay, and
	// the current/preview lookups above are unaffected by which group a
	// chapter's marker visually sits in.
	const trackGroups = $derived(
		(['context', 'performance'] as const).map((track) => ({
			track,
			labelKey: track === 'performance' ? 'nav.track-performance' : 'nav.track-context',
			items: chapters
				.map((chapter, i) => ({ chapter, i }))
				.filter((entry) => entry.chapter.track === track)
		}))
	);
	function trackShortKey(chapter: (typeof chapters)[number]) {
		return chapter.track === 'performance'
			? 'nav.track-performance-short'
			: 'nav.track-context-short';
	}

	$effect(() => {
		void page.url.pathname;
		mobileOpen = false;
	});

	function onEnter(i: number) {
		hoveredIndex = i;
		audio.playDrag();
	}
	function onLeave() {
		hoveredIndex = null;
	}
	function onFocus(i: number) {
		hoveredIndex = i;
		audio.playRustle();
	}
	function onSelect(chapter: (typeof chapters)[number]) {
		audio.playWood();
		if (chapter.pole === 'isabel') setTimeout(() => audio.playBreath(), 160);
	}
	function onKeydown(e: KeyboardEvent, i: number) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
			e.preventDefault();
			markerEls[Math.min(i + 1, markerEls.length - 1)]?.focus();
		}
		if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			e.preventDefault();
			markerEls[Math.max(i - 1, 0)]?.focus();
		}
	}
</script>

<nav
	class="spine-stage"
	class:compact
	class:mobile-open={mobileOpen}
	aria-label={$t('nav.aria-chapters')}
>
	{#if compact}
		<button
			type="button"
			class="mobile-toggle"
			aria-expanded={mobileOpen}
			aria-controls="nav-spine-list"
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class="mobile-toggle-label">
				{#if currentChapter}
					<span class="t">{chapterTitle(currentChapter, $language)}</span>
				{:else}
					<span class="t">{$t('nav.chapters-fallback')}</span>
				{/if}
			</span>
			<span class="chevron" aria-hidden="true">{mobileOpen ? '▲' : '▼'}</span>
		</button>
	{/if}
	<div class="spine" id={compact ? 'nav-spine-list' : undefined}>
		{#each trackGroups as group (group.track)}
			<div class="track-group" class:track-performance={group.track === 'performance'}>
				<h3 class="track-heading" id="track-{compact ? 'compact' : 'full'}-{group.track}">
					{$t(group.labelKey)}
				</h3>
				<ol aria-labelledby="track-{compact ? 'compact' : 'full'}-{group.track}">
					{#each group.items as { chapter, i } (chapter.id)}
						<li class="stop" style="--i: {i}" use:reveal>
							<a
								bind:this={markerEls[i]}
								class="marker"
								href={resolve(`/${chapter.id}`)}
								aria-current={currentIndex === i ? 'page' : undefined}
								onmouseenter={() => onEnter(i)}
								onmouseleave={onLeave}
								onfocus={() => onFocus(i)}
								onclick={() => onSelect(chapter)}
								onkeydown={(e) => onKeydown(e, i)}
							>
								<span class="box" style="--seed: {i}" aria-hidden="true">
									<svg
										class="box-icon"
										viewBox="0 0 16 16"
										fill="none"
										stroke="currentColor"
										stroke-width="1.1"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										{#if chapter.id === 'inclusive-dance'}
											<circle cx="6" cy="8" r="4" />
											<circle cx="10" cy="8" r="4" />
										{:else if chapter.id === 'o-ciclo-da-invisibilidade'}
											<path d="M8 3a5 5 0 1 1-4.6 3" />
											<path d="M2.6 3.6l.8 2.4 2.4-.8" />
										{:else if chapter.id === 'company'}
											<circle cx="4" cy="11" r="1.2" />
											<circle cx="12" cy="11" r="1.2" />
											<circle cx="8" cy="4" r="1.2" />
											<line x1="4" y1="11" x2="8" y2="4" />
											<line x1="12" y1="11" x2="8" y2="4" />
										{:else if chapter.id === 'tania-carvalho'}
											<line x1="3" y1="13" x2="10" y2="6" />
											<circle cx="11.5" cy="4.5" r="1.2" />
										{:else if chapter.id === 'diogo'}
											<rect x="3" y="4" width="10" height="9" />
											<line x1="3" y1="8.5" x2="13" y2="8.5" />
											<line x1="8" y1="4" x2="8" y2="13" />
										{:else if chapter.id === 'isabel'}
											<line x1="4" y1="2" x2="4" y2="13" />
											<line x1="4" y1="8" x2="12" y2="8" />
											<line x1="12" y1="8" x2="12" y2="13" />
										{:else if chapter.id === 'process'}
											<path d="M3 13c2-4 2-6 5-6s3 4 5 0" />
										{:else if chapter.id === 'performance'}
											<line x1="8" y1="1" x2="8" y2="3" />
											<path d="M8 3l4 10H4z" />
										{:else if chapter.id === 'post-dance'}
											<path d="M4 8a4 4 0 0 1 8 0" />
											<path d="M2 8a6 6 0 0 1 12 0" />
										{/if}
									</svg>
								</span>
								<span class="label">
									<span class="t">{chapterTitle(chapter, $language)}</span>
								</span>
							</a>
						</li>
					{/each}
				</ol>
			</div>
		{/each}
	</div>

	{#if !compact}
		<div class="reader" aria-live="polite">
			<article class="chapter on" class:cool={previewChapter.pole === 'isabel'}>
				<span class="ix"
					><span class="ix-track">{$t(trackShortKey(previewChapter))}</span> · {String(
						previewChapter.order
					).padStart(2, '0')} / 09</span
				>
				<h2>{chapterTitle(previewChapter, $language)}</h2>
				{#key previewChapter.id}
					<div class="motif motif-{previewChapter.id}" aria-hidden="true">
						{#if previewChapter.id === 'inclusive-dance'}
							<svg viewBox="0 0 64 32"
								><circle class="m-a" cx="26" cy="16" r="12" /><circle
									class="m-b"
									cx="38"
									cy="16"
									r="12"
								/></svg
							>
						{:else if previewChapter.id === 'company'}
							<svg viewBox="0 0 64 32"
								><line class="m-line" x1="16" y1="24" x2="32" y2="8" /><line
									class="m-line"
									x1="48"
									y1="24"
									x2="32"
									y2="8"
								/><circle class="m-node" cx="16" cy="24" r="3" /><circle
									class="m-node m-node-2"
									cx="48"
									cy="24"
									r="3"
								/><circle class="m-node m-node-3" cx="32" cy="8" r="3" /></svg
							>
						{:else if previewChapter.id === 'o-ciclo-da-invisibilidade'}
							<svg viewBox="0 0 64 32"
								><path class="m-spin" d="M32 6a10 10 0 1 1-9.2 6" /><path
									class="m-spin"
									d="M20 6l1.6 4.8 4.8-1.6"
								/></svg
							>
						{:else if previewChapter.id === 'tania-carvalho'}
							<svg viewBox="0 0 64 32"
								><path class="m-draw" d="M14 24 L38 8" /><circle
									class="m-node"
									cx="42"
									cy="6"
									r="2.4"
								/></svg
							>
						{:else if previewChapter.id === 'process'}
							<svg viewBox="0 0 64 32"
								><path class="m-flow" d="M6 20c6-12 12-12 16 0s10 12 16 0 10-12 16 0" /></svg
							>
						{:else if previewChapter.id === 'diogo'}
							<svg viewBox="0 0 64 32"
								><rect class="m-box m-box-1" x="10" y="14" width="12" height="10" /><rect
									class="m-box m-box-2"
									x="26"
									y="8"
									width="12"
									height="10"
								/><rect class="m-box m-box-3" x="42" y="16" width="12" height="10" /></svg
							>
						{:else if previewChapter.id === 'isabel'}
							<svg viewBox="0 0 64 32"><circle class="m-breathe" cx="32" cy="16" r="8" /></svg>
						{:else if previewChapter.id === 'performance'}
							<svg viewBox="0 0 64 32"
								><path class="m-beam" d="M32 4 L18 26 L46 26 Z" /><line
									class="m-beam-line"
									x1="32"
									y1="4"
									x2="32"
									y2="0"
								/></svg
							>
						{:else if previewChapter.id === 'post-dance'}
							<svg viewBox="0 0 64 32"
								><circle class="m-drift m-drift-1" cx="16" cy="18" r="2.4" /><circle
									class="m-drift m-drift-2"
									cx="32"
									cy="10"
									r="1.8"
								/><circle class="m-drift m-drift-3" cx="46" cy="20" r="2.1" /><circle
									class="m-drift m-drift-4"
									cx="54"
									cy="8"
									r="1.5"
								/></svg
							>
						{/if}
					</div>
				{/key}
				<div class="path">/{previewChapter.id}</div>
			</article>
			<p class="hint">{$t('nav.hint')}</p>
		</div>
	{/if}
</nav>

<style>
	.spine-stage {
		display: grid;
		grid-template-columns: minmax(280px, 360px) 1fr;
		gap: 48px;
		align-items: start;
	}
	.spine-stage.compact {
		display: block;
	}

	.track-group + .track-group {
		margin-top: 34px;
	}
	.track-heading {
		margin: 0 0 14px;
		padding: 0 6px;
		font-family: var(--mono);
		font-size: 10.5px;
		font-weight: 400;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ash-dim);
	}
	.compact .track-heading {
		font-size: 9.5px;
		margin-bottom: 10px;
	}
	.track-group.track-performance .track-heading {
		color: var(--kraft);
	}

	.spine ol {
		list-style: none;
		margin: 0;
		padding: 0;
		position: relative;
		z-index: 1;
	}
	.spine ol::before {
		content: '';
		position: absolute;
		left: 25px;
		top: 26px;
		bottom: 26px;
		width: 2px;
		z-index: 0;
		background: linear-gradient(
			180deg,
			transparent,
			var(--line-strong) 7%,
			var(--line-strong) 93%,
			transparent
		);
		filter: blur(0.4px);
		opacity: 0.8;
	}
	.compact .spine ol::before {
		left: 19px;
	}

	.stop {
		position: relative;
		z-index: 1;

		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 0.6s var(--ease-settle) calc(var(--i, 0) * 70ms),
			transform 0.6s var(--ease-settle) calc(var(--i, 0) * 70ms);
	}
	.stop:global(.is-visible) {
		opacity: 1;
		transform: none;
	}
	/* Utility chrome (the persistent rail, and the mobile drawer it collapses
	 * into) shouldn't hide behind a scroll-triggered fade at all — that reveal
	 * is for the homepage's full-height spine. Skipping it here also removes
	 * a real timing gap: the mobile drawer can go from display:none to fully
	 * visible before its markers' IntersectionObserver has had a chance to
	 * fire, which briefly left early markers at opacity 0 (an actual, if
	 * momentary, contrast failure — not just a flaky scan). */
	.compact .stop {
		opacity: 1;
		transform: none;
		transition: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.stop {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .stop {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}
	.marker {
		display: flex;
		align-items: center;
		gap: 18px;
		width: 100%;
		background: none;
		border: 0;
		padding: 9px 6px;
		cursor: pointer;
		text-align: left;
		color: inherit;
		font-family: inherit;
		border-radius: 6px;
		text-decoration: none;
	}

	.box {
		position: relative;
		flex: 0 0 auto;
		width: 38px;
		height: 33px;
		transform-origin: 52% 60%;
		background:
			repeating-linear-gradient(13deg, rgba(0, 0, 0, 0.14) 0 2px, transparent 2px 7px),
			linear-gradient(138deg, #8a6240, #664828);
		filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45));
		transition:
			transform 0.85s var(--ease-heavy),
			filter 0.7s var(--ease-settle),
			background 0.65s ease;
	}
	.compact .box {
		width: 30px;
		height: 26px;
	}
	/* nine subtly different flattened-box silhouettes, no two alike */
	.stop:nth-child(9n + 1) .box {
		clip-path: polygon(6% 11%, 92% 4%, 96% 90%, 10% 95%);
	}
	.stop:nth-child(9n + 2) .box {
		clip-path: polygon(4% 7%, 90% 10%, 95% 88%, 8% 96%);
	}
	.stop:nth-child(9n + 3) .box {
		clip-path: polygon(9% 8%, 95% 5%, 89% 93%, 5% 87%);
	}
	.stop:nth-child(9n + 4) .box {
		clip-path: polygon(5% 13%, 87% 6%, 97% 85%, 13% 93%);
	}
	.stop:nth-child(9n + 5) .box {
		clip-path: polygon(11% 5%, 93% 13%, 87% 91%, 6% 85%);
	}
	.stop:nth-child(9n + 6) .box {
		clip-path: polygon(6% 9%, 90% 3%, 96% 92%, 9% 90%);
	}
	.stop:nth-child(9n + 7) .box {
		clip-path: polygon(4% 11%, 94% 7%, 88% 95%, 12% 87%);
	}
	.stop:nth-child(9n + 8) .box {
		clip-path: polygon(10% 6%, 96% 11%, 90% 87%, 5% 93%);
	}
	.stop:nth-child(9n + 9) .box {
		clip-path: polygon(7% 13%, 88% 5%, 97% 89%, 8% 96%);
	}

	/* hover & focus — the box leans and settles under its own weight */
	.marker:hover .box,
	.marker:focus-visible .box {
		transform: translateX(5px) rotate(-2.6deg) skewX(-2.2deg) scale(1.07);
		filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.55));
		background:
			repeating-linear-gradient(13deg, rgba(0, 0, 0, 0.12) 0 2px, transparent 2px 7px),
			linear-gradient(138deg, #c4885a, #9a6539);
	}
	/* active / current — fully set down, weight forward */
	.marker[aria-current='page'] .box {
		transform: translateX(9px) rotate(1.8deg) scale(1.14);
		filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.6));
		background:
			repeating-linear-gradient(13deg, rgba(0, 0, 0, 0.1) 0 2px, transparent 2px 7px),
			linear-gradient(138deg, #d2965f, #a66b3c);
	}
	.box-icon {
		position: absolute;
		right: 3px;
		bottom: 3px;
		width: 12px;
		height: 12px;
		color: var(--bone);
		opacity: 0.5;
		transition: opacity 0.5s var(--ease-settle);
	}
	.compact .box-icon {
		width: 10px;
		height: 10px;
	}
	.marker:hover .box-icon,
	.marker:focus-visible .box-icon,
	.marker[aria-current='page'] .box-icon {
		opacity: 0.9;
	}

	.label {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.label .t {
		font-family: var(--serif);
		font-weight: 400;
		font-size: 1.1rem;
		letter-spacing: -0.01em;
		color: var(--ash);
		transition: color 0.6s var(--ease-settle);
	}
	.compact .label .t {
		font-size: 0.96rem;
	}
	.marker:hover .label .t,
	.marker:focus-visible .label .t,
	.marker[aria-current='page'] .label .t {
		color: var(--bone);
	}

	/* reduced motion: the box does not lean at all, not just faster */
	:global(html.motion-still) .marker:hover .box,
	:global(html.motion-still) .marker:focus-visible .box,
	:global(html.motion-still) .marker[aria-current='page'] .box {
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.marker:hover .box,
		.marker:focus-visible .box,
		.marker[aria-current='page'] .box {
			transform: none;
		}
	}

	.reader {
		position: sticky;
		top: 30px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 34px 36px;
		min-height: 260px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
	}
	.chapter .ix {
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.16em;
		color: var(--kraft);
	}
	.ix-track {
		text-transform: uppercase;
	}
	.chapter h2 {
		font-weight: 400;
		font-size: 2.1rem;
		letter-spacing: -0.01em;
		margin: 0 0 14px;
		line-height: 1.05;
	}
	.motif {
		height: 56px;
		margin: 0 0 20px;
		opacity: 0;
		animation: motif-in 0.5s var(--ease-settle) 0.1s forwards;
	}
	.motif svg {
		width: 140px;
		height: 56px;
		stroke: var(--kraft);
		fill: none;
	}
	.chapter.cool .motif svg {
		stroke: var(--breath);
	}
	@keyframes motif-in {
		to {
			opacity: 1;
		}
	}

	/* inclusive-dance: two circles breathing in and out of sync, coming
	   together and apart */
	.m-a,
	.m-b {
		stroke-width: 1.6;
		animation: motif-breathe 2.6s ease-in-out infinite;
	}
	.m-b {
		animation-delay: 0.5s;
	}
	@keyframes motif-breathe {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.55;
		}
		50% {
			transform: scale(1.12);
			opacity: 1;
		}
	}

	/* company: a pulse of light travelling along both connecting lines */
	.m-line {
		stroke-width: 1.4;
		stroke-dasharray: 4 4;
		animation: motif-pulse-line 1.8s linear infinite;
	}
	.m-node {
		fill: var(--kraft);
		stroke: none;
	}
	.chapter.cool .m-node {
		fill: var(--breath);
	}
	.m-node-2 {
		animation: motif-node-glow 2.2s ease-in-out 0.3s infinite;
	}
	.m-node-3 {
		animation: motif-node-glow 2.2s ease-in-out 0.6s infinite;
	}
	@keyframes motif-pulse-line {
		to {
			stroke-dashoffset: -16;
		}
	}
	@keyframes motif-node-glow {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}

	/* o-ciclo-da-invisibilidade: the cycle arrow slowly turns, fading as it
	   goes — visible, then not */
	.m-spin {
		stroke-width: 1.6;
		transform-origin: 32px 16px;
		animation:
			motif-spin 4.5s linear infinite,
			motif-fade 4.5s ease-in-out infinite;
	}
	@keyframes motif-spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes motif-fade {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}

	/* tania-carvalho: a gesture line draws itself, over and over */
	.m-draw {
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-dasharray: 34;
		animation: motif-draw 2.2s var(--ease-settle) infinite;
	}
	@keyframes motif-draw {
		0% {
			stroke-dashoffset: 34;
			opacity: 0.4;
		}
		60%,
		100% {
			stroke-dashoffset: 0;
			opacity: 1;
		}
	}

	/* process: a shared rhythm line flows left to right */
	.m-flow {
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-dasharray: 10 8;
		animation: motif-pulse-line 1.4s linear infinite;
	}

	/* diogo: three boxes take turns settling, as if being stacked */
	.m-box {
		stroke-width: 1.4;
		transform-box: fill-box;
		transform-origin: 50% 100%;
		animation: motif-stack 2.4s var(--ease-settle) infinite;
	}
	.m-box-2 {
		animation-delay: 0.25s;
	}
	.m-box-3 {
		animation-delay: 0.5s;
	}
	@keyframes motif-stack {
		0%,
		15% {
			transform: translateY(-6px);
			opacity: 0.5;
		}
		35%,
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	/* isabel: a single light breathing, slow and steady */
	.m-breathe {
		stroke-width: 1.6;
		animation: motif-breathe-slow 3.2s ease-in-out infinite;
	}
	@keyframes motif-breathe-slow {
		0%,
		100% {
			transform: scale(0.85);
			opacity: 0.45;
		}
		50% {
			transform: scale(1.15);
			opacity: 1;
		}
	}

	/* performance: a stage beam warms up and dims, over and over */
	.m-beam,
	.m-beam-line {
		stroke-width: 1.4;
		animation: motif-fade 2.4s ease-in-out infinite;
	}
	/* the spotlight cone reads better filled, faintly, on top of its outline */
	.m-beam {
		fill: currentColor;
		fill-opacity: 0.08;
	}

	/* post-dance: loose particles drifting, echoing the light↔boxes sandbox */
	.m-drift {
		fill: var(--kraft);
		stroke: none;
		animation: motif-drift 3s ease-in-out infinite;
	}
	.chapter.cool .m-drift {
		fill: var(--breath);
	}
	.m-drift-2 {
		animation-delay: 0.4s;
	}
	.m-drift-3 {
		animation-delay: 0.8s;
	}
	.m-drift-4 {
		animation-delay: 1.2s;
	}
	@keyframes motif-drift {
		0%,
		100% {
			transform: translateY(0);
			opacity: 0.6;
		}
		50% {
			transform: translateY(-6px);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.motif {
			opacity: 1;
			animation: none;
		}
		.motif svg * {
			animation: none !important;
			opacity: 1 !important;
			transform: none !important;
		}
	}
	:global(html.motion-still) .motif {
		opacity: 1;
		animation: none;
	}
	:global(html.motion-still) .motif svg * {
		animation: none !important;
		opacity: 1 !important;
		transform: none !important;
	}
	.chapter .path {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--ash-dim);
		letter-spacing: 0.04em;
		border-top: 1px solid var(--line);
		padding-top: 16px;
	}
	.hint {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash-dim);
		margin-top: 22px;
	}

	@media (max-width: 820px) {
		.spine-stage:not(.compact) {
			grid-template-columns: 1fr;
			gap: 30px;
		}
		.reader {
			position: relative;
			top: 0;
		}
	}

	.mobile-toggle {
		display: none;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		gap: 14px;
		background: none;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 12px 16px;
		cursor: pointer;
		color: inherit;
		font-family: inherit;
		text-align: left;
	}
	.mobile-toggle:hover,
	.mobile-toggle:focus-visible {
		border-color: var(--line-strong);
	}
	.mobile-toggle-label {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.mobile-toggle .t {
		font-family: var(--serif);
		font-size: 1.02rem;
		color: var(--bone);
	}
	.mobile-toggle .chevron {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--kraft);
		flex: 0 0 auto;
	}

	@media (max-width: 900px) {
		.compact .mobile-toggle {
			display: flex;
		}
		.compact .spine {
			display: none;
			margin-top: 14px;
		}
		.compact.mobile-open .spine {
			display: block;
		}
	}
</style>
