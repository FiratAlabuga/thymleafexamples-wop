package com.example.thymleafexamples.service.impl;

import com.example.thymleafexamples.core.repository.WorkOrderRepository;
import com.example.thymleafexamples.domain.WorkOrder;
import com.example.thymleafexamples.dto.WorkOrderDTO;
import com.example.thymleafexamples.mapper.WorkOrderMapper;
import com.example.thymleafexamples.service.WorkOrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkOrderServiceImpl implements WorkOrderService {
    private final WorkOrderRepository workOrderRepository;
    private WorkOrderMapper workOrderMapper = WorkOrderMapper.INSTANCE ;
    // Tüm iş emirlerini sayfalı olarak getirme
    public Page<WorkOrderDTO> getAllWorkOrders(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return workOrderRepository.findAll(pageRequest)
                .map(workOrderMapper::toDto);
    }

    // ID'ye göre iş emri getirme
    public WorkOrderDTO getWorkOrderById(Long id) {
        return workOrderRepository.findById(id)
                .map(workOrderMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Work order not found"));
    }

    // Yeni iş emri ekleme
    public WorkOrderDTO createWorkOrder(WorkOrderDTO workOrderDTO) {
        WorkOrder workOrder = workOrderMapper.toEntity(workOrderDTO);
        workOrder = workOrderRepository.save(workOrder);
        return workOrderMapper.toDto(workOrder);
    }

    // İş emri güncelleme
    public WorkOrderDTO updateWorkOrder(Long id, WorkOrderDTO workOrderDTO) {
        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work order not found"));
        workOrderMapper.updateEntity(workOrderDTO, workOrder);
        workOrder = workOrderRepository.save(workOrder);
        return workOrderMapper.toDto(workOrder);
    }

    // İş emri silme
    public void deleteWorkOrder(Long id) {
        workOrderRepository.deleteById(id);
    }
}
