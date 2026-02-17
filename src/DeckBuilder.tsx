import "./DeckBuilder.css"
import Card from "./Card.tsx";
import {type CardData} from './cards';
import {useState} from "react";

interface DeckBuilderProps {
    deck: CardData[];
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
            <div className="card-grid"> {
                props.deck.map(card => <Card
                    key={card.id}
                    card={card}
                    onCardClicked={selectCard}
                    onCardPlayed={() => {}}
                    onCardDiscard={() => {}}
                    shouldShowBack={selectedCards.includes(card)}
                    isCardSelected={false}/>)
            }
            </div>
        </div>
    );
}

export default DeckBuilder;
