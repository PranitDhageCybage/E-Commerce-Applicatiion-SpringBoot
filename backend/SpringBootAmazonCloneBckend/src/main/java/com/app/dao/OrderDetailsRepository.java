package com.app.dao;

import com.app.pojo.Myorder;
import com.app.pojo.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

    List<OrderDetails> findAllByMyorderMyorderId(int myorder_id);
}
