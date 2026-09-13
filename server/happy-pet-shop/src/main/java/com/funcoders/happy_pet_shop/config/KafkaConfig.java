package com.funcoders.happy_pet_shop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

@EnableKafka
@Configuration
public class KafkaConfig {
    // Không cần khai báo Bean thủ công ở đây.
    // Spring Boot Auto-Config sẽ tự tạo KafkaTemplate, ConsumerFactory,
    // và ConcurrentKafkaListenerContainerFactory dựa trên application.yaml
}
