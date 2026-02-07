package com.cucampus.complaint.dto;

import com.cucampus.complaint.ComplaintCategory;

public class ComplaintCategoryDto {
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static ComplaintCategoryDto fromEntity(ComplaintCategory c) {
        ComplaintCategoryDto dto = new ComplaintCategoryDto();
        dto.setId(c.getId());
        dto.setName(c.getName());
        return dto;
    }
}

