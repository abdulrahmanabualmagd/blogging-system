import { RouterProvider } from "react-router-dom";
import router from "routes";
import { AuthProvider } from "contexts";
import "css";

export default function App() {
    return (
        <>
            {/* contains the authtoken if found, login/logout methods */}
            <AuthProvider>
                {/* contains the routes and the private routes also in routes fille */}
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    );
}
