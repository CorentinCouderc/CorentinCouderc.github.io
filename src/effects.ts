import type {CardTag} from "./cards.ts";

export const EConditionType = {
    CARD_WITH_ID: "cardWithID",
    CARD_WITH_TAG: "cardWithTag",
} as const
export type EffectConditionType = typeof EConditionType[keyof typeof EConditionType];

export type EffectCondition = {
    conditionType: EffectConditionType;
    requiredCardId: number;
    requiredCardTags: CardTag[];
}

export type CardEffect = {
    title: string;
    condition: EffectCondition;
}

export const EImmediateEffect = {
    ADD_ENERGY: "addEnergy",
    ADD_XP: "addXP",
} as const
export type ImmediateEffectType = typeof EImmediateEffect[keyof typeof EImmediateEffect];

export type CardImmediateEffect = CardEffect & {
    effectType: ImmediateEffectType;
    addEnergy: number;
    addXP: number;
}

export function canApplyEffect(effect: CardEffect) {
    switch (effect.condition.conditionType) {
        case EConditionType.CARD_WITH_ID:
            break;
        case EConditionType.CARD_WITH_TAG:
            break;
        default:
            console.error("Unknown condition: ", effect.condition.conditionType);
            break;
    }
}

export function applyImmediateEffect(effect: CardImmediateEffect) {
    switch (effect.effectType) {

    }
}