package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.redis.RedisUtil;
import com.example.demo.repository.LoginRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignupService {
	
	@Autowired
	private LoginRepository loginRepository;

	public long emailchk(String email) {
		return loginRepository.countEmail(email);
	}

}
