package com.app.service;

import com.app.dto.SigninDTO;
import com.app.pojo.Credentials;
import com.app.pojo.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    User userSignup(User u);

    User userSign(SigninDTO user);

    Optional<User> getProfile(int id);

    User userUpdate(int id, User u);

    List<User> getUsersListAll();

    Credentials addNewAuth(Credentials credentials);

}
