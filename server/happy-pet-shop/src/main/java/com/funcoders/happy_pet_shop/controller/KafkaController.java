package com.funcoders.happy_pet_shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestParam("message") String message) {
        kafkaProducerService.sendMessage(message);
        return ResponseEntity.ok("Tin nhắn '" + message + "' đã được gửi tới Kafka!");
    }
}
