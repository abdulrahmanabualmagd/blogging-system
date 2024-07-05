import { Link } from "react-router-dom";
import "./style.css";
import { AnimatedFade } from "components";

export default function ContactComponent() {
    return (
        <div className="contact container-fluid min-height-10 d-flex flex-c-c py-5">
            <div className="container d-flex flex-wrap child-col-12 child-col-lg-6 child-p-3">
                <AnimatedFade animation="slide-in-left" className="pl-5 d-flex flex-column child-my-3 flex-c-s">
                    <div className="title font-xxxl bold italic">Finally put your work on autopilot</div>
                    <div className="text container">
                        Autonomously complete complex tasks with your A1 agent Automate anything by enhancing it with
                        custom tools Autonomously complete complex tasks with your A1 agent Automate anything by
                        enhancing it with custom tools
                    </div>
                    <div>
                        <Link className="btn ">Start Now</Link>
                    </div>
                </AnimatedFade>
                <AnimatedFade animation="slide-in-right">
                    <img src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg" alt="" />
                </AnimatedFade>
            </div>
        </div>
    );
}
