package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.pojo.Myorder;
import com.app.service.IMyOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/myOrder")
public class MyOrderController {
    @Autowired
    IMyOrderService myOrderService;

    public MyOrderController() {
        System.out.println("in MyOrderController -- " + getClass().getName());
    }

    @GetMapping("/list/{user_id}")
    public ResponseEntity getAllMyOrderList(@PathVariable String user_id) {
        System.out.println("in get all myOrder list");
       List<Myorder> myorderList = myOrderService.getAllMyOrders(Integer.parseInt(user_id));
        if (myorderList.size() > 0) {
            return new ResponseEntity(myorderList, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Myorder list not found for the user");
    }

    @PostMapping("/checkout")
    public ResponseEntity checkoutMyOrder(@RequestBody Myorder myorder) {
        System.out.println("in add new myOrder" + myorder);
        return new ResponseEntity(myOrderService.checkoutMyOrder(myorder), HttpStatus.OK);
    }

    @PutMapping("/update/{myOrder_id}/{status}")
    public ResponseEntity updateMyOrderStatus(@PathVariable String myOrder_id, @PathVariable String status) {
        System.out.println("in update  update myOrder status");
        return new ResponseEntity(myOrderService.updateMyOrderStatus(Integer.parseInt(myOrder_id), status), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{myOrder_id}")
    public ResponseEntity deleteMyOrder(@PathVariable String myOrder_id) {
        System.out.println("in delete  myOrder");
        return new ResponseEntity(myOrderService.deleteMyOrder(Integer.parseInt(myOrder_id)), HttpStatus.OK);
    }

}
