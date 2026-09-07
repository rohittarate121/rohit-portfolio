package com.rohit.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

public record CertificationRequest(
        @NotBlank(message = "name is required")
        String name,

        @NotBlank(message = "organization is required")
        String organization,

        @NotBlank(message = "date is required")
        String date,

        String credentialId,

        @URL(message = "certificateUrl must be a valid URL")
        String certificateUrl,

        @URL(message = "verificationUrl must be a valid URL")
        String verificationUrl,

        Integer displayOrder
) {
}