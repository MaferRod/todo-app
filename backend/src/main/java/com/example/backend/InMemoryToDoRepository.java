package com.example.backend;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository // Mark this as a Spring bean
public class InMemoryToDoRepository implements ToDoRepository {

    private Map<Long, ToDo> todoMap = new HashMap<>();
    private long idCounter = 1L;

    @Override
    public Page<ToDo> findAll(Pageable pageable) {
        // Convert map values to list and return paginated result
        List<ToDo> todos = new ArrayList<>(todoMap.values());
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), todos.size());
        return new PageImpl<>(todos.subList(start, end), pageable, todos.size());
    }
    @Override
    public List<ToDo> findAll() {
        return new ArrayList<>(todoMap.values()); // Return all ToDo items
    }

    @Override
    public Optional<ToDo> findById(Long id) {
        return Optional.ofNullable(todoMap.get(id));
    }

    @Override
    public ToDo save(ToDo toDo) {
        if (toDo.getId() == null) {
            toDo.setId(idCounter++);
        }
        todoMap.put(toDo.getId(), toDo);
        return toDo;
    }

    @Override
    public void deleteById(Long id) {
        todoMap.remove(id);
    }

    @Override
    public Page<ToDo> findByTextContainingIgnoreCase(String text, Pageable pageable) {
        List<ToDo> filteredTodos = todoMap.values().stream()
                .filter(todo -> todo.getText().toLowerCase().contains(text.toLowerCase()))
                .collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), filteredTodos.size());
        return new PageImpl<>(filteredTodos.subList(start, end), pageable, filteredTodos.size());
    }

    @Override
public Page<ToDo> findByTextAndPriorityAndDone(String text, ToDo.Priority priority, Boolean done, Pageable pageable) {
    List<ToDo> filteredToDos = todoMap.values().stream()
        .filter(toDo -> toDo.getText().toLowerCase().contains(text.toLowerCase())
                     && toDo.getPriority() == priority
                     && toDo.getDone().equals(done))
        .collect(Collectors.toList());

    return getPageFromList(filteredToDos, pageable);
}
@Override
public Page<ToDo> findByTextAndPriority(String text, ToDo.Priority priority, Pageable pageable) {
    List<ToDo> filteredToDos = todoMap.values().stream()
        .filter(toDo -> toDo.getText().toLowerCase().contains(text.toLowerCase())
                     && toDo.getPriority() == priority)
        .collect(Collectors.toList());

    return getPageFromList(filteredToDos, pageable);
}
@Override
public Page<ToDo> findByTextAndDone(String text, Boolean done, Pageable pageable) {
    List<ToDo> filteredToDos = todoMap.values().stream()
        .filter(toDo -> toDo.getText().toLowerCase().contains(text.toLowerCase())
                     && toDo.getDone().equals(done))
        .collect(Collectors.toList());

    return getPageFromList(filteredToDos, pageable);
}

    @Override
    public Page<ToDo> findByDone(boolean done, Pageable pageable) {
        List<ToDo> filteredTodos = todoMap.values().stream()
                .filter(todo -> todo.getDone() == done)
                .collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), filteredTodos.size());
        return new PageImpl<>(filteredTodos.subList(start, end), pageable, filteredTodos.size());
    }

    @Override
    public Page<ToDo> findByPriority(ToDo.Priority priority, Pageable pageable) {
        List<ToDo> filteredTodos = todoMap.values().stream()
                .filter(todo -> todo.getPriority() == priority)
                .collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), filteredTodos.size());
        return new PageImpl<>(filteredTodos.subList(start, end), pageable, filteredTodos.size());
    }

    @Override
    public boolean existsById(Long id) {
        return todoMap.containsKey(id);
    }

    @Override
    public long count() {
        return todoMap.size();
    }

    @Override
public Page<ToDo> findByPriorityAndDone(ToDo.Priority priority, Boolean done, Pageable pageable) {
    List<ToDo> filteredToDos = todoMap.values().stream()
        .filter(toDo -> toDo.getPriority() == priority && toDo.getDone().equals(done))
        .collect(Collectors.toList());

    return getPageFromList(filteredToDos, pageable);  // Paginate the filtered list
}

// Helper method to paginate a list
private Page<ToDo> getPageFromList(List<ToDo> list, Pageable pageable) {
    int start = (int) pageable.getOffset();
    int end = Math.min((start + pageable.getPageSize()), list.size());
    return new PageImpl<>(list.subList(start, end), pageable, list.size());
}



}
