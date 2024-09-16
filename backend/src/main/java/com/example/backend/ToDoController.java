package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/todos")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
public Page<ToDo> getAllToDos(
    @RequestParam(required = false) String text,
    @RequestParam(required = false) ToDo.Priority priority,
    @RequestParam(required = false) Boolean done,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) String sortBy,
    @RequestParam(required = false) String order
) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(order != null ? order : "asc"), sortBy != null ? sortBy : "id"));

    // Fetch the filtered todos using the service
    return toDoService.getAllToDos(text, priority, done, pageable);
}

@GetMapping("/metrics")
    public AverageCompletionTimeMetrics getAverageCompletionTimeMetrics() {
        return toDoService.calculateAverageCompletionTime();
    }
    @GetMapping("/{id}")
    public Optional<ToDo> getToDoById(@PathVariable Long id) {
        return toDoService.getToDoById(id);
    }

    @PostMapping
    public ToDo createToDo(@RequestBody ToDo toDo) {
        return toDoService.createOrUpdateToDo(toDo);
    }

    @PutMapping("/{id}")
    public ToDo updateToDo(@PathVariable Long id, @RequestBody ToDo toDo) {
        toDo.setId(id);
        return toDoService.createOrUpdateToDo(toDo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDoById(@PathVariable Long id) {
        toDoService.deleteToDoById(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }

    @PostMapping("/{id}/done")
    public ToDo markAsDone(@PathVariable Long id) {
        return toDoService.markAsDone(id);
    }

    @PutMapping("/{id}/undone")
    public ToDo markAsUndone(@PathVariable Long id) {
        return toDoService.markAsUndone(id);
    }
}
