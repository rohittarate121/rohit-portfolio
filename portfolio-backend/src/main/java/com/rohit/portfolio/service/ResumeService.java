package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.ResumeRequest;
import com.rohit.portfolio.dto.ResumeResponse;
import com.rohit.portfolio.entity.Resume;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.ResumeRepository;
import org.springframework.stereotype.Service;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public ResumeResponse getResume() {
        Resume resume = resumeRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("No resume link has been set yet"));
        return ResumeResponse.fromEntity(resume);
    }

    // Upsert: exactly one row ever exists. Update it if present, create
    // it on the very first save otherwise — enforced here, not by the schema.
    public ResumeResponse updateResume(ResumeRequest request) {
        Resume resume = resumeRepository.findAll().stream()
                .findFirst()
                .orElseGet(Resume::new);
        resume.setResumeUrl(request.resumeUrl());
        return ResumeResponse.fromEntity(resumeRepository.save(resume));
    }
}