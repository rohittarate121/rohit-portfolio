import apiClient from "./apiClient";

export async function getAllSkills() {
  const { data } = await apiClient.get("/skills");
  return data;
}

export async function createSkill(skillData) {
  const { data } = await apiClient.post("/skills", skillData);
  return data;
}

export async function updateSkill(id, skillData) {
  const { data } = await apiClient.put(`/skills/${id}`, skillData);
  return data;
}

export async function deleteSkill(id) {
  await apiClient.delete(`/skills/${id}`);
}
