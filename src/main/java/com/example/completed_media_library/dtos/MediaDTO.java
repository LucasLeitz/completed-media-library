package com.example.completed_media_library.dtos;

import com.example.completed_media_library.entities.MediaStatus;
import com.example.completed_media_library.entities.MediaType;

import java.time.LocalDate;

public class MediaDTO {

    private Long id;
    private String title;
    private String imageUrl;
    private LocalDate completedDate;
    private MediaType mediaType;
    private MediaStatus status; // ✅ New field

    public MediaDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDate getCompletedDate() { return completedDate; }
    public void setCompletedDate(LocalDate completedDate) { this.completedDate = completedDate; }

    public MediaType getMediaType() { return mediaType; }
    public void setMediaType(MediaType mediaType) { this.mediaType = mediaType; }

    public MediaStatus getStatus() { return status; }
    public void setStatus(MediaStatus status) { this.status = status; }
}


