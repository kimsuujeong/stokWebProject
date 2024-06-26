package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "comment")
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commentId;
	
	@Column
	private int boardNumber;
	
	@Column
	private int userId;
	
	@Column(columnDefinition = "TEXT")
	private String comment;
	
	@Column
	private LocalDateTime commentTime;
	
	@Column
	private LocalDateTime commentUpdateTime;
	
	@ManyToOne
	@JoinColumn(name = "boardNumber", insertable = false, updatable = false)
	private StockPost stockPost;
	
	@ManyToOne
	@JoinColumn(name = "userId", insertable = false, updatable = false)
	private User user;
	
}
