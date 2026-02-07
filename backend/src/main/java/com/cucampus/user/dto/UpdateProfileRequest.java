package com.cucampus.user.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String fullName;
    private String enrollmentNo;
    private String hostel;
}

