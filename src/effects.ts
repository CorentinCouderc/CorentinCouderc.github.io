import {type CardTag, type CardCategory, ETagCategory} from "./cardEnums.ts";
import {ECardCategory} from "./cardEnums.ts"

/*--------- Conditions ---------*/
export const EConditionType = {
    HAS_CARD_WITH_ID: "hasCardWithID",
    HAS_CARD_WITH_CATEGORY: "hasCardWithCategory",
    HAS_CARD_WITH_TAG: "hasCardWithTag",
    EVEN_TOTAL_CARD_PLAYED: "eventTotalCardPlayed",
    ALL_BOARD_FILLED: "allBoardFilled",
    MAX_ENERGY_ON_LEVEL_UP: "maxEnergyOnLevelUp",
    REPLACED_CARD_WITH_ID: "replacedCardWithID",
} as const
export type EffectConditionType = typeof EConditionType[keyof typeof EConditionType];

export type EffectCondition = {
    conditionType: EffectConditionType;
    requiredCardId: number | null;
    requiredCardCategory: CardCategory | null;
    requiredCardTags: CardTag[] | null;
    maxEnergyOnLevelUp: number | null;
    replacedCardId: number | null;
}
const defaultCondition: EffectCondition = {
    conditionType: EConditionType.HAS_CARD_WITH_ID,
    requiredCardId: null,
    requiredCardCategory: null,
    requiredCardTags: null,
    maxEnergyOnLevelUp: null,
    replacedCardId: null,
}

/*--------- Effect base ---------*/
export type CardEffect = {
    title: string;
    description: string;
    condition: EffectCondition | null;
}

/*--------- Immediate effects ---------*/
export const EImmediateEffect = {
    ADD_ENERGY: "addEnergy",
    ADD_XP: "addXP",
    ADD_REROLL: "addReroll",
    REMOVE_CARD: "removeCard",
    XP_BY_ENERGY_LEFT: "xpByEnergyLeft",
    REAPPLY_FLAT_GAIN: "reapplyFlatGain",
    ADD_RANDOM_CARD: "addRandomCard",
    SELECT_CARD: "selectCard",
} as const
export type ImmediateEffectType = typeof EImmediateEffect[keyof typeof EImmediateEffect];

export type CardImmediateEffect = CardEffect & {
    effectType: ImmediateEffectType;
    energyToAdd: number | null;
    xpToAdd: number | null;
    rerollToAdd: number | null;
    categoryToRemove: CardCategory | null;
    randomCardIndexList: number[] | null;
}

const defaultImmediateEffect = {
    title: "TODO",
    description: "TODO",
    condition: null,
    effectType: EImmediateEffect.ADD_XP,
    energyToAdd: null,
    xpToAdd: null,
    rerollToAdd: null,
    categoryToRemove: null,
    randomCardIndexList: null,
}

/*--------- Passive effects ---------*/
export const EPassiveEffect = {
    ENERGY_ON_LEVEL_UP: "energyOnLevelUp",
    BONUS_BY_CARD_WITH: "bonusByCardWith",
    XP_BY_ENERGY_SPENT: "xpByEnergySpent",
    REVIVE: "revive",
} as const
export type PassiveEffectType = typeof EPassiveEffect[keyof typeof EPassiveEffect];

export type CardPassiveEffect = CardEffect & {
    effectType: PassiveEffectType;
    energyOnLevelUp: number | null;
    bonusByCardWithEnergyAmount: number;
    bonusByCardWithXPAmount: number;
    bonusByCardWithMultiplier: number;
    bonusByCardWithCategory: CardCategory | null;
    bonusByCardWithCategoryUseRandom: boolean;
    bonusByCardWithTags: CardTag[] | null;
    byEnergySpent: number | null;
    byEnergySpentXPAmount: number | null;
    reviveEnergy: number | null;
}

const defaultPassiveEffect: CardPassiveEffect = {
    title: "TODO",
    description: "TODO",
    condition: null,
    effectType: EPassiveEffect.ENERGY_ON_LEVEL_UP,
    energyOnLevelUp: null,
    bonusByCardWithEnergyAmount: 0,
    bonusByCardWithXPAmount: 0,
    bonusByCardWithMultiplier: 0,
    bonusByCardWithCategory: null,
    bonusByCardWithCategoryUseRandom: false,
    bonusByCardWithTags: null,
    byEnergySpent: null,
    byEnergySpentXPAmount: null,
    reviveEnergy: null,
}

/* ---------------- Cards Immediate Effects -----------------------*/
// Formations
export const PrepaImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Khôlle",
    description: "Retire 1 {0}",
    effectType: EImmediateEffect.REMOVE_CARD,
    categoryToRemove: ECardCategory.HOBBY,
};

