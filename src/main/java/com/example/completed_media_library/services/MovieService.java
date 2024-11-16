package com.example.completed_media_library.services;

import com.example.completed_media_library.dtos.MovieDTO;
import com.example.completed_media_library.entities.Movie;
import com.example.completed_media_library.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService extends BaseService<Movie, MovieDTO> {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    protected MovieRepository getRepository() {
        return movieRepository;
    }

    @Override
    protected MovieDTO mapToDTO(Movie movie) {
        MovieDTO dto = new MovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setImageUrl(movie.getImageUrl());
        dto.setCompletedDate(movie.getCompletedDate());
        return dto;
    }

    @Override
    protected Movie mapToEntity(MovieDTO dto) {
        Movie movie = new Movie();
        movie.setId(dto.getId());
        movie.setTitle(dto.getTitle());
        movie.setImageUrl(dto.getImageUrl());
        movie.setCompletedDate(dto.getCompletedDate());
        return movie;
    }
}