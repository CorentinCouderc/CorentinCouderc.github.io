import "./Home.css"
import type {RefObject} from "react";

interface HomeProps {
    homeResumeRef: RefObject<HTMLDivElement | null>;
    homePPRef: RefObject<HTMLDivElement | null>;
    goToNextPage: () => void;
}

function Home(props: HomeProps) {

    return (
        <div className="home">
            <div className="home-content">

                <div ref={props.homeResumeRef} className="home-resume">
                    <h2>Corentin Couderc</h2>
                    <h1>Concepteur pédagogique spécialisé <br/>en gamification</h1>
                    <p>Réinventer l'apprentissage en utilisant les mécaniques des jeux vidéo.</p>
                </div>

                <div ref={props.homePPRef} className="home-profile-pic">
                    <img id="profile-pic" src="/public/images/profile-picture.png" alt="Profile Picture"/>
                </div>

                <div className="home-socials">
                    <p>Contactez-moi</p>
                    <div className="line"></div>
                    <a href="https://www.linkedin.com/in/corentin-couderc/" target="_blank">
                        <div id="linkedin"/>
                    </a>
                    <a href="mailto:corentincouderc@free.fr" target="_blank">
                        <div id="email"/>
                    </a>

                </div>
            </div>

            <div className="home-footer">
                <h3>Scroll pour jouer</h3>
                <div className="scroll-button" onClick={props.goToNextPage}>
                    <div className="scroll-arrow"></div>
                </div>
            </div>
        </div>
    );
}

export default Home;
