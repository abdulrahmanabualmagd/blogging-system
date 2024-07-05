import { Link } from "react-router-dom";

export default function RegisterFormComponent() {
    return (
        // Form Container
        <div className="d-flex flex-c-c form-container">
            <form className="form w-100">
                {/* Upper Text */}
                <div className="uppertext pt-3">
                    <div className="font-xxxl bold t-primary-main">Register</div>
                    <div className="neutral-main">
                        Already have an account? <Link to="/login" className="link">Login</Link>
                    </div>
                </div>

                {/* Inputs Container */}
                <div className="child-my-5">
                    {/* Email Input */}
                    <div className="input-container">
                        <input type="text" name="email" id="emailInput" required=" " />
                        <label htmlFor="emailInput" className="label">
                            Email Address
                        </label>
                        <div className="underline"></div>
                    </div>

                    {/* Password Input */}
                    <div className="input-container">
                        <input type="text" name="password" id="passwordInput" required=" " />
                        <label htmlFor="passwordInput" className="label">
                            Password
                        </label>
                        <div className="underline"></div>
                    </div>

                    {/* Checkbox Input */}
                    <div className="d-flex flex-s-c child-px-2">
                        <input type="checkbox" id="remember-me-check" />
                        <label htmlFor="remember-me-check">Remember me</label>
                    </div>

                    {/* Forget Password */}
                    <div>
                        <Link className="link">Forget Password?</Link>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button className="btn btn-primary w-100 ">Register</button>
                    </div>

                    {/* Divider OR */}
                    <div>
                        <div className="h-lines d-flex flex-c-c w-100 neutral-main">Or Sign Up With</div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="d-flex flex-b-c child-mr-3 ">
                        <div>
                            <button className="btn btn-primary d-flex flex-c-c py-1">
                                <img src="google.svg" alt="" />
                                Google
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-primary d-flex flex-c-c py-1">
                                <img src="facebook.svg" alt="" />
                                Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
