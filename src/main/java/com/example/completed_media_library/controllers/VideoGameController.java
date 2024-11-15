package com.example.completed_media_library.controllers;

import com.example.completed_media_library.dtos.VideoGameDTO;
import com.example.completed_media_library.entities.VideoGame;
import com.example.completed_media_library.repositories.VideoGameRepository;
import com.example.completed_media_library.services.VideoGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/videogames")
public class VideoGameController {

    @Autowired
    private final VideoGameService videoGameService;

    @Autowired
    private VideoGameRepository videoGameRepository;

    public VideoGameController(VideoGameService videoGameService, VideoGameRepository videoGameRepository) {
        this.videoGameService = videoGameService;
        this.videoGameRepository = videoGameRepository;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideoGame(@PathVariable Long id) {
        videoGameService.deleteVideoGameById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<VideoGameDTO> addVideoGame(@RequestBody VideoGameDTO videoGameDTO) {
        VideoGameDTO savedVideoGame = videoGameService.saveVideoGame(videoGameDTO);
        System.out.println("Completed Date in Controller: " + videoGameDTO.getCompletedDate());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVideoGame);
    }

    @GetMapping
    public List<VideoGame> getAllVideoGames() {
        return videoGameService.getAllVideoGames();
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

}
