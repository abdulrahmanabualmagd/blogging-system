import { Link } from "react-router-dom";
import "./style.css";

export default function LoginFormComponent() {
    return (
        <div className="loginForm">
            {/* Head */}
            <div className="d-flex flex-b-c flex-column">
                <div className="head">
                    <div className="title">Login</div>
                    <div className="text">
                        Does not have an account yet? <Link>Sign Up</Link>
                    </div>
                </div>
            </div>

            <div className="input-container">
                <label htmlFor="email">Username</label>
                <div className="input-wrapper">
                    <input type="text" id="email" name="email" placeholder="Enter your email" />
                    <i className="input-icon"></i>
                </div>
                <span className="input-error-message">Error message</span>
            </div>
        </div>
    );
}
