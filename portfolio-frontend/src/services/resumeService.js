import apiClient from "./apiClient";

export async function getResume() {
  const { data } = await apiClient.get("/resume");
  return data;
}

export async function updateResume(resumeUrl) {
  const { data } = await apiClient.put("/resume", { resumeUrl });
  return data;
}

export async function recordResumeDownload() {
  await apiClient.post("/resume/download");
}
