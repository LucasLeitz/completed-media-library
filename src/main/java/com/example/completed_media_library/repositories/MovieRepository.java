package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.Movie;
import com.example.completed_media_library.entities.TvShow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT movie FROM Movie movie WHERE YEAR(movie.completedDate) = :year")
    List<Movie> findCompletedItemsByYear(@Param("year") int year);

}