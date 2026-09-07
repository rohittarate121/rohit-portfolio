package com.rohit.portfolio.repository;

import com.rohit.portfolio.entity.BlogPost;
import com.rohit.portfolio.entity.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

    List<BlogPost> findByStatusOrderByPublishedAtDesc(PostStatus status);

    Optional<BlogPost> findBySlugAndStatus(String slug, PostStatus status);

    List<BlogPost> findAllByOrderByCreatedAtDesc();
}