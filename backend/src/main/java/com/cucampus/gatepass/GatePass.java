package com.cucampus.gatepass;

import com.cucampus.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "gate_pass")
@Getter
@Setter
@NoArgsConstructor
public class GatePass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String reason;

    @Column(nullable = false)
    private LocalDateTime fromDatetime;

    @Column(nullable = false)
    private LocalDateTime toDatetime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}

