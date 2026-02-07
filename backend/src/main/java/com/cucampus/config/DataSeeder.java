package com.cucampus.config;

import com.cucampus.complaint.ComplaintCategory;
import com.cucampus.complaint.ComplaintCategoryRepository;
import com.cucampus.user.Role;
import com.cucampus.user.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    /**
     * Minimal seed so the app can run without manual DB inserts:
     * - roles: ROLE_STUDENT, ROLE_ADMIN, ROLE_WARDEN
     * - complaint categories: Academic, Hostel, Mess, Facilities, Safety, Transportation, Faculty
     *
     * You can remove this later if you prefer managing seed data yourself.
     */
    @Bean
    CommandLineRunner seedBasics(RoleRepository roleRepository,
                                 ComplaintCategoryRepository categoryRepository) {
        return args -> {
            seedRole(roleRepository, Role.RoleName.ROLE_STUDENT);
            seedRole(roleRepository, Role.RoleName.ROLE_ADMIN);
            seedRole(roleRepository, Role.RoleName.ROLE_WARDEN);

            List<String> categories = List.of(
                    "Academic",
                    "Hostel",
                    "Mess",
                    "Facilities",
                    "Safety",
                    "Transportation",
                    "Faculty"
            );
            for (String name : categories) {
                categoryRepository.findByName(name).orElseGet(() -> {
                    ComplaintCategory c = new ComplaintCategory();
                    c.setName(name);
                    return categoryRepository.save(c);
                });
            }
        };
    }

    private void seedRole(RoleRepository roleRepository, Role.RoleName roleName) {
        roleRepository.findByName(roleName).orElseGet(() -> {
            Role role = new Role();
            role.setName(roleName);
            return roleRepository.save(role);
        });
    }
}

