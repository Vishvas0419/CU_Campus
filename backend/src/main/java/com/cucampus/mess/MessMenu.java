package com.cucampus.mess;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "mess_menu")
@Getter
@Setter
@NoArgsConstructor
public class MessMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate menuDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MealType mealType;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    public enum MealType {
        BREAKFAST, LUNCH, DINNER
    }
}

