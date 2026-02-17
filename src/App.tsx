import {useEffect, useRef, useState} from "react";
import './App.css';
import {allCards} from "./cards.ts";
import Home from "./Home.tsx";
import DeckBuilder from "./DeckBuilder.tsx";
import {Level} from "./Level.tsx";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import {allLevels} from "./levels.ts";
import {clamp} from "gsap/gsap-core";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

function App() {
    const pagesCount = allLevels.length + 1;
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [pageIndex, setPageIndex] = useState(0);

    const scrollTls = useRef<gsap.core.Timeline[]>([]);
    const deckTl = useRef<gsap.core.Timeline>(null);
    const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
    const [isFullDeckDisplayed, setIsFullDeckDisplayed] = useState(false);
    const timelineConfig = {
        paused: true,
        defaults: {duration: .8, ease: "power1.inOut"},
    }

    const homeResumeRef = useRef<HTMLDivElement>(null);
    const homeProfilePictureRef = useRef<HTMLDivElement>(null);
    const fullDeckRef = useRef<HTMLDivElement>(null);

    //#region GSAP
    useGSAP(() => {
        setupScrollTimelines();

        if (fullDeckRef.current?.firstElementChild) {
            deckTl.current = gsap.timeline(timelineConfig)
                .fromTo(fullDeckRef.current?.firstElementChild, {display: "none", opacity: 0, top: "100vh"}, {display: "block", opacity: 1, top: "0vh"});
        }
    })

    useEffect(()=> {
        if (isFullDeckDisplayed) return;

        window.addEventListener('wheel', handleScroll);
        return () => { window.removeEventListener('wheel', handleScroll); }
    }, [pageIndex, isPlayingAnimation, isFullDeckDisplayed])

    useEffect(() => {
        window.addEventListener("resize", setupScrollTimelines);
        return () => window.removeEventListener("resize", setupScrollTimelines);
    }, []);

    const { contextSafe } = useGSAP({ dependencies: [], revertOnUpdate: false });

    const setupScrollTimelines = contextSafe(() => {
        setIsPlayingAnimation(false);

        // Handle level pages transitions
        for (let i = 0; i < pagesCount; i++) {
            scrollTls.current[i] = gsap.timeline(timelineConfig)
                .to(window, {
                    scrollTo: pageRefs.current[i+1]?.offsetTop,
                    onComplete: () => { setIsPlayingAnimation(false); console.log("Complete - set false", scrollTls.current[i]); },
                    onReverseComplete: () => { setIsPlayingAnimation(false); console.log("ReverseComplete - set false", scrollTls.current[i]);}
                });

            if (i === 0)
            {
                // Specific Home animation
                scrollTls.current[i].to(homeResumeRef.current, { xPercent: -50, opacity: 0, duration: 0.4}, "<")
                    .to(homeProfilePictureRef.current, { xPercent: 50, opacity: 0, duration: 0.4}, "<");
            }
        }
    });

    const handleScroll = contextSafe((event: WheelEvent) => {
        // TODO find why handle Scroll is called twice when scrolling fast (and prevent it from happening)
        console.log("> Start scroll - isPlayingAnim", isPlayingAnimation);
        if (isPlayingAnimation) return;

        const scrollDelta = event.deltaY;
        let nextIndex = scrollDelta > 0 ? pageIndex + 1 : pageIndex - 1;
        nextIndex = clamp(0, allLevels.length, nextIndex);
        if (nextIndex != pageIndex && scrollDelta != 0) {
            scrollDelta > 0 ? scrollTls.current[pageIndex]?.play() : scrollTls.current[pageIndex - 1]?.reverse();
            setPageIndex(nextIndex);
            setIsPlayingAnimation(true);
            console.log("Scroll - set true. Next page = ", nextIndex );
            console.log("> End scroll - isPlayingAnim", isPlayingAnimation);
            updateFullDeckTimeline(nextIndex);
        }
    });

    const goToNextPage = contextSafe(() => {
        if (isPlayingAnimation) return;

        const nextIndex = pageIndex + 1;
        scrollTls.current[pageIndex]?.play();
        setPageIndex(nextIndex);
        setIsPlayingAnimation(true);
        updateFullDeckTimeline(nextIndex);
    });

    const updateFullDeckTimeline = contextSafe((newPageIndex: number) => {
        if (fullDeckRef.current?.firstElementChild) {
            const bottomScreenVH = 100 * (newPageIndex + 1);
            const topScreenVH = 100 * newPageIndex;
            deckTl.current = gsap.timeline(timelineConfig)
                .fromTo(fullDeckRef.current?.firstElementChild,
                    {display: "none", opacity: 0, top: bottomScreenVH+"vh"},
                    {display: "block", opacity: 1, top: topScreenVH+"vh"});
        }
    })

    const displayDeck = contextSafe((display: boolean)=> {
        if (isFullDeckDisplayed != display) {
            display ? deckTl.current?.play() : deckTl.current?.reverse();
            setIsFullDeckDisplayed(display);
        }
    });

    //#endregion GSAP

    const setPageRef = (element: HTMLDivElement | null) => {
        pageRefs.current.push(element);
    }

    return (
        <>
            <div className="deck-link-container" onClick={() => displayDeck(true)}>
                <div id="deck-link_image" />
                <h1>Voir le deck</h1>
            </div>

            <div ref={(el) => setPageRef(el)}>
                <Home homeResumeRef={homeResumeRef} homePPRef={homeProfilePictureRef} goToNextPage={goToNextPage} />
            </div>
            {
                allLevels.map((levelData) => (
                    <div key={levelData.level} ref={(el) => setPageRef(el)} >
                        <Level levelData={levelData}/>
                    </div>
                ))
            }
            <div ref={fullDeckRef}>
                <DeckBuilder deck={allCards} closeFullDeck={() => displayDeck(false)} />
            </div>
        </>
    );
}

export default App;
