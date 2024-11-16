package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}