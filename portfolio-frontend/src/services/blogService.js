import apiClient from "./apiClient";

export async function getPublishedPosts() {
  const { data } = await apiClient.get("/blog");
  return data;
}

export async function getAllPostsForAdmin() {
  const { data } = await apiClient.get("/blog/all");
  return data;
}

export async function getPublishedPostBySlug(slug) {
  const { data } = await apiClient.get(`/blog/slug/${slug}`);
  return data;
}

export async function createPost(postData) {
  const { data } = await apiClient.post("/blog", postData);
  return data;
}

export async function updatePost(id, postData) {
  const { data } = await apiClient.put(`/blog/${id}`, postData);
  return data;
}

export async function deletePost(id) {
  await apiClient.delete(`/blog/${id}`);
}
