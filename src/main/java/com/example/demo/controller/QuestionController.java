package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.StockPostDto;
import com.example.demo.service.QuestionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@GetMapping("/question")
	public ResponseEntity<?> getAllBoards() {
		
		List<StockPostDto> posts = questionService.getAllBoard();

		return  new ResponseEntity<>(posts, HttpStatus.OK);
	}
	
//    //idx의 데이터 1개를 조회한다.
//    @GetMapping("/board/{idx}")
//    Header<BoardEntity> getBoardOne(@PathVariable Long idx) {
//        return boardService.getBoardOne(idx);
//    }
//
//    @PostMapping("/board")
//    Header<BoardEntity> createBoard(@RequestBody BoardSaveDto boardSaveDto) {
//        return boardService.insertBoard(boardSaveDto);
//    }
//
//    @PatchMapping("/board")
//    Header<BoardEntity> updateBoard(@RequestBody BoardSaveDto boardSaveDto) {
//        return boardService.updateBoard(boardSaveDto);
//    }
//
//    @DeleteMapping("/board/{idx}")
//    Header<String> deleteBoard(@PathVariable Long idx) {
//        return boardService.deleteBoard(idx);
//    }

}
