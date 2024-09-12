package com.example.backend;

import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryToDoRepository implements ToDoRepository {

    private final Map<Integer, ToDo> storage = new ConcurrentHashMap<>();
    private int currentId = 1; // Initialize ID counter

    @Override
    public void save(ToDo todo) {
        if (todo.getId() == 0) { // If ID is 0, it means it's a new todo
            todo.setId(currentId++);
        }
        storage.put(todo.getId(), todo);
    }

    @Override
    public Optional<ToDo> findById(int id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public List<ToDo> findAll() {
        return new ArrayList<>(storage.values());
    }

    @Override
    public void deleteById(int id) {
        storage.remove(id);
    }

    @Override
    public void deleteAll() {
        storage.clear();
    }
}
