package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mail.MailController;
import com.example.demo.service.SignupService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/signup")
public class SignupController {

	@Autowired
	private SignupService signupService;

	@Autowired
	private MailController mailController;

	private String TokenEmail;

	@PostMapping("/email")
	public ResponseEntity<?> sendEmail(@RequestBody Map<String, String> requestData) {

		String email = requestData.get("email");
		
		System.out.println(email);
		
		System.out.println(signupService.emailchk(email));

		if (signupService.emailchk(email) <= 0) {

			mailController.mailSend(email); // 이메일 보내기
			
			TokenEmail = email;

			return ResponseEntity.ok().build();

		}

		return ResponseEntity.badRequest().build();

	}

}
