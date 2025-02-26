package com.example.RentEase.Repository;

import com.example.RentEase.Model.Tenent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TenentRepository extends MongoRepository<Tenent,String> {
    Optional<Tenent> findByEmail(String email);
}
