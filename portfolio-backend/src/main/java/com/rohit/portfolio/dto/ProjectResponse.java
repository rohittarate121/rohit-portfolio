package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.Project;

import java.time.LocalDateTime;
import java.util.List;

public record ProjectResponse(
        Long id,
        String slug,
        String title,
        String shortDescription,
        String description,
        List<String> stack,
        List<String> features,
        String architecture,
        List<String> apiEndpoints,
        String githubUrl,
        String liveUrl,
        String imageUrl,
        boolean featured,
        String challenges,
        String learnings,
        String futureImprovements,
        Long viewCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ProjectResponse fromEntity(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getSlug(),
                project.getTitle(),
                project.getShortDescription(),
                project.getDescription(),
                project.getStack(),
                project.getFeatures(),
                project.getArchitecture(),
                project.getApiEndpoints(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getImageUrl(),
                project.isFeatured(),
                project.getChallenges(),
                project.getLearnings(),
                project.getFutureImprovements(),
                project.getViewCount(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}