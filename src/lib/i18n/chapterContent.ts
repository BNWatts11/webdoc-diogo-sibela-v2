import type { ChapterContent } from '$lib/content/schema';
import type { Language } from '$lib/stores/language';

/**
 * Portuguese overrides for chapter BODY content (essays, quotes, clip
 * groups) — separate from chapterTranslationsPt in translations.ts, which
 * only covers the title/gloss/poetic shown in the nav. Filled in chapter by
 * chapter, reviewed as each one lands; chapters absent here (or fields
 * absent within a chapter) simply fall back to the English source.
 */
interface ChapterContentPt {
	body?: string[];
	pullQuote?: { text?: string; attribution?: string; externalLabel?: string };
	/** must match extraClipGroups[i].heading's PT override below, since the
	 * template threads the inline quote into whichever group's heading
	 * equals this string */
	pullQuoteInline?: { groupHeading?: string };
	dancerTestimony?: {
		subtitle?: string;
		framing?: string;
		credit?: string;
		transcript?: string;
		moments?: { text?: string }[];
	};
	philosophy?: {
		kicker?: string;
		heading?: string;
		statement?: string;
		attribution?: string;
		body?: string;
	};
	caseStudy?: {
		kicker?: string;
		heading?: string;
		intro?: string;
		clips?: { title?: string }[];
		externalLabel?: string;
	};
	synthesisHighlights?: {
		heading?: string;
		intro?: string;
		items?: { title?: string }[];
		externalLabel?: string;
	};
	referenceCompanies?: { country?: string; description?: string }[];
	extraClipGroupsHeading?: string;
	extraClipGroups?: { heading?: string; clips?: { title?: string }[]; externalLabel?: string }[];
	secondaryHeroTitle?: string;
	editions?: { heading?: string; interviewLabel?: string; programLabel?: string }[];
	momentsHeading?: string;
	moments?: { title?: string; summary?: string; externalLabel?: string }[];
	sequence?: { title?: string; meta?: string; cues?: { text?: string }[] };
}

