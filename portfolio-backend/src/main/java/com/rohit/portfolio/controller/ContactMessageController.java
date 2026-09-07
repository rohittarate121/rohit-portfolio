package com.rohit.portfolio.controller;

import com.rohit.portfolio.dto.ContactRequest;
import com.rohit.portfolio.dto.ContactResponse;
import com.rohit.portfolio.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<?> submitMessage(@Valid @RequestBody ContactRequest request) {
        Optional<ContactResponse> result = contactMessageService.submitMessage(request);

        if (result.isPresent()) {
            ContactResponse created = result.get();
            return ResponseEntity.created(URI.create("/api/contact/" + created.id())).body(created);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "received"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ContactResponse>> getAllMessages() {
        return ResponseEntity.ok(contactMessageService.getAllMessages());
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<ContactResponse> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactMessageService.markAsRead(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        contactMessageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}