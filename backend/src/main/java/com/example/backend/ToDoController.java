package com.example.backend;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
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

    // GET endpoint for fetching todos
@GetMapping
public List<ToDo> getAllToDos(
    @RequestParam(required = false) String text,
    @RequestParam(required = false) ToDo.Priority priority,
    @RequestParam(required = false) Boolean done,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) String sortBy,  // Sorting criteria (priority/dueDate)
    @RequestParam(required = false) String order    // Order (asc/desc)
) {
    // Log the received sorting parameters
    System.out.println("Sorting by: " + sortBy + " in order: " + order);

    Pageable pageable = PageRequest.of(page, size);
    List<ToDo> todos = toDoService.getAllToDos(text, priority, done, pageable).getContent();

    // Apply sorting based on the value of `sortBy`
    List<ToDo> sortedTodos;
    if ("priority".equals(sortBy)) {
        sortedTodos = toDoService.customSortByPriority(todos, order);
    } else if ("dueDate".equals(sortBy)) {
        sortedTodos = toDoService.customSortByDueDate(todos, order);
    } else {
        // Default case if no sortBy is provided, just return the original list
        sortedTodos = todos;
    }

    // Log todos after sorting
    System.out.println("Sorted todos:");
    sortedTodos.forEach(todo -> {
        System.out.println("ToDo: " + todo.getText() + ", Priority: " + todo.getPriority() + ", DueDate: " + todo.getDueDate());
    });

    return sortedTodos;
}


    @GetMapping("/sortByPriority")
    public List<ToDo> getSortedByPriority(
        @RequestParam(required = false) String text,
        @RequestParam(required = false) ToDo.Priority priority,
        @RequestParam(required = false) Boolean done,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "asc") String order // sorting order asc/desc
    ) {
        
        Pageable pageable = PageRequest.of(page, size);
        List<ToDo> todos = toDoService.getAllToDos(text, priority, done, pageable).getContent();

        // Sort by priority
        List<ToDo> sortedTodos = toDoService.customSortByPriority(todos, order);

        sortedTodos.forEach(todo -> {
            System.out.println("ToDo: " + todo.getText() + ", Priority: " + todo.getPriority());
        });

        return sortedTodos;
    }

    // NEW: Sort by due date
    @GetMapping("/sortByDueDate")
    public List<ToDo> getSortedByDueDate(
        @RequestParam(required = false) String text,
        @RequestParam(required = false) ToDo.Priority priority,
        @RequestParam(required = false) Boolean done,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "asc") String order // sorting order asc/desc
    ) {
        Pageable pageable = PageRequest.of(page, size);
        List<ToDo> todos = toDoService.getAllToDos(text, priority, done, pageable).getContent();

        // Sort by due date
        List<ToDo> sortedTodos = toDoService.customSortByDueDate(todos, order);

        sortedTodos.forEach(todo -> {
            System.out.println("ToDo: " + todo.getText() + ", DueDate: " + todo.getDueDate());
        });

        return sortedTodos;
    }

    public List<ToDo> customSort(List<ToDo> todos, List<String> sortBy, List<String> order) {
        if (sortBy == null || order == null || sortBy.size() != order.size()) {
            return todos;  // No sorting provided
        }
    
        // Sorting by priority or dueDate
        Comparator<ToDo> comparator = (todo1, todo2) -> 0;
    
        // Log the sorting order
        System.out.println("Sorting by: " + sortBy + ", Order: " + order);
    
        // Handle sorting by priority first
        if (sortBy.get(0).equals("priority")) {
            comparator = Comparator.comparing((ToDo todo) -> {
                return todo.getPriority() == ToDo.Priority.HIGH ? 1 :
                       todo.getPriority() == ToDo.Priority.MEDIUM ? 2 : 3;
            }, order.get(0).equals("asc") ? Comparator.naturalOrder() : Comparator.reverseOrder());
        }
    
        // Handle sorting by dueDate if provided
        if (sortBy.size() > 1 && sortBy.get(1).equals("dueDate")) {
            comparator = comparator.thenComparing((ToDo todo) -> {
                return todo.getDueDate() != null ? todo.getDueDate() : LocalDate.MAX;
            }, order.get(1).equals("asc") ? Comparator.naturalOrder() : Comparator.reverseOrder());
        }
    
        return todos.stream().sorted(comparator).collect(Collectors.toList());
    }
    

    public List<ToDo> customSortByDueDate(List<ToDo> todos, String order) {
        Comparator<ToDo> comparator = Comparator.comparing(
            toDo -> toDo.getDueDate() != null ? toDo.getDueDate() : LocalDate.MAX // Null-safe comparison
        );
    
        if ("desc".equalsIgnoreCase(order)) {
            comparator = comparator.reversed();
        }
    
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
