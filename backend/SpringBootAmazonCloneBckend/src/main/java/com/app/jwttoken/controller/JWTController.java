package com.app.jwttoken.controller;

import com.app.controller.UserController;
import com.app.dto.ResponseDTO;
import com.app.dto.SigninDTO;
import com.app.jwttoken.AuthenticationResponse;
import com.app.jwttoken.service.MyUserDetailsService;
import com.app.jwttoken.util.JwtUtil;
import com.app.pojo.User;
import com.app.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class JWTController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private UserController userController;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    IUserService userService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseDTO<?> createAuthenticationToken(@RequestBody SigninDTO signinDTO) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signinDTO.getUser_email(), signinDTO.getUser_password())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final User userDetails = userService
                .userSign(signinDTO);

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return new ResponseDTO<>(HttpStatus.OK, new AuthenticationResponse(jwt).toString(), userDetails);
    }

}

