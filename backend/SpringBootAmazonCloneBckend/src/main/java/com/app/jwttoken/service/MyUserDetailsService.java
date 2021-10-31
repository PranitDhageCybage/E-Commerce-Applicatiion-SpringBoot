package com.app.jwttoken.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

//@Service
//public class MyUserDetailsService {
//    @Autowired
//    UserRepository repo;
//
//    public User getUserByEmailAndPassword(String email, String password) {
//        User u = repo.findByUserEmailAndUserPassword(email, password);
//        return u;
//    }
}