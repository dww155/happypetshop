package com.funcoders.happy_pet_shop.configuration;

import com.funcoders.happy_pet_shop.constant.Unit;
import com.funcoders.happy_pet_shop.constant.UserRole;
import com.funcoders.happy_pet_shop.entity.Category;
import com.funcoders.happy_pet_shop.entity.Product;
import com.funcoders.happy_pet_shop.entity.Role;
import com.funcoders.happy_pet_shop.entity.User;
import com.funcoders.happy_pet_shop.repository.CategoryRepository;
import com.funcoders.happy_pet_shop.repository.ProductRepository;
import com.funcoders.happy_pet_shop.repository.RoleRepository;
import com.funcoders.happy_pet_shop.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Profile("!test")
public class ApplicationRunnerImpl implements ApplicationRunner {

    UserRepository userRepository;
    RoleRepository roleRepository;

    ProductRepository productRepository;

    CategoryRepository categoryRepository;

    PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Application init...");

//        seedProductsIfEmpty();

        if (!userRepository.existsByUsername("admin")) {

            Role adminRole = Role.builder()
                    .roleName(UserRole.ADMIN_ROLE)
                    .description("Administrator")
                    .build();

            Role userRole = roleRepository.save(
                    Role.builder()
                            .roleName(UserRole.USER_ROLE)
                            .description("Customers")
                            .build());

            Role staffRole = roleRepository.save(
                    Role.builder()
                            .roleName(UserRole.STAFF_ROLE)
                            .description("Staffs")
                            .build());

            Role managedAdminRole = roleRepository.save(adminRole);
            roleRepository.save(userRole);
            roleRepository.save(staffRole);
//            USERS
            Set<Role> roles = new HashSet<>();
            roles.add(managedAdminRole);

            User admin = User.builder()
                    .username("admin")
                    .phone("0911111111")
                    .password(passwordEncoder.encode("Asdf1234!"))
                    .roles(roles)
                    .build();

            userRepository.save(admin);
            log.info("Admin user created: username=admin, password=Asdf1234!");
        }

        // Seed pet shop categories if not present
        seedCategoriesIfEmpty();

        log.info("Application init successfully");
        log.info("localhost:8080/happy-pet-shop/swagger-ui/index.html");
    }

    private void seedCategoriesIfEmpty() {
        if (categoryRepository.count() > 0) {
            return;
        }
        var categories = java.util.List.of(
                Category.builder().name("Food & Treats").description("Dry food, wet food, treats and supplements for pets").build(),
                Category.builder().name("Toys").description("Toys and play items for dogs, cats and small animals").build(),
                Category.builder().name("Accessories").description("Collars, leashes, harnesses, bowls and travel gear").build(),
                Category.builder().name("Grooming").description("Shampoos, brushes, nail clippers and grooming kits").build(),
                Category.builder().name("Health & Wellness").description("Vitamins, flea & tick control, and health care products").build(),
                Category.builder().name("Beds & Furniture").description("Pet beds, crates, carriers and furniture").build(),
                Category.builder().name("Litter & Hygiene").description("Litter, litter boxes, waste bags and cleaning supplies").build(),
                Category.builder().name("Aquarium & Fish").description("Fish food, tanks, filters and aquarium supplies").build()
        );
        categoryRepository.saveAll(categories);
        log.info("Seeded {} pet shop categories", categories.size());
    }

    private void seedProductsIfEmpty() {

//        if (productRepository.count() > 0) {
//            return;
//        }

        List<Category> categories = categoryRepository.findAll();

        Random random = new Random();

        String[] brands = {
                "Royal Canin",
                "Pedigree",
                "Whiskas",
                "Purina",
                "Me-O",
                "SmartHeart",
                "Catsrang",
                "Kit Cat"
        };

        String[] origins = {
                "Vietnam",
                "Thailand",
                "Japan",
                "USA",
                "France",
                "Germany"
        };

        Unit[] units = Unit.values();

        List<Product> products = new ArrayList<>();

        for (int i = 1; i <= 100; i++) {

            Category category = categories.get(random.nextInt(categories.size()));

            Product product = Product.builder()
                    .name("Product " + i)
                    .description("Description for product " + i)
                    .price(BigDecimal.valueOf(10000 + random.nextInt(500000)))
                    .category(category)
                    .brand(brands[random.nextInt(brands.length)])
                    .origin(origins[random.nextInt(origins.length)])
                    .unit(Unit.BAG)
                    .quantity(random.nextInt(100) + 1)
                    .imageUrl("https://picsum.photos/400?random=" + i)
                    .expiryDate(LocalDate.now().plusDays(random.nextInt(1000) + 30))
                    .available(true)
                    .build();

            products.add(product);
        }

        productRepository.saveAll(products);

        log.info("Seeded {} products", products.size());
    }
}
