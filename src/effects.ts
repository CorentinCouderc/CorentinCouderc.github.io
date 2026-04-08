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
    condition: EffectCondition | null;
}

export const EImmediateEffect = {
    ADD_ENERGY: "addEnergy",
    ADD_XP: "addXP",
} as const
export type ImmediateEffectType = typeof EImmediateEffect[keyof typeof EImmediateEffect];

export type CardImmediateEffect = CardEffect & {
    effectType: ImmediateEffectType;
    addEnergy: number | null;
    addXP: number | null;
}

export const Sim2bImmediateEffect: CardImmediateEffect = {
    title: "Fusion/Acquisition",
    condition: {
        conditionType: EConditionType.CARD_WITH_ID,
            requiredCardId: 7,
            requiredCardTags: null,
    },
    effectType: EImmediateEffect.ADD_XP,
    addEnergy: null,
    addXP: 40,
};

export function canApplyEffect(effect: CardEffect) {
    if (effect.condition === null) {
        return true;
    }
    else {
        switch (effect.condition.conditionType) {
            case EConditionType.CARD_WITH_ID:
                return false;
            case EConditionType.CARD_WITH_TAG:
                return false;
            default:
                console.error("Unknown condition: ", effect.condition.conditionType);
                return false;
        }
    }
}

export function applyImmediateEffect(effect: CardImmediateEffect) {
    switch (effect.effectType) {

    }
}