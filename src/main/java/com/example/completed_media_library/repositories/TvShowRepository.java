package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.TvShow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TvShowRepository extends JpaRepository<TvShow, Long> {
}