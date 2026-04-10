import "./CardSlot.css"
import type {CardData} from "./cards.ts";
import Card from "./Card.tsx";
import type {CardCategory} from "./cardEnums.ts";

interface CardSlotProps {
    category: CardCategory,
    card: CardData | null
}

function CardSlot(props: CardSlotProps) {

    const cardToDisplay = props.card ? <Card card={props.card} onCardClicked={() =>{}} shouldShowBack={false} isCardSelected={false}/> : null;

    return (
        <div className={"card-slot "+ props.category}>
            {cardToDisplay}
        </div>
    );
}

export default CardSlot;