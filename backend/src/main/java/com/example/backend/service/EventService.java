package com.example.backend.service;

import com.example.backend.entity.Event;
import com.example.backend.entity.GroupEntity;
import com.example.backend.repository.EventRepository;
import com.example.backend.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final GroupRepository groupRepository;

    public EventService(EventRepository eventRepository, GroupRepository groupRepository) {
        this.eventRepository = eventRepository;
        this.groupRepository = groupRepository;
    }

    public Event create(Event event) {
        return eventRepository.save(event);
    }

    public Event createForGroup(Long groupId, Event event) {
        GroupEntity group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found: " + groupId));
        event.setGroup(group);
        return eventRepository.save(event);
    }

    public List<Event> getAll() {
        return eventRepository.findAll();
    }
}