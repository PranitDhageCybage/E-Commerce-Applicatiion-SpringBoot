package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dto.DashboardCountDTO;
import com.app.pojo.Myorder;
import com.app.pojo.User;
import com.app.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Autowired
    ICompanyService companyService;

    @Autowired
    ICategoryService categoryService;

    public AdminController() {
        System.out.println("in " + getClass().getName());
    }

    @GetMapping("/userList")
    public ResponseEntity getAllUserList() {
        System.out.println("in admin get all user list");
        List<User> userList = userService.getUsersListAll();
        if (userList.size() > 0) {
            return new ResponseEntity(userList, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("User list not found");
    }

    @PutMapping("/userStatus/{user_id}/{status}")
    public ResponseEntity changeUserActiveStatus(@PathVariable String user_id, @PathVariable String status) {
        System.out.println("in admin change user active status");
        return new ResponseEntity(userService.changeUserActiveStatus(Integer.parseInt(user_id), Integer.parseInt(status)), HttpStatus.OK);
    }

    @GetMapping("/allUserOrders")
    public ResponseEntity getAllUserOrders() {
        System.out.println("in admin get all user orders");
        List<Myorder> myorderList = orderService.getAllUserOrders();
        if (myorderList.size() > 0) {
            return new ResponseEntity(myorderList, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("User orders list not found");
    }

    @PutMapping("/changeDeliveryStatus/{myorder_id}/{status}")
    public ResponseEntity changeUserOrderDeliveryStatus(@PathVariable String myorder_id, @PathVariable String status) {
        System.out.println("in admin change user order delivery status status");
        return new ResponseEntity(orderService.changeUserOrderDeliveryStatus(Integer.parseInt(myorder_id), status), HttpStatus.OK);
    }

    @GetMapping("/dashboard-count")
    public ResponseEntity getAllDashboardQuantity() {
        DashboardCountDTO countDTO = new DashboardCountDTO();
        countDTO.setUserCount(userService.getAllUserCount());
        countDTO.setProductCount(productService.countAllProduct());
        countDTO.setMyOrderCount(orderService.countAllUserOrders());
        countDTO.setActiveOrderCount(orderService.countAllActiveUserOrders());
        countDTO.setCompanyCount(companyService.countAllCompany());
        countDTO.setCategoryCount(categoryService.countAllCategory());
        return new ResponseEntity(countDTO, HttpStatus.OK);
    }

}
