export interface ChapterMedia {
	type: 'video' | 'image';
	src: string;
	poster?: string;
	alt: string;
	/** caption label for gallery items, e.g. "Storyboard — Kinetic Boxes, panel 1";
	 * falls back to "Object study N" when absent */
	label?: string;
}

export interface SequenceCue {
	/** the cue number as called in rehearsal, e.g. 1–10 */
	n: number;
	/** short line naming the lighting/sound/movement change at this cue */
	text: string;
	/** production still for this cue, if one exists — cues driven by video-only
	 * documentation (no still) omit this */
	image?: string;
	/** a short audio preview for this cue, played on hover/focus of its rail
	 * button; set `audioIsPlaceholder` alongside it whenever this isn't the
	 * production's own recording */
	audio?: string;
	/** true when `audio` is a stand-in tone, not the actual production audio —
	 * surfaced in the UI so a placeholder is never mistaken for the real cue */
	audioIsPlaceholder?: boolean;
	/** a small illustrative animation shown on the main stage in place of a
	 * production still, for cues documented on video/audio only */
	visual?: 'bird' | 'cello' | 'rain';
}

export interface ReferenceCompany {
	name: string;
	/** e.g. "Portugal", "USA / Germany" */
	country: string;
	description: string;
	video: ChapterMedia;
	externalUrl: string;
	/** defaults to "Watch on YouTube" when absent */
	externalLabel?: string;
}

export interface ExtraClip {
	/** omit when this clip is a continuation of the one before it and doesn't
	 * need its own caption (e.g. a two-part clip sharing one title) */
	title?: string;
	video: ChapterMedia;
}

export interface ExtraClipGroup {
	/** group heading; omit for an untitled group (e.g. a lead-in set of clips
	 * with no shared label of its own) */
	heading?: string;
	/** an untitled lead-in clip shown above the group's own clip list, e.g. a
	 * general intro video that precedes a numbered project history */
	introVideo?: ChapterMedia;
	clips: ExtraClip[];
	/** link to the full-length source video, if the clips above are excerpts */
	externalUrl?: string;
	/** defaults to "Watch the full video" when absent */
	externalLabel?: string;
}

export interface LandmarkMoment {
	/** e.g. "1. Fundação e Pioneirismo (2001) - por Henrique Amoedo" */
	title: string;
	/** the clip revealed on hover/focus; omit (or leave alt starting with
	 * "[PLACEHOLDER") when the real clip isn't sourced yet */
	media?: ChapterMedia;
	/** renders a static waveform glyph inside the mask instead of media —
	 * for a moment whose source is an audio report, not a video/photo */
	isAudio?: boolean;
	/** one bold sentence explaining why the moment mattered */
	summary: string;
	/** link to the full-length source video, when the revealed clip is an excerpt */
	externalUrl?: string;
	/** defaults to "Watch the full video" when absent */
	externalLabel?: string;
}

export interface DancerMoment {
	/** seconds into the clip where this line begins — clicking it cues the
	 * video here */
	time: number;
	/** the line exactly as subtitled in the film */
	text: string;
}

export interface DancerTestimony {
	/** short mono label above the framing text, e.g. "Dancers in their own words" */
	subtitle: string;
	/** 1–2 sentences: what the clip is and why it sits at this point */
	framing: string;
	/** one-line credit shown under the video — the clip is a montage of several
	 * dancers, so this credits the group, not an individual */
	credit: string;
	video: ChapterMedia;
	/** full text of the subtitles, offered through the player's transcript toggle */
	transcript?: string;
	/** the lines worth cueing, in clip order */
	moments: DancerMoment[];
}

export interface ArtisticPhilosophy {
	/** small mono label above the heading, e.g. "Artistic Philosophy" */
	kicker: string;
	/** the philosophy's own name, stated plainly, e.g. "Make a Difference" */
	heading: string;
	statement: string;
	attribution: string;
	/** optional 1–2 sentences bridging this statement to what follows on the
	 * page (the track record, then the case study) */
	body?: string;
}

export interface CaseStudy {
	/** small mono label above the heading, tying this back to the chapter's
	 * philosophy, e.g. "Make a Difference, in practice" */
	kicker: string;
	heading: string;
	/** framing paragraph — why this particular story is the philosophy made
	 * concrete, not just another clip in a list */
	intro: string;
	clips: ExtraClip[];
	/** link to the full-length source video, if the clips above are excerpts */
	externalUrl?: string;
	/** defaults to "Watch the full story" when absent */
	externalLabel?: string;
}

