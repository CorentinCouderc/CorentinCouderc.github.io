import {type CardData, getEffectString, getCategoryString} from "./cards.ts";
import './Card.css';
import * as React from "react";
import Energy from "./Energy.tsx";

interface CardProperties{
    card: CardData,
    onCardClicked: (card: CardData) => void,
    shouldShowBack: boolean,
    isCardSelected: boolean,
}

function Card(props: CardProperties)
{
    function onLinkClicked(event: React.MouseEvent<HTMLAnchorElement>) {
        event.stopPropagation();
    }

    if (props.shouldShowBack) {
        let linkHTML = <a onClick={(event) =>onLinkClicked(event)}
                          href={props.card.linkUrl} target="_blank">{props.card.linkText}</a>;
        let link= props.card.linkUrl.length > 0 ? linkHTML : null;

        return (
            <div className={"card " + props.card.category} onClick={() => props.onCardClicked(props.card)}>
                <div className="card-back">
                    <div className="card-frame">
                        <h2>{props.card.title}</h2>
                        <p>{props.card.backContent}</p>
                        {link}
                    </div>
                </div>
            </div>
        )
    }
    else {
        let selectedClassName =  props.isCardSelected ? " selected" : "";
        let displayBonus = null;
        if (props.card.effects.energyFlat > 0) {
            displayBonus = <Energy valueText={"+" + props.card.effects.energyFlat} isOnHUD={false}/>
        }
        else if (props.card.effects.xpFlat > 0) {
            displayBonus = <h1>+ {props.card.effects.xpFlat} XP</h1>;
        }

        return (
            <div className={"card " + props.card.category + selectedClassName} onClick={() => props.onCardClicked(props.card)}>
                <div className="card-background">
                    <div className="q1">
                        <h1>{getCategoryString(props.card.category)}</h1>
                    </div>
                    <div className="q2">
                        <div className="bonus-container">
                            {displayBonus}
                        </div>
                    </div>
                    <div className="q3"></div>
                    <div className="q4"></div>

                    <div className="card-body">
                        <h2>{props.card.title}</h2>
                        <p className="effect">{getEffectString(props.card.category)}</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default Card;