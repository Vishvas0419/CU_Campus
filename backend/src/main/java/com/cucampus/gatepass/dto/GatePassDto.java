package com.cucampus.gatepass.dto;

import com.cucampus.gatepass.GatePass;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
public class GatePassDto {
    private Long id;
    private String reason;
    private LocalDateTime fromDatetime;
    private LocalDateTime toDatetime;
    private String status;
    private Instant createdAt;
    private String approvedByUsername;

    public static GatePassDto fromEntity(GatePass gp) {
        GatePassDto dto = new GatePassDto();
        dto.setId(gp.getId());
        dto.setReason(gp.getReason());
        dto.setFromDatetime(gp.getFromDatetime());
        dto.setToDatetime(gp.getToDatetime());
        dto.setStatus(gp.getStatus().name());
        dto.setCreatedAt(gp.getCreatedAt());
        dto.setApprovedByUsername(gp.getApprovedBy() == null ? null : gp.getApprovedBy().getUsername());
        return dto;
    }
}

