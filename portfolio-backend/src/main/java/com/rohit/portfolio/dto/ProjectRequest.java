package com.rohit.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.util.List;

public record ProjectRequest(
        @NotBlank(message = "slug is required")
        @Pattern(regexp = "^[a-z0-9]+(-[a-z0-9]+)*$",
                message = "slug must be lowercase letters, numbers, and hyphens only (e.g. 'quickshow')")
        String slug,

        @NotBlank(message = "title is required")
        @Size(max = 150, message = "title must be under 150 characters")
        String title,

        @NotBlank(message = "shortDescription is required")
        @Size(max = 300, message = "shortDescription must be under 300 characters")
        String shortDescription,

        @NotBlank(message = "description is required")
        String description,

        @NotEmpty(message = "stack must have at least one technology")
        List<String> stack,

        @NotEmpty(message = "features must have at least one item")
        List<String> features,

        @NotBlank(message = "architecture is required")
        String architecture,

        List<String> apiEndpoints,

        @URL(message = "githubUrl must be a valid URL")
        String githubUrl,

        @URL(message = "liveUrl must be a valid URL")
        String liveUrl,

        @URL(message = "imageUrl must be a valid URL")
        String imageUrl,

        boolean featured,

        String challenges,
        String learnings,
        String futureImprovements
) {
}