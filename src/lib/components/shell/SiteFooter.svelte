<!--
  A small, quiet footer — the site had none before. Its one job is to give
  the About/Author Note page a second, discreet entry point (besides the
  rail link) that shows up at the bottom of every page's content, the way a
  reader would expect a colophon to.
-->
<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { t } from '$lib/i18n';
</script>

<footer class="site-footer">
	<div class="wrap">
		<p class="rights">{$t('footer.rights')}</p>
		<a
			class="about-link"
			href={resolve('/about')}
			aria-current={page.url.pathname === '/about' ? 'page' : undefined}>{$t('nav.about-link')}</a
		>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--line);
		padding: 22px 0 26px;
	}
	.site-footer .wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 10px 24px;
	}
	.rights {
		margin: 0;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.02em;
		color: var(--ash-dim);
	}
	.about-link {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ash-dim);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition:
			color 0.3s ease,
			border-color 0.3s ease;
	}
	.about-link:hover,
	.about-link:focus-visible {
		color: var(--kraft);
		border-color: var(--kraft-deep);
	}
	.about-link[aria-current='page'] {
		color: var(--kraft);
	}
</style>
