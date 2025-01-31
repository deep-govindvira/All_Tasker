package com.example.backend.note;

import com.example.backend.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    com.example.backend.note.NoteDAO noteDAO;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody com.example.backend.note.Note note) {
        noteDAO.add(note);
        return ResponseEntity.ok("Added Note");
    }


    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody com.example.backend.note.Note note) {
        noteDAO.update(note);
        return ResponseEntity.ok("Update successful");
    }

    @PostMapping("/remove")
    public ResponseEntity<String> _delete(@RequestBody com.example.backend.note.Note Note) {
        noteDAO.remove(Note);
        return ResponseEntity.ok("Delete successful");
    }

    @PostMapping("/get")
    public ResponseEntity<List<com.example.backend.note.Note>> get(@RequestBody User user) {
        return ResponseEntity.ok(noteDAO.get(user));
    }

    @PostMapping("/get/{id}")
    public ResponseEntity<Note> get(@RequestBody User user,
                                    @PathVariable("id") String id) {
        return ResponseEntity.ok(noteDAO.getById(user, id));
    }
}
