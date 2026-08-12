package com.funcoders.happy_pet_shop.repository.customRepository;

import jakarta.persistence.EntityManager;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
public class CustomProductRepositoryImpl implements CustomProductRepository {

    EntityManager entityManager;

    @Override
    public int decreaseQuantity(UUID id, int q) {
        String jpql = """
                UPDATE Product p 
                SET p.quantity = p.quantity - :q
                WHERE p.id = :id AND p.quantity >= :q 
                """;
        return entityManager
                .createQuery(jpql)
                .setParameter("id", id)
                .setParameter("q", q)
                .executeUpdate();
    }
}
