package com.app.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ErrorResponse {
	private String message;
	private LocalDateTime timeStamp;
	private String errorDetails;
	public ErrorResponse() {
		// TODO Auto-generated constructor stub
	}
	public ErrorResponse(String message,String errDetails) {
		super();
		this.message = message;
		this.errorDetails=errDetails;
		this.timeStamp=LocalDateTime.now();
	}

}
