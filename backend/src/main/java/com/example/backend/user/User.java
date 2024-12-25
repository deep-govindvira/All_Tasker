package com.example.backend.user;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@DynamoDBTable(tableName = "user")
public class User {

    @DynamoDBHashKey(attributeName = "name")
    private String name;

    @DynamoDBAttribute(attributeName = "password")
    private String password;
}