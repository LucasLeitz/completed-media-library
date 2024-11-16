package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.VideoGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoGameRepository extends JpaRepository<VideoGame, Long> {

    @Query("SELECT vg FROM VideoGame vg WHERE YEAR(vg.completedDate) = :year")
    List<VideoGame> findCompletedItemsByYear(@Param("year") int year);


}
