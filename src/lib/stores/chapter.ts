import { derived, writable } from 'svelte/store';
import { chapters } from '$lib/content/chapters';

/**
 * The "you are here" state for the persistent NavSpine (component 06).
 * Set from the current route in +layout.svelte; read by NavSpine to mark
 * aria-current and by the sound store to decide whether a chapter's arrival
 * cue (e.g. Isabel's breath) should play.
 */
export const currentChapterId = writable<string | null>(null);

export const currentChapter = derived(currentChapterId, ($id) =>
	$id ? (chapters.find((c) => c.id === $id) ?? null) : null
);

export const currentChapterIndex = derived(currentChapterId, ($id) =>
	$id ? chapters.findIndex((c) => c.id === $id) : -1
);
