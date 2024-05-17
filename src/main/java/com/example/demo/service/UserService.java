package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.repository.LoginRepository;

@Service
public class UserService {
	
	@Autowired
	private LoginRepository loginRepository;

	public ResponseEntity<String> login(String email, String password) {
        
		System.out.println("login service 탔음");
		
		
        if (loginRepository.findByEmailAndPassword(email, password) != null) {
            // 로그인 성공 시 클라이언트에게 성공 응답을 보냅니다.
        	System.out.println("로그인 성공임"+loginRepository.findByEmailAndPassword(email, password));
            return new ResponseEntity<>("로그인 성공", HttpStatus.OK);
        } else {
            // 로그인 실패 시 클라이언트에게 실패 응답을 보냅니다.
        	System.out.println("로그인 실패임"+loginRepository.findByEmailAndPassword(email, password));
            return new ResponseEntity<>("이메일 또는 비밀번호가 잘못되었습니다.", HttpStatus.UNAUTHORIZED);
        }
        
		
    }



}
