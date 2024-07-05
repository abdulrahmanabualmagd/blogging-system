import { styled } from "@mui/material";

// 3 Components, grow second element
export const Layout = styled("div")(({ theme }) => ({
    display: "flex",
    flexFlow: "column nowrap",
    minHeight: "100vh",

    "& > div:nth-of-type(2)": {
        flexGrow: 1,
    },
}));
