package com.app.controller;

import com.app.pojo.Address;
import com.app.service.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/address")
public class AddressController {
    @Autowired
    IAddressService addressService;

    public AddressController() {
        System.out.println("in" + getClass().getName());
    }

    @GetMapping("/list/{user_id}")
    public ResponseEntity getAllAddressList(@PathVariable String user_id) {
        System.out.println("in get all address");
        return new ResponseEntity(addressService.getAllAddresses(Integer.parseInt(user_id)), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addNewAddress(@RequestBody Address address) {
        System.out.println("in add new address");
        return new ResponseEntity(addressService.addAddress(address), HttpStatus.OK);
    }

    @PutMapping("/update/{add_id}")
    public ResponseEntity updateAddress(@PathVariable String add_id, @RequestBody Address address) {
        System.out.println("in update  address");
        return new ResponseEntity(addressService.updateAddress(Integer.parseInt(add_id), address), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{add_id}")
    public ResponseEntity deleteAddress(@PathVariable String add_id) {
        System.out.println("in delete  address");
        return new ResponseEntity(addressService.deleteAddress(Integer.parseInt(add_id)), HttpStatus.OK);
    }
}