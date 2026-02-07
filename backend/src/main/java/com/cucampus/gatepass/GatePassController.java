package com.cucampus.gatepass;

import com.cucampus.gatepass.dto.GatePassDto;
import com.cucampus.gatepass.dto.GatePassRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gatepass")
public class GatePassController {

    private final GatePassService gatePassService;

    public GatePassController(GatePassService gatePassService) {
        this.gatePassService = gatePassService;
    }

    @PostMapping
    public GatePassDto create(@Valid @RequestBody GatePassRequest request) {
        return gatePassService.create(request);
    }

    @GetMapping("/my")
    public List<GatePassDto> my() {
        return gatePassService.myHistory();
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('WARDEN')")
    public List<GatePassDto> pending() {
        return gatePassService.pendingForWarden();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('WARDEN')")
    public GatePassDto approve(@PathVariable Long id) {
        return gatePassService.approve(id);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('WARDEN')")
    public GatePassDto reject(@PathVariable Long id) {
        return gatePassService.reject(id);
    }
}

