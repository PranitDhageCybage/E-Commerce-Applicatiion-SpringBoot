package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dto.ResponseDTO;
import com.app.models.OrderDetails;
import com.app.service.IOrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orderDetails")
public class OrderDetailsController {

    @Autowired
    IOrderDetailsService orderDetailsService;

    public OrderDetailsController() {
        System.out.println("in OrderDetailsController -- " + getClass().getName());
    }

    @GetMapping("/list/{myorder_id}")/*---------------------------Admin/User getOrderDetailsList Done-----------------------------------------------*/
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseDTO getOrderDetailsList(@PathVariable String myorder_id) {
        System.out.println("in get all my order details");
        List<OrderDetails> orderDetailsList = orderDetailsService.getOrderDetailsList(Integer.parseInt(myorder_id));
        if (orderDetailsList.size() > 0) {
            return new ResponseDTO(true, orderDetailsList);
        }
        throw new ResourceNotFoundException("order Details list not found for the given myorder id");
    }

}
