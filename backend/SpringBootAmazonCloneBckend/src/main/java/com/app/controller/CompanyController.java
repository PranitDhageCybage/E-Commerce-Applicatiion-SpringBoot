package com.app.controller;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.customExceptions.UnexpectedErrorException;
import com.app.pojo.Company;
import com.app.service.ICompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    ICompanyService companyService;

    public CompanyController() {
        System.out.println("in " + getClass().getName());
    }

    @GetMapping("/list")
    public ResponseEntity getAllCompanyList() {
        System.out.println("in  get all company list");
        List<Company> companyList = companyService.getAllCompanies();
        if (companyList.size() > 0) {
            return new ResponseEntity(companyList, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Company list not found");
    }

    @PostMapping("/add")
    public ResponseEntity addNewCompany(@RequestBody Company company) {
        System.out.println("in  add new company");
        Company comp = companyService.addCompany(company);
        if (comp != null) {
            return new ResponseEntity("Company added successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while adding new  company");
    }

    @PutMapping("/update/{compid}")
    public ResponseEntity updateCompany(@RequestBody Company company, @PathVariable String compid) {
        System.out.println("in  update company");
        Company comp = companyService.updateCompany(Integer.parseInt(compid), company);
        if (comp != null) {
            return new ResponseEntity("Company updated successfully", HttpStatus.OK);
        }
        throw new UnexpectedErrorException("Error while updating company");
    }

    @DeleteMapping("/delete/{compid}")
    public ResponseEntity deleteCompany(@PathVariable String compid) {
        System.out.println("in  Delete company");
        return new ResponseEntity(companyService.deleteCompany(Integer.parseInt(compid)), HttpStatus.OK);
    }

}
