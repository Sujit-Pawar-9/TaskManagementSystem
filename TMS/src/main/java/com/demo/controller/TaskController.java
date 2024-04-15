package com.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.model.Task;
import com.demo.model.User;

import com.demo.service.TaskService;
import com.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    private UserService userService;
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/addnewtask/{userId}")
    public ResponseEntity<Object> createTask(@RequestBody Task taskRequest, @PathVariable Long userId) {
        try {
           
            User user = userService.getUserById(userId);
            if (user == null) {
                return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
            }
            
           
            Task task = new Task();
            task.setTitle(taskRequest.getTitle());
            task.setDescription(taskRequest.getDescription());
            task.setDueDate(taskRequest.getDueDate());
            task.setPriority(taskRequest.getPriority());
            task.setCompleted(taskRequest.getCompleted());
            task.setTaskCreatedAt(taskRequest.getTaskCreatedAt());
            task.setUser(user);

            
            Task createdTask = taskService.createTask(task);
            
            
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        } catch (Exception e) {
            
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



    
    @GetMapping("/getall/{userId}")
    public ResponseEntity<List<Task>> getAllTasks(@PathVariable Long userId) {
       
        List<Task> tasks = taskService.getAllTasksForUser(userId);
        
     
        tasks.forEach(task -> System.out.println(task));

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task updatedTask) {
        Task existingTask = taskService.getTaskById(id);

        if (existingTask != null) {
            updatedTask.setId(id);
            Task updatedTaskResult = taskService.updateTask(updatedTask);
            return ResponseEntity.ok(updatedTaskResult);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PatchMapping("/{id}/task-done")
    public ResponseEntity<String> markTaskAsDone(@PathVariable Integer id) {
        
        
        taskService.markTaskAsDone(id);

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

    @GetMapping("/sortedByDueDate")
    public ResponseEntity<List<Task>> getAllTasksSortedByDueDate(@RequestParam(required = false) Long userId) {
        List<Task> tasks;
        if (userId != null) {
            tasks = taskService.getAllTasksForUserSortedByDueDate(userId);
        } else {
            tasks = taskService.getAllTasksSortedByDueDate();
        }
        
        
        tasks.forEach(task -> System.out.println(task));

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/sortedByDueDateDesc")
    public ResponseEntity<List<Task>> getAllTasksSortedByDueDateDesc(@RequestParam(required = false) Long userId) {
        List<Task> tasks;
        if (userId != null) {
            tasks = taskService.getAllTasksForUserSortedByDueDateDesc(userId);
        } else {
            tasks = taskService.getAllTasksSortedByDueDateDesc();
        }
        
        
        tasks.forEach(task -> System.out.println(task));

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }


}
