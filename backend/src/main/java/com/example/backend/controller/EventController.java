package com.example.backend.controller;

import com.example.backend.entity.Event;
import com.example.backend.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<Event> getAll() {
        return service.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Event create(@RequestBody Event event) {
        return service.create(event);
    }

    @PostMapping("/group/{groupId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Event createForGroup(@PathVariable Long groupId, @RequestBody Event event) {
        return service.createForGroup(groupId, event);
    }
}