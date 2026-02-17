import {type CardData, getEffectString, getCategoryString} from "./cards.ts";
import './Card.css';
import * as React from "react";

interface CardProperties{
    card: CardData,
    onCardClicked: (card: CardData) => void,
    onCardPlayed: (card: CardData) => void | null,
    onCardDiscard: (card: CardData) => void | null,
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
        let cardOptionsButtons = props.isCardSelected ?
            <div className="card-options-container">
                <button className="card-play-button" onClick={() => props.onCardPlayed(props.card)}>Jouer</button>
                <button className="card-discard-button" onClick={() => props.onCardDiscard(props.card)}>Défausser</button>
            </div> : null;

        let selectedClassName =  props.isCardSelected ? " selected" : "";

        return (
            <div className="card-container">
                {cardOptionsButtons}
                <div className={"card " + props.card.category + selectedClassName} onClick={() => props.onCardClicked(props.card)}>
                    <div className="card-background">
                        <div className="q1">
                            <h1>{getCategoryString(props.card.category)}</h1>
                        </div>
                        <div className="q2">
                            <h1>+{props.card.points}</h1>
                        </div>
                        <div className="q3"></div>
                        <div className="q4"></div>

                        <div className="card-body">
                            <h2>{props.card.title}</h2>
                            <p className="effect">{getEffectString(props.card.category)}</p>
                        </div>

                        <div className="card-footer">
                            <p>-{props.card.cost}</p>
                            <img src="/assets/flash.svg" alt="flash"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;