package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.pojo.Address;
import com.app.service.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        List<Address> addressList = addressService.getAllAddresses(Integer.parseInt(user_id));
        if (addressList.size() > 0) {
            return new ResponseEntity(addressList, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Addresses not found for user");
    }

    @PostMapping("/add")
    public ResponseEntity addNewAddress(@RequestBody Address address) {
        System.out.println("in add new address");
        Address add = addressService.addAddress(address);
        if (add != null) {
            return new ResponseEntity("Address added successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while adding new address");
    }

    @PutMapping("/update/{add_id}")
    public ResponseEntity updateAddress(@PathVariable String add_id, @RequestBody Address address) {
        System.out.println("in update  address");
        Address add = addressService.updateAddress(Integer.parseInt(add_id), address);
        if (add != null) {
            return new ResponseEntity("Address Updated successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while updating address");
    }

    @DeleteMapping("/delete/{add_id}")
    public ResponseEntity deleteAddress(@PathVariable String add_id) {
        System.out.println("in delete  address");
        return new ResponseEntity(addressService.deleteAddress(Integer.parseInt(add_id)), HttpStatus.OK);
    }
}