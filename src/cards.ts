import {
    type CardImmediateEffect,
    type CardPassiveEffect,
    EducatifImmediateEffect,
    VolleyImmediateEffect
} from "./effects.ts";
import {type CardCategory, type CardTag, ECardCategory, ETagCategory} from "./cardEnums.ts";
import {
    BacPassiveEffect, DonjonNBKImmediateEffect, IdeationImmediateEffect, JeuSocieteImmediateEffect,
    JeuxVideoPassiveEffect, MaitreDonjonImmediateEffect,
    ManagementImmediateEffect, PrepaImmediateEffect, RigueurImmediateEffect1,
    RubiksImmediateEffect, Sim2bImmediateEffect
} from "./effects.ts";

export type CardEffects = {
    energyFlat: number;
    xpFlat: number;
    xpPerTick: number;
    immediateEffect: CardImmediateEffect | null;
    passiveEffect: CardPassiveEffect | null;
}

const defaultEffects: CardEffects = {
    energyFlat: 0,
    xpFlat: 0,
    xpPerTick: 0,
    immediateEffect: null,
    passiveEffect: null,
}

export type CardData = {
    id: number;
    title: string;
    category: CardCategory;
    effects: CardEffects;
    tags: CardTag[];
    backContent: string;
    linkUrl: string;
    linkText: string;
};

const defaultCard: CardData = {
    id: -1,
    title: "TODO",
    category: ECardCategory.NONE,
    effects: {
        ...defaultEffects
    },
    tags: [],
    backContent: "",
    linkUrl: "",
    linkText: "",
}

