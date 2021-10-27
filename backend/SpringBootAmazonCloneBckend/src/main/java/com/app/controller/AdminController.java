package com.app.controller;

import com.app.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    IUserService userService;

    public AdminController() {
        System.out.println("in " + getClass().getName());
    }

    @GetMapping("/userList")
    public ResponseEntity getAllUserList() {
        System.out.println("in user get all user list");
        return new ResponseEntity(userService.getUsersListAll(), HttpStatus.OK);
    }


}
