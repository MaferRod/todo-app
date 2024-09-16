package com.example.backend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ToDoRepository {
    Page<ToDo> findAll(Pageable pageable);

    Optional<ToDo> findById(Long id);

    ToDo save(ToDo toDo);

    void deleteById(Long id);

    Page<ToDo> findByTextContainingIgnoreCase(String text, Pageable pageable);

    Page<ToDo> findByDone(boolean done, Pageable pageable);

    Page<ToDo> findByPriority(ToDo.Priority priority, Pageable pageable);
    Page<ToDo> findByPriorityAndDone(ToDo.Priority priority, Boolean done, Pageable pageable);
    Page<ToDo> findByTextAndPriorityAndDone(String text, ToDo.Priority priority, Boolean done, Pageable pageable);

Page<ToDo> findByTextAndPriority(String text, ToDo.Priority priority, Pageable pageable);

Page<ToDo> findByTextAndDone(String text, Boolean done, Pageable pageable);


    long count();

    boolean existsById(Long id);
    List<ToDo> findAll(); // <-- Add this line
    
}
