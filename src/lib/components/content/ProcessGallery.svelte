<!--
  Closing photo gallery — the evolution photos from both solos, paired phase
  by phase. Each tile tracks the pointer with a single reused rAF loop (the
  `tilt` action below), writing straight to two CSS custom properties rather
  than touching component state, so hovering never triggers a Svelte
  re-render — just a transform update on the one tile involved.
-->
<script lang="ts">
	import { t } from '$lib/i18n';

	interface Photo {
		src: string;
		alt: string;
		dancer: string;
		phase: string;
	}

	const photos = $derived<Photo[]>([
		{
			src: '/photos/process/evolution/isabela-1.jpg',
			alt: 'Isabel in rehearsal, seated in a chair',
			dancer: 'Isabel',
			phase: $t('process.phase.contention')
		},
		{
			src: '/photos/process/evolution/diogo-1.jpg',
			alt: 'Diogo in rehearsal, standing in an open stance',
			dancer: 'Diogo',
			phase: $t('process.phase.contention')
		},
		{
			src: '/photos/process/evolution/isabela-2.jpg',
			alt: 'Isabel in rehearsal, mid-rise, walking',
			dancer: 'Isabel',
			phase: $t('process.phase.emergence')
		},
		{
			src: '/photos/process/evolution/diogo-2.jpg',
			alt: 'Diogo in rehearsal, holding a box, weight off-axis',
			dancer: 'Diogo',
			phase: $t('process.phase.emergence')
		},
		{
			src: '/photos/process/evolution/isabela-3.jpg',
			alt: 'Isabel in rehearsal, kneeling on the floor',
			dancer: 'Isabel',
			phase: $t('process.phase.release')
		},
		{
			src: '/photos/process/evolution/diogo-3.jpg',
			alt: 'Diogo in rehearsal, facing a stack of boxes',
			dancer: 'Diogo',
			phase: $t('process.phase.release')
		},
		{
			src: '/photos/process/evolution/isabela-4.jpg',
			alt: 'Isabel in rehearsal, wearing the gold dress',
			dancer: 'Isabel',
			phase: $t('process.phase.transformation')
		},
		{
			src: '/photos/process/evolution/diogo-4.jpg',
			alt: 'Diogo in rehearsal, boxes scattered around him',
			dancer: 'Diogo',
			phase: $t('process.phase.transformation')
		}
	]);

	const MAX_DEG = 12;

	function tilt(node: HTMLElement) {
		let rafId: number | null = null;
		let px = 0;
		let py = 0;

		function apply() {
			node.style.setProperty('--rx', `${py}deg`);
			node.style.setProperty('--ry', `${px}deg`);
			rafId = null;
		}
		function onMove(e: PointerEvent) {
			const rect = node.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width - 0.5;
			const y = (e.clientY - rect.top) / rect.height - 0.5;
			px = x * MAX_DEG;
			py = y * -MAX_DEG;
			if (rafId === null) rafId = requestAnimationFrame(apply);
		}
		function reset() {
			node.style.setProperty('--rx', '0deg');
			node.style.setProperty('--ry', '0deg');
		}

		node.addEventListener('pointermove', onMove);
		node.addEventListener('pointerleave', reset);
		return {
			destroy() {
				node.removeEventListener('pointermove', onMove);
				node.removeEventListener('pointerleave', reset);
				if (rafId !== null) cancelAnimationFrame(rafId);
			}
		};
	}
</script>

<section class="process-gallery">
	<h2>{$t('process.gallery-h2')}</h2>

	<div class="grid">
		{#each photos as photo (photo.src)}
			<button type="button" class="tile" use:tilt>
				<img src={photo.src} alt={photo.alt} loading="lazy" />
				<span class="caption">
					<span class="dancer">{photo.dancer}</span>
					<span class="phase">{photo.phase}</span>
				</span>
			</button>
		{/each}
	</div>
</section>

<style>
	.process-gallery {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.process-gallery h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 28px;
		color: var(--bone);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 18px;
	}
	.tile {
		position: relative;
		margin: 0;
		padding: 0;
		border: 0;
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 8px;
		overflow: hidden;
		background: var(--stage-deep);
		cursor: default;
		perspective: 700px;
		transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
		transition: transform 0.35s var(--ease-settle);
		will-change: transform;
	}
	.tile:hover,
	.tile:focus-visible {
		transform: perspective(700px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(1.04);
		box-shadow: 0 18px 34px -14px rgba(0, 0, 0, 0.6);
	}
	.tile img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.tile .caption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 10px 12px;
		background: linear-gradient(0deg, rgba(16, 12, 9, 0.88) 0%, transparent 100%);
		transform: translateY(60%);
		opacity: 0;
		transition:
			transform 0.35s var(--ease-settle),
			opacity 0.35s var(--ease-settle);
	}
	.tile:hover .caption,
	.tile:focus-visible .caption {
		transform: translateY(0);
		opacity: 1;
	}
	.dancer {
		font-family: var(--serif);
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--on-scrim);
	}
	.phase {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--on-scrim-dim);
	}

	@media (prefers-reduced-motion: reduce) {
		.tile,
		.tile .caption {
			transition: none;
		}
		.tile:hover,
		.tile:focus-visible {
			transform: none;
			box-shadow: none;
		}
	}
	:global(html.motion-still) .tile,
	:global(html.motion-still) .tile .caption {
		transition: none !important;
	}
	:global(html.motion-still) .tile:hover {
		transform: none !important;
		box-shadow: none !important;
	}
</style>
