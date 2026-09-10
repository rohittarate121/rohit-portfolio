package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.ProjectRequest;
import com.rohit.portfolio.dto.ProjectResponse;
import com.rohit.portfolio.service.ProjectService;
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
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProjectResponse> getProjectBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(projectService.getProjectBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody ProjectRequest request) {
        ProjectResponse created = projectService.createProject(request);
        return ResponseEntity.created(URI.create("/api/projects/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.updateProject(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    // Public, deliberately separate from the GET above — see this step's
    // notes on why a read endpoint should never have this kind of side effect.
    @PostMapping("/{id}/view")
    public ResponseEntity<Void> recordView(@PathVariable Long id) {
        projectService.incrementViewCount(id);
        return ResponseEntity.noContent().build();
    }
}