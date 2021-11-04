package com.app.dto;

import lombok.Data;

@Data
public class DashboardCountDTO {
    private Integer userCount = 0;
    private Integer productCount = 0;
    private Integer MyOrderCount = 0;
    private Integer ActiveOrderCount = 0;
    private  Integer companyCount = 0;
    private  Integer categoryCount = 0;
}
