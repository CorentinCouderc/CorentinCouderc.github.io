import "./CardSelection.css"
import type {CardData} from "./cards.ts";
import Card from "./Card.tsx";

interface CardSelectionProps {
    levelReached: number;
    cards: CardData[];
    selectCard: (card: CardData) => void;
}

function CardSelection(props: CardSelectionProps) {

    return (
        <div className={"card-selection"}>
            <h1 id={"levelReachedText"}>Level up !</h1>
            <h2 id={"selectCardText"}>Sélectionnez une carte :</h2>

            <div className={"card-list"}>
                {
                    props.cards.map((card: CardData, index: number) => (
                         <Card key={index} card={card} onCardClicked={props.selectCard} shouldShowBack={false} isCardSelected={false}/>
                    ))
                }
            </div>
        </div>
    );
}

export default CardSelection;