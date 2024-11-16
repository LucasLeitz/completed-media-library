package com.example.completed_media_library.services;

import com.example.completed_media_library.exceptions.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public abstract class BaseService<T, D> {

    protected abstract JpaRepository<T, Long> getRepository();

    protected abstract D mapToDTO(T entity);

    protected abstract T mapToEntity(D dto);

    public List<D> getAll() {
        return getRepository().findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public D save(D dto) {
        T entity = mapToEntity(dto);
        T savedEntity = getRepository().save(entity);
        return mapToDTO(savedEntity);
    }

    public void deleteById(Long id) {
        if (!getRepository().existsById(id)) {
            throw new ResourceNotFoundException("Entity with ID " + id + " not found.");
        }
        getRepository().deleteById(id);
    }

    public List<T> getCompletedItemsForYear(int year) {
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);

        return getRepository().findAll().stream()
                .filter(item -> {
                    try {
                        // Assuming your entity has a `getCompletedDate()` method
                        LocalDate completedDate = (LocalDate) item.getClass()
                                .getMethod("getCompletedDate")
                                .invoke(item);

                        return completedDate != null && !completedDate.isBefore(startOfYear) && !completedDate.isAfter(endOfYear);
                    } catch (Exception e) {
                        return false;
                    }
                }).toList();
    }
}
