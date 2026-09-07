package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.SkillLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SkillRequest(
        @NotBlank(message = "name is required")
        String name,

        @NotBlank(message = "category is required")
        String category,

        @NotNull(message = "level is required")
        SkillLevel level,

        Integer displayOrder
) {
}