// Projets
export const RubiksImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Casse-tête",
    description: "+ {0} XP si tous les emplacements ont une carte",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.ALL_BOARD_FILLED,
    },
    effectType: EImmediateEffect.ADD_XP,
    xpToAdd: 10,
};

export const Sim2bImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Fusion/Acquisition",
    description: "+{0} XP si {1} est sur le terrain",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.HAS_CARD_WITH_ID,
        requiredCardId: 7, // Stage ATF
    },
    effectType: EImmediateEffect.ADD_XP,
    xpToAdd: 40,
};

export const HundredEarsWarImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Première fois",
    description: "+{0} XP",
    effectType: EImmediateEffect.ADD_XP,
    xpToAdd: 200,
};

export const DonjonNBKImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "\"Chaussette !\"",
    description: "Gagne une compétence aléatoire ({0}, {1} ou {2})",
    effectType: EImmediateEffect.ADD_RANDOM_CARD,
    randomCardIndexList: [20, 21, 22],
};

export const MaitreDonjonImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Oui maîîîître",
    description: "Réapplique les gains de toutes les cartes sur le plateau",
    effectType: EImmediateEffect.REAPPLY_FLAT_GAIN,
};

// Expériences

// Compétences

// Soft skills
export const RigueurImmediateEffect1: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Bosse des maths",
    description: "+ {0} si le nombre total de cartes jouées est pair",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.EVEN_TOTAL_CARD_PLAYED,
    },
    effectType: EImmediateEffect.ADD_ENERGY,
    energyToAdd: 3,
};

export const RigueurImmediateEffect2: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Produit vectoriel",
    description: "Gagne autant d'XP que d'énergie restant",
    effectType: EImmediateEffect.XP_BY_ENERGY_LEFT,
};

export const FederateurImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Capitaine",
    description: "+{0} si {1} est sur le terrain",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.HAS_CARD_WITH_ID,
        requiredCardId: 39, // VolleyBall
    },
    effectType: EImmediateEffect.ADD_ENERGY,
    energyToAdd: 20,
};

export const ManagementImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "C'est moi le chef",
    description: "+{0} relances",
    effectType: EImmediateEffect.ADD_REROLL,
    rerollToAdd: 2,
};

export const IdeationImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "MacGyver",
    description: "Sélectionne une nouvelle carte parmi 3",
    effectType: EImmediateEffect.SELECT_CARD,
};

// Hobbies
export const JeuSocieteImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Source d'inspiration",
    description: "+{0} si {1} est sur le terrain",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.HAS_CARD_WITH_ID,
        requiredCardId: 23, // Conception de jeu
    },
    effectType: EImmediateEffect.ADD_ENERGY,
    energyToAdd: 100,
};

export const EducatifImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "C'est pas sorcier !",
    description: "+{0}",
    effectType: EImmediateEffect.ADD_ENERGY,
    energyToAdd: 5,
};

export const VolleyImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Esprit d'équipe",
    description: "+{0} si il y a un {1} sur le terrain",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.HAS_CARD_WITH_CATEGORY,
        requiredCardCategory: ECardCategory.HOBBY,
    },
    effectType: EImmediateEffect.ADD_ENERGY,
    energyToAdd: 5,
};

export const BadmintonImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Double mixte",
    description: "+{0} si remplace {1}",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.REPLACED_CARD_WITH_ID,
        replacedCardId: 39, // VolleyBall
    },
    effectType: EImmediateEffect.ADD_ENERGY,
    energyToAdd: 20,
};

/* ---------------- Cards Passive Effects -----------------------*/
// Formations
export const BacPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Mention TB",
    description: "+{0} quand {1} est joué",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 5,
    bonusByCardWithCategory: ECardCategory.HOBBY,
};

export const PrepaPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Concours",
    description: "+{0} quand une carte avec le tag {2} est jouée",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 10,
    bonusByCardWithTags: [ETagCategory.COMPETITION],
};

export const CPEPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Stagiaire",
    description: "+{0} XP si {1} avec le tag {2} est jouée",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithXPAmount: 20,
    bonusByCardWithCategory: ECardCategory.EXPERIENCE,
    bonusByCardWithTags: [ETagCategory.INTERNSHIP],
};

// Projets
export const BestFriendsPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Paris entre amis",
    description: "+{0} si il reste moins de {1} lors du level up",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.MAX_ENERGY_ON_LEVEL_UP,
        maxEnergyOnLevelUp: 5,
    },
    effectType: EPassiveEffect.ENERGY_ON_LEVEL_UP,
    energyOnLevelUp: 10,
};

