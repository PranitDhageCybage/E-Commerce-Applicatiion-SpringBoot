package com.app.repository;

import com.app.models.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CredentialsRepository extends JpaRepository<Credentials, Integer> {
    Credentials findByEmail(String email);
}
