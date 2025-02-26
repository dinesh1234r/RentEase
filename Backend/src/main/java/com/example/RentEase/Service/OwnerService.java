package com.example.RentEase.Service;

import com.example.RentEase.Model.Owner;
import com.example.RentEase.Repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class OwnerService {
    @Autowired
    private OwnerRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public Owner ownerRegister(Owner owner)
    {
        String password=owner.getPassword();
        String encodedpassword=encoder.encode(password);
        owner.setPassword(encodedpassword);
        return repo.save(owner);
    }

    public Map<String, Object> ownerLogin(Map<String,String> map)
    {
        String email=map.get("email");
        String password=map.get("password");
        Optional<Owner> ownerOptional=repo.findByEmail(email);

        Map<String,Object> response=new HashMap<>();

        if(ownerOptional.isPresent())
        {
            Owner owner=ownerOptional.get();
            if(encoder.matches(password,owner.getPassword()))
            {
                response.put("msg","Login Successful");
                response.put("id",owner.getId());
                response.put("name",owner.getName());
                response.put("email",owner.getEmail());
                response.put("phoneno",owner.getPhoneno());
            }
            else
            {
                response.put("msg","Wrong Password");
            }
            return response;
        }

        response.put("msg","Login failed");
        return response;
    }

    public Map<String, Object> updatePassword(String id, String oldpassword, String newpassword) {
        Optional<Owner> optionalOwner=repo.findById(id);
        Map<String,Object> response=new HashMap<>();
        if(optionalOwner.isPresent())
        {
            Owner owner=optionalOwner.get();
            if(encoder.matches(oldpassword,owner.getPassword()))
            {
                String hasspassword=encoder.encode(newpassword);
                owner.setPassword(hasspassword);
                repo.save(owner);
                response.put("msg","Password Saved");
                return response;
            }
            response.put("msg","Wrong Password");
            return response;
        }
        response.put("msg","User Not Found");
        return response;
    }
}
