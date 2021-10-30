package com.app.service;

import com.app.pojo.OrderDetails;

import java.util.List;

public interface IOrderDetailsService {
    List<OrderDetails> getAllMyOrderDetails(int user_id);

    List<OrderDetails> getAllUserOrderDetails();

}
