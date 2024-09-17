package com.example.backend;

import java.util.List;
import java.util.Optional;
import java.util.Comparator;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/todos")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public List<ToDo> getAllToDos(
        @RequestParam(required = false) String text,
        @RequestParam(required = false) ToDo.Priority priority,
        @RequestParam(required = false) Boolean done,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) List<String> sortBy,
        @RequestParam(required = false) List<String> order
    ) {
        // Log the received sorting parameters
        System.out.println("Received sortBy: " + sortBy + " and order: " + order);

        Pageable pageable = PageRequest.of(page, size);
        List<ToDo> todos = toDoService.getAllToDos(text, priority, done, pageable).getContent();

        // Apply custom sorting logic
        List<ToDo> sortedTodos = customSort(todos, sortBy, order);

        sortedTodos.forEach(todo -> {
            System.out.println("ToDo: " + todo.getText() + ", Priority: " + todo.getPriority() + ", DueDate: " + todo.getDueDate());
        });

        return sortedTodos;
    }

    // Custom sorting method
public List<ToDo> customSort(List<ToDo> todos, List<String> sortBy, List<String> order) {
    if (sortBy == null || order == null || sortBy.size() != order.size()) {
        return todos;  // No sorting provided
    }

    // Sorting by priority first
    Comparator<ToDo> comparator = (todo1, todo2) -> 0;

    if (sortBy.get(0).equals("priority")) {
        comparator = Comparator.comparing((ToDo todo) -> {
            // Sort by Priority with HIGH first, MEDIUM second, LOW last
            return todo.getPriority() == ToDo.Priority.HIGH ? 1 :
                   todo.getPriority() == ToDo.Priority.MEDIUM ? 2 : 3;
        }, order.get(0).equals("asc") ? Comparator.naturalOrder() : Comparator.reverseOrder());
    }

    // Return sorted list
    return todos.stream().sorted(comparator).collect(Collectors.toList());
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
    public void deleteToDoById(@PathVariable Long id) {
        toDoService.deleteToDoById(id);
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
