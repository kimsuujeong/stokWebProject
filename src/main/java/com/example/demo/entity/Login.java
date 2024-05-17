package com.example.demo.entity;

import com.example.demo.dto.LoginDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "login")
public class Login {
	
	@Id
	private String email;
	
	@Column
	private int userId;
	
	@Column
	private String password;
	
	
	
	public Login() {
	}

	public Login(String email, int userId, String password) {
		super();
		this.email = email;
		this.userId = userId;
		this.password = password;
	}

	public Login(LoginDto loginDto) {
		this.email = loginDto.getEmail();
		this.userId = loginDto.getUserId();
		this.password =loginDto.getPassword();
	}
	
	

}
