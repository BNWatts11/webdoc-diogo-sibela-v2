<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{page.status} · Sibela &amp; Digoo</title>
</svelte:head>

<article class="error-page">
	<span class="ix">{page.status}</span>
	<p class="poetic">This stop isn't on the spine.</p>
	<h1>Not found</h1>
	<p class="body">
		{page.error?.message ?? 'Something has gone missing.'} Follow the thread back to where it starts.
	</p>
	<a class="back" href={resolve('/')}>Back to Sibela &amp; Digoo</a>
</article>

<style>
	.error-page {
		padding: 50px 28px 80px;
		max-width: 860px;
		margin: 0 auto;
	}
	.ix {
		display: block;
		font-family: var(--mono);
		font-size: 12px;
		letter-spacing: 0.16em;
		color: var(--kraft);
	}
	.poetic {
		font-family: var(--serif);
		font-style: italic;
		font-weight: 300;
		font-size: 1.5rem;
		color: var(--ash);
		margin: 10px 0 2px;
	}
	h1 {
		font-weight: 300;
		font-size: clamp(2.4rem, 6vw, 3.6rem);
		letter-spacing: -0.02em;
		margin: 0 0 26px;
		line-height: 1;
	}
	.body {
		font-size: 1.08rem;
		line-height: 1.7;
		color: var(--ash);
		max-width: 60ch;
		margin: 0 0 36px;
	}
	.back {
		display: inline-block;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--kraft);
		border: 1px solid var(--kraft-deep);
		border-radius: 99px;
		padding: 10px 20px;
		text-decoration: none;
		transition:
			border-color 0.3s ease,
			transform 0.3s var(--ease-heavy);
	}
	.back:hover,
	.back:focus-visible {
		border-color: var(--kraft);
		transform: translateY(-2px);
	}
</style>
