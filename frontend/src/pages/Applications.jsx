import { useEffect, useState } from "react";
import { getJobs } from "../api";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";

import { motion } from "framer-motion";

import JobCard from "../components/JobCard";
import AddJobModal from "../components/AddJobModal";

function Applications() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs
    .filter(job =>
      job.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter(job =>
      filter === "All" ? true : job.status === filter
    );

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === "Applied").length,
    interview: jobs.filter(j => j.status === "Interview").length,
    offer: jobs.filter(j => j.status === "Offer").length
  };

  return (

    <Box>

      {/* Animated Heading */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >

          <Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(90deg,#6366f1,#3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Job Applications
            </Typography>

            <Typography sx={{ color: "#94a3b8" }}>
              Manage and track your job applications
            </Typography>

          </Box>

          <AddJobModal refresh={loadJobs} />

        </Stack>

      </motion.div>

      {/* Stats Cards */}

      <Grid container spacing={3} sx={{ mb: 3 }}>

        {[
          { label: "Total Applications", value: stats.total },
          { label: "Applied", value: stats.applied },
          { label: "Interviews", value: stats.interview },
          { label: "Offers", value: stats.offer }
        ].map((stat, index) => (

          <Grid item xs={12} md={3} key={stat.label}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >

              <Paper
                sx={(theme) => ({
                  p: 3,
                  borderRadius: 3,
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(145deg,#1e293b,#273549)"
                      : "linear-gradient(145deg,#ffffff,#e2e8f0)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 8px 20px rgba(0,0,0,0.35)"
                      : "0 6px 16px rgba(0,0,0,0.08)"
                })}
              >

                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700 }}
                >
                  {stat.value}
                </Typography>

                <Typography sx={{ color: "#94a3b8" }}>
                  {stat.label}
                </Typography>

              </Paper>

            </motion.div>

          </Grid>

        ))}

      </Grid>

      {/* Search + Filter */}

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>

        <TextField
          label="Search Company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <TextField
          select
          label="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Wishlist">Wishlist</MenuItem>
          <MenuItem value="Applied">Applied</MenuItem>
          <MenuItem value="Interview">Interview</MenuItem>
          <MenuItem value="Offer">Offer</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>

      </Stack>

      {/* Job Cards */}

      <Grid container spacing={3}>

        {filteredJobs.map((job, index) => (

          <Grid item xs={12} md={4} key={job.id}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >

              <JobCard job={job} refresh={loadJobs} />

            </motion.div>

          </Grid>

        ))}

      </Grid>

    </Box>

  );
}

export default Applications;