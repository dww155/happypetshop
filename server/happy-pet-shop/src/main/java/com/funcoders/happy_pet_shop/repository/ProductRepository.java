package com.funcoders.happy_pet_shop.repository;

import com.funcoders.happy_pet_shop.entity.Product;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Modifying
    @Query("""
        UPDATE Product p
        SET p.quantity = p.quantity - :q
        WHERE p.id = :id AND p.quantity >= :q
    """)
    int decreaseQuantity(@Param("id") UUID id, @Param("q") int q);
}
