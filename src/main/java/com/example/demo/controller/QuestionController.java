package com.example.demo.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CommentDto;
import com.example.demo.dto.StockPostDto;
import com.example.demo.entity.Comment;
import com.example.demo.service.QuestionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@GetMapping("/question")
	public ResponseEntity<?> getAllBoards() {

		List<StockPostDto> posts = questionService.getAllBoard();
		Collections.reverse(posts);

		return new ResponseEntity<>(posts, HttpStatus.OK);
	}

	@GetMapping("/question/{boardNumber}") // 상세보기
	public ResponseEntity<StockPostDto> getBoardById(@PathVariable("boardNumber") int boardNumber) {

		StockPostDto post = questionService.getBoardById(boardNumber);
		questionService.getStockName(post.getStockCode());

		return ResponseEntity.ok(post);
	}

	@DeleteMapping("/question/{boardNumber}") // 게시물 삭제
	public ResponseEntity<Integer> useBoard(@PathVariable("boardNumber") int boardNumber) {

		System.out.println(boardNumber);

		try {
			questionService.deleteBoard(boardNumber);
		} catch (Exception e) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(boardNumber);
	}

	@PutMapping("WriteUpdate/{boardNumber}") // 게시물 수정
	public ResponseEntity<String> updateBoard(@RequestBody Map<String, String> requestData) {

		try {

			int boardNumber = Integer.parseInt(requestData.get("boardNumber"));
			String title = requestData.get("title");
			String contents = requestData.get("contents");

			System.out.println("여기는 잘 타니");
			System.out.println(questionService.updateBoard(boardNumber, title, contents));
			questionService.updateBoard(boardNumber, title, contents);

			return ResponseEntity.ok("게시물이 성공적으로 업데이트 되었습니다.");

		} catch (IllegalArgumentException e) {

			return ResponseEntity.badRequest().body("잘못된 요청입니다.");

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
		}

	}

	@PostMapping("/detail/{postId}/comments")
	public ResponseEntity<Comment> Commend(@RequestBody Map<String, String> requestData) {

		int boardNumber = Integer.parseInt(requestData.get("boardNumber"));
		String Comment = requestData.get("comment");
		String email = requestData.get("userId");

		Comment comment = questionService.createComment(boardNumber, Comment, email);

		return ResponseEntity.ok(comment);
	}

	@GetMapping("/detail/{boardNumber}/comments")
	public ResponseEntity<List<CommentDto>> getAllCommentsByBoardNumber(@PathVariable("boardNumber") int boardNumber) {
	    
		List<CommentDto> commentDto = questionService.getCommentDto(boardNumber);
	    
	    if (commentDto == null) { // 404
	    	
	        return ResponseEntity.notFound().build();
	        
	    }
	    
	    return ResponseEntity.ok(commentDto);
	    
	}
	
	@PutMapping("detail/comments/{commentId}") // 게시물 수정
	public ResponseEntity<String> updateComment(@RequestBody Map<String, String> requestData) {

		try {
			
			String commentId = requestData.get("commentId");
			String comment = requestData.get("comment");
			
			questionService.updateComment(commentId,comment);

		} catch (IllegalArgumentException e) {

			return ResponseEntity.badRequest().body("잘못된 요청입니다.");

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
		}
		
		return ResponseEntity.ok("작성되었습니다.");
		
	}
	
	@DeleteMapping("detail/comments/{commentId}") // 게시물 삭제
	public ResponseEntity<Integer> deleteComment(@PathVariable("commentId") int commentId) {

		System.out.println(commentId);

		try {
			questionService.deleteComment(commentId);
		} catch (Exception e) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(commentId);
	}
	
}
