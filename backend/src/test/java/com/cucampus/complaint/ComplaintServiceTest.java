package com.cucampus.complaint;

import com.cucampus.common.ResourceNotFoundException;
import com.cucampus.complaint.dto.ComplaintCategoryDto;
import com.cucampus.complaint.dto.ComplaintDto;
import com.cucampus.complaint.dto.ComplaintRequest;
import com.cucampus.user.User;
import com.cucampus.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ComplaintServiceTest {

    @Mock private ComplaintRepository complaintRepository;
    @Mock private ComplaintCategoryRepository categoryRepository;
    @Mock private UserRepository userRepository;

    @InjectMocks private ComplaintService complaintService;

    @BeforeEach
    void setupSecurityContext() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("john", "N/A")
        );
    }

    @AfterEach
    void clearSecurity() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void listCategories_mapsToDto() {
        ComplaintCategory cat = new ComplaintCategory();
        cat.setId(1L);
        cat.setName("Hostel");
        when(categoryRepository.findAll()).thenReturn(List.of(cat));

        List<ComplaintCategoryDto> result = complaintService.listCategories();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getId()).isEqualTo(1L);
        assertThat(result.get(0).getName()).isEqualTo("Hostel");
    }

    @Test
    void create_persistsComplaintAndReturnsDto() {
        User user = new User();
        user.setUsername("john");
        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));

        ComplaintCategory cat = new ComplaintCategory();
        cat.setId(10L);
        when(categoryRepository.findById(10L)).thenReturn(Optional.of(cat));

        Complaint saved = new Complaint();
        saved.setId(100L);
        saved.setTitle("Leaking tap");
        saved.setCreatedAt(Instant.now());
        when(complaintRepository.save(any(Complaint.class))).thenReturn(saved);

        ComplaintRequest req = new ComplaintRequest();
        req.setTitle("Leaking tap");
        req.setDescription("In room 101");
        req.setCategoryId(10L);

        ComplaintDto dto = complaintService.create(req);

        assertThat(dto.getId()).isEqualTo(100L);
        verify(complaintRepository, times(1)).save(any(Complaint.class));
    }

    @Test
    void create_whenCategoryMissing_throwsNotFound() {
        User user = new User();
        user.setUsername("john");
        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));
        when(categoryRepository.findById(10L)).thenReturn(Optional.empty());

        ComplaintRequest req = new ComplaintRequest();
        req.setTitle("Issue");
        req.setCategoryId(10L);

        assertThatThrownBy(() -> complaintService.create(req))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Category not found");
    }
}
