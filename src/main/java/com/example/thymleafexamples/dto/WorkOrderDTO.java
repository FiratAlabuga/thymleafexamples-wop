package com.example.thymleafexamples.dto;

import com.example.thymleafexamples.core.dto.BaseDTO;
import com.example.thymleafexamples.domain.enums.ReasonCategory;
import com.example.thymleafexamples.domain.enums.RecordType;
import com.example.thymleafexamples.domain.enums.SituationType;
import com.example.thymleafexamples.domain.enums.SolutionCategory;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class WorkOrderDTO extends BaseDTO {
    private String opyCode;

    private String maximoId;

    private String serviceRegistrationNumber;
    private String assigned;
    private String reported;
    private String application;

    private String description;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime completionDate;
    private RecordType recordType;
    private SituationType situationType;
    private ReasonCategory reasonCategory;
    private SolutionCategory solutionCategory;
}
