<!--
  Minimal EN | PT switch for the persistent rail. Two real buttons (not a
  single toggle) so each language is a directly selectable, labelled state
  rather than a "click to flip" control — clearer for screen readers and for
  a first-time visitor who doesn't know which state they're in yet.
-->
<script lang="ts">
	import { language } from '$lib/stores/language';
	import { t } from '$lib/i18n';
</script>

<div class="lang-toggle" role="group" aria-label={$t('lang-toggle.aria')}>
	<button
		type="button"
		class="lang-btn"
		aria-pressed={$language === 'en'}
		onclick={() => language.set('en')}
	>
		EN
	</button>
	<span class="sep" aria-hidden="true">|</span>
	<button
		type="button"
		class="lang-btn"
		aria-pressed={$language === 'pt'}
		onclick={() => language.set('pt')}
	>
		PT
	</button>
</div>

<style>
	.lang-toggle {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
	}
	.lang-btn {
		background: none;
		border: 1px solid transparent;
		border-radius: 4px;
		padding: 3px 6px;
		color: var(--ash);
		cursor: pointer;
		font: inherit;
		letter-spacing: inherit;
		transition:
			color 0.3s var(--ease-heavy),
			border-color 0.3s var(--ease-heavy),
			background-color 0.3s var(--ease-heavy);
	}
	.lang-btn:hover {
		color: var(--bone);
	}
	.lang-btn[aria-pressed='true'] {
		color: var(--ink);
		background: var(--kraft);
		border-color: var(--kraft);
	}
	.sep {
		color: var(--ash-dim);
	}
</style>
