package com.rohit.portfolio.controller;

import tools.jackson.databind.ObjectMapper;
import com.rohit.portfolio.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtService jwtService;

    private String adminToken;

    @BeforeEach
    void generateAdminToken() {
        UserDetails adminUser = User.builder()
                .username("admin")
                .password("unused-for-token-generation")
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .build();
        adminToken = jwtService.generateToken(adminUser);
    }

    @Test
    void getAllProjects_isPublic_noAuthenticationNeeded() throws Exception {
        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk());
    }

    @Test
    void createProject_withoutAuthentication_isRejected() throws Exception {
        String body = """
                {
                  "slug": "auth-check-temp",
                  "title": "Auth Check Temp",
                  "shortDescription": "test",
                  "description": "test",
                  "stack": ["Java"],
                  "features": ["test"],
                  "architecture": "test"
                }
                """;

        mockMvc.perform(post("/api/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void deleteProject_withoutAuthentication_isRejected() throws Exception {
        mockMvc.perform(delete("/api/projects/999999"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void createProject_asAdmin_withMissingField_isRejectedByValidation_notSecurity() throws Exception {
        String invalidBody = """
                {
                  "slug": "validation-check-temp",
                  "title": "Validation Check Temp",
                  "shortDescription": "test",
                  "description": "test",
                  "stack": ["Java"],
                  "features": ["test"]
                }
                """;

        mockMvc.perform(post("/api/projects")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void createProject_asAdmin_withValidData_succeeds_thenCleansUpAfterItself() throws Exception {
        String body = """
                {
                  "slug": "integration-test-temp-project",
                  "title": "Integration Test Temp Project",
                  "shortDescription": "Created by an automated test.",
                  "description": "Created by an automated test. Safe to ignore if seen on the live site.",
                  "stack": ["Java"],
                  "features": ["test"],
                  "architecture": "test",
                  "featured": false
                }
                """;

        String response = mockMvc.perform(post("/api/projects")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
        			.andDo(print())
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        Long createdId = objectMapper.readTree(response).get("id").asLong();

        mockMvc.perform(delete("/api/projects/" + createdId)
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isNoContent());
    }
}