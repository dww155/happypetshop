package com.funcoders.happy_pet_shop.repository.customRepository;

import java.util.UUID;

public interface CustomProductRepository {
    int decreaseQuantity(UUID id, int q);

}
