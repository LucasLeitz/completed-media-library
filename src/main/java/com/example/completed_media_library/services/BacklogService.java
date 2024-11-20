package com.example.completed_media_library.services;

import com.example.completed_media_library.dtos.BacklogDTO;
import com.example.completed_media_library.entities.Backlog;
import com.example.completed_media_library.repositories.BacklogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BacklogService extends BaseService<Backlog, BacklogDTO> {

    @Autowired
    private BacklogRepository backlogRepository;

    @Override
    protected BacklogRepository getRepository() {
        return backlogRepository;
    }

    @Override
    protected BacklogDTO mapToDTO(Backlog backlog) {
        BacklogDTO dto = new BacklogDTO();
        dto.setId(backlog.getId());
        dto.setTitle(backlog.getTitle());
        dto.setImageUrl(backlog.getImageUrl());
        dto.setType(backlog.getType());
        return dto;
    }

    @Override
    protected Backlog mapToEntity(BacklogDTO dto) {
        Backlog backlog = new Backlog();
        backlog.setId(dto.getId());
        backlog.setTitle(dto.getTitle());
        backlog.setImageUrl(dto.getImageUrl());
        backlog.setType(dto.getType());
        return backlog;
    }

    public List<Backlog> getBacklogByType(String type) {
        return backlogRepository.findBacklogItemsByType(type);
    }

}
