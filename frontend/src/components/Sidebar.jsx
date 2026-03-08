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

import { motion } from "framer-motion";

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
          transition: "width 0.25s ease",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(255,255,255,0.08)"
        }
      }}
    >

      {/* Logo */}

      <Box sx={{ p: 2 }}>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 1,

                background:
                  active === item.name
                    ? "rgba(99,102,241,0.15)"
                    : "transparent",

                "&:hover": {
                  background: "rgba(99,102,241,0.2)"
                }
              }}
            >

              <ListItemIcon>

                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>

              </ListItemIcon>

              {open && (
                <ListItemText primary={item.label} />
              )}

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

        {open && (
          <Typography variant="body2">
            Theme
          </Typography>
        )}

        <IconButton onClick={toggleColorMode}>
          <Brightness4Icon />
        </IconButton>

      </Box>

    </Drawer>

  );
}

export default Sidebar;