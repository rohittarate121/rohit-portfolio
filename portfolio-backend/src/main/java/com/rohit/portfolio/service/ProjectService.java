package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.ProjectRequest;
import com.rohit.portfolio.dto.ProjectResponse;
import com.rohit.portfolio.entity.Project;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(ProjectResponse::fromEntity)
                .toList();
    }

    public ProjectResponse getProjectById(Long id) {
        Project project = findProjectOrThrow(id);
        return ProjectResponse.fromEntity(project);
    }

    public ProjectResponse getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with slug: " + slug));
        return ProjectResponse.fromEntity(project);
    }

    public ProjectResponse createProject(ProjectRequest request) {
        Project project = new Project();
        applyRequestToEntity(project, request);
        Project saved = projectRepository.save(project);
        return ProjectResponse.fromEntity(saved);
    }

    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = findProjectOrThrow(id);
        applyRequestToEntity(project, request);
        Project saved = projectRepository.save(project);
        return ProjectResponse.fromEntity(saved);
    }

    public void deleteProject(Long id) {
        Project project = findProjectOrThrow(id);
        projectRepository.delete(project);
    }

    public void incrementViewCount(Long id) {
        Project project = findProjectOrThrow(id);
        Long current = project.getViewCount() != null ? project.getViewCount() : 0L;
        project.setViewCount(current + 1);
        projectRepository.save(project);
    }

    private Project findProjectOrThrow(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
    }

    private void applyRequestToEntity(Project project, ProjectRequest request) {
        project.setSlug(request.slug());
        project.setTitle(request.title());
        project.setShortDescription(request.shortDescription());
        project.setDescription(request.description());
        project.setStack(request.stack());
        project.setFeatures(request.features());
        project.setArchitecture(request.architecture());
        project.setApiEndpoints(request.apiEndpoints());
        project.setGithubUrl(request.githubUrl());
        project.setLiveUrl(request.liveUrl());
        project.setImageUrl(request.imageUrl());
        project.setFeatured(request.featured());
        project.setChallenges(request.challenges());
        project.setLearnings(request.learnings());
        project.setFutureImprovements(request.futureImprovements());
    }
}