package com.cucampus.gatepass.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GatePassRequest {
    @NotBlank
    private String reason;

    @NotNull
    private LocalDateTime fromDatetime;

    @NotNull
    private LocalDateTime toDatetime;
}

