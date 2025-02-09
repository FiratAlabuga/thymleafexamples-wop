package com.example.thymleafexamples.repository;

import com.example.thymleafexamples.domain.WorkOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder,Long> {
    Page<WorkOrder> findAll(Pageable pageable);

}
