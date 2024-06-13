package com.example.demo.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.StockPostDto;
import com.example.demo.service.QuestionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/question")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@GetMapping
	public ResponseEntity<?> getAllBoards() {
		
		List<StockPostDto> posts = questionService.getAllBoard();
		Collections.reverse(posts);
		

		return  new ResponseEntity<>(posts, HttpStatus.OK);
	}
	
	@GetMapping("/{boardNumber}") // 상세보기 API
    public ResponseEntity<StockPostDto> getBoardById(@PathVariable("boardNumber") int boardNumber) {
        StockPostDto post = questionService.getBoardById(boardNumber);
        System.out.println(boardNumber);
        
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(post);
    }
	

}
