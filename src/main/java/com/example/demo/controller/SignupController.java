package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Login;
import com.example.demo.entity.User;
import com.example.demo.mail.MailController;
import com.example.demo.redis.RedisUtil;
import com.example.demo.service.SignupService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/signup")
public class SignupController {

	@Autowired
	private SignupService signupService;

	@Autowired
	private MailController mailController;
	
	@Autowired
	private RedisUtil redisUtil;

	private String TokenEmail;

	@PostMapping("/email")
	public ResponseEntity<?> sendEmail(@RequestBody Map<String, String> requestData) {

		String email = requestData.get("email");
		
		
		System.out.println(signupService.emailchk(email));

		if (signupService.emailchk(email) == 0) {

			mailController.mailSend(email); // 이메일 보내기
			
			TokenEmail = email;

			return ResponseEntity.ok().build();

		} else {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			
		}

	}
	
	@PostMapping("/emailCheck")
	public ResponseEntity<?> checkEmail(@RequestBody Map<String, String> requestData) {

		String email = requestData.get("email");
		
		
		System.out.println(signupService.emailchk(email));

		if (signupService.emailchk(email) > 0) {

			 return ResponseEntity.status(102).body("이미 사용 중인 이메일입니다.");

		} else {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			
		}

	}
	
	@PostMapping("/nickNameCheck")
	public ResponseEntity<?> checknickNameCheck(@RequestBody Map<String, String> requestData) {

		String nickname = requestData.get("nickname");
		
		System.out.println(nickname);
		System.out.println("여기탈까");
		
		System.out.println(signupService.nicknamechk(nickname));

		if (signupService.nicknamechk(nickname) > 0) {

			return ResponseEntity.ok().build();

		} else {
			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			
		}

	}
	
	@PostMapping
	public ResponseEntity<?> signup(@RequestBody Map<String, String> requestData){
		
		String nickname = requestData.get("nickname");
		String email = requestData.get("email");
		String password = requestData.get("password");
		String emailToken = requestData.get("emailToken");
		
		
		String getKey = redisUtil.getData(Integer.parseInt(emailToken));
		
		if (signupService.nicknamechk(nickname) > 0) {
            return ResponseEntity.status(101).body("이미 사용 중인 닉네임입니다.");
        }

        if (signupService.emailchk(email) > 0) {
            return ResponseEntity.status(102).body("이미 사용 중인 이메일입니다.");
        }

        if (getKey == null || !getKey.equals(TokenEmail)) {
            return ResponseEntity.status(103).body("토큰번호를 확인해주세요.");
        }
        
        System.out.println(nickname);
        System.out.println(email);
        System.out.println(password);
        System.out.println(emailToken);
        
        System.out.println(getKey);
      
        
        
        User user = signupService.insertUser(nickname, email);
        
        int userId = user.getUserId();
        
        Login login = signupService.insertLogin(userId, email, password);
        
        return ResponseEntity.ok("회원가입이 완료되었습니다.");
		
	}
	
	

}
