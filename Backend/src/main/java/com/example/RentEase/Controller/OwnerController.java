package com.example.RentEase.Controller;

import com.example.RentEase.Model.Owner;
import com.example.RentEase.Service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/owner")
public class OwnerController {
    @Autowired
    private OwnerService ownerService;

    @PostMapping("/register")
    public Owner registerOwner(@RequestBody Owner owner)
    {
        return ownerService.ownerRegister(owner);
    }

    @PostMapping("/login")
    public Map<String,Object> loginOwner(@RequestBody Map<String,String> login)
    {
        System.out.println(login);
        return ownerService.ownerLogin(login);
    }

    @PostMapping("updatepassword")
    public Map<String,Object> updatePassword(@RequestBody Map<String,String> req)
    {
        String id=req.get("id");
        String oldpassword=req.get("oldpassword");
        String newpassword=req.get("newpassword");
        return ownerService.updatePassword(id,oldpassword,newpassword);
    }

}
