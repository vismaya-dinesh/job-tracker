import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export async function getJobs() {
  const res = await API.get("/jobs");
  return res.data;
}

export async function addJob(job) {
  const res = await API.post("/jobs", job);
  return res.data;
}

export async function updateJob(id, job) {
  const res = await API.put(`/jobs/${id}`, job);
  return res.data;
}

export async function deleteJob(id) {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
}