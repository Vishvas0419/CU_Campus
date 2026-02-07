package com.cucampus.complaint;

import com.cucampus.complaint.dto.ComplaintCategoryDto;
import com.cucampus.complaint.dto.ComplaintDto;
import com.cucampus.complaint.dto.ComplaintRequest;
import com.cucampus.complaint.dto.ComplaintStatusUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping("/categories")
    public List<ComplaintCategoryDto> categories() {
        return complaintService.listCategories();
    }

    @PostMapping
    public ComplaintDto create(@Valid @RequestBody ComplaintRequest request) {
        return complaintService.create(request);
    }

    @GetMapping("/my")
    public List<ComplaintDto> my() {
        return complaintService.myComplaints();
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ComplaintDto updateStatus(@PathVariable Long id,
                                    @Valid @RequestBody ComplaintStatusUpdateRequest request) {
        return complaintService.updateStatus(id, request.getStatus());
    }
}

