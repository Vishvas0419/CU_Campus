package com.cucampus.food;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByUserUsernameOrderByCreatedAtDesc(String username);
}

