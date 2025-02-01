package com.example.thymleafexamples.service;

import com.example.thymleafexamples.dto.WorkOrderDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WorkOrderService {
    WorkOrderDTO createWorkOrder(WorkOrderDTO workOrderDTO);
    Page<WorkOrderDTO> getAllWorkOrders(int page, int size);
    WorkOrderDTO getWorkOrderById(Long id);

    WorkOrderDTO updateWorkOrder(Long id, WorkOrderDTO workOrderDTO);

    void deleteWorkOrder(Long id);
}
