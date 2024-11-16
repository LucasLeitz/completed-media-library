package com.example.completed_media_library.services;

import com.example.completed_media_library.dtos.TvShowDTO;
import com.example.completed_media_library.entities.TvShow;
import com.example.completed_media_library.repositories.TvShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TvShowService extends BaseService<TvShow, TvShowDTO> {

    @Autowired
    private TvShowRepository tvShowRepository;

    @Override
    protected TvShowRepository getRepository() {
        return tvShowRepository;
    }

    @Override
    protected TvShowDTO mapToDTO(TvShow tvShow) {
        TvShowDTO dto = new TvShowDTO();
        dto.setId(tvShow.getId());
        dto.setTitle(tvShow.getTitle());
        dto.setImageUrl(tvShow.getImageUrl());
        dto.setCompletedDate(tvShow.getCompletedDate());
        return dto;
    }

    @Override
    protected TvShow mapToEntity(TvShowDTO dto) {
        TvShow tvShow = new TvShow();
        tvShow.setId(dto.getId());
        tvShow.setTitle(dto.getTitle());
        tvShow.setImageUrl(dto.getImageUrl());
        tvShow.setCompletedDate(dto.getCompletedDate());
        return tvShow;
    }
}
