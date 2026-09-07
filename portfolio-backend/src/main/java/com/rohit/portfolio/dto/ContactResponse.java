package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.ContactMessage;

import java.time.LocalDateTime;

public record ContactResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message,
        boolean isRead,
        LocalDateTime createdAt
) {
    public static ContactResponse fromEntity(ContactMessage contactMessage) {
        return new ContactResponse(
                contactMessage.getId(),
                contactMessage.getName(),
                contactMessage.getEmail(),
                contactMessage.getSubject(),
                contactMessage.getMessage(),
                contactMessage.isRead(),
                contactMessage.getCreatedAt()
        );
    }
}