export const chapterContentPt: Record<string, ChapterContentPt> = {
	'inclusive-dance': {
		body: [
			'A Dança Inclusiva é uma prática artística que desafia abertamente as técnicas tradicionais de dança, acolhendo a diversidade corporal e a mistura de capacidades. Longe de tratar a divergência funcional como uma limitação, esta prática assume a diferença como motor central de inovação criativa, estética e política.'
		],
		// `moments` and `transcript` are translations of the film's English
		// subtitles (the burned-in subtitles in the picture itself stay English),
		// so the page reads in the visitor's language.
		dancerTestimony: {
			subtitle: 'Bailarinos pelas suas palavras',
			framing:
				'Antes do enquadramento académico e do relato do diretor que se seguem, bailarinos da companhia dizem, um a um, o que a dança é para eles — toque numa frase para saltar para esse momento do filme.',
			credit: 'Bailarinos da companhia, Dançando com a Diferença · filmado ao ar livre, na Madeira',
			transcript:
				'A dança é uma forma não verbal de expressar os nossos sentimentos. Adoro dançar e senti-lo no corpo. Uma ligação… uma forma de comunicar… porque quando danço consigo comunicar com as árvores, com as pessoas, com tudo. Adoro a dança do fundo do coração.',
			moments: [
				{ text: 'A dança é uma forma não verbal de expressar os nossos sentimentos.' },
				{ text: 'Adoro dançar e senti-lo no corpo.' },
				{
					text: 'Uma ligação… uma forma de comunicar… porque quando danço consigo comunicar com as árvores, com as pessoas, com tudo.'
				},
				{ text: 'Adoro a dança do fundo do coração.' }
			]
		},
		referenceCompanies: [
			{
				description:
					'Fundada em 2001 por Henrique Amoedo, esta companhia é a principal parceira institucional deste projeto. Constitui um marco histórico no panorama das artes inclusivas, reunindo bailarinos com e sem deficiência a partilhar o palco profissional.'
			},
			{
				country: 'Reino Unido',
				description:
					'Uma referência internacional de relevo, identificada durante a pesquisa visual desta tese. É mundialmente reconhecida por criar produções contemporâneas que redefinem quem pode dançar e como se estrutura a coreografia inclusiva.'
			},
			{
				country: 'Austrália',
				description:
					'Amplamente conhecida pela sua icónica produção "Glow", na qual explora sistemas de captura de movimento para projetar gráficos visuais reativos e linhas de luz que estendem e amplificam o corpo do intérprete.'
			},
			{
				country: 'EUA / Alemanha',
				description:
					'Identificada como uma pioneira fundamental na integração da expressão de dança em tempo real com media digitais interativos.'
			}
		],
		extraClipGroups: [
			{
				heading: 'Entrevista com Henrique Amoedo',
				clips: [
					{ title: 'A Dança Inclusiva é hoje simplesmente Dança Contemporânea' },
					{ title: 'A importância do seu doutoramento sobre as origens da Dança Inclusiva' }
				],
				externalLabel: 'Ver a entrevista completa'
			}
		],
		synthesisHighlights: {
			heading: 'A Importância da Dança para os Bailarinos',
			intro:
				'Dois pequenos excertos, recortados de uma sessão de entrevista mais longa em vez de deixados como uma única gravação extensa — o suficiente para ouvir a ideia, sem pedir que veja tudo.',
			items: [
				{ title: 'O toque e o contacto são tudo na dança' },
				{ title: 'O que a dança significa para eles' }
			],
			externalLabel: 'Ver o vídeo completo'
		}
	},
	company: {
		body: [
			'A Dançando com a Diferença (DcD) é uma companhia de dança sem fins lucrativos sediada na Madeira, Portugal, fundada em 2001 e dirigida por Henrique Amoedo. Trabalha exclusivamente em dança inclusiva, sendo reconhecida como uma referência na área, tanto a nível nacional como internacional.'
		],
		philosophy: {
			kicker: 'Filosofia Artística',
			heading: 'Fazer a Diferença',
			statement:
				'Mudar a imagem social das pessoas com deficiência, e conquistar espaço para a diversidade humana nas artes contemporâneas.',
			attribution: 'Dançando com a Diferença — missão',
			body: 'Tudo o que se segue — duas décadas de cobertura mediática, quinze produções e a própria história de Telmo — é mais uma tentativa de pôr essa missão em prática, dentro e fora de palco.'
		},
		extraClipGroups: [
			{
				clips: [
					{ title: 'Como funciona?' },
					{ title: 'Reconhecida a nível nacional e internacional' },
					{ title: 'Ser influenciado por outros é importante' },
					{ title: 'O mundo é uma fonte de alimento' },
					{ title: 'Primeiro grande passo' }
				]
			},
			{
				heading: 'Projetos'
				// clip titles are the productions' own official names — left
				// untranslated in both languages; most are already Portuguese
			}
		],
		caseStudy: {
			kicker: 'Fazer a Diferença, na prática',
			heading: 'A História de Telmo',
			intro:
				'Antes de Telmo Ferreira se juntar à Dançando com a Diferença, a televisão nacional noticiou a sua história como um caso de exclusão. O que se segue é a cobertura do que veio depois — a missão da companhia, filmada em curso, não apenas enunciada como ideal.',
			clips: [{ title: 'Antes de entrar para a companhia' }, { title: 'Em palco com a companhia' }],
			externalLabel: 'Ver a história completa'
		}
	},
	'o-ciclo-da-invisibilidade': {
		secondaryHeroTitle: 'Porquê esta celebração?',
		editions: [
			{
				heading: 'Ciclo da (In)visibilidade (1.ª Edição)',
				programLabel: 'Ver o programa completo neste link'
			},
			{
				heading: 'O Ciclo da (In)visibilidade (2.ª Edição)',
				programLabel: 'Ver o programa completo neste link'
			}
		],
		momentsHeading: 'Momentos Marcantes',
		moments: [
			{
				title: '1. Fundação e Espírito Pioneiro (2001) - por Henrique Amoedo',
				summary:
					'O fundador explica como o seu percurso de vida moldou o projeto, e a importância de criar um polo de dança inclusiva enraizado na Madeira.',
				externalLabel: 'Ver o vídeo completo'
			},
			{
				title: '2. Estreia de "Bichos" (2002)',
				summary:
					'Os bailarinos retratam lutas e dilemas humanos inspirados na icónica obra literária de Miguel Torga.',
				externalLabel: 'Ver o vídeo completo'
			},
			{
				title: '3. Reconhecimento Internacional no Festival de Avignon (2018)',
				summary:
					'A visão artística por trás desta peça de dança inclusiva destaca a autonomia total, a beleza e a individualidade dos intérpretes em palco.',
				externalLabel: 'Ver o vídeo completo'
			},
			{
				title: '4. Criação da Longa-Metragem "SuperNatural" (2022)',
				summary:
					'O realizador explora o conceito estético e as diferentes narrativas visuais construídas em conjunto com os membros da companhia.',
				externalLabel: 'Ver o vídeo completo'
			},
			{
				title: '5. Lançamento do "Ciclo da (In)visibilidade" (2025-2027)',
				summary:
					'O programa de aniversário celebra os 25 anos da companhia, focados na quebra de barreiras, e a profunda importância social destas iniciativas.',
				externalLabel: 'Ouvir o áudio completo'
			}
		]
	},
	'tania-carvalho': {
		body: [
			'Tânia Carvalho nasceu em 1976 em Viana do Castelo e trabalha atualmente a partir de Lisboa. Começou o ballet clássico aos cinco anos, passando depois para a dança contemporânea, formando-se na Escola Superior de Dança, seguindo o curso de intérpretes contemporâneos do Fórum Dança, e concluindo o curso de coreografia da Fundação Gulbenkian.',
			'Trabalha entre dança, música, desenho e cinema, sem se fixar numa única escala. Icosahedron, de 2011, venceu o prémio de Melhor Coreografia da Sociedade Portuguesa de Autores. Xylographie, de 2016, foi criada para o Lyon Opera Ballet. Uma é uma peça independente, a outra para uma grande companhia institucional, e ela transita entre esse alcance sem que pareça um esforço.',
			'Há um conjunto de traços que atravessam o seu trabalho seja qual for o projeto: bailarinos que se movem dessincronizados entre si em vez de em uníssono, luz e objetos tratados como material que ela de facto coreografa em vez de cenário, e uma história que nunca é explicada ao público. Diogo & Sibela segue o mesmo método. Esta página é o contexto para esse método — a partir daqui, são os próprios bailarinos que levam a peça.'
		],
		pullQuote: {
			// verified against the original interview (teatromunicipaldoporto.pt),
			// not back-translated from the English rendering — this is a direct
			// quote, so the "(...)" marks the same gap as the EN version, joining
			// two excerpts from that same interview
			text: 'Lembro-me que foi muito motivador, muito inspirador, porque eles dão-se muito... São intérpretes que gostam muito de dançar. (...) Se fazes uma proposta ou se dizes o que queres, eles estão logo prontos a fazer e dão-te muito mais do que aquilo que pedes. Mas o processo foi igual a outros processos. Eu crio os movimentos, os intérpretes fazem. Não houve, assim, nada de muito diferente.',
			externalLabel: 'Ler a entrevista completa'
		}
	},
	diogo: {
		sequence: {
			title: 'Luz, Som e Movimento',
			meta: '10 deixas · a partitura da própria produção para o solo de Diogo',
			cues: [
				{ text: 'Escuro, luz suave no início do espetáculo.' },
				{ text: 'Diogo entra; as luzes de palco intensificam-se, centradas nele.' },
				{ text: 'Começa a música de abertura do solo de Diogo.' },
				{ text: 'O som intensifica-se e a luz aumenta ainda mais enquanto ele começa a mover-se.' },
				{
					text: 'A música acalma e as luzes baixam — um novo som dá início à construção das caixas.'
				},
				{ text: 'O palco escurece ainda mais enquanto a construção continua.' },
				{ text: 'A construção termina e as luzes voltam a intensificar-se.' },
				{ text: 'Começa o som da chuva, suave, enquanto ele gesticula como se lavasse o rosto.' },
				{
					text: 'A chuva torna-se agressiva; as luzes alternam entre claro e escuro ao seu ritmo.'
				},
				{ text: 'Cores escuras — o foco estreita-se em Diogo a desmontar o que construiu.' }
			]
		}
	},
	isabel: {
		sequence: {
			title: 'Luz, Som e Movimento',
			meta: '10 deixas · a partitura da própria produção para o solo de Isabel',
			cues: [
				{
					text: 'Um crepúsculo profundo abre sobre a cadeira, sob um único foco quente; ela está sentada, imóvel.'
				},
				{
					text: 'Pequenos movimentos despertam o corpo ao som ambiente; ela cobre a cabeça com as mãos.'
				},
				{
					text: 'Novas camadas de som erguem-na da cadeira; ela sustém uma pose de braços abertos.'
				},
				{ text: 'Um breve blackout total enquanto a música de abertura do solo se instala.' },
				{
					text: 'Mais cor e luz, ritmos mais vivos; ela vagueia pelo palco com um movimento contemporâneo solto.'
				},
				{
					text: 'No centro do palco, o tronco inclina-se para a frente e o rosto desaparece sob o cabelo solto.'
				},
				{ text: 'Som e luz afiam-se juntos; a coreografia torna-se cortante e sonora.' },
				{
					text: 'Um foco branco cerrado acalma o palco; serena, ela desliza a mão pelo próprio braço.'
				},
				{
					text: 'Cor suave e ténue enquanto ela recua para o fundo do palco, desaparecendo na escuridão para mudar de roupa.'
				},
				{
					text: 'Cor viva e um contraste final: ela reaparece num vestido novo, braços abertos, transformada.'
				}
			]
		}
	}
};

