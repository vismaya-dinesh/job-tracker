import { useState, createContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Kanban from "./pages/Kanban";

export const ColorModeContext = createContext();

function App() {

  const [page, setPage] = useState("dashboard");
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode(prev => (prev === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: { main: "#6366f1" },
        background: {
          default: mode === "dark" ? "#0f172a" : "#f1f5f9",
          paper: mode === "dark" ? "#1e293b" : "#ffffff"
        }
      },
      shape: { borderRadius: 14 }
    }), [mode]
  );

  const renderPage = () => {
    switch (page) {
      case "applications":
        return <Applications />;
      case "kanban":
        return <Kanban />;
      default:
        return <Dashboard />;
    }
  };

  return (

    <ColorModeContext.Provider value={{ toggleColorMode }}>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            background:
              mode === "dark"
                ? "linear-gradient(180deg,#0f172a,#1e293b)"
                : "linear-gradient(180deg,#f8fafc,#e2e8f0)"
          }}
        >

          <Sidebar setPage={setPage} />

          {/* Main Content */}

          <Box
            sx={{
              flex: 1,
              p: 4,
              width: "100%",
              maxWidth: "1600px",
              margin: "0 auto",
              position: "relative"
            }}
          >

            <AnimatePresence mode="wait">

              <motion.div
                key={page}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >

                {renderPage()}

              </motion.div>

            </AnimatePresence>

          </Box>

        </Box>

      </ThemeProvider>

    </ColorModeContext.Provider>
  );
}

export default App;