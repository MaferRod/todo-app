package com.example.backend;

public class AverageCompletionTimeMetrics {
    private String overallAverage;
    private String highPriorityAverage;
    private String mediumPriorityAverage;
    private String lowPriorityAverage;

    public AverageCompletionTimeMetrics(String overallAverage, String highPriorityAverage, String mediumPriorityAverage, String lowPriorityAverage) {
        this.overallAverage = overallAverage;
        this.highPriorityAverage = highPriorityAverage;
        this.mediumPriorityAverage = mediumPriorityAverage;
        this.lowPriorityAverage = lowPriorityAverage;
    }

    // Getters
    public String getOverallAverage() { return overallAverage; }
    public String getHighPriorityAverage() { return highPriorityAverage; }
    public String getMediumPriorityAverage() { return mediumPriorityAverage; }
    public String getLowPriorityAverage() { return lowPriorityAverage; }
}
