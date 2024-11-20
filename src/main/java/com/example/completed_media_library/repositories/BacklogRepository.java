package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.Backlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BacklogRepository extends JpaRepository<Backlog, Long> {

    @Query("SELECT backlog FROM Backlog backlog WHERE backlog.type = :type")
    List<Backlog> findBacklogItemsByType(@Param("type") String type);

}
