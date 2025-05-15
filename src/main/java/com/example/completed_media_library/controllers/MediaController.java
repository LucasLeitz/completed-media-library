package com.example.completed_media_library.controllers;

import com.example.completed_media_library.dtos.MediaDTO;
import com.example.completed_media_library.entities.Media;
import com.example.completed_media_library.entities.MediaStatus;
import com.example.completed_media_library.entities.MediaType;
import com.example.completed_media_library.services.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Year;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    @Autowired
    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping
    public ResponseEntity<MediaDTO> addMedia(@RequestBody MediaDTO mediaDTO) {
        MediaDTO saved = mediaService.save(mediaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MediaDTO> updateMedia(@PathVariable Long id, @RequestBody MediaDTO mediaDTO) {
        mediaDTO.setId(id);
        MediaDTO updated = mediaService.save(mediaDTO);
        return ResponseEntity.ok(updated);
    }

    @GetMapping
    public List<MediaDTO> getAllMedia() {
        return mediaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaDTO> getMediaById(@PathVariable Long id) {
        MediaDTO mediaDTO = mediaService.findById(id);
        if (mediaDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mediaDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable Long id) {
        mediaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/type/{type}")
    public List<MediaDTO> getMediaByType(@PathVariable("type") MediaType type) {
        List<Media> filtered = mediaService.findByType(type);
        return filtered.stream().map(mediaService::toDTO).toList();
    }

    @GetMapping("/completed/count/{year}")
    public ResponseEntity<Long> getCompletedMediaCount(@PathVariable int year) {
        long count = mediaService.getAll().stream()
                .filter(m -> m.getCompletedDate() != null && m.getCompletedDate().getYear() == year)
                .count();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/searchWikipediaImage")
    @SuppressWarnings("unchecked")
    public Map<String, String> searchWikipediaImage(@RequestParam String title) {
        String wikipediaApiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + title;

        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> responseMap = new HashMap<>();
        try {
            Map<String, Object> response = restTemplate.getForObject(wikipediaApiUrl, Map.class);
            if (response != null && response.containsKey("thumbnail")) {
                Map<String, Object> thumbnail = (Map<String, Object>) response.get("thumbnail");
                String imageUrl = (String) thumbnail.get("source");
                responseMap.put("imageUrl", imageUrl);
            } else {
                responseMap.put("imageUrl", null);
            }
        } catch (Exception e) {
            responseMap.put("imageUrl", null);
        }
        return responseMap;
    }

    @GetMapping("/type/{type}/completed/count/{year}")
    public ResponseEntity<Long> getCompletedCountByTypeAndYear(@PathVariable MediaType type, @PathVariable int year) {
        long count = mediaService.getAll().stream()
                .filter(m -> m.getMediaType() == type)
                .filter(m -> m.getCompletedDate() != null && m.getCompletedDate().getYear() == year)
                .count();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/type/{type}/status/{status}")
    public List<MediaDTO> getMediaByTypeAndStatus(@PathVariable MediaType type, @PathVariable MediaStatus status) {
        return mediaService.findByTypeAndStatus(type, status).stream()
                .map(mediaService::toDTO)
                .toList();
    }


}

