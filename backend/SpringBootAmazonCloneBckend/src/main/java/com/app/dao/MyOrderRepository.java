package com.app.dao;

import com.app.pojo.Myorder;
import com.app.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyOrderRepository extends JpaRepository<Myorder, Integer> {
    List<Myorder> findAllByUser(User user);

    @Query(value = "SELECT  COUNT(*) FROM myorder", nativeQuery = true)
    Integer countAllUserOrders();

    @Query(value = "SELECT  COUNT(*) FROM myorder WHERE delivery_status NOT IN ('Cancelled', 'Delivered')", nativeQuery = true)
    Integer countAllActiveUserOrders();
}
