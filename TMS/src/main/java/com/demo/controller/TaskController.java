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
//
//    // Get a single task by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
//        Task task = taskService.getTaskById(id);
//        return new ResponseEntity<>(task, HttpStatus.OK);
//    }
//
//    // Update a task by ID
//    @PutMapping("/{id}")
//    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
//        Task updatedTask = taskService.updateTask(id, task);
//        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
//    }
//
//    // Delete a task by ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
//        taskService.deleteTask(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}
