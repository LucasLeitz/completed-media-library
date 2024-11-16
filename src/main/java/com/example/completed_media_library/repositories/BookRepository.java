package com.example.completed_media_library.repositories;

import com.example.completed_media_library.entities.Book;
import com.example.completed_media_library.entities.TvShow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT book FROM Book book WHERE YEAR(book.completedDate) = :year")
    List<Book> findCompletedItemsByYear(@Param("year") int year);

}