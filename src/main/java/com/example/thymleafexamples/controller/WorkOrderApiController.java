package com.example.thymleafexamples.controller;

import com.example.thymleafexamples.domain.enums.ReasonCategory;
import com.example.thymleafexamples.domain.enums.RecordType;
import com.example.thymleafexamples.domain.enums.SituationType;
import com.example.thymleafexamples.domain.enums.SolutionCategory;
import com.example.thymleafexamples.dto.WorkOrderDTO;
import com.example.thymleafexamples.service.WorkOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/workorders")
@Tag(name = "Work Order API", description = "APIs for managing work orders")
@Validated
public class WorkOrderApiController {

    private WorkOrderService workOrderService;
    public WorkOrderApiController(WorkOrderService workOrderService) {
        this.workOrderService = workOrderService;
    }

    // Tüm iş emirlerini sayfalı olarak getirme
    @GetMapping
    @Operation(summary = "Get all work orders", description = "Retrieve a paginated list of work orders")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_PETRA')")
    public ResponseEntity<Page<WorkOrderDTO>> getAllWorkOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<WorkOrderDTO> workOrderPage = workOrderService.getAllWorkOrders(page, size);
        return ResponseEntity.ok(workOrderPage);
    }

    // ID'ye göre iş emri getirme
    @GetMapping("/{id}")
    @Operation(summary = "Get work order by ID", description = "Retrieve a work order by its ID")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_PETRA')")
    public ResponseEntity<WorkOrderDTO> getWorkOrderById(@PathVariable Long id) {
        WorkOrderDTO workOrderDTO = workOrderService.getWorkOrderById(id);
        return ResponseEntity.ok(workOrderDTO);
    }

    // Yeni iş emri ekleme
    @PostMapping
    @Operation(summary = "Create a new work order", description = "Add a new work order to the system")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_PETRA')")
    public ResponseEntity<WorkOrderDTO> createWorkOrder(@RequestBody WorkOrderDTO workOrderDTO) {
        WorkOrderDTO createdWorkOrder = workOrderService.createWorkOrder(workOrderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkOrder);
    }

    // İş emri güncelleme
    @PutMapping("/{id}")
    @Operation(summary = "Update a work order", description = "Update an existing work order by its ID")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<WorkOrderDTO> updateWorkOrder(
            @PathVariable Long id,
            @RequestBody WorkOrderDTO workOrderDTO) {
        WorkOrderDTO updatedWorkOrder = workOrderService.updateWorkOrder(id, workOrderDTO);
        return ResponseEntity.ok(updatedWorkOrder);
    }

    // İş emri silme
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a work order", description = "Delete a work order by its ID")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteWorkOrder(@PathVariable Long id) {
        workOrderService.deleteWorkOrder(id);
        return ResponseEntity.noContent().build();
    }

    // Enum değerlerini getirme
    @GetMapping("/enums")
    @Operation(summary = "Get enum values", description = "Retrieve all enum values used in work orders")
    public ResponseEntity<EnumResponse> getEnums() {
        EnumResponse enumResponse = new EnumResponse(
                RecordType.values(),
                SituationType.values(),
                ReasonCategory.values(),
                SolutionCategory.values()
        );
        return ResponseEntity.ok(enumResponse);
    }

    // Enum değerlerini döndürmek için yardımcı sınıf
    private static class EnumResponse {
        private final RecordType[] recordTypes;
        private final SituationType[] situationTypes;
        private final ReasonCategory[] reasonCategories;
        private final SolutionCategory[] solutionCategories;

        public EnumResponse(RecordType[] recordTypes, SituationType[] situationTypes,
                            ReasonCategory[] reasonCategories, SolutionCategory[] solutionCategories) {
            this.recordTypes = recordTypes;
            this.situationTypes = situationTypes;
            this.reasonCategories = reasonCategories;
            this.solutionCategories = solutionCategories;
        }

        public RecordType[] getRecordTypes() {
            return recordTypes;
        }

        public SituationType[] getSituationTypes() {
            return situationTypes;
        }

        public ReasonCategory[] getReasonCategories() {
            return reasonCategories;
        }

        public SolutionCategory[] getSolutionCategories() {
            return solutionCategories;
        }
    }
}