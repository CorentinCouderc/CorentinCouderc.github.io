import type {CardTag} from "./cards.ts";

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

export type CardEffect = {
    title: string;
    description: string;
    condition: EffectCondition | null;
}

export const EImmediateEffect = {
    ADD_ENERGY: "addEnergy",
    ADD_XP: "addXP",
} as const
export type ImmediateEffectType = typeof EImmediateEffect[keyof typeof EImmediateEffect];

export type CardImmediateEffect = CardEffect & {
    effectType: ImmediateEffectType;
    energyToAdd: number | null;
    addXP: number | null;
}

export const EPassiveEffect = {
    ENERGY_BY_CARD_TYPE: "energyByCardType",
} as const
export type PassiveEffectType = typeof EPassiveEffect[keyof typeof EPassiveEffect];

export type CardPassiveEffect = CardEffect & {
    effectType: PassiveEffectType;
    energyByCardType: number | null;
}

/* ---------------- Cards Immediate Effects -----------------------*/
export const Sim2bImmediateEffect: CardImmediateEffect = {
    title: "Fusion/Acquisition",
    description: "+{0} XP si {1} est sur le terrain",
    condition: {
        conditionType: EConditionType.CARD_WITH_ID,
            requiredCardId: 7,
            requiredCardTags: null,
    },
    effectType: EImmediateEffect.ADD_XP,
    energyToAdd: null,
    addXP: 40,
};

/* ---------------- Cards Passive Effects -----------------------*/
export const BacPassiveEffect: CardPassiveEffect = {
    title: "Mention TB",
    description: "+{0} quand {1} est joué",
    condition: {
        conditionType: EConditionType.CARD_WITH_ID,
        requiredCardId: null,
        requiredCardTags: null,
    },
    effectType: EPassiveEffect.ENERGY_BY_CARD_TYPE,
    energyByCardType: 5,
};