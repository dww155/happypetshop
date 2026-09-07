package com.funcoders.happy_pet_shop.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KafkaConsumerService {

    // Lắng nghe topic "pet-shop-topic" với groupId "order-group" (đã cấu hình sẵn trong application.yaml)
    @KafkaListener(topics = "pet-shop-topic", groupId = "order-group")
    public void consumeMessage(String message) {
        log.info("Consumer đã nhận được tin nhắn từ Kafka: {}", message);
        
        // Thực hiện xử lý logic tại đây: cập nhật trạng thái đơn hàng, gửi thông báo, v.v.
    }
}
