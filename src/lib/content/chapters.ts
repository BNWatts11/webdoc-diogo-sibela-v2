import type { ChapterContent } from './schema';

/**
 * The nine stops on the spine, now filled with real footage, portraits, and
 * essay text throughout — where an asset still doesn't exist (see Isabel's
 * gallery), heroMedia/gallery point at an explicit placeholder in
 * /static/placeholder so the gap is visible in the UI, never a silent blank.
 * Swapping in a CMS later is a change to this file's data source, not to any
 * .svelte file that reads it.
 */
export const chapters: ChapterContent[] = [
	{
		id: 'inclusive-dance',
		order: 1,
		track: 'context',
		title: 'Inclusive Dance',
		gloss: '01 · the opening',
		poetic: 'Where the room first speaks.',
		heroMedia: {
			type: 'image',
			src: '/photos/inclusive-dance/company-group.jpg',
			alt: 'The full company of Dançando com a Diferença, dressed in black, laughing together in a group portrait'
		},
		body: [
			'Inclusive Dance is an artistic practice that openly challenges traditional dance techniques by embracing bodily diversity and mixed abilities. Far from treating functional divergence as a limitation, this practice adopts difference as a core driver of creative, aesthetic, and political innovation.'
		],
		// Elevated out of the highlights row below (which still carries the same
		// clip) so the dancers' own voices come before the academic references
		// and Amoedo's interview. The clip is a 42s montage of several dancers
		// filmed outdoors in Madeira, subtitled in English in the picture itself —
		// `moments` are those subtitle lines, read off the film with the second
		// each one starts, not written for it.
		dancerTestimony: {
			subtitle: 'Dancers in their own words',
			framing:
				'Before the academic framing and the director’s account that follow, company dancers say in turn what dance is to them — tap a line to jump to it in the film.',
			credit: 'Company dancers, Dançando com a Diferença · filmed outdoors in Madeira',
			video: {
				type: 'video',
				src: '/videos/inclusive-dance/importance-of-dance-per-dancer.mp4',
				poster: '/photos/inclusive-dance/posters/importance-of-dance-per-dancer.jpg',
				alt: 'Several dancers from Dançando com a Diferença speaking to camera outdoors in Madeira about what dance means to them, with English subtitles'
			},
			transcript:
				'Dance is a non verbal way of expressing our feelings. I love to dance and feel it in my body. A connection… a way to communicate… because when I dance I can communicate with the trees, with people, with everything. I love dance from the bottom of my heart.',
			moments: [
				{ time: 8, text: 'Dance is a non verbal way of expressing our feelings.' },
				{ time: 20, text: 'I love to dance and feel it in my body.' },
				{
					time: 26,
					text: 'A connection… a way to communicate… because when I dance I can communicate with the trees, with people, with everything.'
				},
				{ time: 39, text: 'I love dance from the bottom of my heart.' }
			]
		},
		referenceCompanies: [
			{
				name: 'Dançando com a Diferença',
				country: 'Portugal',
				description:
					'Founded in 2001 by Henrique Amoedo, this company is the main institutional partner of this project. It stands as a historical milestone in the inclusive arts scene, bringing together dancers with and without disabilities to share the professional stage.',
				video: {
					type: 'video',
					src: '/videos/inclusive-dance/reference-dcd-endless.mp4',
					poster: '/photos/inclusive-dance/posters/reference-dcd-endless.jpg',
					alt: 'ENDLESS, a production by Dançando com a Diferença'
				},
				externalUrl: 'https://www.youtube.com/watch?v=UjU3Qa0LUKc'
			},
			{
				name: 'Stopgap Dance Company',
				country: 'United Kingdom',
				description:
					'A major international reference identified during the visual research of this thesis. They are globally recognized for creating contemporary productions that redefine who can dance and how inclusive choreography is structured.',
				video: {
					type: 'video',
					src: '/videos/inclusive-dance/reference-stopgap-lived-fiction.mp4',
					poster: '/photos/inclusive-dance/posters/reference-stopgap-lived-fiction.jpg',
					alt: 'Lived Fiction, a production by Stopgap Dance Company'
				},
				externalUrl: 'http://www.youtube.com/watch?v=qTU8EenzySw'
			},
			{
				name: 'Chunky Move',
				country: 'Australia',
				description:
					'Widely known for their iconic production "Glow", where they explore motion tracking systems to project reactive visual graphics and light lines that extend and amplify the performer\'s body.',
				video: {
					type: 'video',
					src: '/videos/inclusive-dance/reference-chunky-move-glow.mp4',
					poster: '/photos/inclusive-dance/posters/reference-chunky-move-glow.jpg',
					alt: 'Glow, a production by Chunky Move'
				},
				externalUrl: 'https://www.youtube.com/watch?v=2AautwIOON8'
			},
			{
				name: 'Troika Ranch',
				country: 'USA / Germany',
				description:
					'Mapped as a key pioneer in integrating real-time dance expression with interactive digital media.',
				video: {
					type: 'video',
					src: '/videos/inclusive-dance/reference-troika-ranch-loopdiver.mp4',
					poster: '/photos/inclusive-dance/posters/reference-troika-ranch-loopdiver.jpg',
					alt: 'loopdiver, a production by Troika Ranch'
				},
				externalUrl: 'https://www.youtube.com/watch?v=GcBZQA15qlg'
			}
		],
		extraClipGroups: [
			{
				heading: 'Interview with Henrique Amoedo',
				clips: [
					{
						title: 'Inclusive Dance is now simply Contemporary Dance',
						video: {
							type: 'video',
							src: '/videos/inclusive-dance/interview-amoedo-contemporary-dance.mp4',
							poster: '/photos/inclusive-dance/posters/interview-amoedo-contemporary-dance.jpg',
							alt: 'Henrique Amoedo interview: Inclusive Dance becoming simply Contemporary Dance'
						}
					},
					{
						title: 'The significance of his PHD on the origins of Inclusive Dance',
						video: {
							type: 'video',
							src: '/videos/inclusive-dance/interview-amoedo-doctorate-origins.mp4',
							poster: '/photos/inclusive-dance/posters/interview-amoedo-doctorate-origins.jpg',
							alt: "Henrique Amoedo interview: the importance of his doctorate on Inclusive Dance's origins"
						}
					}
				],
				externalUrl: 'https://www.youtube.com/watch?v=rgZc86f4QF0',
				externalLabel: 'Watch the full interview'
			}
		],
		// Was a plain ClipGroup entry leaning on "watch the full video ↗" to
		// carry the content; now a compact highlights row with its own framing
		// sentence, per the advisors' note on favouring short synthesis clips
		// over long external-link lists.
		synthesisHighlights: {
			heading: 'The Importance of Dance for Dancers',
			intro:
				'Two short excerpts, cut down from a longer interview session rather than left as one long recording — enough to hear the idea without asking you to sit through all of it.',
			items: [
				{
					title: "The touch and the contact, it's everything in dance",
					video: {
						type: 'video',
						src: '/videos/inclusive-dance/importance-of-dance-general.mp4',
						poster: '/photos/inclusive-dance/posters/importance-of-dance-general.jpg',
						alt: 'The importance of Inclusive Dance, and of dance in general'
					}
				},
				{
					title: 'What dance means to them',
					video: {
						type: 'video',
						src: '/videos/inclusive-dance/importance-of-dance-per-dancer.mp4',
						poster: '/photos/inclusive-dance/posters/importance-of-dance-per-dancer.jpg',
						alt: 'The importance of dance for each individual dancer'
					}
				}
			],
			externalUrl: 'https://www.youtube.com/watch?v=wx4ZjpTr6x4',
			externalLabel: 'Watch the full video'
		}
	},
	{
		id: 'company',
		order: 2,
		track: 'context',
		title: 'Dançando com a Diferença',
		gloss: '02 · the people',
		poetic: '',
		heroMedia: {
			type: 'image',
			src: '/photos/company/logo-wordmark-pink.jpg',
			alt: 'The Dançando com a Diferença logo — a white "D" mark and stacked wordmark on a pink background'
		},
		body: [
			'Dançando com a Diferença (DcD) is a non-profit dance company based in Madeira, Portugal, founded in 2001 and led by Henrique Amoedo. It works exclusively in inclusive dance, and is recognized as a reference in the field, both nationally and internationally.'
		],
		// Named and given its own section (previously an unlabelled pull quote
		// threaded mid-way through the Projects timeline) so "Make a
		// Difference" reads as the company's stated philosophy, not a stray
		// line — everything below it (the TVE interviews, the 15-project
		// history, Telmo's case study) now reads as that philosophy in
		// practice rather than an unconnected list.
		philosophy: {
			kicker: 'Artistic Philosophy',
			heading: 'Make a Difference',
			statement:
				'To change the social image of people with disabilities, and win space for human diversity in the contemporary arts.',
			attribution: 'Dançando com a Diferença — mission',
			body: "Everything below — two decades of press coverage, fifteen productions, and Telmo's own story — is one more attempt to put that mission into practice, on stage and off it."
		},
		extraClipGroups: [
			{
				clips: [
					{
						title: 'How does it work?',
						video: {
							type: 'video',
							src: '/videos/company/info-how-it-works.mp4',
							poster: '/photos/company/posters/info-how-it-works.jpg',
							alt: "Television interview (TVE) discussing how Dançando com a Diferença's shows are organised, English subtitles"
						}
					},
					{
						title: 'Nationally and internationally recognized',
						video: {
							type: 'video',
							src: '/videos/company/info-recognized.mp4',
							poster: '/photos/company/posters/info-recognized.jpg',
							alt: 'Television interview (TVE): a company representative on the international recognition of DcD’s work'
						}
					},
					{
						title: 'Being influenced by others is important',
						video: {
							type: 'video',
							src: '/videos/company/info-influence.mp4',
							poster: '/photos/company/posters/info-influence.jpg',
							alt: 'Television interview (TVE) on the importance of following other inclusive dance companies worldwide'
						}
					},
					{
						title: 'The world is a source of nourishment',
						video: {
							type: 'video',
							src: '/videos/company/info-nourishment.mp4',
							poster: '/photos/company/posters/info-nourishment.jpg',
							alt: 'Television interview (TVE) on drawing artistic material from everyday life'
						}
					},
					{
						title: 'First big step',
						video: {
							type: 'video',
							src: '/videos/company/info-school.mp4',
							poster: '/photos/company/posters/info-school.jpg',
							alt: "Television interview (TVE) on the company's first major step, founding a dance school"
						}
					}
				],
				externalUrl: 'https://www.youtube.com/watch?v=rgZc86f4QF0&t=3s'
			},
			{
				heading: 'Projects',
				introVideo: {
					type: 'video',
					src: '/videos/company/projects-intro.mp4',
					poster: '/photos/company/posters/projects-intro.jpg',
					alt: 'Title card reading "Em 2001 nasce o projecto de inclusão pela arte" — in 2001, the project of inclusion through art is born'
				},
				clips: [
					{
						title: 'Menina da Lua (2003)',
						video: {
							type: 'video',
							src: '/videos/company/project-01-menina-da-lua.mp4',
							poster: '/photos/company/posters/project-01-menina-da-lua.jpg',
							alt: 'Menina da Lua, 2003 — choreography by Henrique Amoedo and Bárbara Matos; a performer kneeling on stage under a spotlight'
						}
					},
					{
						title: 'Levanta os Braços como Antenas para o Céu (2005)',
						video: {
							type: 'video',
							src: '/videos/company/project-02-levanta-os-bracos.mp4',
							poster: '/photos/company/posters/project-02-levanta-os-bracos.jpg',
							alt: 'Levanta os Braços como Antenas para o Céu, 2005 — a production by Dançando com a Diferença'
						}
					},
					{
						title: 'Wing Wong or Ping Pong (2011)',
						video: {
							type: 'video',
							src: '/videos/company/project-03-wing-wong.mp4',
							poster: '/photos/company/posters/project-03-wing-wong.jpg',
							alt: 'Wing Wong or Ping Pong, 2011 — choreography by Henrique Amoedo; two performers on the floor against a green-lit backdrop'
						}
					},
					{
						title: 'Máquina Letal (2011)',
						video: {
							type: 'video',
							src: '/videos/company/project-04-maquina-letal.mp4',
							poster: '/photos/company/posters/project-04-maquina-letal.jpg',
							alt: 'Máquina Letal, 2011 — a production by Dançando com a Diferença'
						}
					},
					{
						title: 'Desafinado (2011)',
						video: {
							type: 'video',
							src: '/videos/company/project-05-desafinado.mp4',
							poster: '/photos/company/posters/project-05-desafinado.jpg',
							alt: 'Desafinado, 2011 — a production by Dançando com a Diferença'
						}
					},
					{
						title: 'Endless (2012)',
						video: {
							type: 'video',
							src: '/videos/company/project-06-endless.mp4',
							poster: '/photos/company/posters/project-06-endless.jpg',
							alt: 'Endless, 2012 — choreography by Henrique Amoedo; dancers in motion with a layered, long-exposure effect'
						}
					},
					{
						title: 'Dez Mil Seres (2012)',
						video: {
							type: 'video',
							src: '/videos/company/project-07-dez-mil-seres.mp4',
							poster: '/photos/company/posters/project-07-dez-mil-seres.jpg',
							alt: 'Dez Mil Seres, 2012 — a production by Dançando com a Diferença'
						}
					},
					{
						title: 'No Centro da Cor, o Som (2015)',
						video: {
							type: 'video',
							src: '/videos/company/project-08-no-centro-da-cor.mp4',
							poster: '/photos/company/posters/project-08-no-centro-da-cor.jpg',
							alt: 'No Centro da Cor, o Som, 2015 — a production by Dançando com a Diferença'
						}
					},
					{
						title: 'Bichos (2016)',
						video: {
							type: 'video',
							src: '/videos/company/project-09-bichos.mp4',
							poster: '/photos/company/posters/project-09-bichos.jpg',
							alt: 'Bichos, 2016 — choreography by Rui Lopes Graça; performers grouped on a blue-lit stage'
						}
					},
					{
						title: 'Doesdicon (2017)',
						video: {
							type: 'video',
							src: '/videos/company/project-10-doesdicon.mp4',
							poster: '/photos/company/posters/project-10-doesdicon.jpg',
							alt: 'Doesdicon, 2017 — a production by Dançando com a Diferença'
						}
					},
					{
						title: 'Happy Island (2018)',
						video: {
							type: 'video',
							src: '/videos/company/project-11-happy-island.mp4',
							poster: '/photos/company/posters/project-11-happy-island.jpg',
							alt: 'Happy Island, 2018 — a performer lying in a red dress and matching sneakers, title card over a foggy forest backdrop'
						}
					},
					{
						title: 'Blasons (2022)',
						video: {
							type: 'video',
							src: '/videos/company/project-12-blasons.mp4',
							poster: '/photos/company/posters/project-12-blasons.jpg',
							alt: 'Blasons, 2022 — dancers on stage with bilingual word overlays: dança/dance, fantasia/fantasy, grotesco/grotesque, surrealismo/surrealism'
						}
					},
					{
						title: 'Os Gigantes (2025)',
						video: {
							type: 'video',
							src: '/videos/company/project-13-os-gigantes.mp4',
							poster: '/photos/company/posters/project-13-os-gigantes.jpg',
							alt: 'Os Gigantes, 2025 — a dancer in silhouette against a magenta-tinted forest backdrop, arms raised'
						}
					},
					{
						title: 'Este Mundo (2026)',
						video: {
							type: 'video',
							src: '/videos/company/project-14-este-mundo.mp4',
							poster: '/photos/company/posters/project-14-este-mundo.jpg',
							alt: 'Este Mundo, 2026 — a dancer with arms outstretched in a rock canyon, title text reading "chaillot" and "danse"'
						}
					},
					{
						title: 'Sibela & Digoo (2026)',
						video: {
							type: 'video',
							src: '/videos/company/project-15-sibela-digoo.mp4',
							poster: '/photos/company/posters/project-15-sibela-digoo.jpg',
							alt: "Sibela & Digoo, 2026 — a dancer seated in the chair on a dark stage, the Dançando com a Diferença logo and Henrique Amoedo's artistic direction credit"
						}
					}
				]
			}
		],
		// Moved out of extraClipGroups (was "The company that changed lives",
		// visually identical to every other clip list) into its own callout —
		// framed explicitly as Make a Difference in practice, not a detached
		// link at the bottom of the page.
		caseStudy: {
			kicker: 'Make a Difference, in practice',
			heading: "Telmo's Story",
			intro:
				"Before Telmo Ferreira joined Dançando com a Diferença, national television covered him as a story of exclusion. What follows is coverage of what came after — the company's mission, filmed in progress rather than stated as an ideal.",
			clips: [
				{
					title: 'Before joining the company',
					video: {
						type: 'video',
						src: '/videos/company/telmo-clip-1.mp4',
						poster: '/photos/company/posters/telmo-clip-1.jpg',
						alt: 'SIC television news segment introducing Telmo Ferreira, before he joined the company'
					}
				},
				{
					title: 'On stage with the company',
					video: {
						type: 'video',
						src: '/videos/company/telmo-clip-2.mp4',
						poster: '/photos/company/posters/telmo-clip-2.jpg',
						alt: 'SIC television news segment showing Telmo Ferreira dancing with the company on stage'
					}
				}
			],
			externalUrl: 'https://www.youtube.com/watch?v=pU0bG6k-Ii0',
			externalLabel: 'Watch the full story'
		}
	},
	{
		id: 'o-ciclo-da-invisibilidade',
		order: 3,
		track: 'context',
		title: 'O Ciclo da (In)visibilidade',
		gloss: '03 · seen and unseen',
		poetic: '',
		heroMedia: {
			type: 'video',
			src: '/videos/o-ciclo-da-invisibilidade/intro-primeiro-clip.mp4',
			poster: '/photos/o-ciclo-da-invisibilidade/posters/intro-primeiro-clip.jpg',
			alt: 'A duet on a dark stage, one dancer lifting the other, subtitled "Há 25 anos" — 25 years ago'
		},
		secondaryHero: {
			type: 'video',
			src: '/videos/o-ciclo-da-invisibilidade/context-segundo-clip.mp4',
			poster: '/photos/o-ciclo-da-invisibilidade/posters/context-segundo-clip.jpg',
			alt: "A television interview on the Madeira Direto/Madeira Viva programme, discussing the company's 25th anniversary"
		},
		secondaryHeroTitle: 'Why this celebration?',
		editions: [
			{
				heading: 'Ciclo da (In)visibilidade (1st Edition)',
				poster: {
					src: '/photos/o-ciclo-da-invisibilidade/edition-1-poster.jpg',
					alt: 'A public talk on stage at MUDAS, three panellists seated in front of a screen reading "Ciclo da (In)Visibilidade"'
				},
				video: {
					type: 'video',
					src: '/videos/o-ciclo-da-invisibilidade/edition-1-intro.mp4',
					poster: '/photos/o-ciclo-da-invisibilidade/posters/edition-1-intro.jpg',
					alt: 'A television interview introducing the first edition of Ciclo da (In)visibilidade'
				},
				interviewUrl: 'https://www.facebook.com/reel/797897466278303',
				programUrl:
					'https://www.dnoticias.pt/2025/9/17/463160-dancando-com-a-diferenca-promove-ciclo-da-invisibilidade-no-mudas/',
				programLabel: 'See the full programme at this link'
			},
			{
				heading: 'O Ciclo da (In)visibilidade (2nd Edition)',
				titleVariant: 'wipe',
				poster: {
					src: '/photos/o-ciclo-da-invisibilidade/edition-2-poster.jpg',
					alt: 'Event poster for "Bichos" by Dançando com a Diferença at Ponto C, Penafiel, Friday 15 May, 10h'
				},
				video: {
					type: 'video',
					src: '/videos/o-ciclo-da-invisibilidade/edition-2-intro.mp4',
					poster: '/photos/o-ciclo-da-invisibilidade/posters/edition-2-intro.jpg',
					alt: 'A television interview introducing the second edition of Ciclo da (In)visibilidade'
				},
				interviewUrl: 'https://www.facebook.com/reel/1304454118518025',
				programUrl:
					'https://www.facebook.com/dancandodiferenca/posts/a-dan%C3%A7ando-com-a-diferen%C3%A7a-leva-a-penafiel-de-15-a-17-de-maio-de-2026-a-segunda-/1408043114696364/',
				programLabel: 'See the full programme at this link'
			}
		],
		momentsHeading: 'Landmark Moments',
		moments: [
			{
				title: '1. Founding and Pioneering Spirit (2001) - by Henrique Amoedo',
				media: {
					type: 'video',
					src: '/videos/o-ciclo-da-invisibilidade/moment-1-founding-henrique-amoedo.mp4',
					poster: '/photos/o-ciclo-da-invisibilidade/posters/moment-1-founding-henrique-amoedo.jpg',
					alt: 'Henrique Amoedo speaking to camera about founding Dançando com a Diferença, intercut with footage of a dance rehearsal'
				},
				summary:
					'The founder explains how his life journey shaped the project, and the importance of creating a hub for inclusive dance rooted in Madeira.',
				externalUrl: 'https://www.facebook.com/reel/306784995648113',
				externalLabel: 'Watch the full video'
			},
			{
				title: '2. Premiere of "Bichos" (2002)',
				media: {
					type: 'video',
					src: '/videos/o-ciclo-da-invisibilidade/moment-2-bichos-premiere.mp4',
					poster: '/photos/o-ciclo-da-invisibilidade/posters/moment-2-bichos-premiere.jpg',
					alt: 'Dançando com a Diferença performing "Bichos", dancers in animal masks moving across a bare stage lit in blue'
				},
				summary:
					"The dancers portray human struggles and dilemmas inspired by Miguel Torga's iconic literary work.",
				externalUrl: 'https://www.youtube.com/watch?v=zMy_JzsSi7o',
				externalLabel: 'Watch the full video'
			},
			{
				title: '3. International Recognition at the Avignon Festival (2018)',
				media: {
					type: 'video',
					src: '/videos/o-ciclo-da-invisibilidade/moment-3-happy-island-avignon.mp4',
					poster: '/photos/o-ciclo-da-invisibilidade/posters/moment-3-happy-island-avignon.jpg',
					alt: 'Title card for "Happy Island", La Ribot\'s piece with Dançando com a Diferença, over stills of the performers on stage'
				},
				summary:
					"The artistic vision behind this inclusive dance piece highlights the performers' total autonomy, beauty, and individuality on stage.",
				externalUrl: 'https://www.youtube.com/watch?v=f27_G0cESBE',
				externalLabel: 'Watch the full video'
			},
			{
				title: '4. Creation of the Feature Film "SuperNatural" (2022)',
				media: {
					type: 'video',
					src: '/videos/o-ciclo-da-invisibilidade/moment-4-supernatural-jorge-jacome.mp4',
					poster:
						'/photos/o-ciclo-da-invisibilidade/posters/moment-4-supernatural-jorge-jacome.jpg',
					alt: 'Title card for "Insider: Super Natural" by Jorge Jácome, followed by a moody moonlit still from the film'
				},
				summary:
					"The director explores the aesthetic concept and the different visual narratives built together with the company's members.",
				externalUrl: 'https://www.youtube.com/watch?v=GyANtcVdUEM',
				externalLabel: 'Watch the full video'
			},
			{
				title: '5. Launch of the "Ciclo da (In)visibilidade" (2025-2027)',
				isAudio: true,
				media: {
					type: 'image',
					src: '/photos/o-ciclo-da-invisibilidade/moment-5-ciclo-invisibilidade-poster.jpg',
					alt: 'Event poster for "Ciclo da (In)Visibilidade", 15–18 October 2025 at MUDAS.Museu de Arte Contemporânea da Madeira, over a teal-toned long-exposure photo of dancers in motion'
				},
				summary:
					"The anniversary programme celebrates the company's 25 years focused on breaking down barriers, and the profound social importance of these initiatives.",
				externalUrl:
					'https://madeira.rtp.pt/cultura/dancando-com-a-diferenca-da-palco-a-sociedade-madeirense-audio/',
				externalLabel: 'Listen to the full audio'
			}
		],
		body: []
	},
	{
		id: 'tania-carvalho',
		order: 4,
		track: 'performance',
		title: 'Tânia Carvalho',
		gloss: '04 · instrument and thought',
		poetic: '',
		heroMedia: {
			type: 'image',
			src: '/photos/tania-carvalho/interview-portrait.jpg',
			alt: 'Tânia Carvalho, smiling, in an interview setting with a lavalier microphone clipped to her shirt'
		},
		body: [
			"Tânia Carvalho was born in 1976 in Viana do Castelo and works out of Lisbon now. She started classical ballet at five, then moved into contemporary dance, training at the Escola Superior de Dança, going through Fórum Dança's contemporary interpreters course, and finishing the Gulbenkian Foundation's choreography course.",
			"She works across dance, music, drawing, and film, and doesn't stay at one scale. Icosahedron, from 2011, won Best Choreography from the Portuguese Society of Authors. Xylographie, from 2016, she made for the Lyon Opera Ballet. One's an independent piece, the other's for a major institutional company, and she moves between that range without it looking like a stretch.",
			"A few things carry through her work no matter the project: dancers moving out of sync with each other rather than in unison, light and objects treated as material she's actually choreographing rather than backdrop, and a story that never gets spelled out for the audience. Diogo & Sibela runs on the same method. This page is background for that method — the dancers themselves carry the piece from here."
		],
		pullQuote: {
			text: "I remember it was very motivating, very inspiring, because they really give it their all... They're dancers who truly love to dance. (...) If you make a suggestion or say what you want, they're immediately ready to do it and give you much more than what you ask for. But the process was the same as other processes. I create the movements, and the performers execute them. So, there wasn't really anything very different.",
			attribution: 'Tânia Carvalho',
			externalUrl:
				'https://www.teatromunicipaldoporto.pt/pt/mergulhar/entrevista-tania-carvalho-2022-09-30/',
			externalLabel: 'Read the full interview'
		}
	},
	{
		id: 'process',
		order: 5,
		track: 'performance',
		title: 'Preparation / Process',
		gloss: '05 · two solos, one process',
		poetic: '',
		heroMedia: {
			type: 'image',
			src: '/photos/process/hero-both.jpg',
			alt: 'Isabel and Diogo together in the studio during rehearsal'
		},
		body: ['Two solos, two dancers, one shared rehearsal process — told side by side.'],
		pullQuote: {
			text: 'The performance runs on intuition and flow, not a pre-set message or emotion.',
			attribution: 'From ethnographic notes on the first rehearsal'
		}
	},
	{
		id: 'diogo',
		order: 6,
		track: 'performance',
		title: 'Diogo Freitas',
		gloss: '06 · Diogo Freitas',
		poetic: '',
		pole: 'diogo',
		portrait: {
			src: '/photos/diogo/box-on-head.jpg',
			alt: 'Diogo mid-movement with a cardboard box over his head, arms loose at his sides, on a teal stage'
		},
		heroMedia: {
			type: 'image',
			src: '/photos/diogo/standing-portrait.jpg',
			alt: 'Diogo standing in a studio portrait, smiling, the Dançando com a Diferença mark beside him'
		},
		body: ['An architect of boxes — building, then taking it all apart again.'],
		gallery: [
			{
				type: 'image',
				src: '/photos/diogo/box-tomadas.jpg',
				alt: 'Macro photograph of a marked cardboard box from the show, corrugation and hand-drawn power-strip sketch visible'
			},
			{
				type: 'image',
				src: '/photos/diogo/box-cashdrawer.jpg',
				alt: 'Macro photograph of a cardboard box printed "Cash Drawer" with hand-drawn stars and clouds'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-overhead-box.jpg',
				alt: 'Diogo holding two stacked cardboard boxes overhead, mid-movement, on a blue stage'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-among-boxes.jpg',
				alt: 'Diogo standing among several cardboard boxes, one hand over his face, on a blue stage'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-denim-pocket.jpg',
				alt: 'Macro photograph of a denim pocket marked with colourful hand-drawn dots and shapes'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-shirt-marks.jpg',
				alt: 'Macro photograph of a white shirt covered in rows of small hand-drawn marks in multiple colours'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-shirt-figures.jpg',
				alt: 'Macro photograph of a white shirt marked with rows of small drawings and a stick-figure sketch'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-tomadas-alt.jpg',
				alt: 'Macro photograph of the "Bloco de Tomadas" cardboard box with a second hand-drawn power-strip sketch'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-cashdrawer-alt.jpg',
				alt: 'Macro photograph of the "Cash Drawer" cardboard box with hand-drawn hearts, stars and clouds'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-frozen-box.jpg',
				alt: 'Macro photograph of a "Congelados de Navarra" cardboard box marked with hand-drawn letters and stars'
			},
			{
				type: 'image',
				src: '/photos/diogo/study-box-figures.jpg',
				alt: 'Macro photograph of a cardboard box marked with a row of hand-drawn stick figures'
			}
		],
		sequence: {
			title: 'Lighting, Sound & Movement',
			meta: "10 cues · the production's own score for Diogo's solo",
			cues: [
				{
					n: 1,
					text: 'Dark, soft light at the start of the show.',
					image: '/photos/diogo/sequence/cue-01.jpg'
				},
				{
					n: 2,
					text: 'Diogo enters; the stage lights brighten, centred on him.',
					image: '/photos/diogo/sequence/cue-02.jpg'
				},
				{
					n: 3,
					text: "Opening music for Diogo's solo begins.",
					audio: '/audio/diogo/cue-03.mp3',
					visual: 'cello'
				},
				{
					n: 4,
					text: 'Sound builds and the light brightens further as he begins to move.',
					image: '/photos/diogo/sequence/cue-04.jpg'
				},
				{
					n: 5,
					text: 'The music calms and the lights lower — a new sound starts the box construction.',
					image: '/photos/diogo/sequence/cue-05.jpg'
				},
				{
					n: 6,
					text: 'The stage darkens further as the construction continues.',
					image: '/photos/diogo/sequence/cue-06.jpg'
				},
				{
					n: 7,
					text: 'The construction ends and the lights brighten again.',
					image: '/photos/diogo/sequence/cue-07.jpg'
				},
				{
					n: 8,
					text: 'The sound of rain begins, soft, as he gestures as if washing his face.',
					audio: '/audio/diogo/cue-08.mp3',
					visual: 'rain'
				},
				{
					n: 9,
					text: 'The rain turns aggressive; lights alternate light and dark to its rhythm.',
					image: '/photos/diogo/sequence/cue-09.jpg'
				},
				{
					n: 10,
					text: 'Dark colours — focus narrows on Diogo dismantling what he built.',
					image: '/photos/diogo/sequence/cue-10.jpg'
				}
			]
		}
	},
	{
		id: 'isabel',
		order: 7,
		track: 'performance',
		title: 'Isabel Teixeira',
		gloss: '07 · Isabel Teixeira',
		poetic: '',
		pole: 'isabel',
		portrait: {
			src: '/photos/isabela/seated-portrait.jpg',
			alt: 'Isabel seated in the chair, hands clasped, lit from above in near-darkness'
		},
		heroMedia: {
			type: 'image',
			src: '/photos/isabela/standing-portrait-notext.jpg',
			alt: 'Isabel standing in a studio portrait, hands on hips, the Dançando com a Diferença mark beside her'
		},
		body: ['Isabel — "Sibela" — tells this one herself, in her own words.'],
		gallery: [
			{
				type: 'image',
				src: '/photos/isabela/silhouette-blue-arms.jpg',
				alt: 'Isabel in silhouette against blue light, arms raised, in the closing dress'
			},
			{
				type: 'image',
				src: '/photos/isabela/silhouette-chair-green.jpg',
				alt: 'Isabel in silhouette against green light, arms raised, the empty chair beside her'
			},
			{
				type: 'image',
				src: '/photos/isabela/closeup-bent-forward.jpg',
				alt: 'Close-up of Isabel bent forward, hair falling over her face, lit against black'
			},
			{
				type: 'image',
				src: '/photos/isabela/duet-orange-light.jpg',
				alt: 'Isabel facing another dancer on an orange-lit stage, mid-gesture'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-01.jpg',
				alt: 'Isabel seated in the chair under a single warm spotlight, deep twilight around her',
				label: 'Cue 1 — stillness'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-02.jpg',
				alt: 'Isabel covering her head with her hands as small movements wake the body',
				label: 'Cue 2 — waking'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-03.jpg',
				alt: 'Isabel risen from the chair, holding a pose with open arms',
				label: 'Cue 3 — rising'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-05.jpg',
				alt: 'Isabel wandering the stage with loose, contemporary movement under livelier light',
				label: 'Cue 5 — wandering'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-06.jpg',
				alt: 'Isabel centre stage, torso bent forward, face hidden under her fallen hair',
				label: 'Cue 6 — falling hair'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-07.jpg',
				alt: 'Isabel mid-movement as the choreography turns sharp-edged under harsh light',
				label: 'Cue 7 — sharp-edged'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-08.jpg',
				alt: 'Isabel serene under a tight white spotlight, running a hand down her own arm',
				label: 'Cue 8 — serene'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-09.jpg',
				alt: 'Isabel retreating upstage into soft, dim colour, disappearing to change',
				label: 'Cue 9 — retreat'
			},
			{
				type: 'image',
				src: '/photos/isabela/sequence/cue-10.jpg',
				alt: 'Isabel reappearing in a new dress under vivid colour, arms open, transformed',
				label: 'Cue 10 — transformed'
			}
		],
		sequence: {
			title: 'Lighting, Sound & Movement',
			meta: "10 cues · the production's own score for Isabel's solo",
			cues: [
				{
					n: 1,
					text: 'Deep twilight opens on the chair under a single warm spot; she sits motionless.',
					image: '/photos/isabela/sequence/cue-01.jpg'
				},
				{
					n: 2,
					text: 'Small movements wake the body with the ambient sound; she covers her head with her hands.',
					image: '/photos/isabela/sequence/cue-02.jpg'
				},
				{
					n: 3,
					text: 'New layers of sound bring her up out of the chair; she holds a pose with open arms.',
					image: '/photos/isabela/sequence/cue-03.jpg'
				},
				{
					n: 4,
					text: "A brief total blackout while the solo's opening music settles in.",
					audio: '/audio/isabela/cue-04-teaser-excerpt.mp3',
					visual: 'bird'
				},
				{
					n: 5,
					text: 'More colour and light, livelier rhythms; she wanders the stage with loose, contemporary movement.',
					image: '/photos/isabela/sequence/cue-05.jpg'
				},
				{
					n: 6,
					text: 'Centre stage, her torso bends forward and her face disappears under her fallen hair.',
					image: '/photos/isabela/sequence/cue-06.jpg'
				},
				{
					n: 7,
					text: 'Sound and light sharpen together; the choreography turns sharp-edged and loud.',
					image: '/photos/isabela/sequence/cue-07.jpg'
				},
				{
					n: 8,
					text: 'A tight white spot calms the stage; serene, she runs a hand down her own arm.',
					image: '/photos/isabela/sequence/cue-08.jpg'
				},
				{
					n: 9,
					text: 'Soft, dim colour as she retreats upstage, disappearing into the dark to change.',
					image: '/photos/isabela/sequence/cue-09.jpg'
				},
				{
					n: 10,
					text: 'Vivid colour and a final contrast: she reappears in a new dress, arms open, transformed.',
					image: '/photos/isabela/sequence/cue-10.jpg'
				}
			]
		}
	},
	{
		id: 'performance',
		order: 8,
		track: 'performance',
		title: 'Performance',
		gloss: '08 · performance',
		poetic: '',
		heroMedia: {
			type: 'image',
			src: '/photos/performance/isabela-silhouette-chair.jpg',
			alt: 'Isabel in silhouette against green light, the chair beside her, arms open'
		},
		body: ['Two solos, one evening — live on stage, on tour across Portugal in 2026.'],
		gallery: [
			{
				type: 'image',
				src: '/photos/performance/diogo-silhouette-box.jpg',
				alt: 'Diogo in silhouette against amber light, hand resting on a stacked box',
				label: 'Act — Diogo, weight and boxes'
			}
		]
	},
	{
		id: 'post-dance',
		order: 9,
		track: 'performance',
		title: 'Interactive Post Dance',
		gloss: '09 · the lab',
		poetic: '',
		heroMedia: {
			type: 'image',
			src: '/photos/post-dance/boxes-remain.jpg',
			alt: "Diogo's boxes scattered across the empty, dimly lit stage after the solo"
		},
		body: [
			"What the dancing leaves behind: Diogo's boxes, Isabel's chair, and a question — what happens when the audience gets the room back?"
		]
	}
];

export function getChapter(id: string): ChapterContent | undefined {
	return chapters.find((c) => c.id === id);
}
