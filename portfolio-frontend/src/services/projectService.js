import apiClient from "./apiClient";

export async function getAllProjects() {
  const { data } = await apiClient.get("/projects");
  return data;
}

export async function getProjectBySlug(slug) {
  const { data } = await apiClient.get(`/projects/slug/${slug}`);
  return data;
}

export async function getProjectById(id) {
  const { data } = await apiClient.get(`/projects/${id}`);
  return data;
}

export async function createProject(projectData) {
  const { data } = await apiClient.post("/projects", projectData);
  return data;
}

export async function updateProject(id, projectData) {
  const { data } = await apiClient.put(`/projects/${id}`, projectData);
  return data;
}

export async function deleteProject(id) {
  await apiClient.delete(`/projects/${id}`);
}

export async function recordProjectView(id) {
  await apiClient.post(`/projects/${id}/view`);
}
