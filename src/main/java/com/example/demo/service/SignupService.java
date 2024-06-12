package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Login;
import com.example.demo.entity.User;
import com.example.demo.redis.RedisUtil;
import com.example.demo.repository.LoginRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignupService {
	
	@Autowired
	private LoginRepository loginRepository;
	
	@Autowired
	private UserRepository userRepository;

	public long emailchk(String email) {
		return loginRepository.countEmail(email);
	}

	public long nicknamechk(String nickname) {
		return userRepository.countnickname(nickname);
	}

	public User insertUser(String nickname, String email) {
		
		User user = new User();
		user.setNickname(nickname);
		user.setEmail(email);
		return userRepository.save(user);
	}
	
	public Login insertLogin(int userId, String email, String password) {
		
		Login login = new Login();
		login.setUserId(userId);
		login.setEmail(email);
		login.setPassword(password);
		return loginRepository.save(login);
	}

}
