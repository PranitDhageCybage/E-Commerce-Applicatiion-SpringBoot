package com.app.controller;

import com.app.dto.ResponseDTO;
import com.app.models.Myorder;
import com.app.service.IMyOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/myOrder")
public class MyOrderController {
    @Autowired
    IMyOrderService myOrderService;

    public MyOrderController() {
        System.out.println("in MyOrderController -- " + getClass().getName());
    }

    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO getAllUserOrderList() {
        System.out.println("in get all user Order list");/*-------------------------------Admin getAllUserOrderList Done-----------------------------------*/
        return new ResponseDTO(true, myOrderService.getAllUserOrders());
    }


    @GetMapping("/list/{user_id}")/*-------------------------------User getMyOrderList Done-----------------------------------*/
    @PreAuthorize("hasRole('USER')")
    public ResponseDTO getMyOrderList(@PathVariable String user_id) {
        System.out.println("in get all myOrder list");
        return new ResponseDTO(true, myOrderService.getMyOrderList(Integer.parseInt(user_id)));
    }

    @PostMapping("/checkout")/*-------------------------------User checkoutMyOrder Done-----------------------------------*/
    @PreAuthorize("hasRole('USER')")
    public ResponseDTO checkoutMyOrder(@RequestBody Myorder myorder) {
        System.out.println("in add new myOrder" + myorder);
        return new ResponseDTO(true, myOrderService.checkoutMyOrder(myorder));
    }

    @PutMapping("/update")/*-------------------------------Admin/User updateMyOrderStatus Done-----------------------------------*/
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseDTO updateMyOrderStatus(@RequestParam String myOrder_id, @RequestParam String status) {
        System.out.println("in update  update myOrder status");
        return new ResponseDTO(true, myOrderService.updateMyOrderStatus(Integer.parseInt(myOrder_id), status));
    }

    @DeleteMapping("/delete/{myOrder_id}")/*-------------------------------Admin/User deleteMyOrder Done-----------------------------------*/
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseDTO deleteMyOrder(@PathVariable String myOrder_id) {
        System.out.println("in delete  myOrder");
        return new ResponseDTO(true, myOrderService.deleteMyOrder(Integer.parseInt(myOrder_id)));
    }

}
