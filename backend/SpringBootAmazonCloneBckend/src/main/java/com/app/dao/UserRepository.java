package com.app.dao;

import com.app.pojo.Role;
import com.app.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUserEmailAndUserPassword(String email, String password);

    User findByUserEmail(String user_email);

    List<User> findAllByUserRole(Role role);

}



