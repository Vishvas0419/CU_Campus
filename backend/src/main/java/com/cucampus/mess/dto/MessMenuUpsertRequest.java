package com.cucampus.mess.dto;

import com.cucampus.mess.MessMenu;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MessMenuUpsertRequest {
    @NotNull
    private LocalDate menuDate;

    @NotNull
    private MessMenu.MealType mealType;

    @NotBlank
    private String description;
}

