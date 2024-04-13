package com.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.model.Task;
import com.demo.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Create a new task
    @PostMapping("/addnewtask")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
    	System.out.println("task created");
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

//     Get all tasks
    @GetMapping("/getall")
    public ResponseEntity<List<Task>> getAllTasks() {
        System.out.println("task listed");
        List<Task> tasks = taskService.getAllTasks();
        
        // Print the tasks on the console
        tasks.forEach(task -> System.out.println(task));

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task updatedTask) {
        Task existingTask = taskService.getTaskById(id);
//        System.out.println(existingTask.getTitle());
        if (existingTask != null) {
            updatedTask.setId(id);
            Task updatedTaskResult = taskService.updateTask(updatedTask);
            return ResponseEntity.ok(updatedTaskResult);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PatchMapping("/{id}/task-done")
    public ResponseEntity<String> markTaskAsDone(@PathVariable Integer id) {
        // Logic to mark the task as done
        // You can implement this logic using your service layer
        // For example, you might call a service method to update the task status
        // Assuming you have a service class called TaskService
        
        taskService.markTaskAsDone(id);

        // Return a success message
        return ResponseEntity.status(HttpStatus.OK).body("Task marked as done successfully");
    }
    @GetMapping("/getTaskbyid/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Integer id) {
        Task task = taskService.getTaskById(id);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
