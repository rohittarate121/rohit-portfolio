export function mapEducationFromApi(apiEducation) {
  return {
    id: apiEducation.id,
    degree: apiEducation.degree,
    school: apiEducation.institution,
    period: apiEducation.period,
    detail: apiEducation.detail,
  };
}
