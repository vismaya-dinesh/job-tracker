import { useEffect, useState } from "react";
import { getJobs, updateJob } from "../api";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import { motion } from "framer-motion";

const columns = [
  { name: "Wishlist", color: "#94a3b8" },
  { name: "Applied", color: "#3b82f6" },
  { name: "Interview", color: "#f59e0b" },
  { name: "Offer", color: "#22c55e" },
  { name: "Rejected", color: "#ef4444" }
];

function Kanban() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  const handleDragEnd = async (result) => {

    if (!result.destination) return;

    const jobId = parseInt(result.draggableId);
    const newStatus = result.destination.droppableId;

    const job = jobs.find(j => j.id === jobId);

    const updatedJobs = jobs.map(j =>
      j.id === jobId ? { ...j, status: newStatus } : j
    );

    setJobs(updatedJobs);

    await updateJob(job.id, {
      ...job,
      status: newStatus
    });
  };

  return (

    <Box>

      {/* Animated Heading */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <Box sx={{ mb: 4 }}>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(90deg,#6366f1,#3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Application Pipeline
          </Typography>

          <Typography sx={{ color: "#94a3b8" }}>
            Track and manage your job applications visually
          </Typography>

        </Box>

      </motion.div>

      {/* Kanban Board */}

      <DragDropContext onDragEnd={handleDragEnd}>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            pb: 2
          }}
        >

          {columns.map((column, index) => {

            const columnJobs = jobs.filter(j => j.status === column.name);

            return (

              <motion.div
                key={column.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >

                {/* Column */}

                <Box
                  sx={(theme) => ({
                    minWidth: 270,
                    borderRadius: 3,
                    p: 2,

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

                  {/* Column Header */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2
                    }}
                  >

                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: column.color
                      }}
                    >
                      {column.name}
                    </Typography>

                    <Chip
                      label={columnJobs.length}
                      size="small"
                      sx={{
                        background: column.color,
                        color: "white",
                        fontWeight: 600
                      }}
                    />

                  </Box>

                  {/* Droppable Area */}

                  <Droppable droppableId={column.name}>

                    {(provided, snapshot) => (

                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                          minHeight: 420,
                          p: 1,
                          borderRadius: 2,

                          background: snapshot.isDraggingOver
                            ? "rgba(99,102,241,0.08)"
                            : "transparent",

                          transition: "0.2s"
                        }}
                      >

                        {columnJobs.map((job, index) => (

                          <Draggable
                            key={job.id}
                            draggableId={job.id.toString()}
                            index={index}
                          >

                            {(provided, snapshot) => (

                              <Paper
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}

                                sx={(theme) => ({
                                  p: 2,
                                  mb: 2,
                                  borderRadius: 2,

                                  background:
                                    theme.palette.mode === "dark"
                                      ? "#334155"
                                      : "linear-gradient(145deg,#ffffff,#f8fafc)",

                                  borderLeft: `4px solid ${column.color}`,

                                  cursor: "grab",

                                  boxShadow: snapshot.isDragging
                                    ? "0px 8px 20px rgba(0,0,0,0.25)"
                                    : "0px 3px 8px rgba(0,0,0,0.08)",

                                  transition: "all 0.15s"
                                })}
                              >

                                <Typography sx={{ fontWeight: 600 }}>
                                  {job.company}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  sx={{ color: "#94a3b8" }}
                                >
                                  {job.role}
                                </Typography>

                              </Paper>

                            )}

                          </Draggable>

                        ))}

                        {provided.placeholder}

                      </Box>

                    )}

                  </Droppable>

                </Box>

              </motion.div>

            );

          })}

        </Box>

      </DragDropContext>

    </Box>

  );
}

export default Kanban;