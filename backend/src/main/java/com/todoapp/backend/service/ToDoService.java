package com.todoapp.backend.service;

import com.todoapp.backend.model.ToDo;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;
public class ToDoService {
    private final Map<String, ToDo> todos = new HashMap<>();

    public List<ToDo> getAllToDos() {
        return new ArrayList<>(todos.values());
    }

    public void addToDo(ToDo todo) {
        todos.put(todo.getId(), todo);
    }

    public Optional<ToDo> getToDoById(String id) {
        return Optional.ofNullable(todos.get(id));
    }

    public void updateToDo(String id, ToDo updatedToDo) {
        todos.put(id, updatedToDo);
    }

    public void markAsDone(String id) {
        ToDo todo = todos.get(id);
        if (todo != null && !todo.isDone()) {
            todo.setDone(true);
            todo.setDoneDate(LocalDate.now());
        }
    }

    public void markAsUndone(String id) {
        ToDo todo = todos.get(id);
        if (todo != null && todo.isDone()) {
            todo.setDone(false);
            todo.setDoneDate(null);
        }
    }


}
