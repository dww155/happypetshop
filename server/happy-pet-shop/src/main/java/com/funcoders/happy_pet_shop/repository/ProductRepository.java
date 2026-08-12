package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.Product;
import com.funcoders.happy_pet_shop.repository.customRepository.CustomProductRepository;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, CustomProductRepository {
}
