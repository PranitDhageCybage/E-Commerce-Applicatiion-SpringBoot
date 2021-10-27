package com.app.controller;

import com.app.pojo.Company;
import com.app.service.ICompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return new ResponseEntity(companyService.getAllCompanies(), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity addNewCompany(@RequestBody Company company) {
        System.out.println("in  add new company");
        return new ResponseEntity(companyService.addCompany(company), HttpStatus.OK);
    }

    @PutMapping("/update/{compid}")
    public ResponseEntity updateCompany(@RequestBody Company company, @PathVariable String compid) {
        System.out.println("in  update company");
        return new ResponseEntity(companyService.updateCompany(Integer.parseInt(compid), company), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{compid}")
    public ResponseEntity deleteCompany(@PathVariable String compid) {
        System.out.println("in  Delete company");
        return new ResponseEntity(companyService.deleteCompany(Integer.parseInt(compid)), HttpStatus.OK);
    }

}
