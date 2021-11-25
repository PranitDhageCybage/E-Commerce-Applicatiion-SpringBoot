package com.app.controller;

import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ResponseDTO;
import com.app.models.Cart;
import com.app.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/list/{user_id}")/*--------------------------------------------User getAllCartItemList Done-----------------------------------------------*/
    @PreAuthorize("hasRole('USER')")
    public ResponseDTO getAllCartItemList(@PathVariable String user_id) {
        System.out.println("in get all cart item list");
        return new ResponseDTO(true, cartService.getAllCartItems(Integer.parseInt(user_id)));
    }

    @PostMapping("/add")/*--------------------------------------------User addNewCartIem Done-----------------------------------------------*/
    @PreAuthorize("hasRole('USER')")
    public ResponseDTO addNewCartIem(@RequestBody Cart cartItem) {
        System.out.println("in add new cart item");
        Cart cart = cartService.addCartItem(cartItem);
        if (cart != null) {
            return new ResponseDTO(true, "Product added into cart successfully");
        }
        throw new UnexpectedErrorException("Error while adding new  product to cart");
    }

    @PutMapping("/update")/*--------------------------------------------User updateCartItemQty Done-----------------------------------------------*/
    @PreAuthorize("hasRole('USER')")
    public ResponseDTO updateCartItemQty(@RequestParam String cart_id, @RequestParam String cart_quantity) {
        System.out.println("in update  cart item quantity");
        Cart cart = cartService.updateCartItemQty(Integer.parseInt(cart_id), Integer.parseInt(cart_quantity));
        if (cart != null) {
            return new ResponseDTO(true, "Product Quantity updated  successfully");
        }
        throw new UnexpectedErrorException("Error while updating cart item");
    }

    @DeleteMapping("/delete/{cart_id}")/*--------------------------------------------User deleteCartItem Done-----------------------------------------------*/
    @PreAuthorize("hasRole('USER')")
    public ResponseDTO deleteCartItem(@PathVariable String cart_id) {
        System.out.println("in delete  cart item");
        return new ResponseDTO(true, cartService.deleteCartItem(Integer.parseInt(cart_id)));
    }

    @DeleteMapping("/deleteAll/{user_id}")
    public ResponseEntity deleteAllCartItemsByUser(@PathVariable String user_id) {
        System.out.println("in delete All  cart item");
        return new ResponseEntity(cartService.deleteAllCartItemByUser(Integer.parseInt(user_id)), HttpStatus.OK);
    }
}
