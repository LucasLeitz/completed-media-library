package com.example.completed_media_library.services;

import com.example.completed_media_library.dtos.BookDTO;
import com.example.completed_media_library.entities.Book;
import com.example.completed_media_library.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService extends BaseService<Book, BookDTO> {

    @Autowired
    private BookRepository bookRepository;

    @Override
    protected BookRepository getRepository() {
        return bookRepository;
    }

    @Override
    protected BookDTO mapToDTO(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setImageUrl(book.getImageUrl());
        dto.setCompletedDate(book.getCompletedDate());
        return dto;
    }

    @Override
    protected Book mapToEntity(BookDTO dto) {
        Book book = new Book();
        book.setId(dto.getId());
        book.setTitle(dto.getTitle());
        book.setImageUrl(dto.getImageUrl());
        book.setCompletedDate(dto.getCompletedDate());
        return book;
    }
}
