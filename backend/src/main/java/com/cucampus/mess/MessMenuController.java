package com.cucampus.mess;

import com.cucampus.mess.dto.MessMenuDto;
import com.cucampus.mess.dto.MessMenuUpsertRequest;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/mess")
public class MessMenuController {

    private final MessMenuService messMenuService;

    public MessMenuController(MessMenuService messMenuService) {
        this.messMenuService = messMenuService;
    }

    @GetMapping("/menu")
    public List<MessMenuDto> menu(@RequestParam("date") LocalDate date) {
        return messMenuService.menuByDate(date);
    }

    @GetMapping("/menu/today")
    public List<MessMenuDto> today() {
        return messMenuService.today();
    }

    @PostMapping("/menu")
    @PreAuthorize("hasRole('ADMIN')")
    public MessMenuDto upsert(@Valid @RequestBody MessMenuUpsertRequest request) {
        return messMenuService.upsert(request);
    }
}

