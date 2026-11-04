<!--
  Dancer profile — ported from reference/01-structure-mockup.html's
  "Dancer profile" wireframe: portrait, "Who is X?" copy, and the scenic
  object each solo leaves behind (boxes for Diogo, the chair for Isabel).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		name,
		pole,
		portraitSrc,
		portraitAlt,
		sceneObjectLabel,
		children
	}: {
		name: string;
		pole: 'diogo' | 'isabel';
		portraitSrc: string;
		portraitAlt: string;
		sceneObjectLabel: string;
		children?: Snippet;
	} = $props();
</script>

<div class="profile" class:cool={pole === 'isabel'}>
	<div class="grid">
		<figure class="portrait">
			<img src={portraitSrc} alt={portraitAlt} loading="lazy" />
		</figure>
		<div class="copy">
			<span class="eyebrow">Who is {name.split(' ')[0]}?</span>
			{#if children}{@render children()}{/if}
		</div>
	</div>
	<div class="scene-object">
		<span class="tag">Scenic object</span>
		<span class="v">{sceneObjectLabel}</span>
	</div>
</div>

<style>
	.profile {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 28px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent);
	}
	.grid {
		display: grid;
		grid-template-columns: minmax(160px, 240px) 1fr;
		gap: 28px;
		align-items: start;
	}
	.portrait {
		margin: 0;
		border-radius: 4px;
		overflow: hidden;
		border: 1px solid var(--line-strong);
		aspect-ratio: 3/4;
	}
	.portrait img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.copy :global(p) {
		font-size: 1.02rem;
		color: var(--ash);
		max-width: 60ch;
	}
	.scene-object {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 22px;
		border-top: 1px solid var(--line);
		padding-top: 18px;
	}
	.tag {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--kraft);
		border: 1px solid var(--kraft-deep);
		border-radius: 99px;
		padding: 4px 11px;
	}
	.profile.cool .tag {
		color: var(--breath);
		border-color: var(--breath-deep);
	}
	.scene-object .v {
		font-family: var(--serif);
		font-size: 1.05rem;
		color: var(--bone);
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.portrait {
			max-width: 220px;
		}
	}
</style>
