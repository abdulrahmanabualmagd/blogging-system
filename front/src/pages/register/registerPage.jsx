import { RegisterFormComponent, AnimatedFade } from "components";
export default function RegisterPage() {
    return (
        <div className="container-fluid loginPage">
            <div className="h-full child-px-2 px-4 d-flex flex-wrap flex-b-c child-col-12 child-col-xl-6">
                <AnimatedFade animation="slide-in-left" className="d-flex flex-c-c">
                    <RegisterFormComponent />
                </AnimatedFade>
                <AnimatedFade animation="slide-in-right" className="d-xl-block d-none">
                    <img src="register.svg" alt="" />
                </AnimatedFade>
            </div>
        </div>
    );
}
