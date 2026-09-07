package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.CertificationRequest;
import com.rohit.portfolio.dto.CertificationResponse;
import com.rohit.portfolio.service.CertificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @GetMapping
    public ResponseEntity<List<CertificationResponse>> getAllCertifications() {
        return ResponseEntity.ok(certificationService.getAllCertifications());
    }

    @PostMapping
    public ResponseEntity<CertificationResponse> createCertification(@Valid @RequestBody CertificationRequest request) {
        CertificationResponse created = certificationService.createCertification(request);
        return ResponseEntity.created(URI.create("/api/certifications/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CertificationResponse> updateCertification(@PathVariable Long id, @Valid @RequestBody CertificationRequest request) {
        return ResponseEntity.ok(certificationService.updateCertification(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}