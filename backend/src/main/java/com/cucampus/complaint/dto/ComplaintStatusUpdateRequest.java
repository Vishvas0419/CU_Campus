package com.cucampus.complaint.dto;

import com.cucampus.complaint.Complaint;
import jakarta.validation.constraints.NotNull;

public class ComplaintStatusUpdateRequest {

    @NotNull
    private Complaint.ComplaintStatus status;

    public ComplaintStatusUpdateRequest() {
    }

    public Complaint.ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(Complaint.ComplaintStatus status) {
        this.status = status;
    }
}

