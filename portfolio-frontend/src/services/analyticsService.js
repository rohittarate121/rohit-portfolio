import apiClient from "./apiClient";

export async function recordSiteVisit() {
  await apiClient.post("/analytics/visit");
}

export async function getAnalyticsSummary() {
  const { data } = await apiClient.get("/analytics/summary");
  return data;
}
