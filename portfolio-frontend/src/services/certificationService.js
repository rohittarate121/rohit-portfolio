import apiClient from "./apiClient";

export async function getAllCertifications() {
  const { data } = await apiClient.get("/certifications");
  return data;
}

export async function createCertification(certData) {
  const { data } = await apiClient.post("/certifications", certData);
  return data;
}

export async function updateCertification(id, certData) {
  const { data } = await apiClient.put(`/certifications/${id}`, certData);
  return data;
}

export async function deleteCertification(id) {
  await apiClient.delete(`/certifications/${id}`);
}
