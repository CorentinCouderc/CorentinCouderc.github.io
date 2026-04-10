import {type CardTag, type CardCategory, ECardCategory, type CardData, allCards} from "./cards.ts";

/*--------- Conditions ---------*/
export const EConditionType = {
    CARD_WITH_ID: "cardWithID",
    CARD_WITH_TAG: "cardWithTag",
    EVEN_TOTAL_CARD_PLAYED: "eventTotalCardPlayed",
    ALL_BOARD_FILLED: "allBoardFilled",
} as const
export type EffectConditionType = typeof EConditionType[keyof typeof EConditionType];

export type EffectCondition = {
    conditionType: EffectConditionType;
    requiredCardId: number | null;
    requiredCardTags: CardTag[] | null;
}
const defaultCondition: EffectCondition = {
    conditionType: EConditionType.CARD_WITH_ID,
    requiredCardId: null,
    requiredCardTags: null,
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
} as const
export type ImmediateEffectType = typeof EImmediateEffect[keyof typeof EImmediateEffect];

export type CardImmediateEffect = CardEffect & {
    effectType: ImmediateEffectType;
    energyToAdd: number | null;
    xpToAdd: number | null;
    rerollToAdd: number | null;
    categoryToRemove: CardCategory | null;
    randomCardList: CardData[] | null;
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
    randomCardList: null,
}

/*--------- Passive effects ---------*/
export const EPassiveEffect = {
    ENERGY_BY_CARD_TYPE: "energyByCardType",
} as const
export type PassiveEffectType = typeof EPassiveEffect[keyof typeof EPassiveEffect];

export type CardPassiveEffect = CardEffect & {
    effectType: PassiveEffectType;
    energyByCardType: number | null;
}

const defaultPassiveEffect: CardPassiveEffect = {
    title: "TODO",
    description: "TODO",
    condition: null,
    effectType: EPassiveEffect.ENERGY_BY_CARD_TYPE,
    energyByCardType: null,
}

/* ---------------- Cards Immediate Effects -----------------------*/
export const PrepaImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Khôlle",
    description: "Retire 1 {0}",
    effectType: EImmediateEffect.REMOVE_CARD,
    categoryToRemove: ECardCategory.HOBBY,
};

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

export const DonjonNBKImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "\"Chaussette !\"",
    description: "Gagne une compétence aléatoire ({0}, {1} ou {2})",
    effectType: EImmediateEffect.ADD_RANDOM_CARD,
    randomCardList: [allCards[20], allCards[21], allCards[22]],
};

export const MaitreDonjonImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Oui maîîîître",
    description: "Réapplique les gains de toutes les cartes sur le plateau",
    effectType: EImmediateEffect.REAPPLY_FLAT_GAIN,
};

export const Sim2bImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Fusion/Acquisition",
    description: "+{0} XP si {1} est sur le terrain",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.CARD_WITH_ID,
        requiredCardId: 7,
    },
    effectType: EImmediateEffect.ADD_XP,
    xpToAdd: 40,
};

export const ManagementImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "C'est moi le chef",
    description: "+{0} relances",
    effectType: EImmediateEffect.ADD_REROLL,
    rerollToAdd: 2,
};

/* ---------------- Cards Passive Effects -----------------------*/
export const BacPassiveEffect: CardPassiveEffect = {
    ...defaultPassiveEffect,
    title: "Mention TB",
    description: "+{0} quand {1} est joué",
    condition: {
        ...defaultCondition,
        conditionType: EConditionType.CARD_WITH_ID,
    },
    effectType: EPassiveEffect.ENERGY_BY_CARD_TYPE,
    energyByCardType: 5,
};