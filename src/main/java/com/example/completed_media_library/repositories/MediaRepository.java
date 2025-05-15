package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.Media;
import com.example.completed_media_library.entities.MediaStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.completed_media_library.entities.MediaType;


import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByMediaType(MediaType mediaType);

    List<Media> findByMediaTypeAndStatus(MediaType mediaType, MediaStatus status);
}
