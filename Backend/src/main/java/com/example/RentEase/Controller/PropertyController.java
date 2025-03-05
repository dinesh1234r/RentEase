package com.example.RentEase.Controller;

import com.example.RentEase.Model.Property;
import com.example.RentEase.Service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/property")
public class PropertyController {
    @Autowired
    PropertyService service;

    @PostMapping("/register")
    public Property Propertyregister(@RequestBody Property property)
    {
        return service.propertyregister(property);
    }

    @PostMapping("getallproperties")
    public Map<String,Object> getAllProperties(@RequestBody Map<String,Object> req)
    {
        String id=(String) req.get("id");
        return service.getAllProperties(id);
    }

    @GetMapping("/getallproperties")
    public Map<String,Object> getProperties()
    {
        return service.getProperties();
    }

    @PostMapping("/getsavedproperties")
    public Map<String, Object> getPropertybyId(@RequestBody Map<String,Object> request)
    {
        List<String> req=(List<String>)request.get("watchlist");
        return service.getPropertyById(req);
    }

}
