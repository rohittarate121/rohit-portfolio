package com.rohit.portfolio.dto;

import com.rohit.portfolio.entity.Skill;
import com.rohit.portfolio.entity.SkillLevel;

public record SkillResponse(
        Long id,
        String name,
        String category,
        SkillLevel level,
        Integer displayOrder
) {
    public static SkillResponse fromEntity(Skill skill) {
        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getLevel(),
                skill.getDisplayOrder()
        );
    }
}