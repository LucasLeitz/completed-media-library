package com.example.completed_media_library.controllers;

import com.example.completed_media_library.dtos.TvShowDTO;
import com.example.completed_media_library.services.TvShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tvshows")
public class TvShowController {

    @Autowired
    private final TvShowService tvShowService;

    public TvShowController(TvShowService tvShowService) {
        this.tvShowService = tvShowService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTvShow(@PathVariable Long id) {
        this.tvShowService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<TvShowDTO> addTvShow(@RequestBody TvShowDTO tvShowDTO) {
        TvShowDTO savedTvShow = tvShowService.save(tvShowDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTvShow);
    }

    @GetMapping
    public List<TvShowDTO> getAllTvShows() {
        return tvShowService.getAll();
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

    @GetMapping("/completed/count/{year}")
    public ResponseEntity<Long> getCompletedTvShowCount(@PathVariable int year) {
        long count = tvShowService.getCompletedItemsForYear(year).size();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TvShowDTO> getTvShowById(@PathVariable Long id) {
        TvShowDTO tvShowDTO = tvShowService.findById(id);
        if (tvShowDTO == null) {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
        return ResponseEntity.ok(tvShowDTO); // Return 200 with the DTO
    }

    @PutMapping("/{id}")
    public ResponseEntity<TvShowDTO> updateTvShow(
            @PathVariable Long id,
            @RequestBody TvShowDTO tvShowDTO) {
        TvShowDTO updatedTvShow = tvShowService.update(id, tvShowDTO);
        return ResponseEntity.ok(updatedTvShow);
    }

}