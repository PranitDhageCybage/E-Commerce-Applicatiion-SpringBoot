package com.app.service;

import com.app.dao.AddressRepository;
import com.app.dao.UserRepository;
import com.app.pojo.Address;
import com.app.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AddressServiceImpl implements IAddressService {

    @Autowired
    AddressRepository addressRepo;

    @Autowired
    UserRepository userRepo;

    @Override
    public List<Address> getAllAddresses(int user_id) {
        User user = userRepo.findById(user_id).get();
        return addressRepo.findAllByUser(user);
    }

    @Override
    public Address addAddress(Address address) {
        return addressRepo.save(address);
    }

    @Override
    public Address updateAddress(int add_id, Address newAddress) {
        Address oldAddress = addressRepo.findById(add_id).get();
        if (newAddress.getAddress() != null) oldAddress.setAddress(newAddress.getAddress());
        if (newAddress.getCity() != null) oldAddress.setCity(newAddress.getCity());
        if (newAddress.getState() != null) oldAddress.setState(newAddress.getState());
        if (newAddress.getCountry() != null) oldAddress.setCountry(newAddress.getCountry());
        if (newAddress.getPin() != null) oldAddress.setPin(newAddress.getPin());
        if (newAddress.getUser() != null) oldAddress.setUser(newAddress.getUser());
        return addressRepo.save(oldAddress);
    }

    @Override
    public String deleteAddress(int add_id) {
        if (addressRepo.existsById(add_id)) {
            addressRepo.deleteById(add_id);
            return "Address Deleted Successfully";
        }
        return "Address not Found";
    }
}
