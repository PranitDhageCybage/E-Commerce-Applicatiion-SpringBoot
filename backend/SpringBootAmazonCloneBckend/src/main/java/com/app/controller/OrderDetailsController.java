package com.app.controller;

import com.app.service.IOrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return new ResponseEntity(orderDetailsService.getAllMyOrderDetails(Integer.parseInt(myorder_id)), HttpStatus.OK);
    }

    @GetMapping("/admin//list")
    public ResponseEntity getAllUserOrderDetailsList() {
        System.out.println("in get all user order details for admin");
        return new ResponseEntity(orderDetailsService.getAllUserOrderDetails(), HttpStatus.OK);
    }
}
