const API = "http://127.0.0.1:5000/jobs";

export async function getJobs() {
  const res = await fetch(API);
  return res.json();
}

export async function addJob(job) {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });
}

export async function updateJob(id, job) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job)
  });
}

export async function deleteJob(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}