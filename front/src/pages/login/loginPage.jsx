import "./style.css";
import { LoginFormComponent, AnimatedFade } from "components";
export default function LoginPage() {
    return (
        <div className="container-fluid loginPage">
            <div className="h-full child-px-2 px-4 d-flex flex-wrap flex-b-c child-col-12 child-col-xl-6">
                <AnimatedFade animation="slide-in-left" className="d-flex flex-c-c">
                    <LoginFormComponent />
                </AnimatedFade>
                <AnimatedFade animation="slide-in-right" className="d-xl-block d-none">
                    <img src="login.svg" alt="" />
                </AnimatedFade>
            </div>
        </div>
    );
}
