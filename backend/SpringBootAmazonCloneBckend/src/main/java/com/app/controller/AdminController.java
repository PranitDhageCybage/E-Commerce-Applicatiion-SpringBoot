package com.app.controller;

import com.app.service.IMyOrderService;
import com.app.service.IProductService;
import com.app.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    IUserService userService;

    @Autowired
    IMyOrderService orderService;

    @Autowired
    IProductService productService;

    public AdminController() {
        System.out.println("in " + getClass().getName());
    }

    @GetMapping("/userList")
    public ResponseEntity getAllUserList() {
        System.out.println("in admin get all user list");
        return new ResponseEntity(userService.getUsersListAll(), HttpStatus.OK);
    }

    @PutMapping("/userStatus/{user_id}/{status}")
    public ResponseEntity changeUserActiveStatus(@PathVariable String user_id, @PathVariable String status) {
        System.out.println("in admin change user active status");
        return new ResponseEntity(userService.changeUserActiveStatus(Integer.parseInt(user_id), Integer.parseInt(status)), HttpStatus.OK);
    }

    @GetMapping("/allUserOrders")
    public ResponseEntity getAllUserOrders() {
        System.out.println("in admin get all user orders");
        return new ResponseEntity(orderService.getAllUserOrders(), HttpStatus.OK);
    }

    @PutMapping("/changeDeliveryStatus/{myorder_id}/{status}")
    public ResponseEntity changeUserOrderDeliveryStatus(@PathVariable String myorder_id, @PathVariable String status) {
        System.out.println("in admin change user order delivery status status");
        return new ResponseEntity(orderService.changeUserOrderDeliveryStatus(Integer.parseInt(myorder_id), status), HttpStatus.OK);
    }

}
