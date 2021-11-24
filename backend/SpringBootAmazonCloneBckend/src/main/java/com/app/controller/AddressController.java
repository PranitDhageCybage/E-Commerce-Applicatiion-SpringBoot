package com.app.controller;

import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ResponseDTO;
import com.app.models.Address;
import com.app.service.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/list/{user_id}")/*------------------------------------------------- User getAllAddressList Done---------------------------------------*/
    public ResponseDTO getAllAddressList(@PathVariable String user_id) {
        System.out.println("in get all address");
            return new ResponseDTO(true, addressService.getAllAddresses(Integer.parseInt(user_id)));
    }

    @PostMapping("/add")/*------------------------------------------------- User addNewAddress Done---------------------------------------*/
    public ResponseDTO addNewAddress(@RequestBody Address address) {
        System.out.println("in add new address");
        Address add = addressService.addAddress(address);
        if (add != null) {
            return new ResponseDTO(true, "Address added successfully");
        }
        throw new UnexpectedErrorException("Error while adding new address");
    }

    @PutMapping("/update/{add_id}")
    public ResponseDTO updateAddress(@PathVariable String add_id, @RequestBody Address address) {
        System.out.println("in update  address");
        Address add = addressService.updateAddress(Integer.parseInt(add_id), address);
        if (add != null) {
            return new ResponseDTO(true, "Address Updated successfully");
        }
        throw new UnexpectedErrorException("Error while updating address");
    }

    @DeleteMapping("/delete/{add_id}")/*------------------------------------------------- User deleteAddress Done---------------------------------------*/
    public ResponseDTO deleteAddress(@PathVariable String add_id) {
        System.out.println("in delete  address");
        return new ResponseDTO(true, addressService.deleteAddress(Integer.parseInt(add_id)));
    }
}