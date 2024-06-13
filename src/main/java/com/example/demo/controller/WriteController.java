package com.example.demo.controller;

import java.sql.Time;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.StockDto;
import com.example.demo.dto.StockPostDto;
import com.example.demo.entity.StockImage;
import com.example.demo.entity.StockPost;
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
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/write")
	public ResponseEntity<?> write(@RequestBody Map<String, String> requestData) {

		String email = requestData.get("userid");
		// user고유 Id값 가져오기
		int getUserId = Integer.parseInt(writeService.getUserId(email));
		
		String title = requestData.get("title");
		String contents = requestData.get("contents");
		String stockName = requestData.get("stockCode");
		int getStockCode = Integer.parseInt(writeService.getStockCode(stockName));
		String imageURL = requestData.get("imageURL");
		String chatgpt = requestData.get("result");
		
		System.out.println("글쓰기 컨트롤 탔음");
		System.out.println(chatgpt);
		
		StockPost savedPost  = 
				writeService.insertBoard(getUserId,title,contents,getStockCode);

		int boardId = savedPost.getBoardNumber();
		
		StockImage stockImage = 
				writeService.insertImage(boardId,imageURL,chatgpt);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}

}
