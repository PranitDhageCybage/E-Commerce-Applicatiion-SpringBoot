package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.dto.ResponseDTO;
import com.app.models.Company;
import com.app.service.ICompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    ICompanyService companyService;

    public CompanyController() {
        System.out.println("in CompanyController -- " + getClass().getName());
    }

    @GetMapping("/list")  /*----------------------------------------------------- Admin get All Company List Done*--------------------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO getAllCompanyList() {
        System.out.println("in  get all company list");
        return new ResponseDTO(true, companyService.getAllCompanies());
    }

    @GetMapping("/details/{compId}") /*---------------------------------- Admin get Company Details Done*--------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO getCompanyDetailsById(@PathVariable String compId) {
        System.out.println("in  company details");
        Company company = companyService.getCompanyDetailsById(Integer.parseInt(compId));
        if (company != null) {
            return new ResponseDTO(true, company);
        }
        throw new ResourceNotFoundException("Company list not found");
    }

    @PostMapping("/add")/*---------------------------------- Admin add New Company Done*--------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO addNewCompany(@RequestBody Company company) {
        System.out.println("in  add new company");
        Company comp = companyService.addCompany(company);
        if (comp != null) {
            return new ResponseDTO(true, "Company added successfully");
        }
        throw new UnexpectedErrorException("Error while adding new  company");
    }

    @PutMapping("/update/{compId}")/*---------------------------------- Admin update Company Done*--------------------------------------*/
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO updateCompany(@RequestBody Company company, @PathVariable String compId) {
        System.out.println("in  update company");
        Company comp = companyService.updateCompany(Integer.parseInt(compId), company);
        if (comp != null) {
            return new ResponseDTO(true, "Company updated successfully");
        }
        throw new UnexpectedErrorException("Error while updating company");
    }

    @DeleteMapping("/delete/{compId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseDTO deleteCompany(@PathVariable String compId) {
        System.out.println("in  Delete company");
        return new ResponseDTO(true, companyService.deleteCompany(Integer.parseInt(compId)));
    }

}
