package com.example.thymleafexamples.core.dto;

import jakarta.persistence.MappedSuperclass;
import lombok.*;

import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@MappedSuperclass
public class BaseDTO {
    private Long id;
    private Boolean status = Boolean.TRUE;
    private OffsetDateTime createdDate;
    private OffsetDateTime updatedDate;
    protected String createdUser;
    protected String updatedUser;
    private Integer version ;
}
