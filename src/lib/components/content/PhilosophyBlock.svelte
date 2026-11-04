<!--
  The company's stated artistic philosophy, given an explicit, named section
  instead of an unlabelled pull quote dropped mid-page — the specific gap an
  advisor flagged on the "Dançando com a Diferença" chapter.
-->
<script lang="ts">
	import type { ArtisticPhilosophy } from '$lib/content/schema';
	import { reveal } from '$lib/actions/reveal';

	let { philosophy }: { philosophy: ArtisticPhilosophy } = $props();
</script>

<section class="philosophy" use:reveal>
	<span class="kicker">{philosophy.kicker}</span>
	<h2>{philosophy.heading}</h2>
	<blockquote class="statement">
		<p>{philosophy.statement}</p>
		<cite>{philosophy.attribution}</cite>
	</blockquote>
	{#if philosophy.body}
		<p class="philosophy-body">{philosophy.body}</p>
	{/if}
</section>

<style>
	.philosophy {
		margin: 56px 0;
		padding: 40px 36px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);

		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s var(--ease-settle),
			transform 0.7s var(--ease-settle);
	}
	.philosophy:global(.is-visible) {
		opacity: 1;
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.philosophy {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .philosophy {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	.kicker {
		display: block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--kraft);
		margin: 0 0 10px;
	}
	h2 {
		font-weight: 300;
		font-size: clamp(1.8rem, 4vw, 2.4rem);
		margin: 0 0 24px;
		color: var(--bone);
	}
	.statement {
		margin: 0 0 20px;
		padding-left: 22px;
		border-left: 3px solid var(--kraft-deep);
		max-width: 56ch;
	}
	.statement p {
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: clamp(1.3rem, 2.6vw, 1.6rem);
		line-height: 1.4;
		color: var(--bone);
		margin: 0 0 10px;
	}
	.statement cite {
		font-family: var(--mono);
		font-style: normal;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
	}
	.philosophy-body {
		font-size: 1rem;
		line-height: 1.65;
		color: var(--ash);
		max-width: 62ch;
		margin: 0;
	}
</style>
