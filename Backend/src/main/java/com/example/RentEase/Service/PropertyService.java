package com.example.RentEase.Service;

import com.example.RentEase.Model.Property;
import com.example.RentEase.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PropertyService {
    @Autowired
    PropertyRepository repo;

    public Property propertyregister(Property property)
    {
        return repo.save(property);
    }

    public Map<String, Object> getAllProperties(String id) {
        Optional<List<Property>> optionalProperty=repo.findAllByOwner(id);
        Map<String,Object> response=new HashMap<>();
        if(optionalProperty.isPresent())
        {
            System.out.println(optionalProperty);
            response.put("msg","Properties Datas Reterived");
            response.put("properties",optionalProperty.get());
            return response;
        }
        response.put("msg","Properties Not Found");
        return response;
    }

    public Map<String, Object> getProperties() {
        Map<String,Object> map=new HashMap<>();
        map.put("msg","Fetched");
        map.put("properties",repo.findAll());
        return map;
    }
}
