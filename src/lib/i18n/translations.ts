import type { Language } from '$lib/stores/language';

/**
 * Shared-chrome string dictionary — the persistent nav, house console, and
 * layout copy that renders on every route. Per-chapter body prose (essays,
 * pull quotes, galleries, sequences) is not covered here yet; see
 * chapterTranslations below for the small subset (title/gloss/poetic) that
 * is, since those surface in the always-visible nav spine.
 */
export const translations: Record<Language, Record<string, string>> = {
	en: {
		'skip-link': 'Skip to content',
		'nav.aria-chapter-nav': 'Chapter navigation',
		'nav.aria-chapters': 'Chapters',
		'nav.chapters-fallback': 'Chapters',
		'nav.hint': '↑ ↓ move along the thread · enter to open',
		'nav.track-performance': 'The Performance',
		'nav.track-performance-short': 'performance',
		'nav.track-context': 'Context & Organization',
		'nav.track-context-short': 'context',

		'console.title-bold': 'House controls',
		'console.title-rest': 'set the room to how you need it',

		'console.lighting.name': 'Stage lighting',
		'console.lighting.sys': 'high contrast',
		'console.scene.silhouette': 'Silhouette',
		'console.scene.wash': 'Cold wash',
		'console.scene.editorial': 'Editorial · Archive',

		'console.sound.name': 'Sound',
		'console.sound.sys': 'web audio',
		'console.sound.on': 'Sound on — tap to mute',
		'console.sound.off': 'Enable sound',
		'console.sound.mute-aria': 'Mute sound',
		'console.sound.enable-aria': 'Enable sound',
		'console.sound.volume-label': 'Volume',

		'console.stillness.name': 'Stillness',
		'console.stillness.sys': 'reduced motion',
		'console.stillness.on': 'Stillness · on',
		'console.stillness.off': 'Stillness · off',
		'console.stillness.turn-on-aria': 'Turn on stillness',
		'console.stillness.turn-off-aria': 'Turn off stillness',

		'lang-toggle.aria': 'Change site language',

		'label.watch-youtube': 'Watch on YouTube',
		'label.watch-full-video': 'Watch the full video',
		'video.transcript-label': 'Transcript',
		'video.show-transcript-aria': 'Show transcript',
		'video.hide-transcript-aria': 'Hide transcript',
		'testimony.list-aria': 'Jump to a moment in the film',
		'testimony.subtitle-note': 'Lines as subtitled in the film',
		'label.watch-full-interview': 'Watch the full interview',
		'label.see-programme': 'See the programme',
		'label.read-full-interview': 'Read the full interview',

		'section.reference-companies': 'Global reference points doing this work',

		'ciclo.click-here': 'Click here',
		'ciclo.click-reveal-aria': 'Reveal and play the introductory video',

		'tania.mural-h2': 'Who is Tânia Carvalho?',
		'tania.mural-lede': 'Click a facet to reveal it',
		'tania.mural-group-aria': "Facets of Tânia Carvalho's identity",
		'tania.lens-lede': 'Move the cursor across the image',
		'tania.reel-hint': 'Scroll to move through the piece',
		'tania.listen-interview': 'Listen to the interview',
		'tania.popup-close-aria': 'Close',
		'tania.work-heading': 'Work within the Company',
		'tania.work-subtitle': 'Behind the Gestures',
		'tania.note-doesdicon':
			'Tânia\'s first collaboration with the company was her show "Doesdicon (2016)".',
		'tania.note-sibela-digoo': 'Second work was "Sibela & Digoo (2026)"',

		'process.climax-h2': 'Final touches before the big day',
		'process.climax-subtitle': 'Dress Rehearsal Excerpt',
		'process.climax-framing':
			'Filmed the night before the premiere, this excerpt is the last full run before an audience — everything documented so far in this chapter converges here.',
		'process.workspace-h2': 'The Rehearsal & Evolution Workspace',
		'process.workspace-lede': 'The journey from the notes to the final rehearsal',
		'process.phase-group-aria': 'Rehearsal phase',
		'process.asset-group-aria': 'Asset type',
		'process.view.sketch': 'Sketch',
		'process.view.photo': 'Photo',
		'process.view.video': 'Video',
		'process.phase.contention': 'Contention',
		'process.phase.emergence': 'Emergence',
		'process.phase.release': 'Release',
		'process.phase.transformation': 'Transformation',
		'process.note.isabela1': 'Seated. Stillness. Hands rise to the face.',
		'process.note.diogo1': 'Standing. Arms sweep back, chest opens.',
		'process.note.isabela2': 'Rising from the chair. Hair veils the face.',
		'process.note.diogo2': 'Weight shifts. A white box held to the chest.',
		'process.note.isabela3': 'Kneeling, then free — pure improvisation.',
		'process.note.diogo3': 'Facing the tower. Tension breaks into vibration.',
		'process.note.isabela4': 'Exit. Return in gold.',
		'process.note.diogo4': 'The tower falls. He falls with it.',
		'process.gallery-h2': 'Process & Evolution',

		'gallery.object-study': 'Object study {n}',

		'cue.badge-prefix': 'Cue',
		'cue.rail-aria-suffix': '— cue by cue',
		'cue.audio-hint': '♪ Hover or focus a sound cue to preview',
		'cue.audio-hint-placeholder':
			'♪ Hover or focus a sound cue to preview — placeholder tone, the production recording is still to come',

		'gallery.objects-study-h2': 'Objects Study',

		'diogo.who-h2': 'Who is Diogo?',
		'diogo.who-line': 'Diogo Freitas began his career at Dançando com a Diferença in 2013.',
		'diogo.milestone1-label': 'Joins the company',
		'diogo.milestone1-detail':
			'Diogo starts dancing with Dançando com a Diferença in the show called "Doesdicon (2016)".',
		'diogo.milestone2-label': '"Digoo" premieres',
		'diogo.milestone2-detail': 'His solo, choreographed by Tânia Carvalho, opens on tour.',
		'diogo.milestone3-year': 'Curiosity',
		'diogo.milestone3-label': 'Endless joy',
		'diogo.milestone3-detail': 'Always ready to sing "Cinderela" by Carlos Paião.',
		'diogo.costume-label': 'His own design',
		'diogo.costume-caption': 'Diogo designed his own costumes for the piece.',
		'diogo.joy-caption': 'Diogo, mid-rehearsal, beside a tower of boxes.',

		'isabel.who-h2': 'Who is Isabel?',
		'isabel.who-line': 'Isabel Teixeira started at Dançando com a Diferença in 2012.',
		'isabel.milestone1-label': 'Joins the company',
		'isabel.milestone1-detail':
			'She starts also dancing with Dançando com a Diferença in the show "Doesdicon (2016)".',
		'isabel.milestone2-year': 'Organised',
		'isabel.milestone2-label': 'A careful, exacting artist',
		'isabel.milestone2-detail':
			'Behind her slender, elegant figure is someone precise and thorough. These traits led her to take on additional responsibilities within the company.',
		'isabel.milestone3-year': 'Curiosity',
		'isabel.milestone3-label': 'Warm, attentive, sweet',
		'isabel.milestone3-detail': 'She also loves to sing.',
		'isabel.costume-label': 'Behind the design',
		'isabel.costume-caption':
			"Isabel helped design the boxes and costumes for Diogo's solo and chose the dress she wears in her own.",
		'isabel.teaser-caption': 'An excerpt from the official "Sibela" teaser.',
		'isabel.score-note':
			'Cue 4\'s audio preview is an excerpt from the official "Sibela" teaser, not the live production recording.',

		'performance.choose-solo-aria': 'Choose a solo to enter',
		'performance.side-sub-sibela': 'Solo by Isabel Teixeira',
		'performance.side-sub-digoo': 'Solo by Diogo Freitas',
		'performance.choose-side-hint': 'Choose a side',
		'performance.select-to-enter': 'Select to enter the chapter.',
		'performance.composer-credit': "Diogo Alvim: Music for 'Sibela e Digoo' - Portfolio ↗",
		'performance.play-teaser-aria': "Play {name}'s teaser — {role}",
		'performance.mural-caption': "Click a circle to watch that solo's teaser.",
		'performance.close-teaser-aria': 'Close teaser and choose again',
		'performance.critical-echoes-h2': 'Critical Echoes',
		'performance.read-review': 'Read the full review ↗',
		'performance.tour-h2': 'The 2026 National Tour',
		'performance.tour-viseu-when': 'January 2026',
		'performance.tour-viseu-detail':
			'National premiere, at the 14th NANT — Novas Idades, Novos Tempos festival.',
		'performance.tour-leiria-when': 'Winter 2026',
		'performance.tour-evora-when': 'July 2026',
		'performance.see-show-page': 'See the show page ↗',
		'performance.gallery-h2': 'From the Stage',
		'performance.photo-sibela': 'Sibela — the chair solo',
		'performance.photo-digoo': 'Digoo — weight and boxes',
		'performance.photo-viseu': 'Viseu — national premiere',
		'performance.photo-leiria': 'Leiria — winter leg',
		'performance.photo-evora': 'Évora — closing performance',

		'postdance.light-to-boxes-h2': 'Light to Boxes',
		'postdance.sandbox-aria': 'Switch the sandbox between light and boxes',
		'postdance.mode-isabel': 'Isabel — Light',
		'postdance.mode-diogo': 'Diogo — Boxes',
		'postdance.caption-light': 'Move the cursor through the light',
		'postdance.caption-boxes': 'Drag each box into a marked spot. Fill them all to set them loose.',
		'postdance.lab-h2': 'Storyboard Design Lab',
		'postdance.track-tablist-aria': 'Storyboard track',
		'postdance.step-rail-aria': '{label} steps',
		'postdance.step-aria': 'Step {n}: {title}',
		'postdance.step-number': 'Step {n} / 6',
		'postdance.prototype-h2': 'Prototype: Kinetic Boxes',
		'postdance.prototype-lede':
			"It needs a webcam and room to move, and doesn't yet have a way to take part without one.",
		'postdance.try-installation': 'Try the installation ↗',

		'postdance.if.solo': 'Isabel — fluidity, breathing, interiority',
		'postdance.if.tech': '"Inner Flow" · VR experience',
		'postdance.if.step1.title': 'Arrival at the interactive space',
		'postdance.if.step1.detail':
			'After the performance, the audience enters a dedicated VR area. The space is kept simple and free of visible equipment to keep the focus on the experience. A subtle light marks the entrance, helping people transition smoothly from the live show into the digital world.',
		'postdance.if.step2.title': 'First contact with the device',
		'postdance.if.step2.detail':
			'The VR headset is placed on a stand with very basic instructions. The goal is to make starting as easy as possible: the user simply picks up the device. By avoiding complex menus or controllers, the installation remains accessible to everyone, regardless of their tech experience.',
		'postdance.if.step3.title': 'Entering the virtual environment',
		'postdance.if.step3.detail':
			'Once the headset is on, the user enters a virtual world that reacts to their body. They can navigate using various movements, from small gestures to larger arm swings. The system is flexible and does not require technical precision, allowing the user to find their own flow.',
		'postdance.if.step4.title': 'Movements inspired by the solos',
		'postdance.if.step4.detail':
			"Inside the virtual space, an abstract figure appears. Its movements are inspired by the solo dances seen earlier on stage. This figure isn't there to give instructions, but rather to act as a visual reference so the user can explore their own physical relationship with the dance universe.",
		'postdance.if.step5.title': 'Free and inclusive exploration',
		'postdance.if.step5.detail':
			'In this phase, the user is encouraged to move freely. Both small and large gestures trigger light variations that expand and contract in the virtual space. The experience is designed to be inclusive, working just as well for people who are seated or have limited mobility.',
		'postdance.if.step6.title': 'Smooth closure',
		'postdance.if.step6.detail':
			'To finish, the user removes the headset. The virtual environment gradually fades back to its starting state, and the physical room returns to a neutral setup. This ensures a clean transition and prepares the installation for the next participant.',

		'postdance.kb.solo': 'Diogo — boxes, physical humour, play, improvisation',
		'postdance.kb.tech': '"Kinetic Boxes" · MediaPipe projection',
		'postdance.kb.step1.title': 'The audience encounters the projection',
		'postdance.kb.step1.detail':
			'Upon exiting the room, the audience encounters a minimalist digital projection displayed on the wall or floor. This installation features an abstract collection of boxes in neutral tones.',
		'postdance.kb.step2.title': 'The body is detected automatically',
		'postdance.kb.step2.detail':
			"When a participant enters the zone, the system activates on its own. It uses MediaPipe to track body key points and generate an abstract silhouette that mirrors the person's movements. This setup establishes the body as the primary interface, removing the need for any external controllers or devices.",
		'postdance.kb.step3.title': 'The first digital gesture',
		'postdance.kb.step3.detail':
			"A simple action, such as raising an arm or shifting the torso, is enough to move a digital box on the screen. The system calculates the direction and approach of the movement to update the object's position. This introduces the core logic of the installation: a direct relationship between physical motion and visual feedback.",
		'postdance.kb.step4.title': 'Active exploration',
		'postdance.kb.step4.detail':
			"As the experience continues, participants begin to use a wider variety of movements. They can move individual boxes, cause them to collide, or completely reorganize the layout. A brief sound triggers whenever a silhouette touches a digital object, drawing on the energy and improvisation of Diogo's solo work.",
		'postdance.kb.step5.title': 'Shared co-creation',
		'postdance.kb.step5.detail':
			'The system supports multiple users simultaneously. Each person has their own independent silhouette, and the digital boxes respond to the collective proximity and movement of everyone in the space — different rhythms and patterns existing at once.',
		'postdance.kb.step6.title': 'Closing and returning to the initial state',
		'postdance.kb.step6.detail':
			'When the detection area is empty, the system begins a gradual reset. The virtual boxes slow down and return to their original spots. Faint visual trails of the previous interaction remain briefly before disappearing, preparing the environment for the next cycle.',

		'nav.about-link': 'About this project',
		'footer.rights': 'An interactive web documentary developed with Dançando com a Diferença.',

		'home.title': 'Sibela & Digoo — an interactive web documentary on inclusive dance',
		'home.synopsis':
			'Diogo & Sibela, choreographed by Tânia Carvalho for Dançando com a Diferença — told through the two dancers and the objects their solos leave behind.',
		'home.byline': 'by choreographer Tânia Carvalho',
		'home.way-isabel': 'Inner Flow',
		'home.way-diogo': 'Kinetic Boxes',

		'home.teaser-subtitle': 'The piece itself',
		'home.teaser-framing':
			'An excerpt from Sibela & Digoo — the production this whole documentary follows, from rehearsal room to stage. Watch it first, then choose a way in below.',
		'home.teaser-alt':
			"Sibela & Digoo, 2026 — a dancer seated in the chair on a dark stage, the Dançando com a Diferença logo and Henrique Amoedo's artistic direction credit",
		'home.photo-sibela-alt':
			'Isabel in silhouette against green light, the chair beside her, arms open',
		'home.photo-digoo-alt':
			'Diogo in silhouette against amber light, hand resting on a stacked box',
		'home.photo-viseu-alt':
			'Isabel, Tânia Carvalho, and Diogo together on stage at the Viseu premiere',
		'home.photo-leiria-alt':
			'Isabel and Diogo holding hands on stage, boxes behind them, in blue light',
		'home.photo-evora-alt': 'Diogo mid-motion on stage, blurred, boxes behind him, in blue light',

		'home.premiere-date': '30 October 2026 · 21:00',
		'home.countdown-aria': 'Countdown to the premiere',
		'home.countdown-days': 'days',
		'home.countdown-hours': 'hours',
		'home.countdown-min': 'min',
		'home.countdown-sec': 'sec',
		'home.countdown-live': 'On stage now',

		'home.start-h2': 'Where do you want to start?',
		'home.track1-eyebrow': 'Track 1 · The Performance',
		'home.track1-label': 'Watch the Creation Process',
		'home.track2-eyebrow': 'Track 2 · Context & Organization',
		'home.track2-label': 'Discover Inclusive Dance',

		'home.spine-h2': 'Two tracks through the thread',
		'home.spine-a': 'Follow',
		'home.spine-b': 'from rehearsal to stage, or step back into',
		'home.spine-c': '— the company, the practice, and the cycle this project sits inside.',

		'about.kicker': 'Author note',
		'about.title': 'About This Project',
		'about.intro':
			'A short account of what this platform is, who made it, and why — kept apart from the documentary itself so the two stay distinct.',

		'about.identity-h2': 'The Project',
		'about.identity-thesis-label': "Master's thesis",
		'about.identity-thesis-title': 'Post-Performance Digital Experiences of Inclusive Dance',
		'about.identity-goal':
			"This thesis asks how post-performance digital experiences — an interactive web documentary and a real-time movement installation — can extend an inclusive dance production's reach, reflection, and accessibility once the curtain falls, rather than letting the piece end with its final bow.",

		'about.authorship-h2': 'Authorship',
		'about.authorship-text': 'Developed by Bernardo Nunes.',

		'about.context-h2': 'Academic & Institutional Context',
		'about.context-text':
			"This platform was developed as part of a Master's in Interactive Media Design (MDMI) at Universidade da Madeira (UMa), in partnership with Dançando com a Diferença.",

		'about.rationale-h2': 'Design Rationale',
		'about.rationale-text':
			"The web documentary and Kinetic Boxes are two halves of the same question, not two separate projects. The documentary is retrospective — it gathers rehearsal footage, interviews, and production notes into a record of a piece that already happened. Kinetic Boxes runs the other direction: it takes the same movement vocabulary — Diogo's weight, boxes, and improvisation — and hands it back to a visitor's own body, live, on the spot where the show once stood. One archives the process; the other lets a stranger briefly continue it.",

		'about.privacy-kicker': 'Technical & privacy disclosure',
		'about.privacy-h2': 'How Kinetic Boxes handles your camera',
		'about.privacy-text':
			'Kinetic Boxes tracks body movement entirely on your own device, in your browser, using MediaPipe. Camera frames are processed locally to estimate body and hand position — nothing is uploaded, stored, or transmitted to any server. No video, image, or biometric data ever leaves your device, and none of it is retained once you close the page.'
	},
	pt: {
		'skip-link': 'Saltar para o conteúdo',
		'nav.aria-chapter-nav': 'Navegação por capítulos',
		'nav.aria-chapters': 'Capítulos',
		'nav.chapters-fallback': 'Capítulos',
		'nav.hint': '↑ ↓ mover ao longo do fio · enter para abrir',
		'nav.track-performance': 'O Espetáculo',
		'nav.track-performance-short': 'espetáculo',
		'nav.track-context': 'Contexto & Organização',
		'nav.track-context-short': 'contexto',

		'console.title-bold': 'Controlos da sala',
		'console.title-rest': 'ajuste a sala como precisar',

		'console.lighting.name': 'Iluminação de palco',
		'console.lighting.sys': 'alto contraste',
		'console.scene.silhouette': 'Silhueta',
		'console.scene.wash': 'Lavagem Fria',
		'console.scene.editorial': 'Editorial · Arquivo',

		'console.sound.name': 'Som',
		'console.sound.sys': 'áudio web',
		'console.sound.on': 'Som ativado — toque para silenciar',
		'console.sound.off': 'Ativar som',
		'console.sound.mute-aria': 'Silenciar som',
		'console.sound.enable-aria': 'Ativar som',
		'console.sound.volume-label': 'Volume',

		'console.stillness.name': 'Quietude',
		'console.stillness.sys': 'movimento reduzido',
		'console.stillness.on': 'Quietude · ativada',
		'console.stillness.off': 'Quietude · desativada',
		'console.stillness.turn-on-aria': 'Ativar a quietude',
		'console.stillness.turn-off-aria': 'Desativar a quietude',

		'lang-toggle.aria': 'Mudar idioma do site',

		'label.watch-youtube': 'Ver no YouTube',
		'label.watch-full-video': 'Ver o vídeo completo',
		'video.transcript-label': 'Transcrição',
		'video.show-transcript-aria': 'Mostrar transcrição',
		'video.hide-transcript-aria': 'Ocultar transcrição',
		'testimony.list-aria': 'Saltar para um momento do filme',
		'testimony.subtitle-note': 'Tradução das legendas em inglês do filme',
		'label.watch-full-interview': 'Ver a entrevista completa',
		'label.see-programme': 'Ver o programa',
		'label.read-full-interview': 'Ler a entrevista completa',

		'section.reference-companies': 'Referências internacionais que fazem este trabalho',

		'ciclo.click-here': 'Clique aqui',
		'ciclo.click-reveal-aria': 'Revelar e reproduzir o vídeo introdutório',

		'tania.mural-h2': 'Quem é Tânia Carvalho?',
		'tania.mural-lede': 'Clique numa faceta para a revelar',
		'tania.mural-group-aria': 'Facetas da identidade de Tânia Carvalho',
		'tania.lens-lede': 'Mova o cursor sobre a imagem',
		'tania.reel-hint': 'Deslize para percorrer a peça',
		'tania.listen-interview': 'Ouvir a entrevista',
		'tania.popup-close-aria': 'Fechar',
		'tania.work-heading': 'Trabalho dentro da Companhia',
		'tania.work-subtitle': 'Por Trás dos Gestos',
		'tania.note-doesdicon':
			'A primeira colaboração de Tânia com a companhia foi o seu espetáculo "Doesdicon (2016)".',
		'tania.note-sibela-digoo': 'O segundo trabalho foi "Sibela & Digoo (2026)"',

		'process.climax-h2': 'Últimos retoques antes do grande dia',
		'process.climax-subtitle': 'Excerto do Ensaio Geral',
		'process.climax-framing':
			'Filmado na noite antes da estreia, este excerto é o último ensaio completo diante de público — tudo o que foi documentado neste capítulo converge aqui.',
		'process.workspace-h2': 'O Espaço de Ensaio e Evolução',
		'process.workspace-lede': 'O percurso desde os primeiros apontamentos até ao ensaio final',
		'process.phase-group-aria': 'Fase de ensaio',
		'process.asset-group-aria': 'Tipo de conteúdo',
		'process.view.sketch': 'Esboço',
		'process.view.photo': 'Foto',
		'process.view.video': 'Vídeo',
		'process.phase.contention': 'Contenção',
		'process.phase.emergence': 'Emergência',
		'process.phase.release': 'Libertação',
		'process.phase.transformation': 'Transformação',
		'process.note.isabela1': 'Sentada. Quietude. As mãos sobem até ao rosto.',
		'process.note.diogo1': 'De pé. Os braços recuam, o peito abre-se.',
		'process.note.isabela2': 'A erguer-se da cadeira. O cabelo vela o rosto.',
		'process.note.diogo2': 'O peso desloca-se. Uma caixa branca encostada ao peito.',
		'process.note.isabela3': 'Ajoelhada, depois livre — pura improvisação.',
		'process.note.diogo3': 'De frente para a torre. A tensão quebra-se em vibração.',
		'process.note.isabela4': 'Sai. Regressa em dourado.',
		'process.note.diogo4': 'A torre cai. Ele cai com ela.',
		'process.gallery-h2': 'Processo e Evolução',

		'gallery.object-study': 'Estudo de objeto {n}',

		'cue.badge-prefix': 'Deixa',
		'cue.rail-aria-suffix': '— uma deixa de cada vez',
		'cue.audio-hint': '♪ Passe o cursor ou foque uma deixa sonora para pré-ouvir',
		'cue.audio-hint-placeholder':
			'♪ Passe o cursor ou foque uma deixa sonora para pré-ouvir — tom provisório, a gravação da produção ainda não chegou',

		'gallery.objects-study-h2': 'Estudo de Objetos',

		'diogo.who-h2': 'Quem é Diogo?',
		'diogo.who-line': 'Diogo Freitas começou a sua carreira na Dançando com a Diferença em 2013.',
		'diogo.milestone1-label': 'Entra para a companhia',
		'diogo.milestone1-detail':
			'Diogo começa a dançar na Dançando com a Diferença no espetáculo "Doesdicon (2016)".',
		'diogo.milestone2-label': '"Digoo" estreia',
		'diogo.milestone2-detail': 'O seu solo, coreografado por Tânia Carvalho, estreia em digressão.',
		'diogo.milestone3-year': 'Curiosidade',
		'diogo.milestone3-label': 'Alegria contagiante',
		'diogo.milestone3-detail': 'Sempre pronto para cantar "Cinderela" de Carlos Paião.',
		'diogo.costume-label': 'Design próprio',
		'diogo.costume-caption': 'Diogo desenhou os seus próprios figurinos para a peça.',
		'diogo.joy-caption': 'Diogo, a meio do ensaio, junto a uma torre de caixas.',

		'isabel.who-h2': 'Quem é Isabel?',
		'isabel.who-line': 'Isabel Teixeira começou na Dançando com a Diferença em 2012.',
		'isabel.milestone1-label': 'Entra para a companhia',
		'isabel.milestone1-detail':
			'Começa também a dançar na Dançando com a Diferença no espetáculo "Doesdicon (2016)".',
		'isabel.milestone2-year': 'Organizada',
		'isabel.milestone2-label': 'Uma artista cuidadosa e exigente',
		'isabel.milestone2-detail':
			'Por trás da sua figura esguia e elegante está alguém preciso e meticuloso. Essas características levaram-na a assumir responsabilidades adicionais dentro da companhia.',
		'isabel.milestone3-year': 'Curiosidade',
		'isabel.milestone3-label': 'Calorosa, atenta, doce',
		'isabel.milestone3-detail': 'Também adora cantar.',
		'isabel.costume-label': 'Por trás do design',
		'isabel.costume-caption':
			'Isabel ajudou a conceber as caixas e os figurinos do solo de Diogo, e escolheu o vestido que usa no seu próprio solo.',
		'isabel.teaser-caption': 'Um excerto do teaser oficial de "Sibela".',
		'isabel.score-note':
			'A pré-audição da Deixa 4 é um excerto do teaser oficial de "Sibela", não a gravação da produção ao vivo.',

		'performance.choose-solo-aria': 'Escolha um solo para entrar',
		'performance.side-sub-sibela': 'Solo de Isabel Teixeira',
		'performance.side-sub-digoo': 'Solo de Diogo Freitas',
		'performance.choose-side-hint': 'Escolha um lado',
		'performance.select-to-enter': 'Selecione para entrar no capítulo.',
		'performance.composer-credit': "Diogo Alvim: Música para 'Sibela e Digoo' - Portefólio ↗",
		'performance.play-teaser-aria': 'Reproduzir o teaser de {name} — {role}',
		'performance.mural-caption': 'Clique num círculo para ver o teaser desse solo.',
		'performance.close-teaser-aria': 'Fechar o teaser e escolher novamente',
		'performance.critical-echoes-h2': 'Ecos da Crítica',
		'performance.read-review': 'Ler a crítica completa ↗',
		'performance.tour-h2': 'A Digressão Nacional de 2026',
		'performance.tour-viseu-when': 'Janeiro 2026',
		'performance.tour-viseu-detail':
			'Estreia nacional, no 14.º festival NANT — Novas Idades, Novos Tempos.',
		'performance.tour-leiria-when': 'Inverno 2026',
		'performance.tour-evora-when': 'Julho 2026',
		'performance.see-show-page': 'Ver a página do espetáculo ↗',
		'performance.gallery-h2': 'Do Palco',
		'performance.photo-sibela': 'Sibela — o solo da cadeira',
		'performance.photo-digoo': 'Digoo — peso e caixas',
		'performance.photo-viseu': 'Viseu — estreia nacional',
		'performance.photo-leiria': 'Leiria — etapa de inverno',
		'performance.photo-evora': 'Évora — espetáculo de encerramento',

		'postdance.light-to-boxes-h2': 'Luz para Caixas',
		'postdance.sandbox-aria': 'Alternar a área de exploração entre luz e caixas',
		'postdance.mode-isabel': 'Isabel — Luz',
		'postdance.mode-diogo': 'Diogo — Caixas',
		'postdance.caption-light': 'Mova o cursor através da luz',
		'postdance.caption-boxes':
			'Arraste cada caixa para um local marcado. Preencha todos para as libertar.',
		'postdance.lab-h2': 'Laboratório de Storyboard',
		'postdance.track-tablist-aria': 'Pista do storyboard',
		'postdance.step-rail-aria': 'Passos de {label}',
		'postdance.step-aria': 'Passo {n}: {title}',
		'postdance.step-number': 'Passo {n} / 6',
		'postdance.prototype-h2': 'Protótipo: Kinetic Boxes',
		'postdance.prototype-lede':
			'Precisa de uma webcam e espaço para se mover, e ainda não tem uma forma de participar sem uma.',
		'postdance.try-installation': 'Experimentar a instalação ↗',

		'postdance.if.solo': 'Isabel — fluidez, respiração, interioridade',
		'postdance.if.tech': '"Inner Flow" · experiência de realidade virtual',
		'postdance.if.step1.title': 'Chegada ao espaço interativo',
		'postdance.if.step1.detail':
			'Após o espetáculo, o público entra numa área dedicada de RV. O espaço é mantido simples e livre de equipamento visível, para manter o foco na experiência. Uma luz subtil marca a entrada, ajudando as pessoas a transitar suavemente do espetáculo ao vivo para o mundo digital.',
		'postdance.if.step2.title': 'Primeiro contacto com o dispositivo',
		'postdance.if.step2.detail':
			'O headset de RV está colocado num suporte com instruções muito básicas. O objetivo é tornar o início o mais simples possível: o utilizador limita-se a pegar no dispositivo. Ao evitar menus complexos ou comandos, a instalação mantém-se acessível a todos, independentemente da sua experiência tecnológica.',
		'postdance.if.step3.title': 'Entrada no ambiente virtual',
		'postdance.if.step3.detail':
			'Assim que coloca o headset, o utilizador entra num mundo virtual que reage ao seu corpo. Pode navegar através de vários movimentos, desde pequenos gestos a movimentos mais amplos dos braços. O sistema é flexível e não exige precisão técnica, permitindo que o utilizador encontre o seu próprio fluxo.',
		'postdance.if.step4.title': 'Movimentos inspirados nos solos',
		'postdance.if.step4.detail':
			'Dentro do espaço virtual, surge uma figura abstrata. Os seus movimentos são inspirados nos solos de dança vistos anteriormente em palco. Esta figura não está ali para dar instruções, mas antes para servir de referência visual, para que o utilizador possa explorar a sua própria relação física com o universo da dança.',
		'postdance.if.step5.title': 'Exploração livre e inclusiva',
		'postdance.if.step5.detail':
			'Nesta fase, o utilizador é encorajado a mover-se livremente. Tanto gestos pequenos como grandes desencadeiam variações de luz que se expandem e contraem no espaço virtual. A experiência foi concebida para ser inclusiva, funcionando igualmente bem para pessoas sentadas ou com mobilidade reduzida.',
		'postdance.if.step6.title': 'Encerramento suave',
		'postdance.if.step6.detail':
			'Para terminar, o utilizador retira o headset. O ambiente virtual desvanece-se gradualmente até ao seu estado inicial, e a sala física regressa a uma configuração neutra. Isto garante uma transição limpa e prepara a instalação para o próximo participante.',

		'postdance.kb.solo': 'Diogo — caixas, humor físico, jogo, improvisação',
		'postdance.kb.tech': '"Kinetic Boxes" · projeção MediaPipe',
		'postdance.kb.step1.title': 'O público encontra a projeção',
		'postdance.kb.step1.detail':
			'Ao sair da sala, o público encontra uma projeção digital minimalista exibida na parede ou no chão. Esta instalação apresenta uma coleção abstrata de caixas em tons neutros.',
		'postdance.kb.step2.title': 'O corpo é detetado automaticamente',
		'postdance.kb.step2.detail':
			'Quando um participante entra na zona, o sistema ativa-se por si só. Utiliza o MediaPipe para seguir pontos-chave do corpo e gerar uma silhueta abstrata que espelha os movimentos da pessoa. Esta configuração estabelece o corpo como interface principal, eliminando a necessidade de quaisquer comandos ou dispositivos externos.',
		'postdance.kb.step3.title': 'O primeiro gesto digital',
		'postdance.kb.step3.detail':
			'Uma ação simples, como levantar um braço ou deslocar o tronco, é suficiente para mover uma caixa digital no ecrã. O sistema calcula a direção e a aproximação do movimento para atualizar a posição do objeto. Isto introduz a lógica central da instalação: uma relação direta entre o movimento físico e a resposta visual.',
		'postdance.kb.step4.title': 'Exploração ativa',
		'postdance.kb.step4.detail':
			'À medida que a experiência avança, os participantes começam a usar uma maior variedade de movimentos. Podem mover caixas individuais, fazê-las colidir, ou reorganizar completamente a disposição. Um som breve é acionado sempre que uma silhueta toca num objeto digital, indo buscar a energia e a improvisação do trabalho a solo de Diogo.',
		'postdance.kb.step5.title': 'Cocriação partilhada',
		'postdance.kb.step5.detail':
			'O sistema suporta múltiplos utilizadores em simultâneo. Cada pessoa tem a sua própria silhueta independente, e as caixas digitais respondem à proximidade e ao movimento coletivo de todos no espaço — diferentes ritmos e padrões a existir ao mesmo tempo.',
		'postdance.kb.step6.title': 'Encerramento e regresso ao estado inicial',
		'postdance.kb.step6.detail':
			'Quando a área de deteção fica vazia, o sistema inicia uma reposição gradual. As caixas virtuais abrandam e regressam aos seus lugares originais. Rastos visuais ténues da interação anterior permanecem brevemente antes de desaparecerem, preparando o ambiente para o próximo ciclo.',

		'nav.about-link': 'Sobre este projeto',
		'footer.rights': 'Um documentário web interativo desenvolvido com a Dançando com a Diferença.',

		'home.title': 'Sibela & Digoo — um documentário web interativo sobre dança inclusiva',
		'home.synopsis':
			'Diogo & Sibela, com coreografia de Tânia Carvalho para a Dançando com a Diferença: uma narrativa contada através dos dois bailarinos e dos objetos que os seus solos deixam para trás.',
		'home.byline': 'pela coreógrafa Tânia Carvalho',
		'home.way-isabel': 'Fluxo Interior',
		'home.way-diogo': 'Kinetic Boxes',

		'home.teaser-subtitle': 'A peça em si',
		'home.teaser-framing':
			'Um excerto de Sibela & Digoo, a produção que este documentário acompanha, da sala de ensaios até ao palco. Assista primeiro ao vídeo e escolha depois um dos percursos abaixo.',
		'home.teaser-alt':
			'Sibela & Digoo, 2026 — uma bailarina sentada na cadeira num palco escuro, o logótipo da Dançando com a Diferença e o crédito de direção artística de Henrique Amoedo',
		'home.photo-sibela-alt':
			'Isabel em silhueta contra uma luz verde, a cadeira ao seu lado, de braços abertos',
		'home.photo-digoo-alt':
			'Diogo em silhueta contra uma luz âmbar, com a mão pousada numa caixa empilhada',
		'home.photo-viseu-alt': 'Isabel, Tânia Carvalho e Diogo juntos em palco na estreia em Viseu',
		'home.photo-leiria-alt':
			'Isabel e Diogo de mãos dadas em palco, com caixas atrás deles, sob luz azul',
		'home.photo-evora-alt':
			'Diogo em pleno movimento em palco, desfocado, com caixas atrás dele, sob luz azul',

		'home.premiere-date': '30 de outubro de 2026 · 21:00',
		'home.countdown-aria': 'Contagem decrescente para a estreia',
		'home.countdown-days': 'dias',
		'home.countdown-hours': 'horas',
		'home.countdown-min': 'min',
		'home.countdown-sec': 'seg',
		'home.countdown-live': 'Em cena agora',

		'home.start-h2': 'Por onde quer começar?',
		'home.track1-eyebrow': 'Percurso 1 · O Espetáculo',
		'home.track1-label': 'Ver o Processo de Criação',
		'home.track2-eyebrow': 'Percurso 2 · Contexto & Organização',
		'home.track2-label': 'Descobrir a Dança Inclusiva',

		'home.spine-h2': 'Dois percursos ao longo do fio',
		'home.spine-a': 'Acompanhe',
		'home.spine-b': 'dos ensaios ao palco, ou recue até ao',
		'home.spine-c': '— a companhia, a prática e o ciclo em que este projeto se insere.',

		'about.kicker': 'Nota de autor',
		'about.title': 'Sobre Este Projeto',
		'about.intro':
			'Um breve relato sobre o que é esta plataforma, quem a desenvolveu e porquê — mantido à parte do documentário para que os dois se distingam claramente.',

		'about.identity-h2': 'O Projeto',
		'about.identity-thesis-label': 'Dissertação de Mestrado',
		'about.identity-thesis-title': 'Post-Performance Digital Experiences of Inclusive Dance',
		'about.identity-goal':
			'Esta dissertação procura perceber como experiências digitais pós-espetáculo — um documentário web interativo e uma instalação de movimento em tempo real — podem prolongar o alcance, a reflexão e a acessibilidade de uma produção de dança inclusiva depois de cair o pano, em vez de deixar a peça terminar com a última vénia.',

		'about.authorship-h2': 'Autoria',
		'about.authorship-text': 'Desenvolvido por Bernardo Nunes.',

		'about.context-h2': 'Contexto Académico e Institucional',
		'about.context-text':
			'Esta plataforma foi desenvolvida no âmbito do Mestrado em Design de Media Interativos (MDMI) da Universidade da Madeira (UMa), em parceria com a Dançando com a Diferença.',

		'about.rationale-h2': 'Fundamentação do Design',
		'about.rationale-text':
			'O documentário web e o Kinetic Boxes são duas metades da mesma pergunta, não dois projetos separados. O documentário é retrospetivo — reúne registos de ensaios, entrevistas e notas de produção num arquivo de uma peça que já aconteceu. O Kinetic Boxes segue o caminho inverso: pega no mesmo vocabulário de movimento — o peso, as caixas e a improvisação de Diogo — e devolve-o ao corpo de quem visita, ao vivo, no mesmo lugar onde o espetáculo esteve em palco. Um arquiva o processo; o outro deixa um desconhecido continuá-lo, por instantes.',

		'about.privacy-kicker': 'Divulgação técnica e de privacidade',
		'about.privacy-h2': 'Como o Kinetic Boxes trata a sua câmara',
		'about.privacy-text':
			'O Kinetic Boxes segue o movimento do corpo inteiramente no seu próprio dispositivo, no navegador, usando o MediaPipe. As imagens da câmara são processadas localmente para estimar a posição do corpo e das mãos — nada é enviado, guardado ou transmitido para qualquer servidor. Nenhum vídeo, imagem ou dado biométrico sai alguma vez do seu dispositivo, e nada disso é conservado depois de fechar a página.'
	}
};

/**
 * Per-chapter title/gloss/poetic overrides for Portuguese. Deliberately not
 * a full content translation layer yet — chapter body text, pull quotes,
 * galleries and sequences stay English-only until that larger pass happens.
 * Falls back to the chapters.ts English value whenever a key is absent.
 */
export const chapterTranslationsPt: Record<
	string,
	{ title?: string; gloss?: string; poetic?: string }
> = {
	'inclusive-dance': {
		title: 'Dança Inclusiva',
		gloss: '01 · a abertura',
		poetic: 'Onde a sala fala pela primeira vez.'
	},
	company: {
		gloss: '02 · as pessoas'
	},
	'o-ciclo-da-invisibilidade': {
		gloss: '03 · vistos e invisíveis'
	},
	'tania-carvalho': {
		gloss: '04 · instrumento e pensamento'
	},
	process: {
		title: 'Preparação / Processo',
		gloss: '05 · dois solos, um processo'
	},
	diogo: {
		gloss: '06 · Diogo Freitas'
	},
	isabel: {
		gloss: '07 · Isabel Teixeira'
	},
	performance: {
		gloss: '08 · o espetáculo'
	},
	'post-dance': {
		title: 'Pós-Dança Interativo',
		gloss: '09 · o laboratório'
	}
};
