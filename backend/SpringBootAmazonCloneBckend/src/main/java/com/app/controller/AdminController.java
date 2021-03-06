package com.app.controller;

import com.app.dto.DashboardCountDTO;
import com.app.dto.ResponseDTO;
import com.app.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    ICompanyService companyService;

    @Autowired
    ICategoryService categoryService;

    public AdminController() {
        System.out.println("in AdminController --" + getClass().getName());
    }

    @GetMapping("/userList")/*--------------------------------------------- Admin getAllUserList Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO getAllUserList() {
        System.out.println("in admin get all user list");
        return new ResponseDTO(true, userService.getUsersListAll());
    }

    @PutMapping("/userStatus")/*--------------------------------------------- Admin changeUserActiveStatus Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO changeUserActiveStatus(@RequestParam String user_id, @RequestParam String status) {
        System.out.println("in admin change user active status");
        return new ResponseDTO(true, userService.changeUserActiveStatus(Integer.parseInt(user_id), Integer.parseInt(status)));
    }

    @GetMapping("/allUserOrders")/*--------------------------------------------- Admin getAllUserOrders Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO getAllUserOrders() {
        System.out.println("in admin get all user orders");
        return new ResponseDTO(true, orderService.getAllUserOrders());
    }

    @PutMapping("/changeDeliveryStatus")/*--------------------------------------------- Admin changeUserOrderDeliveryStatus Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO changeUserOrderDeliveryStatus(@RequestParam String myorder_id, @RequestParam String status) {
        System.out.println("in admin change user order delivery status status");
        return new ResponseDTO(true, orderService.changeUserOrderDeliveryStatus(Integer.parseInt(myorder_id), status));
    }

    @GetMapping("/dashboard-count") /*--------------------------------------------- Admin getAllDashboardCount Done-------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO getAllDashboardCount() {
        DashboardCountDTO countDTO = new DashboardCountDTO();
        countDTO.setUserCount(userService.getAllUserCount());
        countDTO.setProductCount(productService.countAllProduct());
        countDTO.setMyOrderCount(orderService.countAllUserOrders());
        countDTO.setActiveOrderCount(orderService.countAllActiveUserOrders());
        countDTO.setCompanyCount(companyService.countAllCompany());
        countDTO.setCategoryCount(categoryService.countAllCategory());
        return new ResponseDTO(true, countDTO);
    }

}
