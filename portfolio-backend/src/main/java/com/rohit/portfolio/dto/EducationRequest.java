package com.rohit.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public record EducationRequest(
        @NotBlank(message = "degree is required")
        String degree,

        @NotBlank(message = "institution is required")
        String institution,

        @NotBlank(message = "period is required")
        String period,

        String detail,

        Integer displayOrder
) {
}