package com.habersitesi.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String sifre;
}
