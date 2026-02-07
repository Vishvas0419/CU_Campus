package com.cucampus.mess.dto;

import com.cucampus.mess.MessMenu;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MessMenuDto {
    private Long id;
    private LocalDate menuDate;
    private String mealType;
    private String description;

    public static MessMenuDto fromEntity(MessMenu m) {
        MessMenuDto dto = new MessMenuDto();
        dto.setId(m.getId());
        dto.setMenuDate(m.getMenuDate());
        dto.setMealType(m.getMealType().name());
        dto.setDescription(m.getDescription());
        return dto;
    }
}

