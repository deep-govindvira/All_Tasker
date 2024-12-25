package com.example.backend.todo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.backend.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class TodoDAO {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public boolean add(Todo todo) {
        dynamoDBMapper.save(todo);
        return dynamoDBMapper.load(todo) != null;
    }

    public List<Todo> get(User user) {
        List<Todo> list = new LinkedList<>();
        for(Todo todo : dynamoDBMapper.scan(Todo.class, new DynamoDBScanExpression())
        ) {
            if (todo != null && todo.getUsername().equals(user.getName())) {
                list.add(todo);
            }
        }
        log.info("todo {}", list);
        return list;
    }

    public void update(Todo todo) {
        dynamoDBMapper.save(todo);
    }

    public void remove(Todo todo) {
        dynamoDBMapper.delete(todo);
    }
}

