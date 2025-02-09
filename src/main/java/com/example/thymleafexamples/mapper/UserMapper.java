package com.example.thymleafexamples.mapper;

import com.example.thymleafexamples.core.mapper.BaseMapper;
import com.example.thymleafexamples.domain.User;
import com.example.thymleafexamples.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper extends BaseMapper<User, UserDTO> {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Override
    UserDTO toDto(User entity);

    @Override
    User toEntity(UserDTO dto);

    @Override
    void updateEntityFromDto(UserDTO dto, @MappingTarget User entity);
}
