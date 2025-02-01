package com.example.thymleafexamples.mapper;

import com.example.thymleafexamples.core.mapper.BaseMapper;
import com.example.thymleafexamples.domain.WorkOrder;
import com.example.thymleafexamples.dto.WorkOrderDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WorkOrderMapper extends BaseMapper<WorkOrder, WorkOrderDTO> {
    WorkOrderMapper INSTANCE = Mappers.getMapper(WorkOrderMapper.class);

    WorkOrderDTO toDto(WorkOrder workOrder);

    WorkOrder toEntity(WorkOrderDTO workOrderDTO);

    void updateEntity(WorkOrderDTO workOrderDTO, @MappingTarget WorkOrder workOrder);
}
