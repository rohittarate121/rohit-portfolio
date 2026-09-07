package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.Education;

public record EducationResponse(
        Long id,
        String degree,
        String institution,
        String period,
        String detail,
        Integer displayOrder
) {
    public static EducationResponse fromEntity(Education education) {
        return new EducationResponse(
                education.getId(),
                education.getDegree(),
                education.getInstitution(),
                education.getPeriod(),
                education.getDetail(),
                education.getDisplayOrder()
        );
    }
}