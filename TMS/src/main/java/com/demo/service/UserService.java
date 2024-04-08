package com.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.dao.UserRepository;
import com.demo.model.User;

@Service
public class UserService implements UserServiceIF{
	 @Autowired
	    private UserRepository userRepository;

	    public void registerUser(User user) {
	        // Logic to save the user to the database
//	    	System.out.println(user.get);
	        userRepository.save(user);
	    }

	    public boolean authenticateUser(String username, String password) {
	        // Logic to authenticate the user
	        User user = userRepository.findByUsername(username);
	        return user != null && user.getPassword().equals(password);
	    }
	}
