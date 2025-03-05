package com.example.RentEase.Controller;

import com.example.RentEase.Model.Tenent;
import com.example.RentEase.Repository.TenentRepository;
import com.example.RentEase.Service.TenentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tenent")
public class TenentController {

    @Autowired
    private TenentService tenentService;

    @PostMapping("/register")
    public Tenent registertenent(@RequestBody Tenent tenent)
    {
        return tenentService.tenentRegister(tenent);
    }

    @PostMapping("/login")
    public Map<String,Object> tenentLogin(@RequestBody Map<String,String> req)
    {
        return tenentService.tenentLogin(req);
    }

    @PostMapping("updatepassword")
    public Map<String,Object> updatepassword(@RequestBody Map<String,Object> req)
    {
        String id=(String) req.get("id");
        String password=(String) req.get("password");
        String newPassword=(String) req.get("newpassword");
        return tenentService.updatePassword(id,password,newPassword);
    }

    @PostMapping("/updatewatchlist")
    public Map<String,Object> tenentUpdateWatchList(@RequestBody Map<String,Object> req)
    {
        System.out.println(req);
        String id=(String)req.get("id");
        String watchlist=(String) req.get("watchlist");
        return tenentService.updateTenentWatchList(id,watchlist);
    }

    @PostMapping("removewatchlist")
    public Map<String,Object> tenentremoveWatchList(@RequestBody Map<String,Object> req)
    {
        String property=(String) req.get("property");
        String id=(String) req.get("id");
        return tenentService.tenentRemoveWatchList(id,property);
    }

    @PostMapping("getwatchlist")
    public Map<String,Object> getWatchList(@RequestBody Map<String,Object> req)
    {
        String id=(String) req.get("id");
        return tenentService.getWatchList(id);
    }

}
