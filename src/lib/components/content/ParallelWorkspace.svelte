<!--
  The dual-column comparison at the heart of Chapter 5: one shared "phase"
  stepper (1–4) and one shared "view" toggle (sketch / photo / video) drive
  BOTH columns at once, so picking a phase or a view always shows Isabel's
  and Diogo's corresponding asset side by side — never one dancer without the
  other. Only the active phase's three assets per column are ever mounted (a
  {#key phase} block tears the rest down), so at most two videos exist in the
  DOM at once no matter how many phases the piece has. Isabel's column reads
  cool (--breath), Diogo's reads warm (--kraft) — the same pairing already
  used for them elsewhere on the site.
-->
<script lang="ts">
	import { t } from '$lib/i18n';

	type ViewMode = 'sketch' | 'photo' | 'video';

	interface DancerAssets {
		name: string;
		solo: string;
		note: string;
		sketch: { src: string; alt: string };
		photo: { src: string; alt: string };
		video: { src: string; poster: string; alt: string };
	}

	interface Phase {
		label: string;
		isabela: DancerAssets;
		diogo: DancerAssets;
	}

	const phases = $derived<Phase[]>([
		{
			label: $t('process.phase.contention'),
			isabela: {
				name: 'Isabel',
				solo: 'Sibela',
				note: $t('process.note.isabela1'),
				sketch: {
					src: '/photos/process/storyboards/isabela-1.jpg',
					alt: 'Storyboard sketch: Isabel seated in a chair, hands at her face'
				},
				photo: {
					src: '/photos/process/evolution/isabela-1.jpg',
					alt: 'Isabel in rehearsal, seated in a chair'
				},
				video: {
					src: '/videos/process/isabela-1.mp4',
					poster: '/photos/process/posters/isabela-1.jpg',
					alt: 'Isabel rehearsing the seated opening of Sibela'
				}
			},
			diogo: {
				name: 'Diogo',
				solo: 'Digoo',
				note: $t('process.note.diogo1'),
				sketch: {
					src: '/photos/process/storyboards/diogo-1.jpg',
					alt: 'Storyboard sketch: Diogo standing with arms raised'
				},
				photo: {
					src: '/photos/process/evolution/diogo-1.jpg',
					alt: 'Diogo in rehearsal, standing in an open stance'
				},
				video: {
					src: '/videos/process/diogo-1.mp4',
					poster: '/photos/process/posters/diogo-1.jpg',
					alt: 'Diogo rehearsing the opening stance of Digoo'
				}
			}
		},
		{
			label: $t('process.phase.emergence'),
			isabela: {
				name: 'Isabel',
				solo: 'Sibela',
				note: $t('process.note.isabela2'),
				sketch: {
					src: '/photos/process/storyboards/isabela-2.jpg',
					alt: 'Storyboard sketch: Isabel rising, hair covering her face'
				},
				photo: {
					src: '/photos/process/evolution/isabela-2.jpg',
					alt: 'Isabel in rehearsal, mid-rise, walking'
				},
				video: {
					src: '/videos/process/isabela-2.mp4',
					poster: '/photos/process/posters/isabela-2.jpg',
					alt: 'Isabel rehearsing the emerging walk of Sibela'
				}
			},
			diogo: {
				name: 'Diogo',
				solo: 'Digoo',
				note: $t('process.note.diogo2'),
				sketch: {
					src: '/photos/process/storyboards/diogo-2.jpg',
					alt: 'Storyboard sketch: Diogo holding a box against his chest'
				},
				photo: {
					src: '/photos/process/evolution/diogo-2.jpg',
					alt: 'Diogo in rehearsal, holding a box, weight off-axis'
				},
				video: {
					src: '/videos/process/diogo-2.mp4',
					poster: '/photos/process/posters/diogo-2.jpg',
					alt: 'Diogo rehearsing the box sequence of Digoo'
				}
			}
		},
		{
			label: $t('process.phase.release'),
			isabela: {
				name: 'Isabel',
				solo: 'Sibela',
				note: $t('process.note.isabela3'),
				sketch: {
					src: '/photos/process/storyboards/isabela-3.jpg',
					alt: 'Storyboard sketch: Isabel kneeling with an arm raised'
				},
				photo: {
					src: '/photos/process/evolution/isabela-3.jpg',
					alt: 'Isabel in rehearsal, kneeling on the floor'
				},
				video: {
					src: '/videos/process/isabela-3.mp4',
					poster: '/photos/process/posters/isabela-3.jpg',
					alt: 'Isabel rehearsing the kneel-and-release passage of Sibela'
				}
			},
			diogo: {
				name: 'Diogo',
				solo: 'Digoo',
				note: $t('process.note.diogo3'),
				sketch: {
					src: '/photos/process/storyboards/diogo-3.jpg',
					alt: 'Storyboard sketch: Diogo facing a tower of boxes, arms raised'
				},
				photo: {
					src: '/photos/process/evolution/diogo-3.jpg',
					alt: 'Diogo in rehearsal, facing a stack of boxes'
				},
				video: {
					src: '/videos/process/diogo-3.mp4',
					poster: '/photos/process/posters/diogo-3.jpg',
					alt: 'Diogo rehearsing in front of the box tower in Digoo'
				}
			}
		},
		{
			label: $t('process.phase.transformation'),
			isabela: {
				name: 'Isabel',
				solo: 'Sibela',
				note: $t('process.note.isabela4'),
				sketch: {
					src: '/photos/process/storyboards/isabela-4.jpg',
					alt: 'Storyboard sketch: Isabel returning in a gold dress'
				},
				photo: {
					src: '/photos/process/evolution/isabela-4.jpg',
					alt: 'Isabel in rehearsal, wearing the gold dress'
				},
				video: {
					src: '/videos/process/isabela-4.mp4',
					poster: '/photos/process/posters/isabela-4.jpg',
					alt: 'Isabel rehearsing the closing return of Sibela, in gold'
				}
			},
			diogo: {
				name: 'Diogo',
				solo: 'Digoo',
				note: $t('process.note.diogo4'),
				sketch: {
					src: '/photos/process/storyboards/diogo-4.jpg',
					alt: 'Storyboard sketch: Diogo falling among the collapsing boxes'
				},
				photo: {
					src: '/photos/process/evolution/diogo-4.jpg',
					alt: 'Diogo in rehearsal, boxes scattered around him'
				},
				video: {
					src: '/videos/process/diogo-4.mp4',
					poster: '/photos/process/posters/diogo-4.jpg',
					alt: 'Diogo rehearsing the collapse that closes Digoo'
				}
			}
		}
	]);

	const views = $derived<{ key: ViewMode; label: string }[]>([
		{ key: 'sketch', label: $t('process.view.sketch') },
		{ key: 'photo', label: $t('process.view.photo') },
		{ key: 'video', label: $t('process.view.video') }
	]);

	let phase = $state(0);
	let view = $state<ViewMode>('sketch');
	let isabelaVideoEl = $state<HTMLVideoElement>();
	let diogoVideoEl = $state<HTMLVideoElement>();

	$effect(() => {
		if (view === 'video') {
			isabelaVideoEl?.play().catch(() => {});
			diogoVideoEl?.play().catch(() => {});
		} else {
			isabelaVideoEl?.pause();
			diogoVideoEl?.pause();
		}
	});
</script>

<section class="workspace">
	<h2>{$t('process.workspace-h2')}</h2>
	<p class="workspace-lede">{$t('process.workspace-lede')}</p>

	<div class="workspace-controls">
		<div class="phase-stepper" role="group" aria-label={$t('process.phase-group-aria')}>
			{#each phases as p, i (p.label)}
				<button
					type="button"
					class="phase-btn"
					class:active={phase === i}
					onclick={() => (phase = i)}
					aria-pressed={phase === i}
				>
					<span class="phase-n">0{i + 1}</span>
					<span class="phase-l">{p.label}</span>
				</button>
			{/each}
		</div>
		<div class="view-toggle" role="group" aria-label={$t('process.asset-group-aria')}>
			{#each views as v (v.key)}
				<button
					type="button"
					class="view-btn"
					class:active={view === v.key}
					onclick={() => (view = v.key)}
					aria-pressed={view === v.key}
				>
					{v.label}
				</button>
			{/each}
		</div>
	</div>

	{#key phase}
		<div class="columns">
			<div class="dancer-col cool">
				<div class="col-head">
					<span class="col-name">Isabel</span>
					<span class="col-solo">— Sibela</span>
				</div>
				<div class="viewer">
					<img
						class="layer"
						class:on={view === 'sketch'}
						src={phases[phase].isabela.sketch.src}
						alt={phases[phase].isabela.sketch.alt}
					/>
					<img
						class="layer"
						class:on={view === 'photo'}
						src={phases[phase].isabela.photo.src}
						alt={phases[phase].isabela.photo.alt}
					/>
					<video
						bind:this={isabelaVideoEl}
						class="layer"
						class:on={view === 'video'}
						src={phases[phase].isabela.video.src}
						poster={phases[phase].isabela.video.poster}
						aria-label={phases[phase].isabela.video.alt}
						muted
						loop
						playsinline
						preload="none"
					></video>
				</div>
				<p class="col-note">{phases[phase].isabela.note}</p>
			</div>

			<div class="dancer-col warm">
				<div class="col-head">
					<span class="col-name">Diogo</span>
					<span class="col-solo">— Digoo</span>
				</div>
				<div class="viewer">
					<img
						class="layer"
						class:on={view === 'sketch'}
						src={phases[phase].diogo.sketch.src}
						alt={phases[phase].diogo.sketch.alt}
					/>
					<img
						class="layer"
						class:on={view === 'photo'}
						src={phases[phase].diogo.photo.src}
						alt={phases[phase].diogo.photo.alt}
					/>
					<video
						bind:this={diogoVideoEl}
						class="layer"
						class:on={view === 'video'}
						src={phases[phase].diogo.video.src}
						poster={phases[phase].diogo.video.poster}
						aria-label={phases[phase].diogo.video.alt}
						muted
						loop
						playsinline
						preload="none"
					></video>
				</div>
				<p class="col-note">{phases[phase].diogo.note}</p>
			</div>
		</div>
	{/key}
</section>

<style>
	.workspace {
		margin: 80px 28px 0;
		border-top: 1px solid var(--line);
		padding-top: 48px;
	}
	.workspace h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.2rem);
		margin: 0 0 8px;
		color: var(--bone);
	}
	.workspace-lede {
		color: var(--ash);
		margin: 0 0 28px;
	}

	.workspace-controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}
	.phase-stepper {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.phase-btn {
		display: flex;
		align-items: baseline;
		gap: 7px;
		background: none;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 9px 16px;
		cursor: pointer;
		transition:
			border-color 0.3s ease,
			background 0.3s ease;
	}
	.phase-n {
		font-family: var(--mono);
		font-size: 11px;
		color: var(--ash-dim);
	}
	.phase-l {
		font-size: 0.85rem;
		color: var(--ash);
	}
	.phase-btn:hover,
	.phase-btn:focus-visible {
		border-color: var(--line-strong);
	}
	.phase-btn.active {
		border-color: var(--kraft-deep);
		background: rgba(196, 136, 90, 0.1);
	}
	.phase-btn.active .phase-n,
	.phase-btn.active .phase-l {
		color: var(--bone);
	}

	.view-toggle {
		display: flex;
		gap: 6px;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 3px;
	}
	.view-btn {
		background: none;
		border: 0;
		border-radius: 999px;
		padding: 7px 16px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
		cursor: pointer;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}
	.view-btn.active {
		background: var(--bone);
		color: var(--ink);
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		animation: col-in 0.5s var(--ease-settle) both;
	}
	@keyframes col-in {
		/* transform only, never opacity — text inside must stay at full
		   contrast even mid-animation, not just once the animation settles */
		from {
			transform: translateY(10px);
		}
		to {
			transform: translateY(0);
		}
	}

	.dancer-col {
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--line);
	}
	.col-head {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 14px 16px;
	}
	.col-name {
		font-family: var(--serif);
		font-weight: 600;
		font-size: 1.05rem;
		color: var(--bone);
	}
	.col-solo {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		color: var(--ash);
	}
	.dancer-col.cool .col-head {
		border-bottom: 2px solid var(--breath-deep);
	}
	.dancer-col.warm .col-head {
		border-bottom: 2px solid var(--kraft-deep);
	}

	.viewer {
		position: relative;
		aspect-ratio: 16 / 9;
		background: var(--stage-deep);
	}
	.layer {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.45s var(--ease-settle),
			transform 0.45s var(--ease-settle);
		transform: scale(1.02);
	}
	.layer.on {
		opacity: 1;
		pointer-events: auto;
		transform: scale(1);
	}

	.col-note {
		margin: 0;
		padding: 14px 16px 18px;
		color: var(--bone);
		font-weight: 700;
		font-size: 0.95rem;
	}

	@media (max-width: 720px) {
		.columns {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.columns {
			animation: none;
		}
		.layer {
			transition: none;
			transform: none;
		}
	}
	:global(html.motion-still) .columns {
		animation: none !important;
	}
	:global(html.motion-still) .layer {
		transition: none !important;
		transform: none !important;
	}
</style>
