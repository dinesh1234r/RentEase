package com.example.RentEase.Repository;

import com.example.RentEase.Model.Property;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends MongoRepository<Property,String> {
    Optional<List<Property>> findAllByOwner(String id);
}
