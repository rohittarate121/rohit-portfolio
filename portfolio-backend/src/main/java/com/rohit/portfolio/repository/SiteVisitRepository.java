package com.rohit.portfolio.repository;

import com.rohit.portfolio.entity.SiteVisit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteVisitRepository extends JpaRepository<SiteVisit, Long> {
}