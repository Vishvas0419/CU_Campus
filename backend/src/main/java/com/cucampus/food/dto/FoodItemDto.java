package com.cucampus.food.dto;

import com.cucampus.food.FoodItem;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class FoodItemDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private Long outletId;

    public static FoodItemDto fromEntity(FoodItem item) {
        FoodItemDto dto = new FoodItemDto();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setPrice(item.getPrice());
        dto.setOutletId(item.getOutlet().getId());
        return dto;
    }
}

