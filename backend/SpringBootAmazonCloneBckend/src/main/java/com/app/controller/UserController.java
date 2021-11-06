package com.app.controller;

import com.app.customExceptions.AuthenticationException;
import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ResponseDTO;
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
    public ResponseDTO userSignin(@RequestBody SigninDTO user) {
        System.out.println("inside Sign in" + user);
        User foundUser = userService.userSign(user);
        if (foundUser != null) {
            return new ResponseDTO(true, foundUser);
        }
        throw new AuthenticationException("Invalid Email or Password");
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
        User foundUser = userService.getProfile(id);
        if (foundUser != null) {
            return new ResponseEntity(foundUser, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("User not found for given user id");
    }

    @PutMapping("/UpdateProfile/{id}")
    public ResponseEntity updateUserProfile(@PathVariable String id, @RequestBody User user) {
        System.out.println("in user update profile : " + id);
        User updatedUser = userService.userUpdate(Integer.parseInt(id), user);
        if (updatedUser != null) {
            return new ResponseEntity("user profile updated successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while updating user profile");
    }

}
