package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.ProjectRequest;
import com.rohit.portfolio.dto.ProjectResponse;
import com.rohit.portfolio.entity.Project;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    private Project sampleProject;

    @BeforeEach
    void setUp() {
        sampleProject = new Project();
        sampleProject.setSlug("quickshow");
        sampleProject.setTitle("QuickShow");
        sampleProject.setShortDescription("Movie ticket booking app");
        sampleProject.setDescription("A MERN stack movie booking platform.");
        sampleProject.setStack(List.of("React", "Node.js", "MongoDB"));
        sampleProject.setFeatures(List.of("JWT auth", "Seat selection"));
        sampleProject.setArchitecture("Browser -> REST API -> Express -> MongoDB");
    }

    @Test
    void getAllProjects_returnsMappedResponses() {
        when(projectRepository.findAll()).thenReturn(List.of(sampleProject));

        List<ProjectResponse> result = projectService.getAllProjects();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).title()).isEqualTo("QuickShow");
    }

    @Test
    void getProjectById_whenFound_returnsProject() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(sampleProject));

        ProjectResponse result = projectService.getProjectById(1L);

        assertThat(result.title()).isEqualTo("QuickShow");
    }

    @Test
    void getProjectById_whenNotFound_throwsResourceNotFoundException() {
        when(projectRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectService.getProjectById(999L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("999");
    }

    @Test
    void createProject_savesAndReturnsProject() {
        ProjectRequest request = new ProjectRequest(
                "quickshow", "QuickShow", "Movie ticket booking app",
                "A MERN stack movie booking platform.",
                List.of("React", "Node.js", "MongoDB"),
                List.of("JWT auth", "Seat selection"),
                "Browser -> REST API -> Express -> MongoDB",
                List.of("POST /api/auth/login"),
                "https://github.com/rohittarate121/Quickshow",
                "https://quickshow-sand.vercel.app/",
                null, true, null, null, null
        );
        when(projectRepository.save(any(Project.class))).thenReturn(sampleProject);

        ProjectResponse result = projectService.createProject(request);

        assertThat(result.slug()).isEqualTo("quickshow");
        verify(projectRepository).save(any(Project.class));
    }

    @Test
    void deleteProject_whenFound_deletesIt() {
        when(projectRepository.findById(1L)).thenReturn(Optional.of(sampleProject));

        projectService.deleteProject(1L);

        verify(projectRepository).delete(sampleProject);
    }

    @Test
    void deleteProject_whenNotFound_throwsAndNeverDeletes() {
        when(projectRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectService.deleteProject(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}