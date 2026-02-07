package com.cucampus.user;

import com.cucampus.user.dto.UpdateProfileRequest;
import com.cucampus.user.dto.UserDto;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserDto me() {
        return userService.getCurrentUser();
    }

    @PutMapping("/me")
    public UserDto updateMe(@Valid @RequestBody UpdateProfileRequest request) {
        return userService.updateCurrentUser(request);
    }
}

