package com.app.service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.AddressRepository;
import com.app.dao.UserRepository;
import com.app.pojo.Address;
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
            return addressRepo.findAllByUserUserId(user_id);
    }

    @Override
    public Address addAddress(Address address) {
        return addressRepo.save(address);
    }

    @Override
    public Address updateAddress(int add_id, Address newAddress) {
        if (addressRepo.existsById(add_id)) {
            Address oldAddress = addressRepo.findById(add_id).get();
            if (newAddress.getAddress() != null) oldAddress.setAddress(newAddress.getAddress());
            if (newAddress.getCity() != null) oldAddress.setCity(newAddress.getCity());
            if (newAddress.getState() != null) oldAddress.setState(newAddress.getState());
            if (newAddress.getCountry() != null) oldAddress.setCountry(newAddress.getCountry());
            if (newAddress.getPin() != null) oldAddress.setPin(newAddress.getPin());
            return addressRepo.save(oldAddress);
        }
        throw new ResourceNotFoundException("Address not found for given address Id : " + add_id);
    }

    @Override
    public String deleteAddress(int add_id) {
        if (addressRepo.existsById(add_id)) {
            addressRepo.deleteById(add_id);
            return "Address Deleted Successfully";
        }
        throw new ResourceNotFoundException("Address not found for given address Id : " + add_id);
    }
}
