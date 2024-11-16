package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.TvShow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TvShowRepository extends JpaRepository<TvShow, Long> {

    @Query("SELECT tv FROM TvShow tv WHERE YEAR(tv.completedDate) = :year")
    List<TvShow> findCompletedItemsByYear(@Param("year") int year);

}