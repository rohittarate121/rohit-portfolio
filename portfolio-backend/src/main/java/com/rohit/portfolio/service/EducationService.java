package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.EducationRequest;
import com.rohit.portfolio.dto.EducationResponse;
import com.rohit.portfolio.entity.Education;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.EducationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public List<EducationResponse> getAllEducation() {
        return educationRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(EducationResponse::fromEntity)
                .toList();
    }

    public EducationResponse createEducation(EducationRequest request) {
        Education education = new Education();
        applyRequestToEntity(education, request);
        return EducationResponse.fromEntity(educationRepository.save(education));
    }

    public EducationResponse updateEducation(Long id, EducationRequest request) {
        Education education = findEducationOrThrow(id);
        applyRequestToEntity(education, request);
        return EducationResponse.fromEntity(educationRepository.save(education));
    }

    public void deleteEducation(Long id) {
        Education education = findEducationOrThrow(id);
        educationRepository.delete(education);
    }

    private Education findEducationOrThrow(Long id) {
        return educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
    }

    private void applyRequestToEntity(Education education, EducationRequest request) {
        education.setDegree(request.degree());
        education.setInstitution(request.institution());
        education.setPeriod(request.period());
        education.setDetail(request.detail());
        education.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);
    }
}