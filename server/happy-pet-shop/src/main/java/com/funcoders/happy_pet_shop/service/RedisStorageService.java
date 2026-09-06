package com.funcoders.happy_pet_shop.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RedisStorageService {
    RedisTemplate<String, String> redisTemplate;

    public void setCache(String key, String value, long exp) {
        redisTemplate.opsForValue().set(key, value, Duration.ofMinutes(exp));
    }
}