/** Overlays the PT content above onto a chapter; passes English through untouched. */
export function localizeChapter(chapter: ChapterContent, lang: Language): ChapterContent {
	if (lang !== 'pt') return chapter;
	const pt = chapterContentPt[chapter.id];
	if (!pt) return chapter;

	return {
		...chapter,
		body: pt.body ?? chapter.body,
		pullQuote: chapter.pullQuote
			? {
					...chapter.pullQuote,
					text: pt.pullQuote?.text ?? chapter.pullQuote.text,
					attribution: pt.pullQuote?.attribution ?? chapter.pullQuote.attribution,
					externalLabel: pt.pullQuote?.externalLabel ?? chapter.pullQuote.externalLabel
				}
			: chapter.pullQuote,
		pullQuoteInline: chapter.pullQuoteInline
			? {
					...chapter.pullQuoteInline,
					groupHeading: pt.pullQuoteInline?.groupHeading ?? chapter.pullQuoteInline.groupHeading
				}
			: chapter.pullQuoteInline,
		dancerTestimony: chapter.dancerTestimony
			? {
					...chapter.dancerTestimony,
					subtitle: pt.dancerTestimony?.subtitle ?? chapter.dancerTestimony.subtitle,
					framing: pt.dancerTestimony?.framing ?? chapter.dancerTestimony.framing,
					credit: pt.dancerTestimony?.credit ?? chapter.dancerTestimony.credit,
					transcript: pt.dancerTestimony?.transcript ?? chapter.dancerTestimony.transcript,
					moments: chapter.dancerTestimony.moments.map((m, i) => ({
						...m,
						text: pt.dancerTestimony?.moments?.[i]?.text ?? m.text
					}))
				}
			: chapter.dancerTestimony,
		philosophy: chapter.philosophy
			? {
					...chapter.philosophy,
					kicker: pt.philosophy?.kicker ?? chapter.philosophy.kicker,
					heading: pt.philosophy?.heading ?? chapter.philosophy.heading,
					statement: pt.philosophy?.statement ?? chapter.philosophy.statement,
					attribution: pt.philosophy?.attribution ?? chapter.philosophy.attribution,
					body: pt.philosophy?.body ?? chapter.philosophy.body
				}
			: chapter.philosophy,
		caseStudy: chapter.caseStudy
			? {
					...chapter.caseStudy,
					kicker: pt.caseStudy?.kicker ?? chapter.caseStudy.kicker,
					heading: pt.caseStudy?.heading ?? chapter.caseStudy.heading,
					intro: pt.caseStudy?.intro ?? chapter.caseStudy.intro,
					externalLabel: pt.caseStudy?.externalLabel ?? chapter.caseStudy.externalLabel,
					clips: chapter.caseStudy.clips.map((clip, i) => ({
						...clip,
						title: pt.caseStudy?.clips?.[i]?.title ?? clip.title
					}))
				}
			: chapter.caseStudy,
		synthesisHighlights: chapter.synthesisHighlights
			? {
					...chapter.synthesisHighlights,
					heading: pt.synthesisHighlights?.heading ?? chapter.synthesisHighlights.heading,
					intro: pt.synthesisHighlights?.intro ?? chapter.synthesisHighlights.intro,
					externalLabel:
						pt.synthesisHighlights?.externalLabel ?? chapter.synthesisHighlights.externalLabel,
					items: chapter.synthesisHighlights.items.map((item, i) => ({
						...item,
						title: pt.synthesisHighlights?.items?.[i]?.title ?? item.title
					}))
				}
			: chapter.synthesisHighlights,
		referenceCompanies: chapter.referenceCompanies?.map((rc, i) => ({
			...rc,
			country: pt.referenceCompanies?.[i]?.country ?? rc.country,
			description: pt.referenceCompanies?.[i]?.description ?? rc.description
		})),
		extraClipGroupsHeading: pt.extraClipGroupsHeading ?? chapter.extraClipGroupsHeading,
		extraClipGroups: chapter.extraClipGroups?.map((group, i) => {
			const ptGroup = pt.extraClipGroups?.[i];
			return {
				...group,
				heading: ptGroup?.heading ?? group.heading,
				externalLabel: ptGroup?.externalLabel ?? group.externalLabel,
				clips: group.clips.map((clip, j) => ({
					...clip,
					title: ptGroup?.clips?.[j]?.title ?? clip.title
				}))
			};
		}),
		secondaryHeroTitle: pt.secondaryHeroTitle ?? chapter.secondaryHeroTitle,
		editions: chapter.editions?.map((edition, i) => {
			const ptEdition = pt.editions?.[i];
			return {
				...edition,
				heading: ptEdition?.heading ?? edition.heading,
				interviewLabel: ptEdition?.interviewLabel ?? edition.interviewLabel,
				programLabel: ptEdition?.programLabel ?? edition.programLabel
			};
		}),
		momentsHeading: pt.momentsHeading ?? chapter.momentsHeading,
		moments: chapter.moments?.map((moment, i) => {
			const ptMoment = pt.moments?.[i];
			return {
				...moment,
				title: ptMoment?.title ?? moment.title,
				summary: ptMoment?.summary ?? moment.summary,
				externalLabel: ptMoment?.externalLabel ?? moment.externalLabel
			};
		}),
		sequence: chapter.sequence
			? {
					...chapter.sequence,
					title: pt.sequence?.title ?? chapter.sequence.title,
					meta: pt.sequence?.meta ?? chapter.sequence.meta,
					cues: chapter.sequence.cues.map((cue, i) => ({
						...cue,
						text: pt.sequence?.cues?.[i]?.text ?? cue.text
					}))
				}
			: chapter.sequence
	};
}
