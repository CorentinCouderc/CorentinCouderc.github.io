import {type CardImmediateEffect, type CardPassiveEffect} from "./effects.ts";
import {type CardCategory, type CardTag} from "./cardEnums.ts";

export type CardEffects = {
    energyFlat: number;
    xpFlat: number;
    xpPerTick: number;
    immediateEffect: CardImmediateEffect | null;
    passiveEffect: CardPassiveEffect | null;
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