package com.app.service;

import com.app.repository.OrderDetailsRepository;
import com.app.models.OrderDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class OrderDetailsServiceImpl implements IOrderDetailsService {

    @Autowired
    OrderDetailsRepository orderDetailsRepo;

    @Override
    public List<OrderDetails> getOrderDetailsList(int myorder_id) {
        return orderDetailsRepo.findAllByMyorderMyorderId(myorder_id);
    }


}
