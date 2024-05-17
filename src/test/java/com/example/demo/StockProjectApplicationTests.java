package com.example.demo;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.entity.StockPost;
import com.example.demo.repository.StockPostRepository;
import com.example.demo.service.QuestionService;

@SpringBootTest
class StockProjectApplicationTests {
	
	@Autowired
	private QuestionService questionService;

	@Test
	void contextLoads() {
	}
	
	@Test
	void getAllBoardsTest() {
		
	}

}
