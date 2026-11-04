<script lang="ts">
	import type { ReferenceCompany } from '$lib/content/schema';
	import { reveal } from '$lib/actions/reveal';
	import { t } from '$lib/i18n';

	let { companies }: { companies: ReferenceCompany[] } = $props();
</script>

<div class="reference-grid">
	{#each companies as company, i (company.name)}
		<article class="reference-card" use:reveal style="--delay: {i * 90}ms">
			<div class="reference-video">
				<video
					src={company.video.src}
					poster={company.video.poster}
					aria-label={company.video.alt}
					controls
					preload="metadata"
				>
					<track kind="captions" />
				</video>
			</div>
			<div class="reference-copy">
				<h3>{company.name} <span class="country">({company.country})</span></h3>
				<p>{company.description}</p>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={company.externalUrl} target="_blank" rel="noopener noreferrer" class="learn-more">
					{company.externalLabel ?? $t('label.watch-youtube')}
					<span class="arrow" aria-hidden="true">↗</span>
				</a>
			</div>
		</article>
	{/each}
</div>

<style>
	.reference-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 24px;
		margin: 32px 0;
	}

	.reference-card {
		border: 1px solid var(--line);
		border-radius: 8px;
		overflow: hidden;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.018), transparent);

		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.7s var(--ease-settle) var(--delay, 0ms),
			transform 0.7s var(--ease-settle) var(--delay, 0ms);
	}
	.reference-card:global(.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}
	@media (prefers-reduced-motion: reduce) {
		.reference-card {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
	:global(html.motion-still) .reference-card {
		opacity: 1 !important;
		transform: none !important;
		transition: none !important;
	}

	/* Hover elevation — a separate, undelayed transition so it responds
	   immediately regardless of the entrance stagger above. */
	.reference-card:global(.is-visible) {
		transition:
			opacity 0.7s var(--ease-settle) var(--delay, 0ms),
			transform 0.35s var(--ease-heavy),
			box-shadow 0.35s var(--ease-heavy);
	}
	.reference-card:global(.is-visible):hover,
	.reference-card:global(.is-visible):focus-within {
		transform: translateY(-6px);
		box-shadow: 0 18px 34px -20px rgba(0, 0, 0, 0.7);
	}
	@media (prefers-reduced-motion: reduce) {
		.reference-card:hover,
		.reference-card:focus-within {
			transform: none;
			box-shadow: none;
		}
	}
	:global(html.motion-still) .reference-card:hover,
	:global(html.motion-still) .reference-card:focus-within {
		transform: none !important;
		box-shadow: none !important;
	}

	.reference-video {
		background: var(--stage-deep);
		aspect-ratio: 16 / 9;
	}
	.reference-video video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.reference-copy {
		padding: 18px 20px 22px;
	}
	h3 {
		font-family: var(--serif);
		font-weight: 400;
		font-size: 1.24rem;
		margin: 0 0 10px;
		color: var(--bone);
	}
	.country {
		font-family: var(--mono);
		font-size: 0.72rem;
		font-weight: 400;
		letter-spacing: 0.04em;
		color: var(--ash-dim);
	}
	p {
		font-size: 0.94rem;
		line-height: 1.6;
		color: var(--ash);
		margin: 0 0 16px;
	}
	.learn-more {
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
	.learn-more:hover,
	.learn-more:focus-visible {
		color: var(--bone);
	}
	.learn-more .arrow {
		display: inline-block;
		transition: transform 0.25s var(--ease-heavy);
	}
	.learn-more:hover .arrow,
	.learn-more:focus-visible .arrow {
		transform: translate(2px, -2px);
	}
	@media (prefers-reduced-motion: reduce) {
		.learn-more:hover .arrow,
		.learn-more:focus-visible .arrow {
			transform: none;
		}
	}
	:global(html.motion-still) .learn-more:hover .arrow,
	:global(html.motion-still) .learn-more:focus-visible .arrow {
		transform: none !important;
	}
</style>
