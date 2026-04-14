import "./Game.css"
import {useEffect, useState} from 'react';
import type {CardData} from "./cards.ts";
import {ECardCategory, type CardCategory, orderedCategories} from './cardEnums.ts';
import CardSlot from "./CardSlot.tsx";
import CardSelection from "./CardSelection.tsx";
import Energy from "./Energy.tsx";
import {type CardEffect, EConditionType, EImmediateEffect, EPassiveEffect, type PassiveEffectType} from "./effects.ts";
import {allCards} from "./cards.ts";


export function Game() {
    const tickRate = 500; // in milliseconds
    const baseXPToNextLevel = 10;
    const xpScalingFactor = 1.1;
    const numberOfRerolls = 3;
    const [rerolls, setRerolls] = useState<number>(numberOfRerolls);

    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isSelectingCard, setIsSelectingCard] = useState(true);
    const [energy, setEnergy] = useState(0);
    const [xpToNextLevel, setXpToNextLevel] = useState(baseXPToNextLevel);
    const [currentXP, setCurrentXP] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [energySpent, setEnergySpent] = useState(0);
    const [randomRequiredCategory, setRandomRequiredCategory] = useState<CardCategory>(ECardCategory.NONE);

    const initialBoard: (CardData | null)[] = [null, null, null, null, null, null];
    const [boardCards, setBoardCards] = useState<(CardData | null)[]>(initialBoard);
    const [playedCards, setPlayedCards] = useState<(CardData | null)[]>([]);
    const [cardImmediateEffectDelayed, setCardImmediateEffectDelayed] = useState<CardData | null>(null);
    const [cardPassiveEffectDelayed, setCardPassiveEffectDelayed] = useState<CardData | null>(null);

    const initialRandomCards = [allCards[0], allCards[0], allCards[0]]; // Force this card at the start of the game
    const [randomCards, setRandomCards] = useState<CardData[]>(initialRandomCards);

    const xpPercentage = (currentXP / xpToNextLevel) * 100;

    // Call tick() method every second
    useEffect(() => {
        // Game has begun if there is at least one card on the board
        if (hasGameStarted && !isSelectingCard && !isGameOver) {
            const interval = setInterval(() => tick(), tickRate);
            return () => clearInterval(interval);
        }
    }, [hasGameStarted, energy, isSelectingCard]);

    function tick() {
        if (energy == 0) {
            setIsGameOver(true);
            return;
        }

        // Decrement energy 1 per tick call & add XP
        addEnergy(-1);
        setEnergySpent(energySpent + 1);
        const xpPerTick = computeXPPerTick();
        addXP(xpPerTick);
    }

    useEffect(() => {
        tryApplyPassiveEffects([EPassiveEffect.XP_BY_ENERGY_SPENT, EPassiveEffect.REVIVE]);
    }, [energySpent]);

    function addEnergy(energyToAdd: number) {
        setEnergy(energy + energyToAdd);
    }

    function addXP(xpToAdd: number) {
        let newXP = currentXP + xpToAdd;
        while (newXP >= xpToNextLevel) {
            newXP -= xpToNextLevel;
            levelUp();
        }
        setCurrentXP(newXP);
    }

    function computeXPPerTick() {
        let totalXpPerTick = 0;
        for (let i = 0; i < boardCards.length; i++) {
            if (boardCards[i])
            {
                totalXpPerTick += boardCards[i]!.effects.xpPerTick;
            }
        }
        return totalXpPerTick;
    }

    function levelUp() {
        setCurrentLevel(currentLevel + 1);
        setXpToNextLevel(Math.floor(Math.pow(baseXPToNextLevel * (currentLevel + 1), xpScalingFactor)));
        tryApplyPassiveEffects([EPassiveEffect.ENERGY_ON_LEVEL_UP]);
        displayCardSelection();
    }

    function displayCardSelection() {
        setIsSelectingCard(true);
        pickRandomCardsToDisplay();
    }

    function pickRandomCardsToDisplay() {
        if (hasGameStarted) {
            const pickedCards = [allCards[Math.floor(Math.random() * allCards.length)], allCards[Math.floor(Math.random() * allCards.length)], allCards[Math.floor(Math.random() * allCards.length)]];
            setRandomCards(pickedCards);

            // TODO : implement better card selection algorithm (no redraw of same card, priority in randomness etc..)
            // Start from something like this :
            /*
            let newLevelDeck: CardData[] = [];
            for (let i = 0; i < allDecks[levelIndex].cardIds.length; i++) {
                let cardToAdd = allCards.find((card) => card.id === allDecks[levelIndex].cardIds[i]);
                if (!cardToAdd) {
                    console.error("Card index of level not found");
                    break;
                }
                newLevelDeck.push(cardToAdd);
            }
             */
        }
    }

    function getCategoryIndex(category: CardCategory) {
        if (category === ECardCategory.NONE)
            return -1;

        return orderedCategories.indexOf(category);
    }

    function addCardToBoard(card: CardData) {
        const newBoardCards = [...boardCards];
        newBoardCards[getCategoryIndex(card.category)] = card;
        setBoardCards(newBoardCards);
    }

    function removeCardFromBoard(category: CardCategory) {
        const newBoardCards = [...boardCards];
        newBoardCards[getCategoryIndex(category)] = null;
        setBoardCards(newBoardCards);
    }
    function selectCard(card: CardData) {
        if (!hasGameStarted) {
            setHasGameStarted(true);
        }
        setIsSelectingCard(false);

        // Basic effects on play (top right corner)
        if (card.effects.energyFlat > 0) {
            addEnergy(card.effects.energyFlat);
        }
        else if (card.effects.xpFlat > 0) {
            addXP(card.effects.xpFlat);
        }
        setPlayedCards([...playedCards, card]);
        addCardToBoard(card);

        // Will apply immediate effects on next redraw
        setCardImmediateEffectDelayed(card);
        setCardPassiveEffectDelayed(card);
        tryChangeRequiredCategory();
    }

    // Delay effect activation to avoid overruling other gains
    useEffect(() => {
        if (cardImmediateEffectDelayed) {
            // Specific effects on play
            if (canApplyEffect(cardImmediateEffectDelayed.effects.immediateEffect)) {
                applyImmediateEffects(cardImmediateEffectDelayed);
            }
            setCardImmediateEffectDelayed(null);
        }

        if (cardPassiveEffectDelayed) {
            // Passive effect when selecting a card
            tryApplyPassiveEffects([EPassiveEffect.BONUS_BY_CARD_WITH], cardPassiveEffectDelayed);
            setCardPassiveEffectDelayed(null);
        }
    }, [cardImmediateEffectDelayed, cardPassiveEffectDelayed]);

    function tryChangeRequiredCategory() {
        const index = boardCards.findIndex((boardCard) => {
            boardCard !== null
            && boardCard.effects?.passiveEffect?.effectType === EPassiveEffect.BONUS_BY_CARD_WITH
            && boardCard.effects?.passiveEffect?.bonusByCardWithCategoryUseRandom
        });

        if (index >= 0) {
            // Change required category
            const newCategory = orderedCategories[Math.floor(Math.random() * orderedCategories.length)];
            setRandomRequiredCategory(newCategory);
            // TODO: update description with new Category !
            // boardCards[index]?.effects?.passiveEffect?.description
        }
    }

    function addReroll(rerollToAdd: number) {
        const newReroll = Math.max(rerolls + rerollToAdd, 0);
        setRerolls(newReroll);
    }

    function spendReroll() {
        pickRandomCardsToDisplay();
        addReroll(-1);
    }

    function canApplyEffect(effect: CardEffect | null) {
        if (!effect) { return false; }
        if (!effect.condition) { return true; } // No condition means effect can be applied

        switch (effect.condition.conditionType) {
            case EConditionType.HAS_CARD_WITH_ID:
                for (let i = 0; i < boardCards.length; i++) {
                    const card = boardCards[i];
                    if (card && card.id === effect.condition.requiredCardId) {
                        return true;
                    }
                }
                return false;
            case EConditionType.HAS_CARD_WITH_CATEGORY:
                for (let i = 0; i < boardCards.length; i++) {
                    const card = boardCards[i];
                    if (card && card.category === effect.condition.requiredCardCategory) {
                        return true;
                    }
                }
                return false;
            case EConditionType.HAS_CARD_WITH_TAG:
                for (let i = 0; i < boardCards.length; i++) {
                    const card = boardCards[i];
                    if (card && effect.condition.requiredCardTags) {
                        const atLeastOne = effect.condition.requiredCardTags.some(tag => card.tags.includes(tag));
                        if (atLeastOne) {
                            return true;
                        }
                    }
                }
                return false;
            case EConditionType.EVEN_TOTAL_CARD_PLAYED:
                return playedCards.length % 2 === 0;
            case EConditionType.ALL_BOARD_FILLED:
                let boardCardCount = 0;
                for (let i = 0; i < boardCards.length; i++) {
                    if (boardCards[i] !== null) {
                        boardCardCount += 1;
                    }
                }
                return boardCards.length === boardCardCount;
            default:
                console.error("Unknown condition: ", effect.condition.conditionType);
                return false;
        }
    }

    function applyImmediateEffects(card: CardData) {
        const effect = card.effects.immediateEffect;
        if (effect === null) {
            return;
        }

        let error = false;
        switch (effect.effectType) {
            case EImmediateEffect.ADD_ENERGY:
                if (!effect.energyToAdd) { error = true; } else {
                    addEnergy(effect.energyToAdd);
                }
                break;
            case EImmediateEffect.ADD_XP:
                if (!effect.xpToAdd) { error = true; } else {
                    addXP(effect.xpToAdd);
                }
                break;
            case EImmediateEffect.ADD_REROLL:
                if (!effect.rerollToAdd) { error = true; } else {
                    addReroll(effect.rerollToAdd);
                }
                break;
            case EImmediateEffect.REMOVE_CARD:
                if (!effect.categoryToRemove) { error = true; } else {
                    removeCardFromBoard(effect.categoryToRemove);
                }
                break;
            case EImmediateEffect.XP_BY_ENERGY_LEFT:
                addXP(energy);
                break;
            case EImmediateEffect.REAPPLY_FLAT_GAIN:
                let energyGain = 0;
                let xpGain = 0;
                for (let i = 0; i < boardCards.length; i++) {
                    const boardCard = boardCards[i];
                    if (boardCard !== null && boardCard !== card) {
                        energyGain += boardCard.effects.energyFlat;
                        xpGain += boardCard.effects.xpFlat;
                    }
                }
                addEnergy(energyGain);
                addXP(xpGain);
                break;
            case EImmediateEffect.ADD_RANDOM_CARD:
                if (!effect.randomCardIndexList) { error = true; } else {
                    const randomIndex = Math.floor(Math.random() * effect.randomCardIndexList.length);
                    selectCard(allCards[effect.randomCardIndexList[randomIndex]]);
                }
                break;
            case EImmediateEffect.SELECT_CARD:
                displayCardSelection();
                break;
            default:
                console.error("Unknown immediate effect type: ", effect.effectType);
                break;
        }

        if (error) {
            console.error("Effect", effect.effectType, "not set for card:", card.id);
        }
    }

    /**
     * Try to apply effects of all boardCards for a specific type of passive effect
     * @param passiveEffectTypes
     * @param cardAdded
     */
    function tryApplyPassiveEffects(passiveEffectTypes: PassiveEffectType[], cardAdded: CardData | null = null) {
        let totalEnergyGain = 0;
        let totalXPGain = 0;
        for (let i = 0; i < boardCards.length; i++) {
            const boardCard = boardCards[i];
            if (boardCard
                && boardCard.effects.passiveEffect
                && passiveEffectTypes.includes(boardCard.effects.passiveEffect.effectType)) {
                if (canApplyEffect(boardCard.effects.passiveEffect)) {
                    let [energyGain, xpGain] = applyPassiveEffects(boardCard, cardAdded);
                    totalEnergyGain += energyGain;
                    totalXPGain += xpGain;
                }
            }
        }
        if (totalEnergyGain !== 0) {
            addEnergy(totalEnergyGain);
        }
        if (totalXPGain !== 0) {
            addXP(totalXPGain);
        }
    }

    function applyPassiveEffects(card: CardData, cardAdded: CardData | null): [number, number] {
        const effect = card.effects.passiveEffect;
        if (effect === null) {
            return [0, 0];
        }

        let energyGain = 0;
        let xpGain = 0;
        let error = false;
        switch (effect.effectType) {
            case EPassiveEffect.BONUS_BY_CARD_WITH:
                if (!cardAdded) {
                    console.error("PassiveEffect", EPassiveEffect.BONUS_BY_CARD_WITH, "called but cardAdded was null for card", card.title);
                } else {
                    if (card === cardAdded) { break; }

                    const bonusEnergyFromMultiplier = cardAdded.effects.energyFlat * effect.bonusByCardWithMultiplier;
                    if (effect.bonusByCardWithCategory && effect.bonusByCardWithTags) {
                        // Card with specific category and tags
                        const correctCategory = effect.bonusByCardWithCategoryUseRandom
                            ? cardAdded.category === randomRequiredCategory
                            : cardAdded.category === effect.bonusByCardWithCategory;
                        if (correctCategory
                            && effect.bonusByCardWithTags.some(tag => cardAdded.tags.includes(tag)))
                        {
                            energyGain += effect.bonusByCardWithEnergyAmount + bonusEnergyFromMultiplier;
                            xpGain += effect.bonusByCardWithXPAmount;
                        }
                    }
                    else if (effect.bonusByCardWithCategory) {
                        // Card with specific category only
                        const correctCategory = effect.bonusByCardWithCategoryUseRandom
                            ? cardAdded.category === randomRequiredCategory
                            : cardAdded.category === effect.bonusByCardWithCategory;
                        if (correctCategory) {
                            energyGain += effect.bonusByCardWithEnergyAmount + bonusEnergyFromMultiplier;
                            xpGain += effect.bonusByCardWithXPAmount;
                        }
                    }
                    else if (effect.bonusByCardWithTags) {
                        // Card with specific tags only
                        if (effect.bonusByCardWithTags.some(tag => cardAdded.tags.includes(tag))) {
                            energyGain += effect.bonusByCardWithEnergyAmount + bonusEnergyFromMultiplier;
                            xpGain += effect.bonusByCardWithXPAmount;
                        }
                    }
                    else {
                        // No specific requirements
                        energyGain += effect.bonusByCardWithEnergyAmount + bonusEnergyFromMultiplier;
                        xpGain += effect.bonusByCardWithXPAmount;
                    }
                }
                break;
            case EPassiveEffect.ENERGY_ON_LEVEL_UP:
                if (!effect.energyOnLevelUp) { error = true; } else {
                    energyGain += effect.energyOnLevelUp;
                }
                break;
            case EPassiveEffect.XP_BY_ENERGY_SPENT:
                if (!effect.byEnergySpent || !effect.byEnergySpentXPAmount) { error = true; } else {
                    if (energySpent > 0 && energySpent % effect.byEnergySpent === 0) {
                        xpGain += effect.byEnergySpentXPAmount;
                    }
                }
                break;
            case EPassiveEffect.REVIVE:
                if (!effect.reviveEnergy) { error = true; } else {
                    if (energy <= 0) {
                        energyGain += effect.reviveEnergy;
                        removeCardFromBoard(card.category);
                    }
                }
                break;
            default:
                console.error("Unknown passive effect type: ", effect.effectType);
                break;
        }

        if (error) {
            console.error("Effect", effect.effectType, "not set for card:", card.title);
        }
        return [energyGain, xpGain];
    }

    return (
        <div className="game-hud">
            {
                isSelectingCard ?
                    <CardSelection
                    levelReached={currentLevel}
                    cards={randomCards}
                    rerollsLeft={rerolls}
                    onRerollClicked={spendReroll}
                    selectCard={selectCard}/>
                    : null
            }

            <div className="game-header">
                <div className={"game-header-container"}>
                    <div className={"game-header-texts"}>
                        <h1>Lvl. {currentLevel} ({currentXP}/{xpToNextLevel} XP)</h1>
                        <Energy valueText={"Énergie: " + energy.toString()} isOnHUD={true}/>
                    </div>

                    <div className={"bar-background"}>
                        <div className="bar-fill" style={{width: `${xpPercentage}%`}} />
                    </div>
                </div>
            </div>

            <div className="game-board">
                {
                    orderedCategories.map((category: CardCategory, index: number) => (
                        <CardSlot key={index} category={category}  card={boardCards[getCategoryIndex(category)]} />
                    ))
                }
            </div>
        </div>
    );
}
