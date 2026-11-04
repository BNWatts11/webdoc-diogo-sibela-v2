import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * `prefers-reduced-motion` seeds the default; the visitor can still override it
 * manually via the house console ("Stillness"). The manual toggle always wins
 * once touched, so the initial OS read must only run once, on load.
 */
function createMotionStore() {
	const initial = browser ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

	const { subscribe, set } = writable<boolean>(initial);

	function apply(value: boolean) {
		if (browser) {
			document.documentElement.classList.toggle('motion-still', value);
		}
		set(value);
	}

	if (browser) apply(initial);

	return {
		subscribe,
		set: apply,
		toggle: () => apply(!get({ subscribe }))
	};
}

export const reducedMotion = createMotionStore();
