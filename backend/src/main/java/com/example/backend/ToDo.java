package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class ToDo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String text; // Required, max length 120 chars
    
    private LocalDate dueDate; // Optional due date
    
    private boolean done; // Done/undone flag
    
    private LocalDateTime doneDate; // Date when the ToDo is marked as done
    
    private Priority priority; // Required, can be HIGH, MEDIUM, or LOW
    
    private LocalDateTime creationDate; // Creation date

    // Enum for Priority
    public enum Priority {
        High, Medium, Low
    }

    // Default constructor
    public ToDo() {}

    // Parameterized constructor
    public ToDo(String text, LocalDate dueDate, boolean done, LocalDateTime doneDate, Priority priority, LocalDateTime creationDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.done = done;
        this.doneDate = doneDate;
        this.priority = priority;
        this.creationDate = creationDate;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public LocalDateTime getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(LocalDateTime doneDate) {
        this.doneDate = doneDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public String toString() {
        return "ToDo{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", dueDate=" + dueDate +
                ", done=" + done +
                ", doneDate=" + doneDate +
                ", priority=" + priority +
                ", creationDate=" + creationDate +
                '}';
    }
}
