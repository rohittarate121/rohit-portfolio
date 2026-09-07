package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.CertificationRequest;
import com.rohit.portfolio.dto.CertificationResponse;
import com.rohit.portfolio.entity.Certification;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.CertificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;

    public CertificationService(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    public List<CertificationResponse> getAllCertifications() {
        return certificationRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(CertificationResponse::fromEntity)
                .toList();
    }

    public CertificationResponse createCertification(CertificationRequest request) {
        Certification certification = new Certification();
        applyRequestToEntity(certification, request);
        return CertificationResponse.fromEntity(certificationRepository.save(certification));
    }

    public CertificationResponse updateCertification(Long id, CertificationRequest request) {
        Certification certification = findCertificationOrThrow(id);
        applyRequestToEntity(certification, request);
        return CertificationResponse.fromEntity(certificationRepository.save(certification));
    }

    public void deleteCertification(Long id) {
        Certification certification = findCertificationOrThrow(id);
        certificationRepository.delete(certification);
    }

    private Certification findCertificationOrThrow(Long id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));
    }

    private void applyRequestToEntity(Certification certification, CertificationRequest request) {
        certification.setName(request.name());
        certification.setOrganization(request.organization());
        certification.setDate(request.date());
        certification.setCredentialId(request.credentialId());
        certification.setCertificateUrl(request.certificateUrl());
        certification.setVerificationUrl(request.verificationUrl());
        certification.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);
    }
}