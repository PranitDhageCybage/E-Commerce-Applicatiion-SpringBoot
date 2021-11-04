package com.app.service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.*;
import com.app.pojo.*;
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

    @Autowired
    ProductRepository productRepo;


    @Override
    public List<Myorder> getAllMyOrders(int user_Id) {
        if (userRepo.existsById(user_Id)) {
            User user = userRepo.findById(user_Id).get();
            return myOrderRepo.findAllByUser(user);
        }
        throw new ResourceNotFoundException("My Order not found for given user Id : " + user_Id);
    }

    @Override
    public String checkoutMyOrder(Myorder myorder) {
        try {
            //Get Current User
            User user = myorder.getUser();

            //Get all cart items of current user
            List<Cart> cartItems = cartRepo.findAllByUser(user);

            //Calculate total amount
            double totalAmount = 0.0;
            for (Cart item: cartItems){
               totalAmount+=  item.getProduct().getProdPrice() * item.getCartQuantity();
            }

            //Set total amount and tax to myOrder
            myorder.setTotalPrice((float) totalAmount);
            myorder.setTax((float) (totalAmount / 10));

            //Save myOrder and get reference
            Myorder myOrderSaved = myOrderRepo.save(myorder);

            //Create List of OrderDetails for saving all into OrderDetails
            List<OrderDetails> orderDetailsList = new ArrayList<>();

            //Get each item from cart and save its details into OrderDetails
            for (Cart cartItem : cartItems) {
                OrderDetails orderDetails = new OrderDetails(cartItem.getProduct().getProdPrice(), cartItem.getCartQuantity(),
                        (cartItem.getProduct().getProdPrice() * cartItem.getCartQuantity()), myOrderSaved, cartItem.getProduct());

                //Reduce Product Quantity by Purchased Quantity
                int prodId = cartItem.getProduct().getProdId();
                Products product = productRepo.findById(prodId).get();
                product.setProdQty(product.getProdQty() - cartItem.getCartQuantity());
                productRepo.save(product);

                //Add all orderDetails into OrderDetailsList
                orderDetailsList.add(orderDetails);
            }

            //SaveAll orderDetailsList
            orderDetailsRepo.saveAll(orderDetailsList);

            //Empty cart for Current user
            cartRepo.deleteAllByUser(user);

            return "Order Placed Successfully";

        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            return "Error while placing order";
        }
    }

    @Override
    public Myorder updateMyOrderStatus(int myOrder_id, String status) {
        if (myOrderRepo.existsById(myOrder_id)) {
            Myorder myorder = myOrderRepo.findById(myOrder_id).get();
            if (status != myorder.getDeliveryStatus()) myorder.setDeliveryStatus(status);
            return myOrderRepo.save(myorder);
        }
        throw new ResourceNotFoundException("My Order not found for given myOrder Id : " + myOrder_id);
    }

    @Override
    public String deleteMyOrder(int myOrder_id) {
        if (myOrderRepo.existsById(myOrder_id)) {
            myOrderRepo.deleteById(myOrder_id);
            return "MyOrder deleted successfully";
        }
        throw new ResourceNotFoundException("My Order not found for given myOrder Id : " + myOrder_id);
    }

    @Override
    public List<Myorder> getAllUserOrders() {
        return myOrderRepo.findAll();
    }

    @Override
    public String changeUserOrderDeliveryStatus(int myOrder_id, String status) {
        if (myOrderRepo.existsById(myOrder_id)) {
            Myorder myorder = myOrderRepo.findById(myOrder_id).get();
            myorder.setDeliveryStatus(status);
            myOrderRepo.save(myorder);
            return "User order delivery status changed successfully";
        }
        throw new ResourceNotFoundException("My Order not found for given myOrder Id : " + myOrder_id);
    }

    @Override
    public Integer countAllUserOrders() {
        return myOrderRepo.countAllUserOrders();
    }

    @Override
    public Integer countAllActiveUserOrders() {
        return myOrderRepo.countAllActiveUserOrders();
    }
}
