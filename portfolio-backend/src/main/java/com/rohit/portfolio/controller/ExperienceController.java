package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.ExperienceRequest;
import com.rohit.portfolio.dto.ExperienceResponse;
import com.rohit.portfolio.service.ExperienceService;
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
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponse>> getAllExperiences() {
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }

    @PostMapping
    public ResponseEntity<ExperienceResponse> createExperience(@Valid @RequestBody ExperienceRequest request) {
        ExperienceResponse created = experienceService.createExperience(request);
        return ResponseEntity.created(URI.create("/api/experiences/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponse> updateExperience(@PathVariable Long id, @Valid @RequestBody ExperienceRequest request) {
        return ResponseEntity.ok(experienceService.updateExperience(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Long id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }
}