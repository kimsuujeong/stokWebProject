package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StockPostDto;
import com.example.demo.entity.StockImage;
import com.example.demo.entity.StockPost;
import com.example.demo.repository.StockPostRepository;

@Service
public class QuestionService {
	
	@Autowired
	private StockPostRepository stockPostRepository;
	

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

	    private StockPostDto convertToDto(StockPost post) {
	        StockPostDto dto = new StockPostDto();
	        dto.setBoardNumber(post.getBoardNumber());
	        dto.setUserId(post.getUserId());
	        dto.setTitle(post.getTitle());
	        dto.setContents(post.getContents());
	        dto.setCreateTime(post.getCreateTime());
	        dto.setUpdateTime(post.getUpdateTime());
	        dto.setStockCode(post.getStockCode());
	        dto.setImageURL(post.getStockImage().getImageURL()); // 이미지 URL 추가
	        return dto;
	    }
	
	

}
