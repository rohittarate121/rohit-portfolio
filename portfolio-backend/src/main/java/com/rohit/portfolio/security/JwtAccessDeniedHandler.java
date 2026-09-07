package com.rohit.portfolio.security;

//import com.fasterxml.jackson.databind.ObjectMapper;
import tools.jackson.databind.ObjectMapper;
import com.rohit.portfolio.exception.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

// Fires when a request IS authenticated but lacks the required role — the
// 403 case. Not reachable through normal use today, since this app has
// only one role, but it's the technically correct handler for it, and
// costs nothing to have in place.
@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;

    public JwtAccessDeniedHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse body = ErrorResponse.of(HttpStatus.FORBIDDEN.value(), "Forbidden", "You do not have permission to access this resource");
        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}