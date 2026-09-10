package com.rohit.portfolio.dto;

public record AnalyticsSummaryResponse(
        Long totalVisits,
        Long resumeDownloads,
        long totalContactMessages
) {
}