package com.demo.service;

import com.demo.model.Task;

import java.util.List;

public interface TaskService {
	Task createTask(Task task);

	List<Task> getAllTasks();

//    ApiResponse getTaskById(Integer taskId);
//
//    List<Task> getAllTasks(Long userId);
//
//    ApiResponse updateTask(Task task, Integer id);
//
//    public void deleteTask(Integer id);
//
//    ApiResponse doneTask(Integer id);
//
//    ApiResponse pendingTask(Integer id);

	
}
