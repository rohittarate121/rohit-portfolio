package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.AnalyticsSummaryResponse;
import com.rohit.portfolio.entity.SiteVisit;
import com.rohit.portfolio.repository.ContactMessageRepository;
import com.rohit.portfolio.repository.ResumeRepository;
import com.rohit.portfolio.repository.SiteVisitRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsService {

    private final SiteVisitRepository siteVisitRepository;
    private final ResumeRepository resumeRepository;
    private final ContactMessageRepository contactMessageRepository;

    public AnalyticsService(
            SiteVisitRepository siteVisitRepository,
            ResumeRepository resumeRepository,
            ContactMessageRepository contactMessageRepository
    ) {
        this.siteVisitRepository = siteVisitRepository;
        this.resumeRepository = resumeRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    public void recordVisit() {
        SiteVisit siteVisit = siteVisitRepository.findAll().stream()
                .findFirst()
                .orElseGet(SiteVisit::new);
        siteVisit.setTotalVisits(siteVisit.getTotalVisits() + 1);
        siteVisitRepository.save(siteVisit);
    }

    public AnalyticsSummaryResponse getSummary() {
        Long totalVisits = siteVisitRepository.findAll().stream()
                .findFirst()
                .map(SiteVisit::getTotalVisits)
                .orElse(0L);

        Long resumeDownloads = resumeRepository.findAll().stream()
                .findFirst()
                .map(r -> r.getDownloadCount() != null ? r.getDownloadCount() : 0L)
                .orElse(0L);

        long totalContactMessages = contactMessageRepository.count();

        return new AnalyticsSummaryResponse(totalVisits, resumeDownloads, totalContactMessages);
    }
}