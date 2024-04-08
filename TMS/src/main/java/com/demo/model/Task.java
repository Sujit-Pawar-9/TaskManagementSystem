package com.demo.model;

import javax.persistence.*;


@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    
    private String task;

    private Boolean completed;

    private String taskCreatedAt;

    // Constructors, getters, and setters

    public Task() {
    }

    public Task(String task, Boolean completed, String taskCreatedAt) {
        this.task = task;
        this.completed = completed;
        this.taskCreatedAt = taskCreatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
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

	@Override
	public String toString() {
		return "Task [id=" + id + ", task=" + task + ", completed=" + completed + ", taskCreatedAt=" + taskCreatedAt
				+ "]";
	}
    
}

