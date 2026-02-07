package com.cucampus.mess;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MessMenuRepository extends JpaRepository<MessMenu, Long> {
    List<MessMenu> findByMenuDate(LocalDate menuDate);
}

