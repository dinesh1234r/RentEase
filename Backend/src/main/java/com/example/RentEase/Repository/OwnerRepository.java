package com.example.RentEase.Repository;

import com.example.RentEase.Model.Owner;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OwnerRepository extends MongoRepository<Owner,String> {

    Optional<Owner> findByEmail(String email);
}
