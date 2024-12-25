package com.example.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserDAO userDAO;

    @PostMapping("/login")
    public boolean login(User user) {
        return userDAO.isExist(user);
    }
}
