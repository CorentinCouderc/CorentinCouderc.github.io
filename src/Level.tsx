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
    const [isLevelFinished, setIsLevelFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [discards, setDiscards] = useState<number>(numberOfDiscards);
    const [hand, setHand] = useState<CardData[]>([]);
    const [deck, setDeck] = useState<CardData[]>([]);
    const initialBoard: (CardData | null)[] = [null, null, null, null, null, null];
    const [boardCards, setBoardCards] = useState<(CardData | null)[]>(initialBoard);
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);



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

    function selectCard (card: CardData){
        if (selectedCard !== null && selectedCard.id === card.id)
        {
            setSelectedCard(null);
        }
        else {
            setSelectedCard(card);
        }
    }

    const playCard = (card: CardData) => {
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
        updateScore();

        if (deck.length === 0)
        {
            setIsLevelFinished(true);
            return;
        }

        const cardsToDraw = cardsPerTurn - hand.length;
        setHand(hand.concat(deck.slice(0, cardsToDraw)));
        setDeck(deck.slice(cardsToDraw));
    };

    const updateScore = () => {
        let newScore = score;
        for (let i = 0; i < boardCards.length; i++) {
            if (boardCards[i])
            {
                newScore += boardCards[i]!.points;
            }
        }
        setScore(newScore);
    }

    return (
        <div className="game-hud">
            <div className="game-header">
                <h1>Level: {props.levelData.title} | Score: {score}</h1>
            </div>

            <div className="game-board">
                {
                    orderedCategories.map((category: CardCategory, index: number) => (
                        hasCardForCategory(levelDeck, category) ? <CardSlot key={index} category={category}  card={boardCards[getCategoryIndex(category)]} /> : null
                    ))
                }
            </div>

            <div className="game-footer">
                <div className="game-deck">
                    <h1>Défausses : {discards}</h1>
                    <Card key={blankCard.id} card={blankCard} onCardClicked={() => {}} onCardPlayed={() => {}}
                          onCardDiscard={() => {}} shouldShowBack={true} isCardSelected={false}/>
                </div>

                <div className="game-hand">
                    {
                        // levelDeck.map(card => <Card
                        hand.map(card => <Card
                            key={card.id}
                            card={card}
                            onCardClicked={selectCard}
                            onCardPlayed={playCard}
                            onCardDiscard={discardCard}
                            shouldShowBack={false}
                            isCardSelected={selectedCard?.id === card.id}/>)
                    }
                </div>
                <button className="button" onClick={endTurn} disabled={isLevelFinished}>Fin du tour</button>
            </div>

        </div>
    );
}
