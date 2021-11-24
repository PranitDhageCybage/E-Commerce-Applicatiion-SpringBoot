package com.app.repository;

import com.app.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepositary extends JpaRepository<Company, Integer> {
}