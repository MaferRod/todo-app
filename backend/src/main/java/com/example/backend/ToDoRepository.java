package com.example.backend;

import java.util.List;
import java.util.Optional;

public interface ToDoRepository {
    // CRUD operations
    void save(ToDo todo);
    Optional<ToDo> findById(int id);
    List<ToDo> findAll();
    void deleteById(int id);
    void deleteAll();
}
