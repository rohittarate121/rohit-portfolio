import apiClient from "./apiClient";

export async function submitContactMessage(payload) {
  const { data } = await apiClient.post("/contact", payload);
  return data;
}

export async function getAllContactMessages() {
  const { data } = await apiClient.get("/contact/all");
  return data;
}

export async function markContactMessageAsRead(id) {
  const { data } = await apiClient.patch(`/contact/${id}/read`);
  return data;
}

export async function deleteContactMessage(id) {
  await apiClient.delete(`/contact/${id}`);
}
