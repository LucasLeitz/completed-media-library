package com.example.completed_media_library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true); // Allow cookies or authorization headers
        config.addAllowedOrigin("http://localhost:4200"); // Angular frontend origin
        config.addAllowedHeader("*"); // Allow all headers
        config.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)

        source.registerCorsConfiguration("/**", config); // Apply CORS config to all endpoints
        return new CorsFilter(source);
    }
}

