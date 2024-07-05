import "./style.css";
import { LoginFormComponent } from "components";
export default function LoginPage() {
    return (
        <div className="container-fluid loginPage">
            <div className="h-full container d-flex flex-wrap flex-b-c child-col-12 child-col-lg-6">
                <LoginFormComponent />
                <div>
                    <img src="login.svg" alt="" />
                </div>
            </div>
        </div>
    );
}
