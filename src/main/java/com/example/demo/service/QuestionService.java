package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CommentDto;
import com.example.demo.dto.StockPostDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.StockPost;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.StockPostRepository;
import com.example.demo.repository.StockRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuestionService {

	@Autowired
	private StockPostRepository stockPostRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private StockRepository stockRepository;

	@Autowired
	private CommentRepository commentRepository;

	public List<StockPostDto> getAllBoard() {
		List<StockPost> posts = stockPostRepository.findAll();
		return posts.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	public StockPostDto getBoardById(int boardNumber) {
		StockPost post = stockPostRepository.findById(boardNumber).orElse(null);
		if (post == null) {
			return null;
		}
		return convertToDto(post);
	}

	private String getNickname(int userId) {
		return userRepository.findUsernickname(userId);
	}

	private int getuserIdToEmail(String email) {
		return userRepository.findUserToEmail(email);
	}

	private String getEmail(int userId) {
		return userRepository.findUserEmail(userId);
	}

	public String getStockName(int stockCode) {
		return stockRepository.findStockName(stockCode);
	}

	private StockPostDto convertToDto(StockPost post) {

		StockPostDto dto = new StockPostDto();
		dto.setBoardNumber(post.getBoardNumber());
		dto.setUserId(post.getUserId());
		dto.setTitle(post.getTitle());
		dto.setContents(post.getContents());
		dto.setCreateTime(post.getCreateTime());
		dto.setUpdateTime(post.getUpdateTime());
		dto.setStockCode(post.getStockCode());
		dto.setStockName(getStockName(post.getStockCode()));
		if (post.getStockImage() != null) {
			dto.setImageURL(post.getStockImage().getImageURL());
			dto.setChatgpt(post.getStockImage().getChatgpt());
		}
		dto.setNickname(getNickname(dto.getUserId()));
		dto.setEmail(getEmail(dto.getUserId()));

		return dto;
	}

	public void deleteBoard(int boardNumber) {
		stockPostRepository.deleteById(boardNumber);
	}

	@Transactional
	public boolean updateBoard(int boardNumber, String title, String contents) {
		stockPostRepository.updateBoard(boardNumber, title, contents);
		return false;
	}

	public Comment createComment(int boardNumber, String Comment, String email) {

		Comment comment = new Comment();

		comment.setBoardNumber(boardNumber);
		comment.setUserId(getuserIdToEmail(email));
		comment.setComment(Comment);
		comment.setCommentTime(LocalDateTime.now());
		comment.setCommentUpdateTime(LocalDateTime.now());

		return commentRepository.save(comment);
	}

	public List<CommentDto> getCommentDto(int boardNumber) {

		List<Comment> comments = commentRepository.findByCommnet(boardNumber);
	    
	    List<CommentDto> commentDtos = new ArrayList<>();
	    
	    for (Comment comment : comments) {
	    	
	        CommentDto dto = new CommentDto();
	        dto.setBoardNumber(comment.getBoardNumber());
	        dto.setComment(comment.getComment());
	        dto.setCommentId(comment.getCommentId());
	        dto.setCommentTime(comment.getCommentTime());
	        dto.setCommentUpdateTime(comment.getCommentUpdateTime());
	        dto.setUserId(comment.getUserId());
	        dto.setUserNickname(getNickname(comment.getUserId()));
	        dto.setEmail(getEmail(comment.getUserId()));
	        
	        commentDtos.add(dto);
	        
	    }

	    return commentDtos;
	    
	}

	@Transactional
	public void updateComment(String commentId, String comment) {
		commentRepository.updateComment(commentId, comment);
	}

	public void deleteComment(int commentId) {
		commentRepository.deleteById(commentId);
	}

}
