package com.demo.service;

import com.demo.dao.TaskRepository;
import com.demo.model.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    
    @Autowired
	private TaskRepository taskRepository;

	@Override
	public Task createTask(Task task) {
		taskRepository.save(task);
		return null;
	}

	@Override
	public List<Task> getAllTasks() {
		List<Task> tasks=taskRepository.findAll();
		System.out.println("task list in service");
		return tasks;
	}
    


}
