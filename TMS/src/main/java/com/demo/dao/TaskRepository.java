package com.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer>{

	List<Task> findAllByOrderByDueDateAsc();

	List<Task> findAllByOrderByDueDateDesc();
	
	List<Task> findByUserId(Long userId);

	List<Task> findByUserIdOrderByDueDateAsc(Long userId);

	List<Task> findByUserIdOrderByDueDateDesc(Long userId);


}
