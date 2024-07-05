import { Link } from "react-router-dom";
import { AnimatedFade } from "components";
import "./style.css";

export default function HeroComponent() {
    return (
        <div className="hero container d-flex flex-wrap child-col-12 child-col-lg-6 ">
            <AnimatedFade animation="slide-in-left" className="pl-5 d-flex flex-column child-my-3 flex-c-s">
                <div className="title font-xxxl bold italic">Finally put your work on autopilot</div>
                <div className="text">
                    Autonomously complete complex tasks with your A1 agent Automate anything by enhancing it with custom
                    tools
                </div>
                <div>
                    <Link className="btn btn-light">Start Now</Link>
                </div>
            </AnimatedFade>
            <AnimatedFade animation="slide-in-right">
                <img src="hero.svg" alt="" />
            </AnimatedFade>
        </div>
    );
}
