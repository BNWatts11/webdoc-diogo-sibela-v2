<!-- A literary pull-quote — Fraunces italic, kraft/breath rule, mono attribution. -->
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let {
		text,
		attribution,
		cool = false,
		animated = false
	}: { text: string; attribution: string; cool?: boolean; animated?: boolean } = $props();
</script>

<blockquote class="pull-quote" class:cool class:animated use:reveal>
	<p>{text}</p>
	<cite>{attribution}</cite>
</blockquote>

<style>
	.pull-quote {
		margin: 40px 0;
		padding-left: 26px;
		border-left: 3px solid var(--kraft-deep);
		max-width: 56ch;
	}
	.pull-quote.cool {
		border-left-color: var(--breath-deep);
	}

	/* Animated variant: the rule grows top-down via a scaled pseudo-element
	   (cheaper than animating border/height), then the quote fades in from
	   the side once the rule has finished. */
	.pull-quote.animated {
		position: relative;
		border-left-color: transparent;
	}
	.pull-quote.animated::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 3px;
		background: var(--kraft-deep);
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 0.6s var(--ease-settle);
	}
	.pull-quote.animated.cool::before {
		background: var(--breath-deep);
	}
	.pull-quote.animated:global(.is-visible)::before {
		transform: scaleY(1);
	}
	.pull-quote.animated p,
	.pull-quote.animated cite {
		opacity: 0;
		transform: translateX(-14px);
		transition:
			opacity 0.6s var(--ease-settle) 0.5s,
			transform 0.6s var(--ease-settle) 0.5s;
	}
	.pull-quote.animated:global(.is-visible) p,
	.pull-quote.animated:global(.is-visible) cite {
		opacity: 1;
		transform: translateX(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.pull-quote.animated::before {
			transform: scaleY(1);
			transition: none;
		}
		.pull-quote.animated p,
		.pull-quote.animated cite {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .pull-quote.animated::before {
		transform: scaleY(1) !important;
		transition: none !important;
	}
	:global(html.motion-still) .pull-quote.animated p,
	:global(html.motion-still) .pull-quote.animated cite {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	.pull-quote p {
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: 1.6rem;
		line-height: 1.3;
		color: var(--bone);
		margin: 0 0 10px;
	}
	.pull-quote cite {
		font-family: var(--mono);
		font-style: normal;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ash);
	}
</style>
