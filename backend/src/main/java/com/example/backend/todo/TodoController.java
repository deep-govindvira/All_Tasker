package com.example.backend.todo;

import com.example.backend.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    TodoDAO todoDAO;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Todo todo) {
        todoDAO.add(todo);
        return ResponseEntity.ok("Added todo");
    }


    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody Todo todo) {
        todoDAO.update(todo);
        return ResponseEntity.ok("Update successful");
    }

    @PostMapping("/remove")
    public ResponseEntity<String> _delete(@RequestBody Todo todo) {
        todoDAO.remove(todo);
        return ResponseEntity.ok("Delete successful");
    }

    @PostMapping("/get")
    public ResponseEntity<List<Todo>> get(@RequestBody User user) {
        return ResponseEntity.ok(todoDAO.get(user));
    }
}

