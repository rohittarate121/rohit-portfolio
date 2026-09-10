package com.rohit.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Single-row table, same upsert pattern as Resume (Step 35) — there's
// only ever one running total, enforced by the service, not the schema.
@Entity
@Table(name = "site_visits")
public class SiteVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private Long totalVisits = 0L;

    public SiteVisit() {
    }

    public Long getId() {
        return id;
    }

    public Long getTotalVisits() {
        return totalVisits;
    }

    public void setTotalVisits(Long totalVisits) {
        this.totalVisits = totalVisits;
    }
}