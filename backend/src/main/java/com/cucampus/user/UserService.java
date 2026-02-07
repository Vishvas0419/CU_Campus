package com.cucampus.user;

import com.cucampus.common.ResourceNotFoundException;
import com.cucampus.user.dto.UpdateProfileRequest;
import com.cucampus.user.dto.UserDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getCurrentUserEntity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }

    public UserDto getCurrentUser() {
        return UserDto.fromEntity(getCurrentUserEntity());
    }

    public UserDto updateCurrentUser(UpdateProfileRequest request) {
        User user = getCurrentUserEntity();
        user.setFullName(request.getFullName());
        user.setEnrollmentNo(request.getEnrollmentNo());
        user.setHostel(request.getHostel());
        userRepository.save(user);
        return UserDto.fromEntity(user);
    }
}

