import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "routes";
import { AuthProvider } from "contexts";
import { theme } from "./theme";
import 'css'

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}
