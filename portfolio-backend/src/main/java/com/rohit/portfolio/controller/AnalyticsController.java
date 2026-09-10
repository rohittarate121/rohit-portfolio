package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.AnalyticsSummaryResponse;
import com.rohit.portfolio.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @PostMapping("/visit")
    public ResponseEntity<Void> recordVisit() {
        analyticsService.recordVisit();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<AnalyticsSummaryResponse> getSummary() {
        return ResponseEntity.ok(analyticsService.getSummary());
    }
}