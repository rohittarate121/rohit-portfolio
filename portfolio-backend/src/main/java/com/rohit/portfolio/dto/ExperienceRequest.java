package com.rohit.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import org.hibernate.validator.constraints.URL;

import java.util.List;

public record ExperienceRequest(
        @NotBlank(message = "role is required")
        String role,

        @NotBlank(message = "organization is required")
        String organization,

        @NotBlank(message = "duration is required")
        String duration,

        @NotEmpty(message = "responsibilities must have at least one item")
        List<String> responsibilities,

        List<String> technologies,

        @URL(message = "certificateUrl must be a valid URL")
        String certificateUrl,

        Integer displayOrder
) {
}