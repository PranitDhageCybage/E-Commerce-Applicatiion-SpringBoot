package com.app.service;

import com.app.models.OrderDetails;

import java.util.List;

public interface IOrderDetailsService {
    List<OrderDetails> getOrderDetailsList(int myorder_id);

}
