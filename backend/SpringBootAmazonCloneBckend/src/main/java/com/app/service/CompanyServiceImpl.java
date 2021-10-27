package com.app.service;

import com.app.dao.CompanyRepositary;
import com.app.pojo.Company;
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
        Company oldCompany = companyRepo.findById(compId).get();
        if (newCompany.getCompTitle() != "") oldCompany.setCompTitle(newCompany.getCompTitle());
        if (newCompany.getCompDescription() != "") oldCompany.setCompDescription(newCompany.getCompDescription());
        if (newCompany.getCategory() != null) oldCompany.setCategory(newCompany.getCategory());
        return companyRepo.save(oldCompany);
    }

    @Override
    public String deleteCompany(int compId) {
        companyRepo.deleteById(compId);
        return "Company Deleted Successfully ";
    }
}
