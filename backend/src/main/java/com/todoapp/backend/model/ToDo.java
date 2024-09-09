package com.todoapp.backend.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.UUID;

public class ToDo {
    private String id;
    
    @NotBlank
    @Size(max = 120)
    private String text;
    private LocalDate dueDate;
    private boolean done;
    private LocalDate doneDate;
    
    @NotBlank
    private String priority;
    private LocalDate creationDate;

    // Constructor
    public ToDo() {
        this.id = UUID.randomUUID().toString();  // Genera un ID único automáticamente
        this.creationDate = LocalDate.now();     // Establece la fecha de creación a la fecha actual
        this.done = false;                       // Inicializa la tarea como no hecha
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public LocalDate getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(LocalDate doneDate) {
        this.doneDate = doneDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}