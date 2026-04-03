import "./Game.css"
import {useEffect, useState} from 'react';
import {type CardData, ECardCategory, allCards, type CardCategory, orderedCategories} from './cards';
import CardSlot from "./CardSlot.tsx";
import CardSelection from "./CardSelection.tsx";
import Energy from "./Energy.tsx";


export function Game() {
    const tickRate = 500; // in milliseconds
    const baseXPToNextLevel = 10;
    const xpScalingFactor = 1.1;
    // const numberOfRerolls = 5;
    // const [rerolls, setRerolls] = useState<number>(numberOfRerolls);

    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isSelectingCard, setIsSelectingCard] = useState(true);
    const [energy, setEnergy] = useState(0);
    const [xpToNextLevel, setXpToNextLevel] = useState(baseXPToNextLevel);
    const [currentXP, setCurrentXP] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(0);
    const initialBoard: (CardData | null)[] = [null, null, null, null, null, null];
    const [boardCards, setBoardCards] = useState<(CardData | null)[]>(initialBoard);

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
    }

    function pickRandomCardsToDisplay() {
        if (!hasGameStarted) {
            // Force this card at the start of the game
            return [allCards[0], allCards[0], allCards[0]];
        }
        else {
            return [allCards[Math.floor(Math.random() * allCards.length)], allCards[Math.floor(Math.random() * allCards.length)], allCards[Math.floor(Math.random() * allCards.length)]];

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

    function selectCard(card: CardData) {
        if (!hasGameStarted) {
            setHasGameStarted(true);
        }
        if (card.effects.energyFlat > 0) {
            addEnergy(card.effects.energyFlat);
        }
        else if (card.effects.xpFlat > 0) {
            addXP(card.effects.xpFlat);
        }
        addCardToBoard(card);

        setIsSelectingCard(false);
    }

    return (
        <div className="game-hud">
            {
                isSelectingCard ? <CardSelection levelReached={currentLevel} cards={pickRandomCardsToDisplay()} selectCard={selectCard}/> : null
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
