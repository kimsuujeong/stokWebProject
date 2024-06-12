package com.example.demo.entity;

import com.example.demo.dto.LoginDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "login")
public class Login {
	
	@Id
	private int userId;
    
    @Column
    private String email;
    
    @Column
    private String password;

    @OneToOne(mappedBy = "login")
    private User user;
	
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
