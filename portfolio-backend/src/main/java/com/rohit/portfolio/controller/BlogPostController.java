package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.BlogPostRequest;
import com.rohit.portfolio.dto.BlogPostResponse;
import com.rohit.portfolio.service.BlogPostService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogPostController {

    private final BlogPostService blogPostService;

    public BlogPostController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping
    public ResponseEntity<List<BlogPostResponse>> getPublishedPosts() {
        return ResponseEntity.ok(blogPostService.getPublishedPosts());
    }

    @GetMapping("/all")
    public ResponseEntity<List<BlogPostResponse>> getAllPostsForAdmin() {
        return ResponseEntity.ok(blogPostService.getAllPostsForAdmin());
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogPostResponse> getPublishedPostBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(blogPostService.getPublishedPostBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<BlogPostResponse> createPost(@Valid @RequestBody BlogPostRequest request) {
        BlogPostResponse created = blogPostService.createPost(request);
        return ResponseEntity.created(URI.create("/api/blog/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostResponse> updatePost(@PathVariable Long id, @Valid @RequestBody BlogPostRequest request) {
        return ResponseEntity.ok(blogPostService.updatePost(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        blogPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}