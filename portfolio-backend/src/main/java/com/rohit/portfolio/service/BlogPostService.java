package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.BlogPostRequest;
import com.rohit.portfolio.dto.BlogPostResponse;
import com.rohit.portfolio.entity.BlogPost;
import com.rohit.portfolio.entity.PostStatus;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.BlogPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPostResponse> getPublishedPosts() {
        return blogPostRepository.findByStatusOrderByPublishedAtDesc(PostStatus.PUBLISHED)
                .stream()
                .map(BlogPostResponse::fromEntity)
                .toList();
    }

    // Unprotected for now, same as every write endpoint until Phase 8 —
    // this is what Phase 9's admin dashboard will use to list drafts too.
    public List<BlogPostResponse> getAllPostsForAdmin() {
        return blogPostRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(BlogPostResponse::fromEntity)
                .toList();
    }

    public BlogPostResponse getPublishedPostBySlug(String slug) {
        BlogPost post = blogPostRepository.findBySlugAndStatus(slug, PostStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Published post not found with slug: " + slug));
        return BlogPostResponse.fromEntity(post);
    }

    public BlogPostResponse createPost(BlogPostRequest request) {
        BlogPost post = new BlogPost();
        applyRequestToEntity(post, request);
        return BlogPostResponse.fromEntity(blogPostRepository.save(post));
    }

    public BlogPostResponse updatePost(Long id, BlogPostRequest request) {
        BlogPost post = findPostOrThrow(id);
        applyRequestToEntity(post, request);
        return BlogPostResponse.fromEntity(blogPostRepository.save(post));
    }

    public void deletePost(Long id) {
        BlogPost post = findPostOrThrow(id);
        blogPostRepository.delete(post);
    }

    private BlogPost findPostOrThrow(Long id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with id: " + id));
    }

    private void applyRequestToEntity(BlogPost post, BlogPostRequest request) {
        post.setSlug(request.slug());
        post.setTitle(request.title());
        post.setExcerpt(request.excerpt());
        post.setContent(request.content());
        post.setCategory(request.category());
        post.setTags(request.tags());
        post.setStatus(request.status() != null ? request.status() : PostStatus.DRAFT);
    }
}