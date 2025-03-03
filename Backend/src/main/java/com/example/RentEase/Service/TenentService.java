package com.example.RentEase.Service;

import com.example.RentEase.Model.Tenent;
import com.example.RentEase.Repository.TenentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TenentService {
    @Autowired
    private TenentRepository repo;

    @Autowired
    private BCryptPasswordEncoder encorder;

    public Tenent tenentRegister(Tenent tenent)
    {
        String password=tenent.getPassword();
        String newpassword=encorder.encode(password);
        tenent.setPassword(newpassword);
        return repo.save(tenent);
    }

    public Map<String,Object> tenentLogin(Map<String,String> req)
    {
        String email=req.get("email");
        String password=req.get("password");

        Optional<Tenent> optionalTenent=repo.findByEmail(email);

        Map<String,Object> response=new HashMap<>();

        if(optionalTenent.isPresent())
        {
            Tenent tenent=optionalTenent.get();
            if(encorder.matches(password,tenent.getPassword()))
            {
                response.put("msg","Login Successful");
                response.put("id",tenent.getId());
                response.put("name",tenent.getName());
                response.put("email",tenent.getEmail());
                response.put("phoneno",tenent.getPhone());
            }
            else
            {
                response.put("msg","Wrong Password");
            }
            return response;
        }

        response.put("msg","Login Failed");

        return response;
    }

    public Map<String,Object> updateTenentWatchList(String id,String req)
    {
        Optional<Tenent> optionalTenent=repo.findById(id);
        Map<String,Object> response=new HashMap<>();
        if(optionalTenent.isPresent())
        {
            Tenent tenent=optionalTenent.get();
            List<String> existingwatchlist=tenent.getWatchlist();
            existingwatchlist.add(req);
            tenent.setWatchlist(existingwatchlist);
            repo.save(tenent);
            response.put("msg","WatchList Updated");
            return response;
        }
        response.put("msg","User Not Found");
        return response;
    }

    public Map<String, Object> tenentRemoveWatchList(String id,String property) {
        Optional<Tenent> optionalTenent=repo.findById(id);
        Map<String,Object> response=new HashMap<>();
        if(optionalTenent.isPresent())
        {
            Tenent tenent=optionalTenent.get();
            List<String> newWatchList=tenent.getWatchlist();
            if(newWatchList.contains(property))
            {
                newWatchList.remove(property);
                tenent.setWatchlist(newWatchList);
                repo.save(tenent);
                response.put("msg","Success");
                return response;
            }
            response.put("msg","Property Not Found in Your WatchList");
            return response;
        }
        response.put("msg","Failed to Remove");
        return response;
    }

    public Map<String, Object> getWatchList(String id) {
        Optional<Tenent> optionalTenent=repo.findById(id);
        Map<String,Object> response=new HashMap<>();
        if(optionalTenent.isPresent())
        {
            Tenent tenent=optionalTenent.get();
            response.put("msg","Success");
            response.put("watchlist",tenent.getWatchlist());
            return response;
        }
        response.put("msg","User Not Found");
        return response;
    }

    public Map<String, Object> updatePassword(String id,String password,String newPassword) {
        Optional<Tenent> optionalTenent=repo.findById(id);
        Map<String,Object> response=new HashMap<>();
        if(optionalTenent.isPresent())
        {
            Tenent tenent=optionalTenent.get();
            if(encorder.matches(password,tenent.getPassword()))
            {
                String newpassword=encorder.encode(newPassword);
                tenent.setPassword(newpassword);
                repo.save(tenent);
                response.put("msg","Password Changed");
                return response;
            }
            response.put("msg","Wrong Password");
            return response;
        }
        response.put("msg","User Not Found");
        return response;
    }
}
