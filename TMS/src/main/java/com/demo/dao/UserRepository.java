package com.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    // You can add more custom queries here if needed
}

