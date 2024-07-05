/*
  - This component responsible for  
    - useEffect (check for the authentication token in cookies on component mounting)
    - login (store token on cookies, update token State)
    - logout (remove authToken from cookies, update token State)

- So childrens will have the token, login function, and logout function so that it can use it any where
 */

import Cookies from "js-cookie";
import { useState, useEffect, createContext } from "react";

// Token name in cookies
const AUTH_TOKEN = "authToken";

// Create context, used by components want to access these data (authToken, login, logout)
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    // Token State
    const [token, setAuthToken] = useState(null);

    // Check for authentication token on component mounting
    useEffect(() => {
        const token = Cookies.get(AUTH_TOKEN);
        if (token) setAuthToken(token);
    }, []);

    // Login
    const login = (token) => {
        // Store token in the cookies
        Cookies.set(AUTH_TOKEN, token, { expires: 1 });
        // Update token state
        setAuthToken(token);
    };

    // Logout
    const logout = () => {
        // Remove token from cookies
        Cookies.remove(AUTH_TOKEN);
        // Update token state
        setAuthToken(null);
    };

    return <AuthContext.Provider value={{ authToken: token, login, logout }}>{children}</AuthContext.Provider>;
}
