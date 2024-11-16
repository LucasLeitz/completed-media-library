package com.example.completed_media_library.controllers;

import com.example.completed_media_library.dtos.MovieDTO;
import com.example.completed_media_library.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        this.movieService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<MovieDTO> addMovie(@RequestBody MovieDTO movieDTO) {
        MovieDTO savedMovie = movieService.save(movieDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
    }

    @GetMapping
    public List<MovieDTO> getAllMovies() {
        return movieService.getAll();
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
    public ResponseEntity<Long> getCompletedMovieCount(@PathVariable int year) {
        long count = movieService.getCompletedItemsForYear(year).size();
        return ResponseEntity.ok(count);
    }

}
