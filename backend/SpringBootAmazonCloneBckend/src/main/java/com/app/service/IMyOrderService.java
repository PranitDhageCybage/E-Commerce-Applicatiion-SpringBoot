package com.app.service;

import com.app.pojo.Myorder;

import java.util.List;

public interface IMyOrderService {
    List<Myorder> getAllMyOrders(int user_Id);

    String addMyOrder(Myorder myorder);

    Myorder updateMyOrderStatus(int myOrder_id, String status);

    String deleteMyOrder(int myOrder_id);
}