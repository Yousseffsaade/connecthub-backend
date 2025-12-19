package com.example.backend.controller;

import com.example.backend.entity.GroupEntity;
import com.example.backend.service.GroupService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupController {

    private final GroupService service;

    public GroupController(GroupService service) {
        this.service = service;
    }

    @PostMapping
    public GroupEntity create(@RequestBody GroupEntity group) {
        return service.create(group);
    }

    @GetMapping
    public List<GroupEntity> getAll() {
        return service.getAll();
    }
}