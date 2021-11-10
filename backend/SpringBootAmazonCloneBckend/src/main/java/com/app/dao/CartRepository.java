package com.app.dao;

import com.app.pojo.Cart;
import com.app.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findAllByUserUserId(int  user_id);

    void deleteAllByUserUserId(int  user_id);
}