export const HiHoneyPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Travail d'équipe",
    description: "+{0} XP tous les {1} dépensés",
    effectType: EPassiveEffect.XP_BY_ENERGY_SPENT,
    byEnergySpent: 10,
    byEnergySpentXPAmount: 15,
};

export const BunnyHordePassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Survivor",
    description: "Si l'énergie tombe à 0 avec cette carte en jeu, ajoute {0}. Cette carte est retirée",
    effectType: EPassiveEffect.REVIVE,
    reviveEnergy: 50,
};

// Expériences
export const CoursParticulierPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Professeur",
    description: "+{0} par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 5,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PEDAGOGY],
};

export const StageBoschPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "",
    description: "+{0} par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 3,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PROGRAMMING, ETagCategory.SCIENTIST],
};

export const GamagoraPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "",
    description: "+{0} par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 3,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PROGRAMMING, ETagCategory.VIDEO_GAME],
};

export const StageATFPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "",
    description: "+{0} par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 3,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PROGRAMMING, ETagCategory.VIDEO_GAME],
};

export const ProgGameplayPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "",
    description: "+{0} par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 15,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PROGRAMMING, ETagCategory.VIDEO_GAME],
};

export const ManagementPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "",
    description: "+{0} par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 10,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PROGRAMMING, ETagCategory.VIDEO_GAME, ETagCategory.PEDAGOGY],
};

// Compétences
export const AnglaisPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Fluent",
    description: "+{0} par carte posée lorsque cette carte est sur le terrain",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 4,
};

export const JavascriptPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "World Wide Web",
    description: "+{0} par {1} joué si cette carte est sur le terrain",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 8,
    bonusByCardWithCategory: ECardCategory.PROJECT,
};

export const ProgrammationPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "\"Hello World!\"",
    description: "x{0} énergie gagnée par les {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithMultiplier: 2,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PROGRAMMING],
};

export const ConceptionJeuPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Hideo Kojima",
    description: "Les cartes avec le tag {0} scorent x{1}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithMultiplier: 3,
    bonusByCardWithTags: [ETagCategory.VIDEO_GAME],
};

export const StorylinePassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Pro du e-learning",
    description: "Les {0} avec le tag {1} scorent x{2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithMultiplier: 2,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.PEDAGOGY],
};

export const OutilsIAPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Vibe coding",
    description: "Les prochaines cartes posées scorent x{0}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithMultiplier: 3,
};

export const UnityPassiveEffect1: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Tutoriel",
    description: "+{0} XP par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithXPAmount: 15,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.VIDEO_GAME],
};

export const UnityPassiveEffect2: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Pro Gamer Master",
    description: "+{0} XP par {1} avec le tag {2}",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithXPAmount: 40,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithTags: [ETagCategory.VIDEO_GAME],
};

// Soft skills
export const ManagementPassiveEffect1: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Daily meeting",
    description: "+{0} XP tous les {1} dépensés",
    effectType: EPassiveEffect.XP_BY_ENERGY_SPENT,
    byEnergySpentXPAmount: 50,
    byEnergySpent: 5,
};

export const ManagementPassiveEffect2: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Discours motivationnel",
    description: "+{0} pour chaque nouvelle carte jouée",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 20,
};

export const LeadershipPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Suivez le guide",
    description: "+{0} si la prochaine catégorie jouée est {1} (choisi aléatoirement)",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 25,
    bonusByCardWithCategory: ECardCategory.PROJECT,
    bonusByCardWithCategoryUseRandom: true,
};

export const AnalyseSynthesePassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Matière grise",
    description: "+{0} XP tous les {1} dépensés",
    effectType: EPassiveEffect.XP_BY_ENERGY_SPENT,
    byEnergySpentXPAmount: 5,
    byEnergySpent: 8,
};

// Hobbies
export const JeuxVideoPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Level up",
    description: "+{0} par niveau gagné lorsque cette carte est sur le terrain",
    effectType: EPassiveEffect.ENERGY_ON_LEVEL_UP,
    energyOnLevelUp: 3,
};

export const LoLEsportPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "\"Let's go G2!\"",
    description: "+{0} par niveau gagné lorsque cette carte est sur le terrain",
    effectType: EPassiveEffect.ENERGY_ON_LEVEL_UP,
    energyOnLevelUp: 10,
};

export const ChantPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "The Voice",
    description: "+{0} par carte posée",
    effectType: EPassiveEffect.BONUS_BY_CARD_WITH,
    bonusByCardWithEnergyAmount: 20,
};