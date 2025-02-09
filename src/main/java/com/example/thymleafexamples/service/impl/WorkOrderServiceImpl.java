package com.example.thymleafexamples.service.impl;

import com.example.thymleafexamples.core.exception.BaseBusinessValidationException;
import com.example.thymleafexamples.domain.User;
import com.example.thymleafexamples.domain.WorkOrder;
import com.example.thymleafexamples.dto.WorkOrderDTO;
import com.example.thymleafexamples.exception.rule.ADSBusinessRule;
import com.example.thymleafexamples.mapper.WorkOrderMapper;
import com.example.thymleafexamples.repository.UserRepository;
import com.example.thymleafexamples.repository.WorkOrderRepository;
import com.example.thymleafexamples.security.CustomUserDetails;
import com.example.thymleafexamples.service.WorkOrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkOrderServiceImpl implements WorkOrderService {
    private final WorkOrderRepository workOrderRepository;
    private final UserRepository userRepository;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.nonNull(authentication) && authentication.isAuthenticated() && authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
            // Kullanıcıyı veritabanından çek
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new BaseBusinessValidationException(ADSBusinessRule.USER_NOT_FOUND));

            // WorkOrder nesnesini oluştur ve kullanıcıyı setle
            WorkOrder workOrder = workOrderMapper.toEntity(workOrderDTO);
            workOrder.setUser(user);

            // WorkOrder'ı kaydet
            workOrder = workOrderRepository.save(workOrder);
            return workOrderMapper.toDto(workOrder);
        } else {
            throw new BaseBusinessValidationException(ADSBusinessRule.AUTH_ERROR);
        }
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
