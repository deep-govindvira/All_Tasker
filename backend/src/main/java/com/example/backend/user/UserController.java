package com.example.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    UserDAO userDAO;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        if (userDAO.isExist(user)) {
            return ResponseEntity.ok("Login successful");
        } else {
            log.info("login failed {}", user);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (!userDAO.isExist(user) && userDAO.register(user)) {
            return ResponseEntity.ok("Login successful");
        }
        log.info("register failed {}", user);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}

