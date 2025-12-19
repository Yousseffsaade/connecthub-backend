package com.example.backend.service;

import com.example.backend.entity.GroupEntity;
import com.example.backend.repository.GroupRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GroupService {

    private final GroupRepository repository;

    public GroupService(GroupRepository repository) {
        this.repository = repository;
    }

    public GroupEntity create(GroupEntity group) {
        return repository.save(group);
    }

    public List<GroupEntity> getAll() {
        return repository.findAll();
    }
}