export const allCards: CardData[] = [
    // FORMATIONS
    {
        ...defaultCard,
        id: 1,
        title: "Bac mention TB",
        category: ECardCategory.FORMATION,
        effects: {
            ...defaultEffects,
            energyFlat: 5,
            xpPerTick: 2,
            passiveEffect: BacPassiveEffect,
        },
        tags: [ETagCategory.SCIENTIST],
        backContent: "Mon bac mention très bien est très bien",
        linkUrl: "https://corentincouderc.com",
        linkText: "+ En savoir plus"
    },
    {
        ...defaultCard,
        id: 2,
        title: "Classe prépa Physique Chimie",
        category: ECardCategory.FORMATION,
        effects: {
            ...defaultEffects,
            energyFlat: 8,
            xpPerTick: 4,
            immediateEffect: PrepaImmediateEffect,
        },
        tags: [ETagCategory.SCIENTIST, ETagCategory.COMPETITION],
    },
    {
        ...defaultCard,
        id: 3,
        title: "Diplôme d'ingénieur CPE Lyon",
        category: ECardCategory.FORMATION,
        effects: {
            ...defaultEffects,
            energyFlat: 14,
            xpPerTick: 10,
        },
        tags: [ETagCategory.SCIENTIST],
    },
    {
        ...defaultCard,
        id: 4,
        title: "Former à l'ère du digital (certification)",
        category: ECardCategory.FORMATION,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
            xpPerTick: 20,
        },
        tags: [ETagCategory.PEDAGOGY],
    },

    // EXPERIENCES
    {
        ...defaultCard,
        id: 5,
        title: "Stage ingénieur 12 mois Bosch Allemagne\n",
        category: ECardCategory.EXPERIENCE,
        effects: {
            ...defaultEffects,
            xpFlat: 25,
        },
        tags: [ETagCategory.INTERNSHIP, ETagCategory.SCIENTIST, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 6,
        title: "Gamagora game show 2019\n",
        category: ECardCategory.EXPERIENCE,
        effects: {
            ...defaultEffects,
            xpFlat: 15,
        },
        tags: [ETagCategory.INTERNSHIP, ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 7,
        title: "Stagiaire programmeur Artefacts",
        category: ECardCategory.EXPERIENCE,
        effects: {
            ...defaultEffects,
            xpFlat: 40,
        },
        tags: [ETagCategory.INTERNSHIP, ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 8,
        title: "Programmeur gameplay Artefacts",
        category: ECardCategory.EXPERIENCE,
        effects: {
            ...defaultEffects,
            xpFlat: 100,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 9,
        title: "Cours particuliers Terminale S",
        category: ECardCategory.EXPERIENCE,
        effects: {
            ...defaultEffects,
            xpFlat: 10,
        },
        tags: [ETagCategory.SCIENTIST, ETagCategory.PEDAGOGY],
    },
    {
        ...defaultCard,
        id: 10,
        title: "Management Lead programmeur",
        category: ECardCategory.EXPERIENCE,
        effects: {
            ...defaultEffects,
            xpFlat: 40,
            immediateEffect: ManagementImmediateEffect,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING, ETagCategory.PEDAGOGY],
    },

    // PROJECTS
    {
        ...defaultCard,
        id: 11,
        title: "Sim2b",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
            immediateEffect: Sim2bImmediateEffect,
        },
        tags: [ETagCategory.PEDAGOGY, ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 12,
        title: "Le Donjon de Naheulbeuk",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 30,
            immediateEffect: DonjonNBKImmediateEffect,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 13,
        title: "Le Maître du Donjon de Naheulbeuk",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 5,
            immediateEffect: MaitreDonjonImmediateEffect,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 14,
        title: "100 ears' war (Game Jam GMTK 2023)",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 14,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING, ETagCategory.COMPETITION],
    },
    {
        ...defaultCard,
        id: 15,
        title: "Hi Honey (Game Jam GMTK 2025)",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING, ETagCategory.COMPETITION],
    },
    {
        ...defaultCard,
        id: 16,
        title: "Rubik's cube",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 10,
            immediateEffect: RubiksImmediateEffect,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 17,
        title: "Best Friends",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 10,
        },
        tags: [ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 18,
        title: "Bunny Horde (Survival Game)",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 12,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 19,
        title: "E-learning Animation 3D Arcane",
        category: ECardCategory.PROJECT,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
        },
        tags: [ETagCategory.PEDAGOGY, ETagCategory.PROGRAMMING],
    },

    // SKILLS
    {
        ...defaultCard,
        id: 20,
        title: "Anglais courant",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 3,
        },
    },
    {
        ...defaultCard,
        id: 21,
        title: "Unity C#",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 18,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 22,
        title: "Programmation",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 11,
        },
        tags: [ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 23,
        title: "Conception de jeu",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 35,
        },
        tags: [ETagCategory.VIDEO_GAME],
    },
    {
        ...defaultCard,
        id: 24,
        title: "Storyline",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 30,
        },
        tags: [ETagCategory.PEDAGOGY],
    },
    {
        ...defaultCard,
        id: 25,
        title: "Outils IA",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
        },
    },
    {
        ...defaultCard,
        id: 26,
        title: "JavaScript",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 7,
        },
        tags: [ETagCategory.PROGRAMMING],
    },
    {
        ...defaultCard,
        id: 27,
        title: "Fast learner",
        category: ECardCategory.SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 1,
            xpPerTick: 1,
        },
    },

    // SOFT SKILLS
    {
        ...defaultCard,
        id: 28,
        title: "Management situationnel",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
        },
        tags: [ETagCategory.PEDAGOGY],
    },
    {
        ...defaultCard,
        id: 29,
        title: "Fédérateur d'équipe",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 12,
        },
    },
    {
        ...defaultCard,
        id: 30,
        title: "Rigueur scientifique",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 5,
            immediateEffect: RigueurImmediateEffect1,
        },
        tags: [ETagCategory.SCIENTIST],
    },
    {
        ...defaultCard,
        id: 31,
        title: "Analyse et synthèse",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 14,
        },
        tags: [ETagCategory.SCIENTIST],
    },
    {
        ...defaultCard,
        id: 32,
        title: "Leadership",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
        },
    },
    {
        ...defaultCard,
        id: 33,
        title: "Idéation",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            ...defaultEffects,
            energyFlat: 1,
            immediateEffect: IdeationImmediateEffect,
        },
    },

    // HOBBIES
    {
        ...defaultCard,
        id: 34,
        title: "Jeux vidéo",
        category: ECardCategory.HOBBY,
        effects: {
            ...defaultEffects,
            energyFlat: 10,
            passiveEffect: JeuxVideoPassiveEffect,
        },
        tags: [ETagCategory.VIDEO_GAME],
    },
    {
        ...defaultCard,
        id: 35,
        title: "Jeux de société",
        category: ECardCategory.HOBBY,
        effects: {
            ...defaultEffects,
            energyFlat: 35,
            immediateEffect: JeuSocieteImmediateEffect,
        },
    },
    {
        ...defaultCard,
        id: 36,
        title: "Chant",
        category: ECardCategory.HOBBY,
        effects: {
            ...defaultEffects,
            energyFlat: 60,
        },
    },
    {
        ...defaultCard,
        id: 37,
        title: "Contenu éducatif",
        category: ECardCategory.HOBBY,
        effects: {
            ...defaultEffects,
            xpFlat: 10,
            immediateEffect: EducatifImmediateEffect,
        },
        tags: [ETagCategory.PEDAGOGY],
    },
    {
        ...defaultCard,
        id: 38,
        title: "Badminton",
        category: ECardCategory.HOBBY,
        effects: {
            ...defaultEffects,
            energyFlat: 20,
        },
        tags: [ETagCategory.COMPETITION],
    },
    {
        ...defaultCard,
        id: 39,
        title: "Volley-ball",
        category: ECardCategory.HOBBY,
        effects: {
            ...defaultEffects,
            energyFlat: 10,
            immediateEffect: VolleyImmediateEffect,
        },
        tags: [ETagCategory.COMPETITION],
    },
    {
        ...defaultCard,
        id: 40,
        title: "E-sport LoL",
        category: ECardCategory.HOBBY,
        effects: {
            ...defaultEffects,
            energyFlat: 25,
        },
        tags: [ETagCategory.COMPETITION, ETagCategory.VIDEO_GAME],
    },
];
