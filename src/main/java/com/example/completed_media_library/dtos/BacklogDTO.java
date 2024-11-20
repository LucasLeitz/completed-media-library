package com.example.completed_media_library.dtos;

public class BacklogDTO {

    private Long id;
    private String title;
    private String imageUrl;
    private String type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType(){ return type; }

    public void setType(String type){ this.type = type; }
}
