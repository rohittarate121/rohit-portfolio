package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.ExperienceRequest;
import com.rohit.portfolio.dto.ExperienceResponse;
import com.rohit.portfolio.entity.Experience;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<ExperienceResponse> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(ExperienceResponse::fromEntity)
                .toList();
    }

    public ExperienceResponse createExperience(ExperienceRequest request) {
        Experience experience = new Experience();
        applyRequestToEntity(experience, request);
        return ExperienceResponse.fromEntity(experienceRepository.save(experience));
    }

    public ExperienceResponse updateExperience(Long id, ExperienceRequest request) {
        Experience experience = findExperienceOrThrow(id);
        applyRequestToEntity(experience, request);
        return ExperienceResponse.fromEntity(experienceRepository.save(experience));
    }

    public void deleteExperience(Long id) {
        Experience experience = findExperienceOrThrow(id);
        experienceRepository.delete(experience);
    }

    private Experience findExperienceOrThrow(Long id) {
        return experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
    }

    private void applyRequestToEntity(Experience experience, ExperienceRequest request) {
        experience.setRole(request.role());
        experience.setOrganization(request.organization());
        experience.setDuration(request.duration());
        experience.setResponsibilities(request.responsibilities());
        experience.setTechnologies(request.technologies());
        experience.setCertificateUrl(request.certificateUrl());
        experience.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);
    }
}