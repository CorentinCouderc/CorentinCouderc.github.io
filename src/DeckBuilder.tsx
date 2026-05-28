import "./DeckBuilder.css"
import Card from "./Card.tsx";
import {allCards, type CardData} from './cards';
import {useState} from "react";
import {allDecks, allLevels, type LevelData} from "./levels.ts";

interface DeckBuilderProps {
    closeFullDeck: () => void;
}

function DeckBuilder(props: DeckBuilderProps) {

    const [selectedCards, setSelectedCards] = useState<CardData[]>([]);

    function selectCard (card: CardData){
        let temp = selectedCards.slice();
        if (selectedCards.includes(card)) {
            // Card is already selected. Unselect it
            temp = selectedCards.filter((element) => element.id !== card.id);
        }
        else {
            temp.push(card);
        }
        setSelectedCards(temp);
    }

    return (
        <div className="deck-builder">
            <div className="deck-close">
                <div className="deck-close-button" onClick={props.closeFullDeck}></div>
            </div>
            {
                allLevels.map((levelData: LevelData, index: number) =>
                <div key={levelData.level} className="deck-level-container">
                    <h1>{levelData.title}</h1>
                    <div className="card-grid"> {
                        allDecks[index].cardIds.map((cardId: number) =>
                        <Card
                            key={cardId}
                            card={allCards[cardId - 1]}
                            onCardClicked={selectCard}
                            shouldShowBack={selectedCards.includes(allCards[cardId - 1])}
                            isCardSelected={false}
                        />)}
                    </div>
                </div>
                )
            }
        </div>
    );
}

export default DeckBuilder;
