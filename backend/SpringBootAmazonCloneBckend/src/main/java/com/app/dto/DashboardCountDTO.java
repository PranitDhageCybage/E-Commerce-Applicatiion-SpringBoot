package com.app.dto;

import lombok.Data;
<<<<<<< HEAD
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.persistence.Column;

@Data
@ConfigurationProperties(value = "userCount, productCount, MyOrderCount, ActiveOrderCount, companyCount, categoryCount")
public class DashboardCountDTO {
    @Column(name = "userCount")
    private Integer userCount = 0;
    @Column(name = "productCount")
    private Integer productCount = 0;
    @Column(name = "MyOrderCount")
    private Integer MyOrderCount = 0;
    @Column(name = "ActiveOrderCount")
    private Integer ActiveOrderCount = 0;
    @Column(name = "companyCount")
    private  Integer companyCount = 0;
    @Column(name = "categoryCount")
=======

@Data
public class DashboardCountDTO {
    private Integer userCount = 0;
    private Integer productCount = 0;
    private Integer MyOrderCount = 0;
    private Integer ActiveOrderCount = 0;
    private  Integer companyCount = 0;
>>>>>>> origin/main
    private  Integer categoryCount = 0;
}
