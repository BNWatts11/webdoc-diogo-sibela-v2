<!--
  The house console — access controls staged as part of the room, not a
  corner widget. Ported directly from reference/10-access.html (lighting
  scenes, stillness) plus the sound controls from reference/07-sound-
  concept.html (enable + volume). The described-track and rehearsal-diary
  toggles were removed: both only ever drove RehearsalDiary.svelte, which no
  chapter renders, so the controls had no visible effect. Every remaining
  control is a real button with aria-pressed and an aria-label; everything
  here is a native, fully keyboard-operable control with the shared
  :focus-visible ring from app.css.
-->
<script lang="ts">
	import { scene, type Scene } from '$lib/stores/scene';
	import { reducedMotion } from '$lib/stores/motion';
	import { audio, soundEnabled, volume } from '$lib/stores/audio';
	import { t } from '$lib/i18n';

	let open = $state(false);

	const scenes: { id: Scene; key: string }[] = [
		{ id: 'silhouette', key: 'console.scene.silhouette' },
		{ id: 'wash', key: 'console.scene.wash' },
		{ id: 'editorial', key: 'console.scene.editorial' }
	];

	function onVolumeInput(e: Event) {
		audio.setVolume(Number((e.target as HTMLInputElement).value));
	}
</script>

<div class="console" class:open>
	<div class="console-head">
		<button
			class="disclose"
			aria-expanded={open}
			aria-controls="house-console-grid"
			onclick={() => (open = !open)}
		>
			<span class="ttl"><b>{$t('console.title-bold')}</b> · {$t('console.title-rest')}</span>
			<span class="chevron" aria-hidden="true">{open ? '▲' : '▼'}</span>
		</button>
	</div>

	{#if open}
		<div class="console-grid" id="house-console-grid">
			<div class="ctrl">
				<div class="lab">
					<span class="name">{$t('console.lighting.name')}</span><span class="sys"
						>{$t('console.lighting.sys')}</span
					>
				</div>
				<div class="scenes" role="group" aria-label={$t('console.lighting.name')}>
					{#each scenes as s (s.id)}
						<button
							class="scene-btn"
							aria-pressed={$scene === s.id}
							aria-label="{$t('console.lighting.name')}: {$t(s.key)}"
							onclick={() => scene.set(s.id)}
						>
							{$t(s.key)}
						</button>
					{/each}
				</div>
			</div>

			<div class="ctrl">
				<div class="lab">
					<span class="name">{$t('console.sound.name')}</span><span class="sys"
						>{$t('console.sound.sys')}</span
					>
				</div>
				<button
					class="toggle"
					aria-pressed={$soundEnabled}
					aria-label={$soundEnabled
						? $t('console.sound.mute-aria')
						: $t('console.sound.enable-aria')}
					onclick={audio.toggleEnabled}
				>
					{$soundEnabled ? $t('console.sound.on') : $t('console.sound.off')}
				</button>
				<div class="vol">
					<label for="house-vol">{$t('console.sound.volume-label')}</label>
					<input
						id="house-vol"
						type="range"
						min="0"
						max="100"
						value={$volume}
						oninput={onVolumeInput}
					/>
				</div>
			</div>

			<div class="ctrl">
				<div class="lab">
					<span class="name">{$t('console.stillness.name')}</span><span class="sys"
						>{$t('console.stillness.sys')}</span
					>
				</div>
				<button
					class="toggle"
					aria-pressed={$reducedMotion}
					aria-label={$reducedMotion
						? $t('console.stillness.turn-off-aria')
						: $t('console.stillness.turn-on-aria')}
					onclick={reducedMotion.toggle}
				>
					{$reducedMotion ? $t('console.stillness.on') : $t('console.stillness.off')}
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.console {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 40;
		border-top: 1px solid var(--line-strong);
		background: linear-gradient(180deg, var(--stage-deep), var(--penumbra-2) 40%);
		backdrop-filter: blur(6px);
	}
	.console-head {
		display: flex;
	}
	.disclose {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 14px;
		padding: 12px 20px;
		background: none;
		border: 0;
		color: inherit;
		font-family: inherit;
		cursor: pointer;
	}
	.ttl {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ash);
	}
	.ttl b {
		color: var(--bone);
	}
	.chevron {
		color: var(--ash-dim);
		font-size: 10px;
	}

	.console-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 8px;
		padding: 4px 12px 14px;
		max-height: 60vh;
		overflow-y: auto;
	}
	.ctrl {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 14px 16px;
	}
	.lab {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 10px;
	}
	.lab .name {
		font-family: var(--serif);
		font-size: 1.02rem;
	}
	.lab .sys {
		font-family: var(--mono);
		font-size: 9.5px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ash-dim);
	}
	.scenes {
		display: flex;
		gap: 7px;
		flex-wrap: wrap;
	}
	.scene-btn,
	.toggle {
		font-family: var(--mono);
		font-size: 10.5px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
		background: none;
		border: 1px solid var(--line-strong);
		border-radius: 99px;
		padding: 8px 13px;
		cursor: pointer;
		transition: all 0.4s var(--ease-heavy);
	}
	.toggle {
		width: 100%;
		text-align: center;
	}
	.scene-btn[aria-pressed='true'],
	.toggle[aria-pressed='true'] {
		background: var(--kraft);
		color: var(--ink);
		border-color: var(--kraft);
	}
	.scene-btn:hover,
	.toggle:hover {
		border-color: var(--bone);
		color: var(--bone);
	}
	.scene-btn[aria-pressed='true']:hover,
	.toggle[aria-pressed='true']:hover {
		color: var(--ink);
	}
	.vol {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 10px;
	}
	.vol label {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ash);
	}
	input[type='range'] {
		accent-color: var(--kraft);
		flex: 1;
	}
</style>
