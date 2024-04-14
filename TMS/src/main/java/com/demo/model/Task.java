package com.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "task")
public class Task implements Comparable<Task> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String dueDate;

    @Column(nullable = false)
    private Boolean completed;

    @Column(nullable = false)
    private String taskCreatedAt;

    @Column(nullable = false)
    private String priority; // New field for priority

    // Constructors, getters, and setters

    public Task() {
    }

    public Task(String title, String description, String dueDate, Boolean completed, String taskCreatedAt, String priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
        this.taskCreatedAt = taskCreatedAt;
        this.priority = priority; // Initialize priority
    }

    // Getters and setters for priority
    
    public String getPriority() {
        return priority;
    }

    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	public String getTaskCreatedAt() {
		return taskCreatedAt;
	}

	public void setTaskCreatedAt(String taskCreatedAt) {
		this.taskCreatedAt = taskCreatedAt;
	}

	public void setPriority(String priority) {
        this.priority = priority;
    }

    // Other getters and setters

    @Override
    public int compareTo(Task otherTask) {
        // Compare tasks based on due date and priority
        int dueDateComparison = this.getDueDate().compareTo(otherTask.getDueDate());
        if (dueDateComparison == 0) {
            // If due dates are the same, compare based on priority
            return this.getPriority().compareTo(otherTask.getPriority());
        }
        return dueDateComparison;
    }

    @Override
    public String toString() {
        return "Task [id=" + id + ", title=" + title + ", description=" + description + ", dueDate=" + dueDate
                + ", completed=" + completed + ", taskCreatedAt=" + taskCreatedAt + ", priority=" + priority + "]";
    }
}
