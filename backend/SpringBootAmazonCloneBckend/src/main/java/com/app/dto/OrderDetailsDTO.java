package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderDetailsDTO {
    @JsonProperty("price")
    private Float price;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("total_amount")
    private Float totalAmount;

}
