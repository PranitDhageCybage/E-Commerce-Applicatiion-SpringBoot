package com.app.controller;

import com.app.pojo.Cart;
import com.app.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

    @Autowired
    ICartService cartService;

    public CartController() {
        System.out.println("in CartController --  " + getClass().getName());
    }

    @GetMapping("/list/{user_id}")
    public ResponseEntity getAllCartItemList(@PathVariable String user_id) {
        System.out.println("in get all cart item list");
        return new ResponseEntity(cartService.getAllCartItems(Integer.parseInt(user_id)), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addNewCartIem(@RequestBody Cart cartItem) {
        System.out.println("in add new cart item");
        return new ResponseEntity(cartService.addCartItem(cartItem), HttpStatus.OK);
    }

    @PutMapping("/update/{cart_id}")
    public ResponseEntity updateCartItemQty(@PathVariable String cart_id, @RequestBody Cart cartItem) {
        System.out.println("in update  cart item quantity");
        return new ResponseEntity(cartService.updateCartItemQty(Integer.parseInt(cart_id), cartItem), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{cart_id}")
    public ResponseEntity deleteCartItem(@PathVariable String cart_id) {
        System.out.println("in delete  cart item");
        return new ResponseEntity(cartService.deleteCartItem(Integer.parseInt(cart_id)), HttpStatus.OK);
    }

    @DeleteMapping("/deleteAll/{user_id}")
    public ResponseEntity deleteAllCartItemsByUser(@PathVariable String user_id) {
        System.out.println("in delete All  cart item");
        return new ResponseEntity(cartService.deleteAllCartItemByUser(Integer.parseInt(user_id)), HttpStatus.OK);
    }
}
