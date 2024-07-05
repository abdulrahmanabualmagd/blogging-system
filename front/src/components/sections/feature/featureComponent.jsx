import { Link } from "react-router-dom";
import { AnimatedFade } from "components";
import "./style.css";
export default function FeatureComponent() {
    return (
        <div className="feature container d-flex flex-wrap child-col-12 child-col-lg-6 min-height-10 py-5">
            <AnimatedFade animation="fade-in" className="d-flex flex-c-c">
                <img src="features.svg" alt="" />
            </AnimatedFade>
            <AnimatedFade animation="slide-up" className="d-flex flex-column child-my-3 flex-c-s pl-5">
                <div className="title font-xxxl bold italic">Finally put your work on autopilot</div>
                <div className="text">
                    Autonomously complete complex tasks with your A1 agent Automate anything by enhancing it with custom
                    tools
                </div>
                <div>
                    <Link className="btn ">Start Now</Link>
                </div>
            </AnimatedFade>
        </div>
    );
}
