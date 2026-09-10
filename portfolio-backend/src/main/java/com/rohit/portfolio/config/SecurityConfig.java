package com.rohit.portfolio.config;

import com.rohit.portfolio.security.JwtAccessDeniedHandler;
import com.rohit.portfolio.security.JwtAuthenticationEntryPoint;
import com.rohit.portfolio.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {

	@Value("${app.cors.allowed-origins:http://localhost:5173}")
	private String allowedOrigins;

	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

	public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
			JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint)
						.accessDeniedHandler(jwtAccessDeniedHandler))
				.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.GET, "/actuator/health").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
						.requestMatchers(HttpMethod.GET, "/api/auth/me").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/contact").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/analytics/visit").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/resume/download").permitAll()
						.requestMatchers(HttpMethod.POST, "/api/projects/*/view").permitAll()
						.requestMatchers(HttpMethod.GET, "/api/projects/**", "/api/skills/**", "/api/experiences/**",
								"/api/education/**", "/api/certifications/**", "/api/blog", "/api/blog/slug/**",
								"/api/resume")
						.permitAll().requestMatchers("/api/**").hasRole("ADMIN").anyRequest().authenticated())
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(allowedOrigins.split(",")));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/api/**", configuration);
		return source;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}