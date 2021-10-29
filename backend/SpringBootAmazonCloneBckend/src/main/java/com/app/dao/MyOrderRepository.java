package com.app.dao;

import com.app.pojo.Myorder;
import com.app.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyOrderRepository extends JpaRepository<Myorder, Integer> {
    List<Myorder> findAllByUser(User user);
}
