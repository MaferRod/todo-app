package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ToDoService {

    private final ToDoRepository repository;

    @Autowired
    public ToDoService(ToDoRepository repository) {
        this.repository = repository;
    }

    public List<ToDo> getTodos(String name, Boolean done, ToDo.Priority priority, String sortBy) {
        return repository.findAll().stream()
            .filter(todo -> name == null || todo.getText().contains(name))
            .filter(todo -> done == null || todo.isDone() == done)
            .filter(todo -> priority == null || todo.getPriority() == priority)
            .sorted(getComparator(sortBy))
            .collect(Collectors.toList());
    }

    public void createTodo(ToDo todo) {
        todo.setCreationDate(LocalDateTime.now()); // Use LocalDateTime instead of LocalDate
        repository.save(todo);
    }

    public void updateTodo(int id, ToDo updatedTodo) {
        ToDo existingTodo = repository.findById(id).orElseThrow();
        existingTodo.setText(updatedTodo.getText());
        existingTodo.setPriority(updatedTodo.getPriority());
        existingTodo.setDueDate(updatedTodo.getDueDate());
        repository.save(existingTodo);
    }

    public void markAsDone(int id) {
        ToDo todo = repository.findById(id).orElseThrow();
        if (!todo.isDone()) {
            todo.setDone(true);
            todo.setDoneDate(LocalDateTime.now()); // Use LocalDateTime instead of LocalDate
            repository.save(todo);
        }
    }

    public void markAsUndone(int id) {
        ToDo todo = repository.findById(id).orElseThrow();
        if (todo.isDone()) {
            todo.setDone(false);
            todo.setDoneDate(null);
            repository.save(todo);
        }
    }

    private Comparator<ToDo> getComparator(String sortBy) {
        if ("priority".equals(sortBy)) {
            return Comparator.comparing(ToDo::getPriority);
        } else if ("dueDate".equals(sortBy)) {
            return Comparator.comparing(ToDo::getDueDate);
        }
        return Comparator.comparing(ToDo::getCreationDate);
    }
}