export interface SynthesisHighlights {
	heading?: string;
	/** 1-2 sentences framing why these particular highlights are here, and
	 * why they're short excerpts rather than the full source recording */
	intro?: string;
	items: { title: string; video: ChapterMedia }[];
	/** the full-length source, offered once for the whole set */
	externalUrl?: string;
	externalLabel?: string;
}

export interface ChapterEdition {
	/** section heading, e.g. "Ciclo da (In)visibilidade (1.ª Edição)" */
	heading: string;
	/** the edition's poster/still image */
	poster?: { src: string; alt: string };
	/** this edition's own intro clip */
	video?: ChapterMedia;
	interviewUrl?: string;
	/** defaults to "Watch the full interview" when absent */
	interviewLabel?: string;
	programUrl?: string;
	/** defaults to "See the programme" when absent */
	programLabel?: string;
	/** which entrance treatment the heading uses — each edition gets its own
	 * distinct effect; defaults to 'flicker' (the first edition's) */
	titleVariant?: 'flicker' | 'wipe';
}

export interface ChapterContent {
	/** route slug, e.g. 'isabel' */
	id: string;
	/** 1–9, position on the spine */
	order: number;
	/** which of the two navigation tracks this chapter belongs to: the
	 * chronological performance chapters (Tânia Carvalho → Post-Dance) or the
	 * surrounding context/organization chapters (Inclusive Dance → O Ciclo) */
	track: 'performance' | 'context';
	title: string;
	/** the short mono "gloss" under the title, e.g. "06 · breath & the chair" */
	gloss: string;
	/** the italic one-line poetic gloss shown in the nav reader panel */
	poetic: string;
	/** which pole this chapter belongs to, for warm/cool marker styling. Context
	 * chapters (01–04, 07–09) have none. */
	pole?: 'diogo' | 'isabel';
	/** the dancer-profile portrait; falls back to a placeholder silhouette when absent */
	portrait?: { src: string; alt: string };
	heroMedia: ChapterMedia;
	/** a second intro clip shown right after the hero, before the body copy —
	 * e.g. context/explanation following an opening clip */
	secondaryHero?: ChapterMedia;
	/** short caption/title shown above the secondary hero clip */
	secondaryHeroTitle?: string;
	body: string[];
	pullQuote?: {
		text: string;
		attribution: string;
		/** link to the full interview/source the quote is drawn from, if any */
		externalUrl?: string;
		/** defaults to "Read the full interview" when absent */
		externalLabel?: string;
	};
	/** renders the pull quote after all other chapter content instead of its
	 * default spot right after the body copy — a closing note rather than an
	 * upfront one. Ignored when `pullQuoteInline` is set. */
	pullQuotePosition?: 'end';
	/** threads the pull quote into a specific extraClipGroup instead of
	 * rendering it in its own default spot — e.g. a quote break partway
	 * through a long project timeline. `afterClipIndex` is 0-based. */
	pullQuoteInline?: { groupHeading: string; afterClipIndex: number };
	gallery?: ChapterMedia[];
	/** a numbered lighting/sound/movement score — the production's own cue sheet */
	sequence?: { title: string; meta: string; cues: SequenceCue[] };
	/** a single dancer's first-person account, spotlighted in its own
	 * responsive video + pull-quotes block — rendered right after the body
	 * copy, ahead of any academic/reference material below it */
	dancerTestimony?: DancerTestimony;
	/** the company's stated artistic philosophy, given its own explicit,
	 * titled section rather than sitting as an unlabelled pull quote */
	philosophy?: ArtisticPhilosophy;
	/** one story framed as the philosophy above made concrete — rendered as
	 * a visually distinct callout, not another entry in extraClipGroups */
	caseStudy?: CaseStudy;
	/** a compact row of short embedded highlights, replacing what would
	 * otherwise be a plain clip group leaning on a "watch the full video"
	 * link to carry the content */
	synthesisHighlights?: SynthesisHighlights;
	/** external companies cited as artistic/technical reference points, each
	 * with its own clip and outbound link */
	referenceCompanies?: ReferenceCompany[];
	/** supplementary interview/context clips, grouped under their own heading */
	extraClipGroups?: ExtraClipGroup[];
	/** shared heading shown above all of this chapter's extraClipGroups;
	 * omit when the groups' own headings (or lack of one) are enough */
	extraClipGroupsHeading?: string;
	/** dedicated subsections for each edition of a recurring event/project,
	 * rendered after the secondary hero and before the body copy */
	editions?: ChapterEdition[];
	/** heading for the invisibility-themed hover-reveal timeline, e.g.
	 * "Momentos Marcantes" */
	momentsHeading?: string;
	moments?: LandmarkMoment[];
}
