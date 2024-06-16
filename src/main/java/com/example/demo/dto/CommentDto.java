package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDto {
	
	private int commentId;
	
	private int boardNumber;
	
	private int userId;
	
	private String comment;
	
	private LocalDateTime commentTime;
	
	private LocalDateTime commentUpdateTime;
	
	private String userNickname;
	
	private String email;
	

}
