<!--
  A plain ticking countdown to a single target date/time — used by the
  homepage's "Encontrar o Espetáculo" premiere block. `targetDate` is a
  configurable prop (any string `Date` can parse, e.g. an ISO datetime) so
  the real premiere date can be swapped in later without touching this
  component. No animation on the digits themselves: it's a text value that
  changes once a second, not motion, so there's nothing to gate behind
  prefers-reduced-motion/Stillness.
-->
<script lang="ts">
	import { t } from '$lib/i18n';

	let { targetDate }: { targetDate: string } = $props();

	let now = $state(Date.now());

	$effect(() => {
		const id = setInterval(() => {
			now = Date.now();
		}, 1000);
		return () => clearInterval(id);
	});

	const remainingMs = $derived(Math.max(0, new Date(targetDate).getTime() - now));
	const hasPassed = $derived(remainingMs <= 0);
	const days = $derived(Math.floor(remainingMs / 86_400_000));
	const hours = $derived(Math.floor((remainingMs % 86_400_000) / 3_600_000));
	const minutes = $derived(Math.floor((remainingMs % 3_600_000) / 60_000));
	const seconds = $derived(Math.floor((remainingMs % 60_000) / 1000));

	function pad(n: number) {
		return String(n).padStart(2, '0');
	}
</script>

<!-- aria-live="off": the value changes every second, so a live region would
     read the countdown aloud continuously. The premiere date/venue are also
     given as plain static text alongside this widget wherever it's used, so
     that information doesn't depend on the ticking display at all. -->
<div class="countdown" role="timer" aria-live="off" aria-label={$t('home.countdown-aria')}>
	{#if hasPassed}
		<p class="countdown-live">{$t('home.countdown-live')}</p>
	{:else}
		<ul class="countdown-units">
			<li class="unit">
				<span class="unit-value">{days}</span>
				<span class="unit-label">{$t('home.countdown-days')}</span>
			</li>
			<li class="unit">
				<span class="unit-value">{pad(hours)}</span>
				<span class="unit-label">{$t('home.countdown-hours')}</span>
			</li>
			<li class="unit">
				<span class="unit-value">{pad(minutes)}</span>
				<span class="unit-label">{$t('home.countdown-min')}</span>
			</li>
			<li class="unit">
				<span class="unit-value">{pad(seconds)}</span>
				<span class="unit-label">{$t('home.countdown-sec')}</span>
			</li>
		</ul>
	{/if}
</div>

<style>
	.countdown {
		display: flex;
		justify-content: center;
	}
	.countdown-units {
		display: flex;
		align-items: baseline;
		gap: 22px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		min-width: 52px;
	}
	.unit-value {
		font-family: var(--mono);
		font-weight: 600;
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		line-height: 1;
		color: var(--kraft);
		font-variant-numeric: tabular-nums;
	}
	.unit-label {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ash-dim);
	}
	.countdown-live {
		margin: 0;
		font-family: var(--mono);
		font-size: 1.1rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--kraft);
	}

	@media (max-width: 480px) {
		.countdown-units {
			gap: 14px;
		}
		.unit {
			min-width: 44px;
		}
	}
</style>
