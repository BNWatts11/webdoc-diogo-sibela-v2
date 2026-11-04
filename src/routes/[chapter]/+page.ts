import { error } from '@sveltejs/kit';
import { chapters, getChapter } from '$lib/content/chapters';
import type { EntryGenerator } from './$types';

export const prerender = true;

// 'post-dance' has its own dedicated route (it hosts the Final Map),
// 'tania-carvalho' and 'process' do too (each too custom — video/gesture-
// driven, or a dual-column parallel comparison — to fit the shared generic
// template), 'diogo'/'isabel' now do as well (each dancer's chapter has
// its own dedicated hero treatment and intro layout), and 'performance'
// does too (a split-screen audio hero, video mural, press wall, tour map,
// and kinetic outro) — all six are excluded here to avoid clashing with
// those static routes during prerender.
const excluded = new Set([
	'post-dance',
	'tania-carvalho',
	'process',
	'diogo',
	'isabel',
	'performance'
]);

export const entries: EntryGenerator = () =>
	chapters.filter((c) => !excluded.has(c.id)).map((c) => ({ chapter: c.id }));

export function load({ params }) {
	const chapter = getChapter(params.chapter);
	if (!chapter || excluded.has(chapter.id)) {
		error(404, 'Chapter not found');
	}
	return { chapter };
}
