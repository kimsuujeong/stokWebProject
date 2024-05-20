package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.StockDto;
import com.example.demo.service.WriteService;

@RestController
public class WriteController {

	@Autowired
	private WriteService writeService;

	@GetMapping("/write/stock")
	public ResponseEntity<?> getAllBoards() {

		List<StockDto> posts = writeService.getAllStock();

		return new ResponseEntity<>(posts, HttpStatus.OK);
	}

}
