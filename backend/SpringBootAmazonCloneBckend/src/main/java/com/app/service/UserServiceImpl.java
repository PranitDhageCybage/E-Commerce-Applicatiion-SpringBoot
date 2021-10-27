package com.app.service;

import com.app.dao.UserRepository;
import com.app.dto.SigninDTO;
import com.app.pojo.Role;
import com.app.pojo.User;
import com.app.utils.EncryptPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class UserServiceImpl implements IUserService {

    @Autowired
    UserRepository userRepo;

    public UserServiceImpl() {
    }

    @Override
    public User userSign(SigninDTO user) {
        return userRepo.findByUserEmailAndUserPassword(user.getUser_email(), EncryptPassword.getSHA256Hash(user.getUser_password()));
    }

    @Override
    public User userSignup(User user) {
        user.setUserPassword(EncryptPassword.getSHA256Hash(user.getUserPassword()));
        user.setUserRole(Role.USER);
        user.setUserStatus(0);
        return userRepo.save(user);
    }

    @Override
    public Optional<User> getProfile(int id) {
        return userRepo.findById(id);
    }

    @Override
    public User userUpdate(int id, User newUser) {
        User user = userRepo.findById(id).get();
        if (newUser.getUserName() != "") user.setUserName(newUser.getUserName());
        if (newUser.getUserPassword() != "") user.setUserPassword(EncryptPassword.getSHA256Hash(newUser.getUserPassword()));
        if (newUser.getUserPhone() != "") user.setUserPhone(newUser.getUserPhone());
        return userRepo.save(user);
    }

    @Override
    public List<User> getUsersListAll() {
        return userRepo.findAllByUserRole(Role.USER);
    }


}
