package com.cucampus.gatepass;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GatePassRepository extends JpaRepository<GatePass, Long> {
    List<GatePass> findByUserUsernameOrderByCreatedAtDesc(String username);
    List<GatePass> findByStatusOrderByCreatedAtAsc(GatePass.Status status);
}

