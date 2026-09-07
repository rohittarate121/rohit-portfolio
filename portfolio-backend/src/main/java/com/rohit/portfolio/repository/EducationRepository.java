package com.rohit.portfolio.repository;

import com.rohit.portfolio.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long> {

    List<Education> findAllByOrderByDisplayOrderAsc();
}