package com.example.completed_media_library.controllers;

import com.example.completed_media_library.dtos.BacklogDTO;
import com.example.completed_media_library.entities.Backlog;
import com.example.completed_media_library.services.BacklogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/backlogs")
public class BacklogController {

    @Autowired
    private final BacklogService backlogService;

    public BacklogController(BacklogService backlogService) {
        this.backlogService = backlogService;
    }

    @PostMapping
    public ResponseEntity<BacklogDTO> addBacklog(@RequestBody BacklogDTO backlogDTO) {
        BacklogDTO savedBacklog = backlogService.save(backlogDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBacklog);
    }

    @GetMapping
    public ResponseEntity<List<Backlog>> getBacklogByType(@RequestParam String type) {
        List<Backlog> backlogs = backlogService.getBacklogByType(type);
        return ResponseEntity.ok(backlogs);
    }

    @GetMapping("/searchWikipediaImage")
    @SuppressWarnings("unchecked")
    public Map<String, String> searchWikipediaImage(@RequestParam String title) {
        String wikipediaApiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + title;

        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> responseMap = new HashMap<>();
        try {
            // Fetch data from Wikipedia API
            Map<String, Object> response = restTemplate.getForObject(wikipediaApiUrl, Map.class);

            // Extract the thumbnail image URL if available
            if (response != null && response.containsKey("thumbnail")) {
                Map<String, Object> thumbnail = (Map<String, Object>) response.get("thumbnail");
                String imageUrl = (String) thumbnail.get("source");
                responseMap.put("imageUrl", imageUrl);  // Wrap the URL in a JSON object
            } else {
                responseMap.put("imageUrl", null); // No image found
            }
        } catch (Exception e) {
            responseMap.put("imageUrl", null); // Error case
        }
        return responseMap;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBacklog(@PathVariable Long id) {
        this.backlogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
