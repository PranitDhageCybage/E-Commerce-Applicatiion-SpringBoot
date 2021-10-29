package com.app.service;

import com.app.dao.MyOrderRepository;
import com.app.dao.UserRepository;
import com.app.pojo.Myorder;
import com.app.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class MyOrderImpl implements IMyOrderService {

    @Autowired
    MyOrderRepository myOrderRepo;

    @Autowired
    UserRepository userRepo;


    @Override
    public List<Myorder> getAllMyOrders(int user_Id) {
        if (userRepo.existsById(user_Id)) {
            User user = userRepo.findById(user_Id).get();
            return myOrderRepo.findAllByUser(user);
        }
        return null;
    }

    @Override
    public Myorder addMyOrder(Myorder myorder) {
        return myOrderRepo.save(myorder);
    }

    @Override
    public Myorder updateMyOrderStatus(int myOrder_id, String status) {
        if (myOrderRepo.existsById(myOrder_id)) {
            Myorder myorder = myOrderRepo.findById(myOrder_id).get();
            if (status != myorder.getDeliveryStatus()) myorder.setDeliveryStatus(status);
            return myOrderRepo.save(myorder);
        }
        return null;
    }

    @Override
    public String deleteMyOrder(int myOrder_id) {
        if (myOrderRepo.existsById(myOrder_id)) {
            myOrderRepo.deleteById(myOrder_id);
            return "MyOrder deleted successfully";
        }
        return "MyOrder not found";
    }
}
