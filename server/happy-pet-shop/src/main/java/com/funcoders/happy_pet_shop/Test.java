package com.funcoders.happy_pet_shop;

import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.TimeZone;

public class Test {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        System.out.println(now.getHour());
        System.out.println(now.getMinute());
        System.out.println(now.getSecond());
        System.out.println(TimeZone.getDefault());
    }
}
