package com.funcoders.happy_pet_shop.kafka_producer;

import com.funcoders.happy_pet_shop.kafkaDTO.KafkaEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, KafkaEvent> kafkaTemplate;

    public void sendEvent(KafkaEvent event) {
        String topic = "pet-shop-topic";
        log.info("Đang gửi event tới Kafka topic {}: {}", topic, event);
        kafkaTemplate.send(topic, event).whenComplete((result, ex) -> {
            if (ex == null) {
                System.out.println("Gửi thành công, offset: " + result.getRecordMetadata().offset());
            } else {
                System.err.println("Gửi thất bại: " + ex.getMessage());
            }
        });
    }
}
