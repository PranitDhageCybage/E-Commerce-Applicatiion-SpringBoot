package com.app.dao;

import com.app.pojo.Address;
import com.app.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findAllByUserUserId(int userId);
}
