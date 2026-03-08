import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;