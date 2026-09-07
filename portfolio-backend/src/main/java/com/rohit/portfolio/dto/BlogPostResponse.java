package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.BlogPost;
import com.rohit.portfolio.entity.PostStatus;

import java.time.LocalDateTime;
import java.util.List;

public record BlogPostResponse(
        Long id,
        String slug,
        String title,
        String excerpt,
        String content,
        String category,
        List<String> tags,
        PostStatus status,
        Integer readingTimeMinutes,
        LocalDateTime publishedAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static BlogPostResponse fromEntity(BlogPost post) {
        return new BlogPostResponse(
                post.getId(),
                post.getSlug(),
                post.getTitle(),
                post.getExcerpt(),
                post.getContent(),
                post.getCategory(),
                post.getTags(),
                post.getStatus(),
                post.getReadingTimeMinutes(),
                post.getPublishedAt(),
                post.getCreatedAt(),
                post.getUpdatedAt()
        );
    }
}