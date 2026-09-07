export function mapBlogPostFromApi(apiPost) {
  return {
    id: apiPost.id,
    slug: apiPost.slug,
    title: apiPost.title,
    excerpt: apiPost.excerpt,
    content: apiPost.content,
    category: apiPost.category,
    tags: apiPost.tags || [],
    status: apiPost.status,
    readingTimeMinutes: apiPost.readingTimeMinutes,
    publishedAt: apiPost.publishedAt,
  };
}
