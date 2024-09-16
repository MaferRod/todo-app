package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    public Page<ToDo> getAllToDos(String text, ToDo.Priority priority, Boolean done, Pageable pageable) {
        if (text != null && !text.isEmpty()) {
            return toDoRepository.findByTextContainingIgnoreCase(text, pageable);
        } else if (priority != null) {
            return toDoRepository.findByPriority(priority, pageable);
        } else if (done != null) {
            return toDoRepository.findByDone(done, pageable);
        } else {
            return toDoRepository.findAll(pageable);
        }
    }
    


    // Get a specific ToDo by id
    public Optional<ToDo> getToDoById(Long id) {
        return toDoRepository.findById(id);
    }

    // Create or update a ToDo
    public ToDo createOrUpdateToDo(ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    // Delete a ToDo by id
    public void deleteToDoById(Long id) {
        if (!toDoRepository.existsById(id)) {
            throw new ToDoNotFoundException(id);
        }
        toDoRepository.deleteById(id);
    }

    public ToDo markAsDone(Long id) {
        Optional<ToDo> optionalToDo = toDoRepository.findById(id);
    
        if (optionalToDo.isPresent()) {
            ToDo toDo = optionalToDo.get();
            if (!toDo.getDone()) {
                toDo.setDone(true);
                toDo.setDoneDate(LocalDate.now());
                return toDoRepository.save(toDo);
            }
            return toDo; // Already marked as done, no changes needed
        } else {
            throw new ToDoNotFoundException(id); // Throw custom exception if not found
        }
    }
    

    // Mark a ToDo as undone
    public ToDo markAsUndone(Long id) {
        Optional<ToDo> optionalToDo = toDoRepository.findById(id);

        if (optionalToDo.isPresent()) {
            ToDo toDo = optionalToDo.get();
            if (toDo.getDone()) {
                toDo.setDone(false); // Mark as undone
                toDo.setDoneDate(null); // Clear the done date
                return toDoRepository.save(toDo); // Save the updated todo
            }
            return toDo; // Return if it's already undone
        } else {
            throw new ToDoNotFoundException(id); // Throw custom exception if not found
        }
    }

    // Custom exception for ToDo not found cases
    public static class ToDoNotFoundException extends RuntimeException {
        public ToDoNotFoundException(Long id) {
            super("ToDo with id " + id + " not found");
        }
    }
}
