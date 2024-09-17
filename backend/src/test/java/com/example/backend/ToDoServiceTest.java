package com.example.backend;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ToDoServiceTest {

    @InjectMocks
    private ToDoService toDoService;

    @Mock
    private ToDoRepository toDoRepository;

    private ToDo task1;
    private ToDo task2;
    private ToDo task3;

    @Before
    public void setup() {
        // Initialize mockito annotations
        MockitoAnnotations.openMocks(this);

        task1 = new ToDo();
        task1.setId(1L);
        task1.setText("Task 1");
        task1.setDone(false);
        task1.setDueDate(LocalDate.of(2024, 9, 24));

        task2 = new ToDo();
        task2.setId(2L);
        task2.setText("Task 2");
        task2.setDone(true); // Marked as done
        task2.setDueDate(LocalDate.of(2024, 9, 27));
        task2.setDoneDate(LocalDateTime.now());

        task3 = new ToDo();
        task3.setId(3L);
        task3.setText("Task 3");
        task3.setDone(false);
        task3.setDueDate(LocalDate.of(2024, 10, 9));
    }

    @Test
    public void testCustomSortByDueDate_Asc() {
        List<ToDo> todos = Arrays.asList(task1, task2, task3);
        List<ToDo> sortedTodos = toDoService.customSortByDueDate(todos, "asc");

        // Check that undone tasks come before done tasks, and sorted by due date
        assertEquals(task1, sortedTodos.get(0)); // Task 1 is first
        assertEquals(task3, sortedTodos.get(1)); // Task 3 is second
        assertEquals(task2, sortedTodos.get(2)); // Task 2 is last because it's done
    }

    @Test
    public void testCustomSortByDueDate_Desc() {
        List<ToDo> todos = Arrays.asList(task1, task2, task3);
        List<ToDo> sortedTodos = toDoService.customSortByDueDate(todos, "desc");

        // Check that undone tasks come before done tasks, and sorted by due date
        assertEquals(task3, sortedTodos.get(0)); // Task 3 is first
        assertEquals(task1, sortedTodos.get(1)); // Task 1 is second
        assertEquals(task2, sortedTodos.get(2)); // Task 2 is last because it's done
    }

    @Test
    public void testCustomSortByPriority() {
        task1.setPriority(ToDo.Priority.LOW);
        task2.setPriority(ToDo.Priority.MEDIUM);
        task3.setPriority(ToDo.Priority.HIGH);

        List<ToDo> todos = Arrays.asList(task1, task2, task3);
        List<ToDo> sortedTodos = toDoService.customSortByPriority(todos, "asc");

        // Check that priority sorting works, and done tasks are moved to the bottom
        assertEquals(task3, sortedTodos.get(0)); // HIGH priority task first
        assertEquals(task2, sortedTodos.get(1)); // MEDIUM priority task second
        assertEquals(task1, sortedTodos.get(2)); // LOW priority task last
    }

    @Test
    public void testMarkAsDone() {
        ToDo task = new ToDo();
        task.setId(4L); // Set an ID for mocking
        task.setText("New Task");
        task.setDone(false);

        // Mock repository behavior
        when(toDoRepository.findById(task.getId())).thenReturn(Optional.of(task));
        when(toDoRepository.save(any(ToDo.class))).thenReturn(task);

        ToDo result = toDoService.markAsDone(task.getId());
        assertTrue(result.getDone()); // Task should be marked as done
        assertNotNull(result.getDoneDate()); // Done date should be set

        // Verify repository save was called
        verify(toDoRepository, times(1)).save(task);
    }

    @Test
    public void testMarkAsUndone() {
        ToDo task = new ToDo();
        task.setId(4L); // Set an ID for mocking
        task.setText("New Task");
        task.setDone(true);
        task.setDoneDate(LocalDateTime.now());

        // Mock repository behavior
        when(toDoRepository.findById(task.getId())).thenReturn(Optional.of(task));
        when(toDoRepository.save(any(ToDo.class))).thenReturn(task);

        ToDo result = toDoService.markAsUndone(task.getId());
        assertFalse(result.getDone()); // Task should be marked as undone
        assertNull(result.getDoneDate()); // Done date should be cleared

        // Verify repository save was called
        verify(toDoRepository, times(1)).save(task);
    }
}
