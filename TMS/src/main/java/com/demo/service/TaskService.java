package com.demo.service;

import com.demo.model.Task;

import java.util.List;

public interface TaskService {
	Task createTask(Task task);

	List<Task> getAllTasks();

	void deleteTask(Integer id);

	Task getTaskById(Integer id);

	Task updateTask(Task updatedTask);

	void markTaskAsDone(Integer id);

	List<Task> findAllByOrderByDueDateAsc();

	List<Task> findAllByOrderByDueDateDesc();

	List<Task> getAllTasksForUser(Long userId);

	List<Task> getAllTasksForUserSortedByDueDate(Long userId);

	List<Task> getAllTasksSortedByDueDate();

	List<Task> getAllTasksForUserSortedByDueDateDesc(Long userId);

	List<Task> getAllTasksSortedByDueDateDesc();

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
