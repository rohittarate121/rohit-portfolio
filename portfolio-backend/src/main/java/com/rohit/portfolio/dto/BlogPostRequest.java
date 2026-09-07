package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.PostStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;

public record BlogPostRequest(
        @NotBlank(message = "slug is required")
        @Pattern(regexp = "^[a-z0-9]+(-[a-z0-9]+)*$",
                message = "slug must be lowercase letters, numbers, and hyphens only")
        String slug,

        @NotBlank(message = "title is required")
        String title,

        @NotBlank(message = "excerpt is required")
        String excerpt,

        @NotBlank(message = "content is required")
        String content,

        @NotBlank(message = "category is required")
        String category,

        List<String> tags,

        PostStatus status
) {
}