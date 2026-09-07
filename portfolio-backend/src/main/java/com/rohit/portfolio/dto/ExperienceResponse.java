package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.Experience;

import java.util.List;

public record ExperienceResponse(
        Long id,
        String role,
        String organization,
        String duration,
        List<String> responsibilities,
        List<String> technologies,
        String certificateUrl,
        Integer displayOrder
) {
    public static ExperienceResponse fromEntity(Experience experience) {
        return new ExperienceResponse(
                experience.getId(),
                experience.getRole(),
                experience.getOrganization(),
                experience.getDuration(),
                experience.getResponsibilities(),
                experience.getTechnologies(),
                experience.getCertificateUrl(),
                experience.getDisplayOrder()
        );
    }
}