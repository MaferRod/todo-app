package com.example.backend;

import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicInteger;

public class ToDo {
    private static final AtomicInteger idCounter = new AtomicInteger(0);

    private int id; // Unique identifier for the ToDo
    private String text; // Required, max length 120 chars
    private LocalDate dueDate; // Optional due date
    private boolean done; // Done/undone flag
    private LocalDate doneDate; // Date when the ToDo is marked as done
    private Priority priority; // Required, can be HIGH, MEDIUM, or LOW
    private LocalDate creationDate; // Creation date

    // Enum for Priority
    public enum Priority {
        HIGH, MEDIUM, LOW
    }

    // Constructor
    public ToDo(String id, String text, LocalDate dueDate, boolean done, LocalDate doneDate, Priority priority, LocalDate creationDate) {
        this.id = idCounter.incrementAndGet();
        this.text = text;
        this.dueDate = dueDate;
        this.done = done;
        this.doneDate = doneDate;
        this.priority = priority;
        this.creationDate = creationDate;
    }

    // Default constructor
    public ToDo() {}

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

    public LocalDate getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(LocalDate doneDate) {
        this.doneDate = doneDate;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public String toString() {
        return "ToDo{" +
                "id='" + id + '\'' +
                ", text='" + text + '\'' +
                ", dueDate=" + dueDate +
                ", done=" + done +
                ", doneDate=" + doneDate +
                ", priority=" + priority +
                ", creationDate=" + creationDate +
                '}';
    }
}
