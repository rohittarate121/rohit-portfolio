import apiClient from "./apiClient";

export async function getAllExperiences() {
  const { data } = await apiClient.get("/experiences");
  return data;
}

export async function createExperience(experienceData) {
  const { data } = await apiClient.post("/experiences", experienceData);
  return data;
}

export async function updateExperience(id, experienceData) {
  const { data } = await apiClient.put(`/experiences/${id}`, experienceData);
  return data;
}

export async function deleteExperience(id) {
  await apiClient.delete(`/experiences/${id}`);
}
