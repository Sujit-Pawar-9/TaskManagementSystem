package com.demo.service;

import com.demo.dao.TaskRepository;
import com.demo.model.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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

	@Override
	public void deleteTask(Integer id) {
		taskRepository.deleteById(id);
		
	}

	public Task getTaskById(Integer id) {
	        return taskRepository.findById(id).orElse(null);
	    }

	 public Task updateTask(Task updatedTask) {
	        // Check if the task exists in the database
	        Task existingTask = taskRepository.findById(updatedTask.getId()).orElse(null);
	        
	        if (existingTask != null) {
	            // Update the existing task with the new information
	            existingTask.setTitle(updatedTask.getTitle());
	            
	            existingTask.setDescription(updatedTask.getDescription());
	            existingTask.setDueDate(updatedTask.getDueDate());

	            // Save the updated task
	            return taskRepository.save(existingTask);
	        } else {
	            // Task not found, return null or handle as appropriate
	            return null;
	        }
	    }

	 @Override
	 public void markTaskAsDone(Integer id) {
	     // Retrieve the task from the database using the provided id
	     Optional<Task> optionalTask = taskRepository.findById(id);
	     
	     // Check if the task exists
	     if (optionalTask.isPresent()) {
	         // Get the task object from the Optional
	         Task task = optionalTask.get();
	         
	         // Update the task status to mark it as done
	         task.setCompleted(true); // Assuming there's a boolean field 'done' in the Task entity
	         
	         // Save the updated task back to the database
	         taskRepository.save(task);
	     } else {
	         // Handle the case where the task with the given id doesn't exist
	         throw new NoSuchElementException("Task with id " + id + " not found");
	     }
	 }


	
    


}
