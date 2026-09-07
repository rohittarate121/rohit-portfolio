package com.rohit.portfolio.service;

import com.rohit.portfolio.dto.SkillRequest;
import com.rohit.portfolio.dto.SkillResponse;
import com.rohit.portfolio.entity.Skill;
import com.rohit.portfolio.exception.ResourceNotFoundException;
import com.rohit.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(SkillResponse::fromEntity)
                .toList();
    }

    public SkillResponse createSkill(SkillRequest request) {
        Skill skill = new Skill();
        applyRequestToEntity(skill, request);
        return SkillResponse.fromEntity(skillRepository.save(skill));
    }

    public SkillResponse updateSkill(Long id, SkillRequest request) {
        Skill skill = findSkillOrThrow(id);
        applyRequestToEntity(skill, request);
        return SkillResponse.fromEntity(skillRepository.save(skill));
    }

    public void deleteSkill(Long id) {
        Skill skill = findSkillOrThrow(id);
        skillRepository.delete(skill);
    }

    private Skill findSkillOrThrow(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
    }

    private void applyRequestToEntity(Skill skill, SkillRequest request) {
        skill.setName(request.name());
        skill.setCategory(request.category());
        skill.setLevel(request.level());
        skill.setDisplayOrder(request.displayOrder() != null ? request.displayOrder() : 0);
    }
}