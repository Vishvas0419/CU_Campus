package com.cucampus.complaint;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComplaintCategoryRepository extends JpaRepository<ComplaintCategory, Long> {
    Optional<ComplaintCategory> findByName(String name);
}

