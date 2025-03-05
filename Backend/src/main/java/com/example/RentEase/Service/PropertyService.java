package com.example.RentEase.Service;

import com.example.RentEase.Model.Owner;
import com.example.RentEase.Model.Property;
import com.example.RentEase.Repository.OwnerRepository;
import com.example.RentEase.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PropertyService {
    @Autowired
    PropertyRepository repo;

    @Autowired
    OwnerRepository ownerrepo;

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

        List<Property> properties=repo.findAll();
        map.put("msg","Fetched");

        List<Map<String,Object>> updatedProperty=new ArrayList<>();
        for(Property property:properties)
        {
            Map<String, Object> propertyData = new HashMap<>();
            propertyData.put("id",property.getId());
            propertyData.put("id", property.getId());
            propertyData.put("title", property.getTitle());
            propertyData.put("location", property.getLocation());
            propertyData.put("rent", property.getRent());
            propertyData.put("type", property.getType());
            propertyData.put("bedrooms", property.getBedrooms());
            propertyData.put("bathrooms", property.getBathrooms());
            propertyData.put("furnished", property.getFurnished());
            propertyData.put("available", property.getAvailable());
            propertyData.put("amenities", property.getAmenities());
            propertyData.put("images", property.getImages());

            Optional<Owner> ownerOptional=ownerrepo.findById(property.getOwner());
            if(ownerOptional.isPresent())
            {
                Owner owner=ownerOptional.get();
                propertyData.put("ownerphoneno",owner.getPhoneno());
            }
            else
            {
                propertyData.put("ownerphoneno","Not Found");
            }

            updatedProperty.add(propertyData);
        }
        map.put("properties",updatedProperty);
        return map;
    }

    public Map<String, Object> getPropertyById(List<String> watchlist) {
        Map<String,Object> result=new HashMap<>();
        List<Map<String,Object>> response=new ArrayList<>();
        for(String id:watchlist)
        {
            Optional<Property> optionalProperty=repo.findById(id);
            if(optionalProperty.isPresent())
            {
                Property property=optionalProperty.get();
                Map<String, Object> propertyData = new HashMap<>();
                propertyData.put("id",property.getId());
                propertyData.put("id", property.getId());
                propertyData.put("title", property.getTitle());
                propertyData.put("location", property.getLocation());
                propertyData.put("rent", property.getRent());
                propertyData.put("type", property.getType());
                propertyData.put("bedrooms", property.getBedrooms());
                propertyData.put("bathrooms", property.getBathrooms());
                propertyData.put("furnished", property.getFurnished());
                propertyData.put("available", property.getAvailable());
                propertyData.put("amenities", property.getAmenities());
                propertyData.put("images", property.getImages());

                Optional<Owner> ownerOptional=ownerrepo.findById(property.getOwner());
                if(ownerOptional.isPresent())
                {
                    Owner owner=ownerOptional.get();
                    propertyData.put("ownerphoneno",owner.getPhoneno());
                }
                else
                {
                    propertyData.put("ownerphoneno","Not Found");
                }
                response.add(propertyData);
            }
        }
        result.put("msg","Fetched");
        result.put("WatchList",response);
        return result;
    }
}
