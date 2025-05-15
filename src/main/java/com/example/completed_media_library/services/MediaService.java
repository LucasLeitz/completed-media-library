package com.example.completed_media_library.services;

import com.example.completed_media_library.dtos.MediaDTO;
import com.example.completed_media_library.entities.Media;
import com.example.completed_media_library.entities.MediaStatus;
import com.example.completed_media_library.entities.MediaType;
import com.example.completed_media_library.repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaService extends BaseService<Media, MediaDTO> {

    @Autowired
    private MediaRepository mediaRepository;

    @Override
    protected MediaRepository getRepository() {
        return mediaRepository;
    }

    public List<Media> findByType(MediaType mediaType) {
        return getRepository().findByMediaType(mediaType);
    }

    public List<Media> findByTypeAndStatus(MediaType type, MediaStatus status) {
        return mediaRepository.findByMediaTypeAndStatus(type, status);
    }

    public MediaDTO toDTO(Media media) {
        return mapToDTO(media);
    }

    @Override
    protected MediaDTO mapToDTO(Media media) {
        MediaDTO dto = new MediaDTO();
        dto.setId(media.getId());
        dto.setTitle(media.getTitle());
        dto.setImageUrl(media.getImageUrl());
        dto.setCompletedDate(media.getCompletedDate());
        dto.setMediaType(media.getMediaType());
        dto.setStatus(media.getStatus());
        return dto;
    }

    @Override
    protected Media mapToEntity(MediaDTO dto) {
        Media media = new Media();
        media.setId(dto.getId());
        media.setTitle(dto.getTitle());
        media.setImageUrl(dto.getImageUrl());
        media.setCompletedDate(dto.getCompletedDate());
        media.setMediaType(dto.getMediaType());
        media.setStatus(dto.getStatus());
        return media;
    }
}

