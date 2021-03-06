package com.app.service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.repository.CompanyRepositary;
import com.app.models.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CompanyServiceImpl implements ICompanyService {

    @Autowired
    CompanyRepositary companyRepo;

    @Override
    public List<Company> getAllCompanies() {
        return companyRepo.findAll();
    }

    @Override
    public Company addCompany(Company company) {
        return companyRepo.save(company);
    }

    @Override
    public Company updateCompany(int compId, Company newCompany) {
        if (companyRepo.existsById(compId)) {
            Company oldCompany = companyRepo.findById(compId).get();
            if (newCompany.getCompTitle() != "") oldCompany.setCompTitle(newCompany.getCompTitle());
            if (newCompany.getCompDescription() != "") oldCompany.setCompDescription(newCompany.getCompDescription());
            return companyRepo.save(oldCompany);
        }
        throw new ResourceNotFoundException("Company not found for given comp Id : " + compId);
    }

    @Override
    public String deleteCompany(int compId) {
        if (companyRepo.existsById(compId)) {
            companyRepo.deleteById(compId);
            return "Company Deleted Successfully ";
        }
        throw new ResourceNotFoundException("Company not found for given comp Id : " + compId);
    }

    @Override
    public Integer countAllCompany() {
        return companyRepo.findAll().size();
    }

    @Override
    public Company getCompanyDetailsById(int compId) {
        return companyRepo.findById(compId).orElseThrow(() -> new ResourceNotFoundException("Company not found for given comp Id : " + compId));
    }
}
