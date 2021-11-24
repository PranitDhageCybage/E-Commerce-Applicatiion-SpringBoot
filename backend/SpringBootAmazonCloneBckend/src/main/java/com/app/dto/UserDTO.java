package com.app.dto;

import com.app.models.ERole;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Integer userId;

    private String userName;

    private String userPhone;

    private String userEmail;

    private Integer userStatus;

    private ERole userERole;

    private Date date;

}
