import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * The lighting scene — ported from 10-access.html's console. "silhouette" is
 * the lived-in default (black-box theater); "wash" and "editorial" are the
 * other two designed AAA-contrast states, not a bolted-on high-contrast mode.
 * Applied as data-scene on <html> so every component re-lights purely from
 * CSS custom properties.
 */
export type Scene = 'silhouette' | 'wash' | 'editorial';

const STORAGE_KEY = 'sibela-digoo:scene';

function createSceneStore() {
	let initial: Scene = 'silhouette';
	if (browser) {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved === 'silhouette' || saved === 'wash' || saved === 'editorial') {
			initial = saved;
		}
	}

	const { subscribe, set } = writable<Scene>(initial);

	function apply(value: Scene) {
		if (browser) {
			document.documentElement.setAttribute('data-scene', value);
			window.localStorage.setItem(STORAGE_KEY, value);
		}
		set(value);
	}

	if (browser) apply(initial);

	return {
		subscribe,
		set: apply,
		get: () => get({ subscribe })
	};
}

export const scene = createSceneStore();
