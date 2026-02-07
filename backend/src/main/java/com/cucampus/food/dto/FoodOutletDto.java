package com.cucampus.food.dto;

import com.cucampus.food.FoodOutlet;
import lombok.Data;

@Data
public class FoodOutletDto {
    private Long id;
    private String name;
    private String location;

    public static FoodOutletDto fromEntity(FoodOutlet o) {
        FoodOutletDto dto = new FoodOutletDto();
        dto.setId(o.getId());
        dto.setName(o.getName());
        dto.setLocation(o.getLocation());
        return dto;
    }
}

