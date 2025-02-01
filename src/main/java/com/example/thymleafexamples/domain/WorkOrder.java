package com.example.thymleafexamples.domain;

import com.example.thymleafexamples.core.domain.BaseEntity;
import com.example.thymleafexamples.domain.enums.ReasonCategory;
import com.example.thymleafexamples.domain.enums.RecordType;
import com.example.thymleafexamples.domain.enums.SituationType;
import com.example.thymleafexamples.domain.enums.SolutionCategory;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Table(name = "work_order")
public class WorkOrder extends BaseEntity {
    private String opyCode;

    private String maximoId;

    private String serviceRegistrationNumber;
    private String assigned;
    private String reported;
    private String application;

    private String description;
    private LocalDateTime completionDate;
    private RecordType recordType;
    private SituationType situationType;
    private ReasonCategory reasonCategory;
    private SolutionCategory solutionCategory;
}
