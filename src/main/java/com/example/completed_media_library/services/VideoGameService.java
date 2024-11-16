package com.example.completed_media_library.services;

import com.example.completed_media_library.dtos.VideoGameDTO;
import com.example.completed_media_library.entities.VideoGame;
import com.example.completed_media_library.repositories.VideoGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoGameService extends BaseService<VideoGame, VideoGameDTO> {

    @Autowired
    private VideoGameRepository videoGameRepository;

    @Override
    protected VideoGameRepository getRepository() {
        return videoGameRepository;
    }

    @Override
    protected VideoGameDTO mapToDTO(VideoGame videoGame) {
        VideoGameDTO dto = new VideoGameDTO();
        dto.setId(videoGame.getId()); // Map the ID
        dto.setTitle(videoGame.getTitle());
        dto.setPlatform(videoGame.getPlatform());
        dto.setImageUrl(videoGame.getImageUrl());
        dto.setCompletedDate(videoGame.getCompletedDate());
        return dto;
    }

    @Override
    protected VideoGame mapToEntity(VideoGameDTO dto) {
        VideoGame videoGame = new VideoGame();
        videoGame.setId(dto.getId());
        videoGame.setTitle(dto.getTitle());
        videoGame.setPlatform(dto.getPlatform());
        videoGame.setImageUrl(dto.getImageUrl());
        videoGame.setCompletedDate(dto.getCompletedDate());
        return videoGame;
    }
}

