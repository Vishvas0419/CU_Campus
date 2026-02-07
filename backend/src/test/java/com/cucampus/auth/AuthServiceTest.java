package com.cucampus.auth;

import com.cucampus.auth.dto.AuthResponse;
import com.cucampus.auth.dto.LoginRequest;
import com.cucampus.auth.dto.RegisterRequest;
import com.cucampus.security.JwtTokenProvider;
import com.cucampus.user.Role;
import com.cucampus.user.RoleRepository;
import com.cucampus.user.User;
import com.cucampus.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtTokenProvider jwtTokenProvider;

    @InjectMocks private AuthService authService;

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setUsername("john");
        registerRequest.setEmail("john@example.com");
        registerRequest.setPassword("pass");
        registerRequest.setFullName("John Doe");
        registerRequest.setEnrollmentNo("E123");
        registerRequest.setHostel("A");
    }

    @Test
    void register_shouldCreateUserAndReturnToken() {
        when(userRepository.existsByUsername("john")).thenReturn(false);
        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        Role role = new Role();
        role.setName(Role.RoleName.ROLE_STUDENT);
        when(roleRepository.findByName(Role.RoleName.ROLE_STUDENT)).thenReturn(Optional.of(role));
        when(passwordEncoder.encode("pass")).thenReturn("enc");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtTokenProvider.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        AuthResponse response = authService.register(registerRequest);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void login_shouldAuthenticateAndReturnToken() {
        LoginRequest req = new LoginRequest();
        req.setUsername("john");
        req.setPassword("pass");
        Authentication auth = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(auth);
        when(auth.getPrincipal()).thenReturn(mock(UserDetails.class));
        when(jwtTokenProvider.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        AuthResponse response = authService.login(req);

        assertThat(response.getToken()).isEqualTo("jwt-token");
    }
}
