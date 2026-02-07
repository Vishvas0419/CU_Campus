package com.cucampus.mess;

import com.cucampus.mess.dto.MessMenuDto;
import com.cucampus.mess.dto.MessMenuUpsertRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MessMenuService {

    private final MessMenuRepository messMenuRepository;

    public MessMenuService(MessMenuRepository messMenuRepository) {
        this.messMenuRepository = messMenuRepository;
    }

    public List<MessMenuDto> menuByDate(LocalDate date) {
        return messMenuRepository.findByMenuDate(date).stream()
                .map(MessMenuDto::fromEntity)
                .toList();
    }

    public List<MessMenuDto> today() {
        return menuByDate(LocalDate.now());
    }

    public MessMenuDto upsert(MessMenuUpsertRequest request) {
        // Simple: create new row (can be improved by adding unique(menuDate, mealType) and updating)
        MessMenu menu = new MessMenu();
        menu.setMenuDate(request.getMenuDate());
        menu.setMealType(request.getMealType());
        menu.setDescription(request.getDescription());
        return MessMenuDto.fromEntity(messMenuRepository.save(menu));
    }
}

