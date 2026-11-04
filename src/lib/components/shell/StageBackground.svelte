<!--
  The shared linen/grain stage background (ported from every reference file's
  body / body::before rules). Fixed behind all content. Reacts to the scene
  store only indirectly: scene.ts sets data-scene on <html>, and the rules
  below key off that attribute directly, same as reference/10-access.html.
-->
<div class="stage-bg" aria-hidden="true"></div>
<div class="stage-grain" aria-hidden="true"></div>

<style>
	.stage-bg {
		position: fixed;
		inset: 0;
		z-index: -2;
		background-image:
			radial-gradient(125% 90% at 50% -12%, rgba(236, 228, 214, 0.06), transparent 60%),
			radial-gradient(70% 55% at 16% 28%, rgba(168, 186, 184, 0.05), transparent 62%),
			radial-gradient(72% 58% at 86% 72%, rgba(196, 136, 90, 0.06), transparent 62%),
			linear-gradient(176deg, var(--stage-wash) 0%, var(--ink) 42%, var(--stage-deep) 100%);
		transition: opacity 0.7s var(--ease-heavy);
	}

	.stage-grain {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		opacity: 0.055;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
		background-size: 220px 220px;
		transition: opacity 0.7s var(--ease-heavy);
	}

	/* the designed high-contrast scenes drop the warm wash + grain for maximum clarity */
	:global(html[data-scene='silhouette']) .stage-bg,
	:global(html[data-scene='wash']) .stage-bg,
	:global(html[data-scene='editorial']) .stage-bg {
		background-image: none;
		background-color: var(--ink);
	}
	:global(html[data-scene='silhouette']) .stage-grain,
	:global(html[data-scene='wash']) .stage-grain,
	:global(html[data-scene='editorial']) .stage-grain {
		opacity: 0;
	}
</style>
