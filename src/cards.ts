import type {CardImmediateEffect} from "./effects.ts";

export const ECardCategory = {
    NONE: "none",
    FORMATION: "formation",
    SKILL: "skill",
    PROJECT: "project",
    SOFT_SKILL: "softSkill",
    EXPERIENCE: "experience",
    HOBBY: "hobby",
} as const
export type CardCategory = typeof ECardCategory[keyof typeof ECardCategory];

export const orderedCategories = [ECardCategory.FORMATION, ECardCategory.PROJECT, ECardCategory.EXPERIENCE, ECardCategory.SKILL, ECardCategory.SOFT_SKILL, ECardCategory.HOBBY];

export const ETagCategory = {
    SCIENTIST: "scientist",
    COMPETITION: "competition",
    VIDEO_GAME: "videoGame",
    PROGRAMMING: "programming",
    INTERNSHIP: "internship",
    PEDAGOGY: "pedagogy",
} as const
export type CardTag = typeof ETagCategory[keyof typeof ETagCategory];

export type CardEffects = {
    energyFlat: number;
    xpFlat: number;
    xpPerTick: number;
    immediateEffect: CardImmediateEffect | null;
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

export function getTagString(tag: CardTag)
{
    switch (tag) {
        case ETagCategory.SCIENTIST:
            return "Scientifique";
        case ETagCategory.COMPETITION:
            return "Compétition";
        case ETagCategory.VIDEO_GAME:
            return "Jeu vidéo";
        case ETagCategory.PROGRAMMING:
            return "Programmation";
        case ETagCategory.INTERNSHIP:
            return "Stage";
        case ETagCategory.PEDAGOGY:
            return "Pédagogie";
        default:
            console.error("Unknown tag: ", tag);
            return "";
    }
}

export function getEffectString(category: CardCategory)
{
    switch (category) {
        case ECardCategory.FORMATION:
            return "+1 à toutes les prochaines cartes de ce tour";
        case ECardCategory.SKILL:
            return "Pioche 1 carte";
        case ECardCategory.PROJECT:
            return "La prochaine compétence coûte 0 énergie";
        case ECardCategory.SOFT_SKILL:
            return "+2 à la prochaine carte jouée";
        case ECardCategory.EXPERIENCE:
            return "x2 au prochain projet";
        case ECardCategory.HOBBY:
            return "+1 énergie";
        default:
            console.error("Unknown category: ", category);
            return "";
    }
}

export function getCategoryString(category: CardCategory)
{
    switch (category)
    {
        case ECardCategory.FORMATION:
            return "Formation";
        case ECardCategory.SKILL:
            return "Compétence";
        case ECardCategory.PROJECT:
            return "Projet";
        case ECardCategory.SOFT_SKILL:
            return "Soft Skill";
        case ECardCategory.EXPERIENCE:
            return "Expérience";
        case ECardCategory.HOBBY:
            return "Centre d’intérêt";
        default:
            console.error("Unknown category: ", category);
            return "";
    }
}

export const allCards: CardData[] = [
    // FORMATIONS
    {
        id: 1,
        title: "Bac mention TB",
        category: ECardCategory.FORMATION,
        effects: {
            energyFlat: 5,
            xpFlat: 0,
            xpPerTick: 2,
            immediateEffect: null,
        },
        tags: [ETagCategory.SCIENTIST],
        backContent: "Mon bac mention très bien est très bien",
        linkUrl: "https://corentincouderc.com",
        linkText: "+ En savoir plus"
    },
    {
        id: 2,
        title: "Classe prépa Physique Chimie",
        category: ECardCategory.FORMATION,
        effects: {
            energyFlat: 8,
            xpFlat: 0,
            xpPerTick: 4,
            immediateEffect: null,
        },
        tags: [ETagCategory.SCIENTIST, ETagCategory.COMPETITION],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 3,
        title: "Diplôme d'ingénieur CPE Lyon",
        category: ECardCategory.FORMATION,
        effects: {
            energyFlat: 14,
            xpFlat: 0,
            xpPerTick: 10,
            immediateEffect: null,
        },
        tags: [ETagCategory.SCIENTIST],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 4,
        title: "Former à l'ère du digital (certification)",
        category: ECardCategory.FORMATION,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 20,
            immediateEffect: null,
        },
        tags: [ETagCategory.PEDAGOGY],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },

    // EXPERIENCES
    {
        id: 5,
        title: "Stage ingénieur 12 mois Bosch Allemagne\n",
        category: ECardCategory.EXPERIENCE,
        effects: {
            energyFlat: 0,
            xpFlat: 25,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.INTERNSHIP, ETagCategory.SCIENTIST, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 6,
        title: "Gamagora game show 2019\n",
        category: ECardCategory.EXPERIENCE,
        effects: {
            energyFlat: 0,
            xpFlat: 15,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.INTERNSHIP, ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 7,
        title: "Stagiaire programmeur Artefacts",
        category: ECardCategory.EXPERIENCE,
        effects: {
            energyFlat: 0,
            xpFlat: 40,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.INTERNSHIP, ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 8,
        title: "Programmeur gameplay Artefacts",
        category: ECardCategory.EXPERIENCE,
        effects: {
            energyFlat: 0,
            xpFlat: 100,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 9,
        title: "Cours particuliers Terminale S",
        category: ECardCategory.EXPERIENCE,
        effects: {
            energyFlat: 0,
            xpFlat: 10,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.SCIENTIST, ETagCategory.PEDAGOGY],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 10,
        title: "Management Lead programmeur",
        category: ECardCategory.EXPERIENCE,
        effects: {
            energyFlat: 0,
            xpFlat: 40,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING, ETagCategory.PEDAGOGY],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },

    // PROJECTS
    {
        id: 11,
        title: "Sim2b",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PEDAGOGY, ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 12,
        title: "Le Donjon de Naheulbeuk",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 30,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 13,
        title: "Le Maître du Donjon de Naheulbeuk",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 5,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 14,
        title: "100 ears' war (Game Jam GMTK 2023)",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 14,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING, ETagCategory.COMPETITION],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 15,
        title: "Hi Honey (Game Jam GMTK 2025)",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING, ETagCategory.COMPETITION],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 16,
        title: "Rubik's cube",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 10,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 17,
        title: "Best Friends",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 10,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 18,
        title: "Bunny Horde (Survival Game)",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 12,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 19,
        title: "E-learning Animation 3D Arcane",
        category: ECardCategory.PROJECT,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PEDAGOGY, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },

    // SKILLS
    {
        id: 20,
        title: "Anglais courant",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 3,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 21,
        title: "Unity C#",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 18,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 22,
        title: "Programmation",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 11,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 23,
        title: "Conception de jeu",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 35,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 24,
        title: "Storyline",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 30,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PEDAGOGY],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 25,
        title: "Outils IA",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 26,
        title: "JavaScript",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 7,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PROGRAMMING],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 27,
        title: "Fast learner",
        category: ECardCategory.SKILL,
        effects: {
            energyFlat: 1,
            xpFlat: 0,
            xpPerTick: 1,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },

    // SOFT SKILLS
    {
        id: 28,
        title: "Management situationnel",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PEDAGOGY],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 29,
        title: "Fédérateur d'équipe",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            energyFlat: 12,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 30,
        title: "Rigueur scientifique",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            energyFlat: 5,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.SCIENTIST],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 31,
        title: "Analyse et synthèse",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            energyFlat: 14,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.SCIENTIST],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 32,
        title: "Leadership",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 33,
        title: "Idéation",
        category: ECardCategory.SOFT_SKILL,
        effects: {
            energyFlat: 1,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },

    // HOBBIES
    {
        id: 34,
        title: "Jeux vidéo",
        category: ECardCategory.HOBBY,
        effects: {
            energyFlat: 10,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.VIDEO_GAME],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 35,
        title: "Jeux de société",
        category: ECardCategory.HOBBY,
        effects: {
            energyFlat: 35,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 36,
        title: "Chant",
        category: ECardCategory.HOBBY,
        effects: {
            energyFlat: 60,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 37,
        title: "Contenu éducatif",
        category: ECardCategory.HOBBY,
        effects: {
            energyFlat: 0,
            xpFlat: 10,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.PEDAGOGY],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 38,
        title: "Badminton",
        category: ECardCategory.HOBBY,
        effects: {
            energyFlat: 20,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.COMPETITION],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 39,
        title: "Volley-ball",
        category: ECardCategory.HOBBY,
        effects: {
            energyFlat: 10,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.COMPETITION],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
    {
        id: 40,
        title: "E-sport LoL",
        category: ECardCategory.HOBBY,
        effects: {
            energyFlat: 25,
            xpFlat: 0,
            xpPerTick: 0,
            immediateEffect: null,
        },
        tags: [ETagCategory.COMPETITION, ETagCategory.VIDEO_GAME],
        backContent: "",
        linkUrl: "",
        linkText: ""
    },
];
