package com.cucampus.gatepass;

import com.cucampus.config.CorsConfig;
import com.cucampus.security.CustomUserDetailsService;
import com.cucampus.security.JwtAuthenticationFilter;
import com.cucampus.security.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = GatePassController.class)
@Import({SecurityConfig.class, CorsConfig.class})
class GatePassControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GatePassService gatePassService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void unauthenticatedRequests_areUnauthorized() throws Exception {
        mockMvc.perform(get("/api/gatepass/my"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = {"STUDENT"})
    void student_cannotAccessWardenEndpoints() throws Exception {
        mockMvc.perform(get("/api/gatepass/pending"))
                .andExpect(status().isForbidden());
    }
}
