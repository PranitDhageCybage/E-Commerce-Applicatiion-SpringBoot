package com.app.service;

import com.app.dao.CartRepository;
import com.app.dao.MyOrderRepository;
import com.app.dao.OrderDetailsRepository;
import com.app.dao.UserRepository;
import com.app.pojo.Cart;
import com.app.pojo.Myorder;
import com.app.pojo.OrderDetails;
import com.app.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class MyOrderImpl implements IMyOrderService {

    @Autowired
    MyOrderRepository myOrderRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    CartRepository cartRepo;

    @Autowired
    OrderDetailsRepository orderDetailsRepo;


    @Override
    public List<Myorder> getAllMyOrders(int user_Id) {
        if (userRepo.existsById(user_Id)) {
            User user = userRepo.findById(user_Id).get();
            return myOrderRepo.findAllByUser(user);
        }
        return null;
    }

    @Override
    public String addMyOrder(Myorder myorder) {
        //Get Current User
        User user = myorder.getUser();

        //Get all cart items of current user
        List<Cart> cartItems = cartRepo.findAllByUser(user);

        //Save myOrder and get reference
        Myorder myOrderSaved = myOrderRepo.save(myorder);

        //Create List of OrderDetails for saving all into OrderDetails
        List<OrderDetails> orderDetailsList = new ArrayList<>();

        //Get each item from cart and save its details into OrderDetails
        for (Cart cartItem : cartItems) {
            OrderDetails orderDetails = new OrderDetails(cartItem.getProduct().getProdPrice(), cartItem.getCartQuantity(),
                    (cartItem.getProduct().getProdPrice() * cartItem.getCartQuantity()), myOrderSaved, cartItem.getProduct());

            //Add all orderDetails into OrderDetailsList
            orderDetailsList.add(orderDetails);
        }

        //SaveAll orderDetailsList
        orderDetailsRepo.saveAll(orderDetailsList);

        //Empty cart for Current user
        cartRepo.deleteAllByUser(user);

        return "Order Placed Successfully";
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
