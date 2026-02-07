package com.cucampus.complaint;

import com.cucampus.common.ResourceNotFoundException;
import com.cucampus.complaint.dto.ComplaintCategoryDto;
import com.cucampus.complaint.dto.ComplaintDto;
import com.cucampus.complaint.dto.ComplaintRequest;
import com.cucampus.user.User;
import com.cucampus.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintCategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ComplaintService(ComplaintRepository complaintRepository,
                            ComplaintCategoryRepository categoryRepository,
                            UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    private User currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }

    public List<ComplaintCategoryDto> listCategories() {
        return categoryRepository.findAll().stream()
                .map(ComplaintCategoryDto::fromEntity)
                .toList();
    }

    public ComplaintDto create(ComplaintRequest request) {
        User user = currentUser();
        ComplaintCategory category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + request.getCategoryId()));

        Complaint c = new Complaint();
        c.setTitle(request.getTitle());
        c.setDescription(request.getDescription());
        c.setCategory(category);
        c.setUser(user);
        c.setStatus(Complaint.ComplaintStatus.PENDING);
        c.setCreatedAt(Instant.now());

        return ComplaintDto.fromEntity(complaintRepository.save(c));
    }

    public List<ComplaintDto> myComplaints() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return complaintRepository.findByUserUsernameOrderByCreatedAtDesc(username).stream()
                .map(ComplaintDto::fromEntity)
                .toList();
    }

    public ComplaintDto updateStatus(Long id, Complaint.ComplaintStatus status) {
        Complaint c = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found: " + id));
        c.setStatus(status);
        c.setUpdatedAt(Instant.now());
        return ComplaintDto.fromEntity(complaintRepository.save(c));
    }
}

