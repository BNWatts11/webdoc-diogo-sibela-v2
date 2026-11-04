<!--
  Video that rejects the hard rectangle — ported from reference/08-video-frame.html.
  The four masks (spotlight pool, cast box-shadows, hand-cut aperture, torn
  SVG-turbulence dissolve) are presentation-only, applied to a wrapper around
  a real <video> element; captions/controls stay on the real element per the
  accessibility notes in that file. Breathing/drift is disabled under
  reduced motion.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		src,
		poster,
		alt,
		variant = 'spotlight',
		captions,
		controls = true,
		autoplay = false,
		loop = true,
		children
	}: {
		src: string;
		poster?: string;
		alt: string;
		variant?: 'spotlight' | 'cast' | 'aperture' | 'torn';
		captions?: string;
		controls?: boolean;
		autoplay?: boolean;
		loop?: boolean;
		children?: Snippet;
	} = $props();

	// Where footage hasn't been shot yet, `src` points at a placeholder image
	// rather than a real video file (see content/chapters.ts) — render that
	// as a static image in the same masked frame instead of a broken <video>.
	const isRealVideo = $derived(/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(src));
</script>

<figure class="stage-video t-{variant}">
	<div class="frame-wrap">
		{#if isRealVideo}
			<video
				class="media"
				{src}
				{poster}
				{controls}
				muted={autoplay}
				{loop}
				autoplay={autoplay || undefined}
				playsinline
				aria-label={alt}
			>
				{#if captions}
					<track kind="captions" src={captions} default />
				{/if}
				Your browser does not support embedded video.
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={src}>Download the file</a> instead.
			</video>
		{:else}
			<img class="media" src={poster ?? src} alt={alt.replace(/^\[PLACEHOLDER[^\]]*\]\s*/i, '')} />
		{/if}
	</div>
	{#if variant === 'spotlight' || variant === 'cast'}
		<div class="breathe" aria-hidden="true"></div>
	{/if}
	{#if variant === 'cast'}
		<div class="shadow" aria-hidden="true">
			<b class="s1"></b><b class="s2"></b><b class="s3"></b>
		</div>
	{/if}
	{#if children}
		<figcaption>{@render children()}</figcaption>
	{/if}
</figure>

<style>
	.stage-video {
		position: relative;
		margin: 0;
		min-height: 320px;
	}
	.frame-wrap {
		position: absolute;
		inset: 0;
	}
	.media {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: linear-gradient(158deg, #2c2016, #120d09 78%);
	}

	@keyframes breathe {
		0%,
		100% {
			opacity: 0.78;
			transform: scale(1.02);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}
	.breathe {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(60% 78% at 50% 44%, transparent 46%, var(--ink) 88%);
		animation: breathe 7s ease-in-out infinite;
	}

	/* 1 · spotlight pool — a soft oval of light, no border */
	.t-spotlight .media {
		-webkit-mask-image: radial-gradient(56% 70% at 50% 46%, #000 36%, transparent 82%);
		mask-image: radial-gradient(56% 70% at 50% 46%, #000 36%, transparent 82%);
	}
	.t-spotlight .breathe {
		background: radial-gradient(52% 64% at 50% 46%, transparent 44%, var(--ink) 86%);
	}

	/* 2 · cast by boxes — soft box-shaped shadows fall across the frame */
	.t-cast .media {
		-webkit-mask-image: radial-gradient(80% 96% at 50% 50%, #000 60%, transparent 100%);
		mask-image: radial-gradient(80% 96% at 50% 50%, #000 60%, transparent 100%);
	}
	.t-cast .shadow {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 3;
	}
	.t-cast .shadow b {
		position: absolute;
		display: block;
		background: linear-gradient(180deg, rgba(8, 6, 4, 0.92), rgba(8, 6, 4, 0.2));
		filter: blur(7px);
	}
	.t-cast .shadow .s1 {
		top: -8%;
		left: -6%;
		width: 46%;
		height: 62%;
		clip-path: polygon(0 0, 86% 6%, 72% 96%, 0 84%);
		transform: rotate(-3deg);
	}
	.t-cast .shadow .s2 {
		bottom: -10%;
		right: -8%;
		width: 52%;
		height: 58%;
		clip-path: polygon(20% 8%, 100% 0, 100% 100%, 4% 92%);
		transform: rotate(4deg);
		opacity: 0.9;
	}
	.t-cast .shadow .s3 {
		bottom: -6%;
		left: 30%;
		width: 26%;
		height: 40%;
		clip-path: polygon(0 18%, 100% 0, 86% 100%, 8% 88%);
		opacity: 0.7;
	}

	/* 3 · hand-cut aperture — irregular clip-path + feathered inset vignette */
	.t-aperture .frame-wrap {
		clip-path: polygon(3% 9%, 92% 3%, 99% 70%, 96% 94%, 8% 97%, 1% 40%);
	}
	.t-aperture .media {
		-webkit-mask-image: radial-gradient(78% 86% at 50% 50%, #000 58%, transparent 99%);
		mask-image: radial-gradient(78% 86% at 50% 50%, #000 58%, transparent 99%);
	}
	.t-aperture .frame-wrap::after {
		content: '';
		position: absolute;
		inset: 0;
		box-shadow: inset 0 0 60px 24px rgba(16, 12, 9, 0.9);
		pointer-events: none;
		z-index: 3;
	}

	/* 4 · torn dissolve — an SVG mask displaced by noise, then blurred */
	.t-torn .media {
		-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='380'%3E%3Cfilter id='torn' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.016' numOctaves='2' seed='6' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='48' xChannelSelector='R' yChannelSelector='G'/%3E%3CfeGaussianBlur stdDeviation='7'/%3E%3C/filter%3E%3Cellipse cx='300' cy='190' rx='250' ry='150' fill='%23fff' filter='url(%23torn)'/%3E%3C/svg%3E");
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='380'%3E%3Cfilter id='torn' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.016' numOctaves='2' seed='6' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='48' xChannelSelector='R' yChannelSelector='G'/%3E%3CfeGaussianBlur stdDeviation='7'/%3E%3C/filter%3E%3Cellipse cx='300' cy='190' rx='250' ry='150' fill='%23fff' filter='url(%23torn)'/%3E%3C/svg%3E");
		-webkit-mask-size: cover;
		mask-size: cover;
		-webkit-mask-position: center;
		mask-position: center;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
	}

	figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -34px;
		font-family: var(--hand);
		font-size: 1.3rem;
		color: var(--kraft);
		transform: rotate(-1.4deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.breathe {
			animation: none;
		}
	}
	:global(html.motion-still) .breathe {
		animation: none !important;
	}
</style>
