package com.funcoders.happy_pet_shop.controller;

import com.funcoders.happy_pet_shop.kafkaDTO.KafkaEvent;
import com.funcoders.happy_pet_shop.kafka_producer.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEvent(@RequestParam("eventType") String eventType, @RequestParam("message") String message) {
        KafkaEvent event = KafkaEvent.builder()
                .eventType(eventType)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();

        kafkaProducerService.sendEvent(event);

        return ResponseEntity.ok("Event đã được gửi tới Kafka!");
    }
}
