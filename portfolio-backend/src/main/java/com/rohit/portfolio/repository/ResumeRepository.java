package com.rohit.portfolio.repository;

import com.rohit.portfolio.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}