import { useState, useContext } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import { motion, AnimatePresence } from "framer-motion";

import { ColorModeContext } from "../App";

const expandedWidth = 220;
const collapsedWidth = 70;

function Sidebar({ setPage }) {

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  const { toggleColorMode } = useContext(ColorModeContext);

  const navItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />
    },
    {
      name: "applications",
      label: "Applications",
      icon: <WorkIcon />
    },
    {
      name: "kanban",
      label: "Kanban Board",
      icon: <ViewKanbanIcon />
    }
  ];

  const handleClick = (page) => {
    setPage(page);
    setActive(page);
  };

  return (

    <Drawer
      variant="permanent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? expandedWidth : collapsedWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: open ? expandedWidth : collapsedWidth,
          overflowX: "hidden",
          transition: "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(14px)",
          borderRight: "1px solid rgba(255,255,255,0.08)"
        }
      }}
    >

      {/* Logo */}

      <Box sx={{ p: 2 }}>

        <AnimatePresence>

          {open && (

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: 1
                }}
              >
                JobTracker
              </Typography>

            </motion.div>

          )}

        </AnimatePresence>

      </Box>

      {/* Navigation */}

      <List>

        {navItems.map((item) => (

          <Tooltip
            title={!open ? item.label : ""}
            placement="right"
            key={item.name}
          >

            <ListItemButton
              onClick={() => handleClick(item.name)}
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 1,
                position: "relative",

                background:
                  active === item.name
                    ? "rgba(99,102,241,0.15)"
                    : "transparent",

                "&:hover": {
                  background: "rgba(99,102,241,0.2)"
                }
              }}
            >

              {/* Active indicator */}

              {active === item.name && (
                <motion.div
                  layoutId="activeIndicator"
                  style={{
                    position: "absolute",
                    left: 0,
                    width: 4,
                    height: "70%",
                    background: "#6366f1",
                    borderRadius: 4
                  }}
                />
              )}

              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center"
                }}
              >

                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>

              </ListItemIcon>

              <AnimatePresence>

                {open && (

                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: "100%" }}
                  >

                    <ListItemText primary={item.label} />

                  </motion.div>

                )}

              </AnimatePresence>

            </ListItemButton>

          </Tooltip>

        ))}

      </List>

      {/* Theme Toggle */}

      <Box
        sx={{
          mt: "auto",
          p: 2,
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          alignItems: "center"
        }}
      >

        <AnimatePresence>

          {open && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              <Typography variant="body2">
                Theme
              </Typography>

            </motion.div>

          )}

        </AnimatePresence>

        <IconButton
          component={motion.button}
          whileHover={{ rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleColorMode}
        >
          <Brightness4Icon />
        </IconButton>

      </Box>

    </Drawer>
  );
}

export default Sidebar;