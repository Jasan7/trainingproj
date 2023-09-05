package com.assignment.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.assignment.apigateway.filter.SessionFilter;

@Configuration
public class ApiConfig {

    @Bean
    public SessionFilter sessionFilter(){
        return new SessionFilter();
    }
}
