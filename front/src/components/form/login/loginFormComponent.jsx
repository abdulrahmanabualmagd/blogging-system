import { Link } from "react-router-dom";
import { useState } from "react";
import { isEmail, isStrongPassword, isEmpty } from "validator";
import "./style.css";

export default function LoginFormComponent() {
    // Form Input Data
    const [formData, setformData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    // Update whoever changes using state
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setformData((previousData) => ({
            ...previousData, // Keep old values with the new set
            [name]: type === "checkbox" ? checked : value, // [type, checked] For handling the checkbox value
        }));
    };

    // Valiudation Errors
    const [errors, setErrors] = useState({
        email: true,
        password: true,
    });

    const validate = (e) => {
        const { name, value } = e.target;
        setErrors((previousData) => ({
            ...previousData,
            [name]:
                name === "email"
                    ? isEmail(value) || isEmpty(value)
                    : name === "password"
                    ? isStrongPassword(value) || isEmpty(value)
                    : null,
        }));
    };

    // Handle on blur
    const handleInputBlur = (e) => {
        validate(e);
    };

    // Handle Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        validate(e);
    };

    return (
        // Form Container
        <div className="d-flex flex-c-c form-container">
            <form onSubmit={handleFormSubmit} className="form w-100">
                {/* Upper Text */}
                <div className="uppertext pt-3">
                    <div className="font-xxxl bold t-primary-main">Login</div>
                    <div className="neutral-main">
                        Does not have an account yet?{" "}
                        <Link to="/register" className="link">
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Inputs Container */}
                <div className="child-my-5">
                    {/* ----------------------------------------------------- Email Input */}
                    <div className="input-container">
                        <input
                            type="text"
                            name="email"
                            id="emailInput"
                            required=" "
                            value={FormData.email}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                        <label htmlFor="emailInput" className="label">
                            Email Address
                        </label>
                        <div className="underline"></div>
                        {!errors.email && <span className="inputError">Wrong Email!</span>}
                    </div>

                    {/* ----------------------------------------------------- Password Input */}
                    <div className="input-container">
                        <input
                            type="text"
                            name="password"
                            id="passwordInput"
                            required=" "
                            value={FormData.password}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                        <label htmlFor="passwordInput" className="label">
                            Password
                        </label>
                        <div className="underline"></div>
                        {!errors.password && <span className="inputError">Wrong Password!</span>}
                    </div>

                    {/* ----------------------------------------------------- Checkbox Input */}
                    <div className="d-flex flex-s-c child-px-2">
                        <input
                            type="checkbox"
                            id="remember-me-check"
                            name="rememberMe"
                            onChange={handleInputChange}
                            value={formData.rememberMe}
                        />
                        <label htmlFor="remember-me-check">Remember me</label>
                    </div>

                    {/* Forget Password */}
                    <div>
                        <Link className="link">Forget Password?</Link>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button className="btn btn-primary w-100">Login</button>
                    </div>

                    {/* Divider OR */}
                    <div>
                        <div className="h-lines d-flex flex-c-c w-100 neutral-main">Or Login With</div>
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
