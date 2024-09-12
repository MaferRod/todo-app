package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:8080") // Allow requests from this origin
public class ToDoController {

    private final ToDoService service;

    @Autowired
    public ToDoController(ToDoService service) {
        this.service = service;
    }

    @GetMapping
    public List<ToDo> getTodos(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Boolean done,
            @RequestParam(required = false) ToDo.Priority priority,
            @RequestParam(required = false) String sortBy) {
        return service.getTodos(name, done, priority, sortBy);
    }

    @PostMapping
    public ResponseEntity<ToDo> createTodo(@RequestBody ToDo todo) {
        service.createTodo(todo);
        return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable int id, @RequestBody ToDo updatedTodo) {
        service.updateTodo(id, updatedTodo);
        return ResponseEntity.ok(updatedTodo);
    }

    @PostMapping("/{id}/done")
    public ResponseEntity<Void> markAsDone(@PathVariable int id) {
        service.markAsDone(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/undone")
    public ResponseEntity<Void> markAsUndone(@PathVariable int id) {
        service.markAsUndone(id);
        return ResponseEntity.noContent().build();
    }
}
