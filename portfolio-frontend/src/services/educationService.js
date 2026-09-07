import apiClient from "./apiClient";

export async function getAllEducation() {
  const { data } = await apiClient.get("/education");
  return data;
}

export async function createEducation(educationData) {
  const { data } = await apiClient.post("/education", educationData);
  return data;
}

export async function updateEducation(id, educationData) {
  const { data } = await apiClient.put(`/education/${id}`, educationData);
  return data;
}

export async function deleteEducation(id) {
  await apiClient.delete(`/education/${id}`);
}
