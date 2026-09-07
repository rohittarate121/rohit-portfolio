// Adapts the backend's Project shape to what Projects.jsx / ProjectDetail.jsx
// already expect, so those components never need to know the API exists.

function parseEndpoint(raw) {
  const [method, ...rest] = raw.trim().split(" ");
  return { method, path: rest.join(" ") };
}

export function mapProjectFromApi(apiProject) {
  return {
    id: apiProject.id,
    slug: apiProject.slug,
    name: apiProject.title,
    tagline: apiProject.shortDescription,
    description: apiProject.description,
    stack: apiProject.stack || [],
    features: apiProject.features || [],
    architecture: apiProject.architecture,
    endpoints: (apiProject.apiEndpoints || []).map(parseEndpoint),
    github: apiProject.githubUrl,
    demo: apiProject.liveUrl,
    imageUrl: apiProject.imageUrl,
    featured: apiProject.featured,
    challenges: apiProject.challenges,
    learnings: apiProject.learnings,
    future: apiProject.futureImprovements,
    isPlaceholderLinks: !apiProject.githubUrl,
  };
}
