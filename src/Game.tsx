import "./Game.css"
import {useEffect, useState} from 'react';
import {type CardData, ECardCategory, allCards, type CardCategory, orderedCategories} from './cards';
import CardSlot from "./CardSlot.tsx";
import CardSelection from "./CardSelection.tsx";
import Energy from "./Energy.tsx";
import {type CardEffect, EConditionType, EImmediateEffect} from "./effects.ts";


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

    const initialBoard: (CardData | null)[] = [null, null, null, null, null, null];
    const [boardCards, setBoardCards] = useState<(CardData | null)[]>(initialBoard);
    const [playedCards, setPlayedCards] = useState<(CardData | null)[]>([]);

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
        const xpPerTick = computeXPPerTick();
        addXP(xpPerTick);
    }

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
        // Specific effects on play
        if (canApplyEffect(card.effects.immediateEffect)) {
            applyImmediateEffects(card)
        }
        setPlayedCards([...playedCards, card]);
        addCardToBoard(card);
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
        if (effect === null || effect.condition === null) {
            return false;
        }
        switch (effect.condition.conditionType) {
            case EConditionType.CARD_WITH_ID:
                for (let i = 0; i < boardCards.length; i++) {
                    const card = boardCards[i];
                    if (card && card.id === effect.condition?.requiredCardId) {
                        return true;
                    }
                }
                return false;
            case EConditionType.CARD_WITH_TAG:
                return false;
            case EConditionType.EVEN_TOTAL_CARD_PLAYED:
                return playedCards.length % 2 === 0;
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
            default:
                console.error("Unknown effect type: ", effect.effectType);
                break;
        }

        if (error) {
            console.error("Effect", effect.effectType, "not set for card:", card.id);
        }
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
