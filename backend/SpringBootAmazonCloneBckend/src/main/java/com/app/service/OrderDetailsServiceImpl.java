package com.app.service;

import com.app.dao.MyOrderRepository;
import com.app.dao.OrderDetailsRepository;
import com.app.pojo.Myorder;
import com.app.pojo.OrderDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class OrderDetailsServiceImpl implements IOrderDetailsService {

    @Autowired
    OrderDetailsRepository orderDetailsRepo;

    @Autowired
    MyOrderRepository myOrderRepo;


    @Override
    public List<OrderDetails> getAllMyOrderDetails(int myorder_id) {
        if (myOrderRepo.existsById(myorder_id)) {
            Myorder myorder = myOrderRepo.findById(myorder_id).get();
            return orderDetailsRepo.findAllByMyorder(myorder);
        }
        return null;
    }

    @Override
    public List<OrderDetails> getAllUserOrderDetails() {
        return orderDetailsRepo.findAll();
    }

}
