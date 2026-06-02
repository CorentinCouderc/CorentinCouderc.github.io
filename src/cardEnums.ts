import {EConditionType, EImmediateEffect, EPassiveEffect} from "./effects.ts";
import {allCards, type CardData} from "./cards.ts";

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

export const orderedTags = [ETagCategory.SCIENTIST, ETagCategory.COMPETITION, ETagCategory.VIDEO_GAME, ETagCategory.PROGRAMMING, ETagCategory.INTERNSHIP, ETagCategory.PEDAGOGY];

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

export function getMultipleTagsString(tagList: CardTag[]) {
    if (!tagList || tagList.length === 0) {
        console.error('No tags found.');
        return null;
    }

    let result = getTagString(tagList[0]);
    for (let i = 1; i < tagList.length; i++) {
        result += " ou ";
        result += getTagString(tagList[i]);
    }
    return result;
}

export function parseCardEffect(card: CardData) {
    const immediateEffect = card.effects.immediateEffect;
    if (immediateEffect) {
        let newDescription = immediateEffect.description;

        switch (immediateEffect.effectType) {
            case EImmediateEffect.ADD_ENERGY:
                newDescription = immediateEffect.description.replace(/\+{[0]}/g,
                    "+" + immediateEffect.energyToAdd!.toString() + " <span class='energy-icon description'></span>");
                if (immediateEffect.condition) {
                    switch (immediateEffect.condition.conditionType) {
                        case EConditionType.HAS_CARD_WITH_ID:
                            const requiredCardName = allCards.find((elt) => elt.id === immediateEffect.condition?.requiredCardId)!.title;
                            newDescription = newDescription.replace(/{[1]}/g, "<mark>" + requiredCardName + "</mark>");
                            break;
                        case EConditionType.HAS_CARD_WITH_CATEGORY:
                            newDescription = newDescription.replace(/{[1]}/g, "<mark>" + getCategoryString(immediateEffect.condition?.requiredCardCategory!) + "</mark>");
                            break;
                        case EConditionType.REPLACED_CARD_WITH_ID:
                            const replacedCardName = allCards.find((elt) => elt.id === immediateEffect.condition?.replacedCardId)!.title;
                            newDescription = newDescription.replace(/{[1]}/g, "<mark>" + replacedCardName + "</mark>");
                            break;
                        default:
                            break;
                    }
                }
                break;
            case EImmediateEffect.ADD_XP:
                newDescription = immediateEffect.description.replace(/{[0]}/g, immediateEffect.xpToAdd!.toString());
                if (immediateEffect.condition) {
                    switch (immediateEffect.condition.conditionType) {
                        case EConditionType.HAS_CARD_WITH_ID:
                            const requiredCardName = allCards.find((elt) => elt.id === immediateEffect.condition?.requiredCardId)!.title;
                            newDescription = newDescription.replace(/{[1]}/g, "<mark>" + requiredCardName + "</mark>");
                            break;
                    }
                }
                break;
            case EImmediateEffect.ADD_REROLL:
                newDescription = immediateEffect.description.replace(/{[0]}/g, immediateEffect.rerollToAdd!.toString());
                break;
            case EImmediateEffect.REMOVE_CARD:
                newDescription = immediateEffect.description.replace(/{[0]}/g, "<mark>" + getCategoryString(immediateEffect.categoryToRemove!) + "</mark>");
                break;
            case EImmediateEffect.ADD_RANDOM_CARD:
                newDescription = immediateEffect.description.replace(/{([0-9])}/g, (_, group) =>
                    {
                        const cardId = immediateEffect.randomCardIndexList![Number(group)];
                        const cardName = allCards.find((elt) => elt.id === cardId)!.title;
                        return "<mark>" + cardName + "</mark>";
                    }
                );
                break;
            case EImmediateEffect.SELECT_CARD:
            case EImmediateEffect.REAPPLY_FLAT_GAIN:
            case EImmediateEffect.XP_BY_ENERGY_LEFT:
                break;
            default:
                console.error("Unknown immediate effect type: ", immediateEffect.effectType);
                break;
        }
        immediateEffect.description = newDescription;
    }

    const passiveEffect = card.effects.passiveEffect;
    if (passiveEffect) {
        let newDescription = passiveEffect.description;
        switch (passiveEffect.effectType) {
            case EPassiveEffect.ENERGY_ON_LEVEL_UP:
                newDescription = newDescription.replace(/\+{[0]}/g,
                    "+" + passiveEffect.energyOnLevelUp!.toString() + " <span class='energy-icon description'></span>");
                if (passiveEffect.condition) {
                    switch (passiveEffect.condition.conditionType) {
                        case EConditionType.MAX_ENERGY_ON_LEVEL_UP:
                            newDescription = newDescription.replace(/{[1]}/g, passiveEffect.condition.maxEnergyOnLevelUp!.toString() + " <span class='energy-icon description'></span>");
                            break;
                        default:
                            break;
                    }
                }
                break;
            case EPassiveEffect.BONUS_BY_CARD_WITH:
                const isEnergyAdded = passiveEffect.bonusByCardWithEnergyAmount !== 0;
                const amountString = isEnergyAdded ? passiveEffect.bonusByCardWithEnergyAmount!.toString() + " <span class='energy-icon description'></span>" :
                    passiveEffect.bonusByCardWithXPAmount!.toString();
                newDescription = newDescription.replace(/\+{[0]}/g, "+" + amountString);
                newDescription = newDescription.replace(/x{[0]}/g, "x" + passiveEffect.bonusByCardWithMultiplier!.toString());
                if (passiveEffect.bonusByCardWithCategory && passiveEffect.bonusByCardWithTags) { // Card with specific category and tags
                    newDescription = newDescription.replace(/{[1]}/g, "<mark>" + getCategoryString(passiveEffect.bonusByCardWithCategory!) + "</mark>");
                    newDescription = newDescription.replace(/{[2]}/g, "<mark>" + getMultipleTagsString(passiveEffect.bonusByCardWithTags!) + "</mark>");
                }
                else if (passiveEffect.bonusByCardWithCategory) { // Card with specific category only
                    newDescription = newDescription.replace(/{[1]}/g, "<mark>" + getCategoryString(passiveEffect.bonusByCardWithCategory!) + "</mark>");
                }
                else if (passiveEffect.bonusByCardWithTags) { // Card with specific tags only
                    newDescription = newDescription.replace(/{[1]}/g, "<mark>" + getMultipleTagsString(passiveEffect.bonusByCardWithTags!) + "</mark>");
                }
                break;
            case EPassiveEffect.XP_BY_ENERGY_SPENT:
                newDescription = newDescription.replace(/{[0]}/g, passiveEffect.byEnergySpentXPAmount!.toString());
                newDescription = newDescription.replace(/{[1]}/g, passiveEffect.byEnergySpent!.toString() + " <span class='energy-icon description'></span>");
                break;
            case EPassiveEffect.REVIVE:
                newDescription = newDescription.replace(/{[0]}/g, passiveEffect.reviveEnergy!.toString());
                break;
            case EPassiveEffect.ADDITIONAL_XP_PER_TICK:
                newDescription = newDescription.replace(/{[0]}/g, passiveEffect.additionalXpPerTickAmount!.toString());
                if (passiveEffect.condition) {
                    switch (passiveEffect.condition.conditionType) {
                        case EConditionType.HAS_CARD_WITH_TAG:
                            newDescription = newDescription.replace(/{[1]}/g, "<mark>" + getMultipleTagsString(passiveEffect.condition?.requiredCardTags!) + "</mark>");
                            break;
                        default:
                            break;
                    }
                }
                break;
            case EPassiveEffect.ADDITIONAL_REROLL:
                break;
            default:
                console.error("Unknown passive effect type: ", passiveEffect.effectType);
                break;
        }
        passiveEffect.computedDescription = newDescription;
    }
}