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
            return true;
        }
        log.info("failed to register {}", user);
        return false;
    }

    public boolean isExist(User user) {
        if (dynamoDBMapper.load(user) != null && dynamoDBMapper.load(user).getPassword().equals(user.getPassword())) {
            log.info("exist {}", user);
            return true;
        }
        log.info("does not exist {}", user);
        return false;
    }


}

