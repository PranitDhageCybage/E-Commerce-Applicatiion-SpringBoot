package com.app.controller;

import com.app.dto.SigninDTO;
import com.app.pojo.User;
import com.app.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    IUserService userService;

    public UserController() {
        System.out.println("in " + getClass().getName());
    }

    @PostMapping("/login")
    public ResponseEntity userSignin(@RequestBody SigninDTO user) {
        System.out.println("inside Sign in" + user);
        User foundUser = userService.userSign(user);
        if (foundUser != null) {
            return new ResponseEntity(foundUser, HttpStatus.OK);
        } else {
            return new ResponseEntity("Invalid Email or Password", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity userSignup(@RequestBody User user, BindingResult bindingResult) {
        System.out.println("in user signup : " + user);
        if (bindingResult.hasErrors()) {
            return new ResponseEntity("Invalid Data", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity(userService.userSignup(user), HttpStatus.OK);
        }
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity getUserProfile(@PathVariable int id) {
        System.out.println("in user get profile : " + id);
            return new ResponseEntity(userService.getProfile(id), HttpStatus.OK);
    }

    @PutMapping("/UpdateProfile/{id}")
    public ResponseEntity updateUserProfile(@PathVariable String id, @RequestBody User user) {
        System.out.println("in user update profile : " + id);
        return new ResponseEntity(userService.userUpdate(Integer.parseInt(id), user), HttpStatus.OK);
    }


}
