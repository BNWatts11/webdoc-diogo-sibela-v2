import { derived } from 'svelte/store';
import { language, type Language } from '$lib/stores/language';
import { translations, chapterTranslationsPt } from './translations';

/** `$t('console.sound.name')` — reactive to the language store, falls back to English. */
export const t = derived(language, ($language) => {
	const dict = translations[$language];
	return (key: string) => dict[key] ?? translations.en[key] ?? key;
});

type ChapterLike = { id: string; title: string; gloss: string; poetic: string };

export function chapterTitle(chapter: ChapterLike, lang: Language): string {
	if (lang === 'pt') return chapterTranslationsPt[chapter.id]?.title ?? chapter.title;
	return chapter.title;
}

export function chapterGloss(chapter: ChapterLike, lang: Language): string {
	if (lang === 'pt') return chapterTranslationsPt[chapter.id]?.gloss ?? chapter.gloss;
	return chapter.gloss;
}

export function chapterPoetic(chapter: ChapterLike, lang: Language): string {
	if (lang === 'pt') return chapterTranslationsPt[chapter.id]?.poetic ?? chapter.poetic;
	return chapter.poetic;
}
