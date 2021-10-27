package com.app.dto;

import com.app.pojo.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Data
public class UserDTO {

    @JsonProperty("user_id")
    private Integer userId;

    @JsonProperty("name")
    private String userName;

    @JsonProperty("phone")
    private String userPhone;

    @JsonProperty("email")
    private String userEmail;

    @JsonProperty("status")
    private Integer userStatus;

    @Enumerated(value = EnumType.STRING)
    @JsonProperty("role")
    private Role userRole;
}
