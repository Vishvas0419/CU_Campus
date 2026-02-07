package com.cucampus.user.dto;

import com.cucampus.user.Role;
import com.cucampus.user.User;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String enrollmentNo;
    private String hostel;
    private Set<String> roles;

    public static UserDto fromEntity(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setEnrollmentNo(user.getEnrollmentNo());
        dto.setHostel(user.getHostel());
        dto.setRoles(user.getRoles().stream()
                .map(Role::getName)
                .map(Enum::name)
                .collect(Collectors.toSet()));
        return dto;
    }
}

