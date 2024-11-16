package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}