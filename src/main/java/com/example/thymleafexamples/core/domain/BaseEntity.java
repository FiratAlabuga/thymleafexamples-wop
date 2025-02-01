package com.example.thymleafexamples.core.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class BaseEntity implements Serializable {
    @Id
    @Column(name = "ID", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "STATUS", nullable = false)
    private Boolean status = Boolean.TRUE;

    @Column(name = "CREATED_DATE", updatable = false, nullable = false)
    @CreatedDate
    private OffsetDateTime createdDate;

    @Column(name = "UPDATED_DATE")
    @LastModifiedDate
    private OffsetDateTime updatedDate = null;

    @Column(name = "CREATED_USER")
    protected String createdUser;

    @Column(name = "UPDATED_USER")
    protected String updatedUser;

    @Column(name = "VERSION")
    private Integer version ;

    public boolean hasId() {
        if(getId() != null) {
            if(getId() instanceof Number) {
                return new BigDecimal(Objects.toString(getId(), "0")).compareTo(new BigDecimal(0)) > 0;
            } else {
                String strId = Objects.toString(getId(), "0");
                return strId.compareTo("") > 0 && strId.compareTo("0") > 0;
            }
        }
        return false;
    }

    public void applyEntityStamps(){
        if (hasId()){
            updatedDate = OffsetDateTime.now();
        }else{
            createdDate = OffsetDateTime.now();
        }
    }
    @PrePersist
    public void prePersist() {
        this.createdUser = getUsernameFromAuthentication();
        this.createdDate = OffsetDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedUser = getUsernameFromAuthentication();
        this.updatedDate = OffsetDateTime.now();
    }

    private String getUsernameFromAuthentication() {
        /*Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
            return userDetails.getUsername();
        }*/
        return "anonymousUser";
    }
}