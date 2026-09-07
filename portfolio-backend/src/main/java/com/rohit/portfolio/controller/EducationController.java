package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.EducationRequest;
import com.rohit.portfolio.dto.EducationResponse;
import com.rohit.portfolio.service.EducationService;
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
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public ResponseEntity<List<EducationResponse>> getAllEducation() {
        return ResponseEntity.ok(educationService.getAllEducation());
    }

    @PostMapping
    public ResponseEntity<EducationResponse> createEducation(@Valid @RequestBody EducationRequest request) {
        EducationResponse created = educationService.createEducation(request);
        return ResponseEntity.created(URI.create("/api/education/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EducationResponse> updateEducation(@PathVariable Long id, @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(educationService.updateEducation(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }
}