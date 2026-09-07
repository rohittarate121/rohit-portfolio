package com.rohit.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ContactRequest(
        @NotBlank(message = "name is required")
        String name,

        @NotBlank(message = "email is required")
        @Email(message = "email must be a valid email address")
        String email,

        String subject,

        @NotBlank(message = "message is required")
        String message,

        // Hidden from real visitors. Non-blank almost certainly means a bot.
        String honeypot
) {
}