import "./CardSelection.css"
import type {CardData} from "./cards.ts";
import Card from "./Card.tsx";

interface CardSelectionProps {
    levelReached: number;
    cards: CardData[];
    rerollsLeft: number;
    onRerollClicked: () => void;
    selectCard: (card: CardData) => void;
}

function CardSelection(props: CardSelectionProps) {

    const hasRerollLeft = props.rerollsLeft > 0;

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
                {
                    props.levelReached > 0 ? <button disabled={!hasRerollLeft} className={"button reroll"} onClick={() => props.onRerollClicked()}>Relancer ({props.rerollsLeft})</button> : null
                }
            </div>
        </div>
    );
}

export default CardSelection;