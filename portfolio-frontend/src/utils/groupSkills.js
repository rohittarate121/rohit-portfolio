const LEVEL_LABELS = {
  PRIMARY: "Primary",
  STRONG: "Strong",
  WORKING_KNOWLEDGE: "Working Knowledge",
};

function slugifyCategory(category) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Backend returns a flat, already-sorted (by displayOrder) list.
// This groups it by category, preserving that order.
export function groupSkillsByCategory(apiSkills) {
  const groups = new Map();

  for (const skill of apiSkills) {
    if (!groups.has(skill.category)) {
      groups.set(skill.category, []);
    }
    groups.get(skill.category).push({
      name: skill.name,
      level: LEVEL_LABELS[skill.level] || skill.level,
    });
  }

  return Array.from(groups.entries()).map(([category, skills]) => ({
    category,
    endpoint: `GET /skills/${slugifyCategory(category)}`,
    skills,
  }));
}
