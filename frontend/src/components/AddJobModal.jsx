import { useState } from "react";
import { addJob } from "../api";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";

function AddJobModal({ refresh }) {

  const [open, setOpen] = useState(false);

  const [job, setJob] = useState({
    company: "",
    role: "",
    status: "Applied",
    link: "",
    notes: ""
  });

  const handleSubmit = async () => {

    await addJob(job);

    refresh();

    setOpen(false);

    setJob({
      company: "",
      role: "",
      status: "Applied",
      link: "",
      notes: ""
    });
  };

  return (
    <>

      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add Job
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>

        <DialogTitle>Add Job</DialogTitle>

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
            value={job.company}
            onChange={(e) =>
              setJob({ ...job, company: e.target.value })
            }
          />

          <TextField
            label="Role"
            value={job.role}
            onChange={(e) =>
              setJob({ ...job, role: e.target.value })
            }
          />

          <TextField
            select
            label="Status"
            value={job.status}
            onChange={(e) =>
              setJob({ ...job, status: e.target.value })
            }
          >
            <MenuItem value="Wishlist">Wishlist</MenuItem>
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>

          <TextField
            label="Job Link"
            value={job.link}
            onChange={(e) =>
              setJob({ ...job, link: e.target.value })
            }
          />

          <TextField
            label="Notes (tests / interview dates)"
            multiline
            rows={3}
            value={job.notes}
            onChange={(e) =>
              setJob({ ...job, notes: e.target.value })
            }
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            Save
          </Button>

        </DialogActions>

      </Dialog>

    </>
  );
}

export default AddJobModal;