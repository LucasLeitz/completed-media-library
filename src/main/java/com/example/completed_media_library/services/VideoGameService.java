package com.example.completed_media_library.services;

import com.example.completed_media_library.dtos.VideoGameDTO;
import com.example.completed_media_library.entities.VideoGame;
import com.example.completed_media_library.exceptions.ResourceNotFoundException;
import com.example.completed_media_library.repositories.VideoGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VideoGameService{

    @Autowired
    private VideoGameRepository videoGameRepository;

    public List<VideoGame> getAllVideoGames() {
        return new ArrayList<>(videoGameRepository.findAll());
    }


    public VideoGameDTO saveVideoGame(VideoGameDTO videoGameDTO) {
        // Convert VideoGameDTO to VideoGame entity
        VideoGame videoGame = new VideoGame();
        videoGame.setTitle(videoGameDTO.getTitle());
        videoGame.setPlatform(videoGameDTO.getPlatform());
        videoGame.setImageUrl(videoGameDTO.getImageUrl());
        videoGame.setCompletedDate(videoGameDTO.getCompletedDate());

        // Save the VideoGame entity
        VideoGame savedVideoGame = videoGameRepository.save(videoGame);

        // Convert saved VideoGame entity back to VideoGameDTO
        VideoGameDTO savedVideoGameDTO = new VideoGameDTO();
        savedVideoGameDTO.setTitle(savedVideoGame.getTitle());
        savedVideoGameDTO.setPlatform(savedVideoGame.getPlatform());
        savedVideoGameDTO.setImageUrl(savedVideoGame.getImageUrl());
        savedVideoGameDTO.setCompletedDate(savedVideoGameDTO.getCompletedDate());

        return savedVideoGameDTO;
    }

    public void deleteVideoGameById(Long id) {
        if (!videoGameRepository.existsById(id)) {
            throw new ResourceNotFoundException("VideoGame with ID " + id + " not found.");
        }
        videoGameRepository.deleteById(id);
    }
}

