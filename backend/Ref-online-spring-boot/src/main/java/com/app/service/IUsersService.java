package com.app.service;

import com.app.dto.EditProfileDTO;
import com.app.pojos.Users;

import java.util.List;

public interface IUsersService {
    Users userSignin(String u);

    Users userSignup(Users u);

    Users getProfile(int id);

    Users userUpdate(int id, EditProfileDTO u);

    String applySeller(int id);

    Users getUser();

    List<Users> getUsersListAll();

    Users userActionApproveSuspend(Users u);

    List<Users> getSellerListAll();

    Users userActionManageSeller(Users u);

    Users userActionApplyForSeller();
}
