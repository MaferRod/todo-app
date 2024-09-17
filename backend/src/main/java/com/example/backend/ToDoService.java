package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    public Page<ToDo> getAllToDos(String text, ToDo.Priority priority, Boolean done, Pageable pageable) {
        // Existing logic for fetching todos
        if (text != null && !text.isEmpty() && priority != null && done != null) {
            return toDoRepository.findByTextAndPriorityAndDone(text, priority, done, pageable);
        } else if (priority != null && done != null) {
            return toDoRepository.findByPriorityAndDone(priority, done, pageable);
        } else if (text != null && !text.isEmpty() && priority != null) {
            return toDoRepository.findByTextAndPriority(text, priority, pageable);
        } else if (text != null && !text.isEmpty() && done != null) {
            return toDoRepository.findByTextAndDone(text, done, pageable);
        } else if (text != null && !text.isEmpty()) {
            return toDoRepository.findByTextContainingIgnoreCase(text, pageable);
        } else if (priority != null) {
            return toDoRepository.findByPriority(priority, pageable);
        } else if (done != null) {
            return toDoRepository.findByDone(done, pageable);
        } else {
            return toDoRepository.findAll(pageable);
        }
    }
    
    
    public List<ToDo> customSortByPriority(List<ToDo> todos, String order) {
        Comparator<ToDo> comparator = Comparator.comparing(
            toDo -> toDo.getPriority() == ToDo.Priority.HIGH ? 1 :
                    toDo.getPriority() == ToDo.Priority.MEDIUM ? 2 : 3
        );
    
        if ("desc".equalsIgnoreCase(order)) {
            comparator = comparator.reversed();
        }
    
        return todos.stream().sorted(comparator).collect(Collectors.toList());
    }
    

    public List<ToDo> customSortByDueDate(List<ToDo> todos, String order) {
        Comparator<ToDo> comparator = Comparator.comparing(
            toDo -> toDo.getDueDate() != null ? toDo.getDueDate() : LocalDate.MAX
        );
    
        if ("desc".equalsIgnoreCase(order)) {
            comparator = comparator.reversed();
        }
    
        return todos.stream().sorted(comparator).collect(Collectors.toList());
    }
    

    // Get a specific ToDo by id
    public Optional<ToDo> getToDoById(Long id) {
        return toDoRepository.findById(id);
    }

    public ToDo createOrUpdateToDo(ToDo toDo) {
    if (toDo.getCreationDate() == null) {
        toDo.setCreationDate(LocalDateTime.now());  // Store both date and time
        System.out.println("Task created on: " + toDo.getCreationDate());
    }
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
                toDo.setDoneDate(LocalDateTime.now());  // Store both date and time
                System.out.println("Task marked as done on: " + toDo.getDoneDate());
                return toDoRepository.save(toDo);
            }
            return toDo;
        } else {
            throw new ToDoNotFoundException(id);
        }
    }
    

// Mark a task as undone
public ToDo markAsUndone(Long id) {
    Optional<ToDo> optionalToDo = toDoRepository.findById(id);

    if (optionalToDo.isPresent()) {
        ToDo toDo = optionalToDo.get();
        if (toDo.getDone()) {
            toDo.setDone(false); // Mark as undone
            toDo.setDoneDate(null); // Clear done date
            System.out.println("Task marked as undone: " + toDo.getId());
            return toDoRepository.save(toDo);
        }
        System.out.println("Task was already marked as undone: " + toDo.getId());
        return toDo; // Already undone
    } else {
        throw new ToDoNotFoundException(id); // Throw exception if not found
    }
}

    

    // Custom exception for ToDo not found cases
    public static class ToDoNotFoundException extends RuntimeException {
        public ToDoNotFoundException(Long id) {
            super("ToDo with id " + id + " not found");
        }
    }
    
    public String formatDuration(long seconds) {
        long days = TimeUnit.SECONDS.toDays(seconds);
        long hours = TimeUnit.SECONDS.toHours(seconds) - (days * 24);
        long minutes = TimeUnit.SECONDS.toMinutes(seconds) - (TimeUnit.SECONDS.toHours(seconds) * 60);
        long secs = seconds - (TimeUnit.SECONDS.toMinutes(seconds) * 60);
    
        if (days > 0) {
            return String.format("%d days, %d hours, %d minutes", days, hours, minutes);
        } else if (hours > 0) {
            return String.format("%d hours, %d minutes", hours, minutes);
        } else if (minutes > 0) {
            return String.format("%d minutes", minutes);
        } else {
            return String.format("%d seconds", secs);
        }
    }
    
    
    public AverageCompletionTimeMetrics calculateAverageCompletionTime() {
        List<ToDo> allToDos = toDoRepository.findAll();
        
        long totalSeconds = 0;
        int totalCompleted = 0;
    
        long highPriorityTotalSeconds = 0;
        long mediumPriorityTotalSeconds = 0;
        long lowPriorityTotalSeconds = 0;
    
        int highPriorityCount = 0;
        int mediumPriorityCount = 0;
        int lowPriorityCount = 0;
    
        for (ToDo toDo : allToDos) {
            if (toDo.getDone() && toDo.getCreationDate() != null && toDo.getDoneDate() != null) {
                Duration duration = Duration.between(toDo.getCreationDate(), toDo.getDoneDate());
                long seconds = duration.getSeconds();
    
                totalSeconds += seconds;
                totalCompleted++;
    
                switch (toDo.getPriority()) {
                    case HIGH:
                        highPriorityTotalSeconds += seconds;
                        highPriorityCount++;
                        break;
                    case MEDIUM:
                        mediumPriorityTotalSeconds += seconds;
                        mediumPriorityCount++;
                        break;
                    case LOW:
                        lowPriorityTotalSeconds += seconds;
                        lowPriorityCount++;
                        break;
                }
            }
        }
    
        String overallAverage = totalCompleted > 0 ? formatDuration(totalSeconds / totalCompleted) : "0 seconds";
        String highPriorityAverage = highPriorityCount > 0 ? formatDuration(highPriorityTotalSeconds / highPriorityCount) : "0 seconds";
        String mediumPriorityAverage = mediumPriorityCount > 0 ? formatDuration(mediumPriorityTotalSeconds / mediumPriorityCount) : "0 seconds";
        String lowPriorityAverage = lowPriorityCount > 0 ? formatDuration(lowPriorityTotalSeconds / lowPriorityCount) : "0 seconds";
    
        return new AverageCompletionTimeMetrics(overallAverage, highPriorityAverage, mediumPriorityAverage, lowPriorityAverage);
    }





    public List<ToDo> customSort(List<ToDo> todos, String string, String string2, Object object, Object object2) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'customSort'");
    }
    

}
