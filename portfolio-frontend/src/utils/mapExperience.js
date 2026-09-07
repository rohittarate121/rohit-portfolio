// Same purpose as mapProject.js — isolates the API's field names from the
// component. This one's intentionally small: it's mostly renames, no real
// transformation needed at this resource's shape.

export function mapExperienceFromApi(apiExperience) {
  return {
    id: apiExperience.id,
    role: apiExperience.role,
    org: apiExperience.organization,
    duration: apiExperience.duration,
    points: apiExperience.responsibilities || [],
    tech: apiExperience.technologies || [],
    certificateUrl: apiExperience.certificateUrl,
  };
}
