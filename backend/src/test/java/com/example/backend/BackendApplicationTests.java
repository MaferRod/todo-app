package com.example.backend;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private ToDoService toDoService;

    @Test
    void contextLoads() {
        // Check that the application context loads successfully
    }

    @Test
    void testToDoServiceBean() {
        // Check that ToDoService bean is loaded properly
        assertNotNull(toDoService, "The ToDoService bean should not be null.");
    }
}
