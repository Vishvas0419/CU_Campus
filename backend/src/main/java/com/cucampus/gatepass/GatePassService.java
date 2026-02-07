package com.cucampus.gatepass;

import com.cucampus.common.BadRequestException;
import com.cucampus.common.ResourceNotFoundException;
import com.cucampus.gatepass.dto.GatePassDto;
import com.cucampus.gatepass.dto.GatePassRequest;
import com.cucampus.user.User;
import com.cucampus.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GatePassService {

    private final GatePassRepository gatePassRepository;
    private final UserRepository userRepository;

    public GatePassService(GatePassRepository gatePassRepository,
                           UserRepository userRepository) {
        this.gatePassRepository = gatePassRepository;
        this.userRepository = userRepository;
    }

    private User currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }

    public GatePassDto create(GatePassRequest request) {
        if (request.getToDatetime().isBefore(request.getFromDatetime())) {
            throw new BadRequestException("toDatetime must be after fromDatetime");
        }

        User user = currentUser();
        GatePass gp = new GatePass();
        gp.setReason(request.getReason());
        gp.setFromDatetime(request.getFromDatetime());
        gp.setToDatetime(request.getToDatetime());
        gp.setStatus(GatePass.Status.PENDING);
        gp.setUser(user);
        return GatePassDto.fromEntity(gatePassRepository.save(gp));
    }

    public List<GatePassDto> myHistory() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return gatePassRepository.findByUserUsernameOrderByCreatedAtDesc(username).stream()
                .map(GatePassDto::fromEntity)
                .toList();
    }

    public List<GatePassDto> pendingForWarden() {
        return gatePassRepository.findByStatusOrderByCreatedAtAsc(GatePass.Status.PENDING).stream()
                .map(GatePassDto::fromEntity)
                .toList();
    }

    public GatePassDto approve(Long id) {
        GatePass gp = gatePassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gate pass not found: " + id));
        if (gp.getStatus() != GatePass.Status.PENDING) {
            throw new BadRequestException("Gate pass is not pending");
        }
        gp.setStatus(GatePass.Status.APPROVED);
        gp.setApprovedBy(currentUser());
        return GatePassDto.fromEntity(gatePassRepository.save(gp));
    }

    public GatePassDto reject(Long id) {
        GatePass gp = gatePassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gate pass not found: " + id));
        if (gp.getStatus() != GatePass.Status.PENDING) {
            throw new BadRequestException("Gate pass is not pending");
        }
        gp.setStatus(GatePass.Status.REJECTED);
        gp.setApprovedBy(currentUser());
        return GatePassDto.fromEntity(gatePassRepository.save(gp));
    }
}

