package com.todoapp.backend.controller;

import com.todoapp.backend.model.ToDo;
import com.todoapp.backend.service.ToDoService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor // Use Lombok to generate the constructor
public class ToDoController {

    private final ToDoService toDoService;

    @GetMapping
    public List<ToDo> getToDos() {
        return toDoService.getAllToDos();
    }

    @PostMapping
    public ResponseEntity<Void> createToDo(@Valid @RequestBody ToDo todo) {
        toDoService.addToDo(todo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateToDo(@PathVariable String id, @Valid @RequestBody ToDo updatedToDo) {
        try {
            toDoService.updateToDo(id, updatedToDo);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/done")
    public ResponseEntity<Void> markToDoAsDone(@PathVariable String id) {
        try {
            toDoService.markAsDone(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/undone")
    public ResponseEntity<Void> markToDoAsUndone(@PathVariable String id) {
        try {
            toDoService.markAsUndone(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}