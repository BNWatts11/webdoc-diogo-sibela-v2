import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Site language — same store shape as scene.ts (persisted + applied as a DOM
 * side effect on set), so every component that reads $language re-renders
 * its own text purely from the translation dictionary.
 */
export type Language = 'en' | 'pt';

const STORAGE_KEY = 'sibela-digoo:lang';

function createLanguageStore() {
	let initial: Language = 'en';
	if (browser) {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === 'en' || saved === 'pt') {
			initial = saved;
		}
	}

	const { subscribe, set } = writable<Language>(initial);

	function apply(value: Language) {
		if (browser) {
			document.documentElement.setAttribute('lang', value);
			window.localStorage.setItem(STORAGE_KEY, value);
		}
		set(value);
	}

	if (browser) apply(initial);

	return {
		subscribe,
		set: apply,
		toggle: () => apply(get({ subscribe }) === 'en' ? 'pt' : 'en'),
		get: () => get({ subscribe })
	};
}

export const language = createLanguageStore();
