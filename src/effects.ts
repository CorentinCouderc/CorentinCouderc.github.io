import {type CardTag, type CardCategory, ECardCategory} from "./cards.ts";

/*--------- Conditions ---------*/
export const EConditionType = {
    CARD_WITH_ID: "cardWithID",
    CARD_WITH_TAG: "cardWithTag",
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
} as const
export type ImmediateEffectType = typeof EImmediateEffect[keyof typeof EImmediateEffect];

export type CardImmediateEffect = CardEffect & {
    effectType: ImmediateEffectType;
    energyToAdd: number | null;
    xpToAdd: number | null;
    rerollToAdd: number | null;
    categoryToRemove: CardCategory | null;
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

export const RigueurImmediateEffect: CardImmediateEffect = {
    ...defaultImmediateEffect,
    title: "Produit vectoriel",
    description: "Gagne autant d'XP que d'énergie restant",
    effectType: EImmediateEffect.XP_BY_ENERGY_LEFT,
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