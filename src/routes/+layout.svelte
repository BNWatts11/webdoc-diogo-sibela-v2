<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import StageBackground from '$lib/components/shell/StageBackground.svelte';
	import NavSpine from '$lib/components/shell/NavSpine.svelte';
	import HouseConsole from '$lib/components/shell/HouseConsole.svelte';
	import LanguageToggle from '$lib/components/shell/LanguageToggle.svelte';
	import SiteFooter from '$lib/components/shell/SiteFooter.svelte';
	import { currentChapterId } from '$lib/stores/chapter';
	import { t } from '$lib/i18n';

	let { children } = $props();

	$effect(() => {
		const slug = page.url.pathname.replace(/^\//, '');
		currentChapterId.set(slug || null);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- per-page og:title/description/image live where each page already sets
	     its own <title>; these are the tags every page shares exactly once. -->
	<meta property="og:site_name" content="Sibela & Digoo" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<StageBackground />

<a class="skip-link" href="#main">{$t('skip-link')}</a>

<div class="app-shell">
	<aside class="rail" aria-label={$t('nav.aria-chapter-nav')}>
		<div class="rail-head">
			<a class="home-link" href={resolve('/')}>Sibela &amp; Digoo</a>
			<LanguageToggle />
		</div>
		<NavSpine compact />
		<a
			class="about-rail-link"
			href={resolve('/about')}
			aria-current={page.url.pathname === '/about' ? 'page' : undefined}>{$t('nav.about-link')}</a
		>
	</aside>

	<main id="main">
		{@render children()}
		<SiteFooter />
	</main>
</div>

<HouseConsole />

<style>
	.skip-link {
		position: fixed;
		top: -100px;
		left: 12px;
		z-index: 100;
		background: var(--kraft);
		color: var(--ink);
		padding: 10px 16px;
		border-radius: 4px;
		font-family: var(--mono);
		font-size: 12px;
		text-decoration: none;
		transition: top 0.2s ease;
	}
	.skip-link:focus-visible {
		top: 12px;
	}

	.app-shell {
		display: grid;
		grid-template-columns: minmax(220px, 260px) 1fr;
		min-height: 100vh;
	}
	.rail {
		position: sticky;
		top: 0;
		align-self: start;
		height: 100vh;
		overflow-y: auto;
		padding: 26px 20px 90px;
		border-right: 1px solid var(--line);
	}
	.rail-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 30px;
	}
	.home-link {
		display: block;
		font-family: var(--serif);
		font-weight: 300;
		font-size: 1.3rem;
		color: var(--bone);
		text-decoration: none;
		letter-spacing: -0.01em;
	}
	.home-link:hover,
	.home-link:focus-visible {
		color: var(--kraft);
	}
	.about-rail-link {
		display: block;
		margin-top: 24px;
		padding-top: 16px;
		border-top: 1px solid var(--line);
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ash-dim);
		text-decoration: none;
		transition: color 0.3s ease;
	}
	.about-rail-link:hover,
	.about-rail-link:focus-visible {
		color: var(--kraft);
	}
	.about-rail-link[aria-current='page'] {
		color: var(--kraft);
	}

	main {
		min-width: 0;
		padding-bottom: 90px;
	}

	@media (max-width: 900px) {
		.app-shell {
			grid-template-columns: 1fr;
		}
		.rail {
			position: relative;
			height: auto;
			top: 0;
			border-right: none;
			border-bottom: 1px solid var(--line);
			padding: 18px 20px;
		}
		/* On mobile the rail collapses to just the chapter-drawer toggle —
		   this link stayed permanently visible on every page otherwise
		   (it sits outside NavSpine's own collapsible drawer), which is the
		   opposite of "discreet". The footer link below the page content is
		   the mobile entry point instead. */
		.about-rail-link {
			display: none;
		}
	}
</style>
