package com.rohit.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

public record ResumeRequest(
        @NotBlank(message = "resumeUrl is required")
        @URL(message = "resumeUrl must be a valid URL")
        String resumeUrl
) {
}