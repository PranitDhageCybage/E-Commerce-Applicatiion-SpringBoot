package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.pojo.OrderDetails;
import com.app.service.IOrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orderDetails")
public class OrderDetailsController {

    @Autowired
    IOrderDetailsService orderDetailsService;

    public OrderDetailsController() {
        System.out.println("in" + getClass().getName());
    }

    @GetMapping("/list/{myorder_id}")
    public ResponseEntity getAllMyOrderDetailsList(@PathVariable String myorder_id) {
        System.out.println("in get all my order details");
         List<OrderDetails> orderDetailsList = orderDetailsService.getAllMyOrderDetails(Integer.parseInt(myorder_id));
        if (orderDetailsList.size() > 0) {
            return new ResponseEntity(orderDetailsList, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("order Details list not found for the given myorder id");
    }

    @GetMapping("/admin//list")
    public ResponseEntity getAllUserOrderDetailsList() {
        System.out.println("in get all user order details for admin");
        List<OrderDetails> orderDetailsList = orderDetailsService.getAllUserOrderDetails();
        if (orderDetailsList.size() > 0) {
            return new ResponseEntity(orderDetailsList, HttpStatus.OK);
        }
        return new ResponseEntity("order Details list not found", HttpStatus.BAD_REQUEST);
    }
}
