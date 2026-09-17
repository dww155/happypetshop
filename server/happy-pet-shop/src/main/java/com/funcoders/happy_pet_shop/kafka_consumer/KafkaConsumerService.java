package com.funcoders.happy_pet_shop.kafka_consumer;

import com.funcoders.happy_pet_shop.kafkaDTO.KafkaEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KafkaConsumerService {

    @KafkaListener(topics = "pet-shop-topic", groupId = "order-group")
    public void consumeEvent(KafkaEvent event) {
        log.info("Consumer đã nhận được event từ Kafka:");
        log.info("  - Event Type: {}", event.getEventType());
        log.info("  - Message: {}", event.getMessage());
        log.info("  - Timestamp: {}", event.getTimestamp());
    }
}
