package com.funcoders.happy_pet_shop.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    // Sử dụng KafkaTemplate<String, Object> để tương thích với JsonSerializer trong file yaml
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendMessage(String message) {
        String topic = "pet-shop-topic";
        log.info("Đang gửi tin nhắn tới Kafka topic {}: {}", topic, message);
        
        // Gửi tin nhắn tới topic
        kafkaTemplate.send(topic, message);
    }
}
