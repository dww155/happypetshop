package com.funcoders.happy_pet_shop.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KafkaEvent {
    private String eventType;   // Loại sự kiện: ORDER_CREATED, PAYMENT_SUCCESS, ...
    private String message;     // Nội dung tin nhắn
    private LocalDateTime timestamp; // Thời gian tạo sự kiện
}
