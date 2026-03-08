import { deleteJob } from "../api";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";

import EditJobModal from "./EditJobModal";

function JobCard({ job, refresh }) {

  const handleDelete = async () => {

    await deleteJob(job.id);

    refresh();
  };

  return (

    <Card
      sx={(theme) => ({
        borderRadius: 3,
        height: "100%",

        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(145deg,#1e293b,#273549)"
            : "linear-gradient(145deg,#ffffff,#e2e8f0)",

        transition: "all 0.2s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.2)"
        }
      })}
    >

      <CardContent>

        {/* Company */}

        <Typography
          variant="h6"
          sx={{ fontWeight: 700 }}
        >
          {job.company}
        </Typography>

        {/* Role */}

        <Typography
          variant="body2"
          sx={{
            color: "#94a3b8",
            mb: 1
          }}
        >
          {job.role}
        </Typography>

        {/* Status */}

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            mb: 1
          }}
        >
          Status: {job.status}
        </Typography>

        {/* Notes */}

        {job.notes && (

          <Typography
            variant="body2"
            sx={{
              mt: 1,
              mb: 1,
              color: "#6366f1",
              fontWeight: 500
            }}
          >
            {job.notes}
          </Typography>

        )}

        {/* Actions */}

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 2 }}
        >

          {/* View Job */}

          {job.link && (

            <Button
              variant="outlined"
              size="small"
              href={job.link}
              target="_blank"
            >
              View Job
            </Button>

          )}

          {/* Edit */}

          <EditJobModal
            job={job}
            refresh={refresh}
          />

          {/* Delete */}

          <IconButton
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>

        </Stack>

      </CardContent>

    </Card>

  );
}

export default JobCard;