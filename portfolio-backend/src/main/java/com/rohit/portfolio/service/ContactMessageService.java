package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.ContactRequest;
import com.rohit.portfolio.dto.ContactResponse;
import com.rohit.portfolio.entity.ContactMessage;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public Optional<ContactResponse> submitMessage(ContactRequest request) {
        if (request.honeypot() != null && !request.honeypot().isBlank()) {
            // Silently drop. The controller responds as if this succeeded,
            // so nothing about the response reveals a trap exists.
            return Optional.empty();
        }

        ContactMessage message = new ContactMessage();
        message.setName(request.name());
        message.setEmail(request.email());
        message.setSubject(request.subject());
        message.setMessage(request.message());

        return Optional.of(ContactResponse.fromEntity(contactMessageRepository.save(message)));
    }

    public List<ContactResponse> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(ContactResponse::fromEntity)
                .toList();
    }

    public ContactResponse markAsRead(Long id) {
        ContactMessage message = findMessageOrThrow(id);
        message.setRead(true);
        return ContactResponse.fromEntity(contactMessageRepository.save(message));
    }

    public void deleteMessage(Long id) {
        ContactMessage message = findMessageOrThrow(id);
        contactMessageRepository.delete(message);
    }

    private ContactMessage findMessageOrThrow(Long id) {
        return contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
    }
}