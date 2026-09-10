package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.Resume;

import java.time.LocalDateTime;

public record ResumeResponse(String resumeUrl, Long downloadCount, LocalDateTime updatedAt) {
    public static ResumeResponse fromEntity(Resume resume) {
        return new ResumeResponse(resume.getResumeUrl(), resume.getDownloadCount(), resume.getUpdatedAt());
    }
}