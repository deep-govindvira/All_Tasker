package com.example.backend.note;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.example.backend.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Slf4j
@Component
public class NoteDAO {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public boolean add(Note note) {
        dynamoDBMapper.save(note);
        return dynamoDBMapper.load(note) != null;
    }

    public List<Note> get(User user) {
        List<Note> list = new LinkedList<>();
        for(Note note : dynamoDBMapper.scan(Note.class, new DynamoDBScanExpression())
        ) {
            if (note != null && note.getUsername().equals(user.getName())) {
                list.add(note);
            }
        }
        log.info("Note {}", list);
        return list;
    }

    public void update(Note Note) {
        dynamoDBMapper.save(Note);
    }

    public void remove(Note Note) {
        dynamoDBMapper.delete(Note);
    }

    public Note getById(User user, String id) {
        Note note = Note.builder()
                .username(user.getName())
                .id(id)
                .build();
        return dynamoDBMapper.load(note);
    }
}

