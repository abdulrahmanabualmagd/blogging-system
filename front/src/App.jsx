import { RouterProvider } from "react-router-dom";
import router from "routes";
import { AuthProvider } from "contexts";
import { Provider } from "react-redux";
import "css";
import store from "./redux/store";

export default function App() {
    return (
        <>
            {/* Provider the store for all children */}
            <Provider store={store}>
                {/* contains the authtoken if found, login/logout methods */}
                <AuthProvider>
                    {/* contains the routes and the private routes also in routes fille */}
                    <RouterProvider router={router} />
                </AuthProvider>
            </Provider>
        </>
    );
}
