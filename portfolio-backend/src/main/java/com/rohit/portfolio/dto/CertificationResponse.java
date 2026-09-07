package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.Certification;

public record CertificationResponse(
        Long id,
        String name,
        String organization,
        String date,
        String credentialId,
        String certificateUrl,
        String verificationUrl,
        Integer displayOrder
) {
    public static CertificationResponse fromEntity(Certification certification) {
        return new CertificationResponse(
                certification.getId(),
                certification.getName(),
                certification.getOrganization(),
                certification.getDate(),
                certification.getCredentialId(),
                certification.getCertificateUrl(),
                certification.getVerificationUrl(),
                certification.getDisplayOrder()
        );
    }
}