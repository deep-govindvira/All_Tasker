package com.example.backend.user;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserDAO {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public boolean register(User user) {
        if (isExist(user)) return false;
        dynamoDBMapper.save(user);
        if (dynamoDBMapper.load(user) != null) {
            log.info("registered {}", user);
            return true;
        }
        log.info("failed to register {}", user);
        return false;
    }

    public boolean isExist(User user) {
        return dynamoDBMapper.load(user) != null;
    }
}

