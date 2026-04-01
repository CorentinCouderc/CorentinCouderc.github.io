import "./Level.css"
import {useEffect, useState} from 'react';
import Card from "./Card.tsx";
import {type CardData, ECardCategory, blankCard, allCards, type CardCategory, orderedCategories} from './cards';
import {allDecks, type LevelData} from "./levels.ts";
import CardSlot from "./CardSlot.tsx";

interface LevelProps {
    levelData: LevelData;
}

export function Level(props: LevelProps) {
    const levelIndex = props.levelData.level - 1;
    const [levelDeck, setLevelDeck] = useState<CardData[]>([]);

    const cardsPerTurn = 3;
    const numberOfDiscards = 5;
    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isLevelFinished, setIsLevelFinished] = useState(false);
    const [energy, setEnergy] = useState(0);
    const [currentXP, setCurrentXP] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [discards, setDiscards] = useState<number>(numberOfDiscards);
    const [hand, setHand] = useState<CardData[]>([]);
    const [deck, setDeck] = useState<CardData[]>([]);
    const initialBoard: (CardData | null)[] = [null, null, null, null, null, null];
    const [boardCards, setBoardCards] = useState<(CardData | null)[]>(initialBoard);



    // Fill levelDeck & shuffle on mount
    useEffect(() => {
        let newLevelDeck: CardData[] = [];
        for (let i = 0; i < allDecks[levelIndex].cardIds.length; i++) {
            let cardToAdd = allCards.find((card) => card.id === allDecks[levelIndex].cardIds[i]);
            if (!cardToAdd) {
                console.error("Card index of level not found");
                break;
            }
            newLevelDeck.push(cardToAdd);
        }
        newLevelDeck = shuffle(newLevelDeck);
        setLevelDeck(newLevelDeck);
    }, []);

    useEffect(() => {
        setHand(levelDeck.slice(0, cardsPerTurn));
        setDeck(levelDeck.slice(cardsPerTurn));
    }, [levelDeck]);

    function shuffle<T>(array: T[]) {
        const sortedArr = structuredClone(array);
        for (let i = sortedArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
        }
        return sortedArr;
    }

    function hasCardForCategory(deck: CardData[], category: CardCategory) {
        return deck.filter(c => c.category === category).length > 0;
    }

    function getCategoryIndex(category: CardCategory) {
        if (category === ECardCategory.NONE)
            return -1;

        return orderedCategories.indexOf(category);
    }

    const playCard = (card: CardData) => {
        selectCard(card); // temporary

        const newHand = hand.filter(c => c.id !== card.id);
        setHand(newHand);

        // Add card to played cards
        const newBoardCards = [...boardCards];
        newBoardCards[getCategoryIndex(card.category)] = card;
        setBoardCards(newBoardCards);
    };

    const discardCard = (card: CardData) => {
        if (discards <= 0) return;

        // Remove card from hand
        let newHand = hand.filter(c => c.id !== card.id);
        if (deck.length !== 0) {
            // Replace it if deck is not empty
            const newCard = deck[0];
            setDeck(deck.slice(1));
            newHand.push(newCard);
        }
        setHand(newHand);
        setDiscards(discards - 1);
    }

    // useEffect(() => {
    //     if (hand.length == 0) { // When all cards have been played, auto end turn
    //         endTurn();
    //     }
    // }, [hand]);

    const endTurn = () => {
        // updateScore(); deprecated

        if (deck.length === 0)
        {
            setIsLevelFinished(true);
            return;
        }

        const cardsToDraw = cardsPerTurn - hand.length;
        setHand(hand.concat(deck.slice(0, cardsToDraw)));
        setDeck(deck.slice(cardsToDraw));
    };


    // New implementation
    function addEnergy(energyToAdd: number) {
        setEnergy(energy + energyToAdd);
    }

    function addXP(xpToAdd: number) {
        let newXP = currentXP + xpToAdd;
        let xpToLevelUp = 10; // TODO : Link to real data
        while (newXP >= xpToLevelUp) {
            newXP -= xpToLevelUp;
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
    // Call tick() method every second
    useEffect(() => {
        // Game has begun if there is at least one card on the board
        if (hasGameStarted && !isGameOver) {
            const interval = setInterval(() => tick(), 1000);
            return () => clearInterval(interval);
        }
    }, [hasGameStarted, energy]);

    function levelUp() {
        setCurrentLevel(currentLevel + 1);
        cardSelection();
    }

    function cardSelection() {
        // TODO : display 3 cards to select from
        selectCard(allCards[1]);
    }

    function selectCard(card: CardData) {
        if (!hasGameStarted) {
            setHasGameStarted(true);
        }
        addEnergy(card.effects.energyFlat);
        addXP(card.effects.xpFlat);
    }

    return (
        <div className="game-hud">
            <div className="game-header">
                <h1>Level: {currentLevel} {props.levelData.title} | Exp: {currentXP}/10 | Energy: {energy}</h1>
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
