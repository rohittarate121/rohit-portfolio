package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.ResumeRequest;
import com.rohit.portfolio.dto.ResumeResponse;
import com.rohit.portfolio.service.ResumeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<ResumeResponse> getResume() {
        return ResponseEntity.ok(resumeService.getResume());
    }

    @PutMapping
    public ResponseEntity<ResumeResponse> updateResume(@Valid @RequestBody ResumeRequest request) {
        return ResponseEntity.ok(resumeService.updateResume(request));
    }

    @PostMapping("/download")
    public ResponseEntity<Void> recordDownload() {
        resumeService.incrementDownloadCount();
        return ResponseEntity.noContent().build();
    }
}