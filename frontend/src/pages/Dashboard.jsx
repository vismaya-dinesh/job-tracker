import { useEffect, useState } from "react";
import { getJobs } from "../api";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  const stats = {
    applied: jobs.filter(j => j.status === "Applied").length,
    interview: jobs.filter(j => j.status === "Interview").length,
    offer: jobs.filter(j => j.status === "Offer").length,
    rejected: jobs.filter(j => j.status === "Rejected").length
  };

  const chartData = [
    { name: "Applied", value: stats.applied },
    { name: "Interview", value: stats.interview },
    { name: "Offer", value: stats.offer },
    { name: "Rejected", value: stats.rejected }
  ];

  const COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#ef4444"];

  const recentJobs = jobs.slice(-5).reverse();
  const interviews = jobs.filter(j => j.status === "Interview");

  return (

    <Box>

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            background: "linear-gradient(90deg,#6366f1,#3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Dashboard
        </Typography>

      </motion.div>

      {/* FULL WIDTH CHART */}

      <Paper
        sx={(theme) => ({
          p: 4,
          borderRadius: 4,
          mb: 4,
          height: 420,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg,#1e293b,#273549)"
              : "linear-gradient(145deg,#ffffff,#e2e8f0)"
        })}
      >

        <Typography sx={{ mb: 3, fontWeight: 600 }}>
          Application Status
        </Typography>

        <ResponsiveContainer width="100%" height="90%">

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={140}
              label
            >

              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </Paper>

      {/* SECOND ROW */}

      <Grid container spacing={4}>

        {/* Recent Applications */}

        <Grid item xs={12} md={6}>

          <Paper
            sx={(theme) => ({
              p: 4,
              borderRadius: 4,
              minHeight: 320,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(145deg,#1e293b,#273549)"
                  : "linear-gradient(145deg,#ffffff,#e2e8f0)"
            })}
          >

            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              Recent Applications
            </Typography>

            <List>

              {recentJobs.map(job => (

                <div key={job.id}>

                  <ListItem>

                    <Box>

                      <Typography sx={{ fontWeight: 600 }}>
                        {job.company}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#94a3b8" }}
                      >
                        {job.role}
                      </Typography>

                    </Box>

                  </ListItem>

                  <Divider />

                </div>

              ))}

            </List>

          </Paper>

        </Grid>

        {/* Interviews */}

        <Grid item xs={12} md={6}>

          <Paper
            sx={(theme) => ({
              p: 4,
              borderRadius: 4,
              minHeight: 320,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(145deg,#1e293b,#273549)"
                  : "linear-gradient(145deg,#ffffff,#e2e8f0)"
            })}
          >

            <Typography sx={{ mb: 2, fontWeight: 600 }}>
              Upcoming Interviews
            </Typography>

            <List>

              {interviews.length === 0 && (
                <Typography sx={{ color: "#94a3b8" }}>
                  No interviews scheduled
                </Typography>
              )}

              {interviews.map(job => (

                <div key={job.id}>

                  <ListItem>

                    <Box>

                      <Typography sx={{ fontWeight: 600 }}>
                        {job.company}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#94a3b8" }}
                      >
                        {job.role}
                      </Typography>

                    </Box>

                  </ListItem>

                  <Divider />

                </div>

              ))}

            </List>

          </Paper>

        </Grid>

      </Grid>

    </Box>

  );
}

export default Dashboard;