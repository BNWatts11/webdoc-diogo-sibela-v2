<!--
  A single story framed as the chapter's stated philosophy made concrete —
  visually a distinct callout (bordered, tinted), not another entry in the
  generic clip-group list, so it can't read as a detached link at the bottom
  of the page.
-->
<script lang="ts">
	import type { CaseStudy } from '$lib/content/schema';
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/i18n';

	let { caseStudy }: { caseStudy: CaseStudy } = $props();
</script>

<section class="case-study" use:reveal>
	<span class="kicker">{caseStudy.kicker}</span>
	<div class="case-study-head">
		<h2>{caseStudy.heading}</h2>
		{#if caseStudy.externalUrl}
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				href={caseStudy.externalUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="case-study-link"
			>
				{caseStudy.externalLabel ?? $t('label.watch-full-video')} <span aria-hidden="true">↗</span>
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		{/if}
	</div>
	<p class="case-study-intro">{caseStudy.intro}</p>

	<div class="case-study-clips">
		{#each caseStudy.clips as clip, i (clip.video.src)}
			<figure class="case-study-clip" style="--delay: {i * 150}ms">
				<video
					src={clip.video.src}
					poster={clip.video.poster}
					aria-label={clip.video.alt}
					controls
					preload="metadata"
				>
					<track kind="captions" />
				</video>
				{#if clip.title}<figcaption>{clip.title}</figcaption>{/if}
			</figure>
		{/each}
	</div>
</section>

<style>
	.case-study {
		margin: 56px 0;
		padding: 40px 36px;
		border: 1px solid var(--kraft-deep);
		border-radius: 8px;
		background: linear-gradient(180deg, rgba(255, 181, 77, 0.06), transparent 60%);

		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s var(--ease-settle),
			transform 0.7s var(--ease-settle);
	}
	.case-study:global(.is-visible) {
		opacity: 1;
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.case-study {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .case-study {
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
	.case-study-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px 20px;
		margin: 0 0 16px;
	}
	.case-study-head h2 {
		font-weight: 300;
		font-size: clamp(1.6rem, 3.4vw, 2.1rem);
		margin: 0;
		color: var(--bone);
	}
	.case-study-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--kraft);
		text-decoration: none;
		border-bottom: 1px solid var(--kraft-deep);
		padding-bottom: 2px;
		transition: color 0.3s ease;
	}
	.case-study-link:hover,
	.case-study-link:focus-visible {
		color: var(--bone);
	}
	.case-study-intro {
		font-size: 1.02rem;
		line-height: 1.65;
		color: var(--ash);
		max-width: 62ch;
		margin: 0 0 28px;
	}

	.case-study-clips {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
	}
	.case-study-clip {
		margin: 0;
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.6s var(--ease-settle) var(--delay, 0ms),
			transform 0.6s var(--ease-settle) var(--delay, 0ms);
	}
	.case-study:global(.is-visible) .case-study-clip {
		opacity: 1;
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.case-study-clip {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .case-study-clip {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}
	.case-study-clip video {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 6px;
		background: var(--stage-deep);
	}
	.case-study-clip figcaption {
		font-size: 0.88rem;
		color: var(--ash);
		margin-top: 8px;
		line-height: 1.4;
	}
</style>
