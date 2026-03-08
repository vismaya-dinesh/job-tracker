import { useState } from "react";
import { updateJob } from "../api";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function EditJobModal({ job, refresh }) {

  const [open, setOpen] = useState(false);
  const [editedJob, setEditedJob] = useState(job);

  const handleSave = async () => {

    await updateJob(job.id, editedJob);

    refresh();

    setOpen(false);
  };

  return (
    <>

      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>

        <DialogTitle>Edit Job</DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
            width: 400
          }}
        >

          <TextField
            label="Company"
            value={editedJob.company}
            onChange={(e) =>
              setEditedJob({ ...editedJob, company: e.target.value })
            }
          />

          <TextField
            label="Role"
            value={editedJob.role}
            onChange={(e) =>
              setEditedJob({ ...editedJob, role: e.target.value })
            }
          />

          <TextField
            select
            label="Status"
            value={editedJob.status}
            onChange={(e) =>
              setEditedJob({ ...editedJob, status: e.target.value })
            }
          >
            <MenuItem value="Wishlist">Wishlist</MenuItem>
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>

          <TextField
            label="Link"
            value={editedJob.link}
            onChange={(e) =>
              setEditedJob({ ...editedJob, link: e.target.value })
            }
          />

          <TextField
            label="Notes"
            multiline
            rows={3}
            value={editedJob.notes || ""}
            onChange={(e) =>
              setEditedJob({ ...editedJob, notes: e.target.value })
            }
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleSave}>
            Save
          </Button>

        </DialogActions>

      </Dialog>

    </>
  );
}

export default EditJobModal;