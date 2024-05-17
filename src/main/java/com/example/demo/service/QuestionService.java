package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StockPostDto;
import com.example.demo.entity.StockPost;
import com.example.demo.repository.StockPostRepository;

@Service
public class QuestionService {
	
	@Autowired
	private StockPostRepository stockPostRepository;

	public List<StockPostDto> getAllBoard() {
        List<StockPost> stockPosts = stockPostRepository.findAll();
        
        return stockPosts.stream()
                         .map(this::convertToDto)
                         .collect(Collectors.toList());
    }
    
    private StockPostDto convertToDto(StockPost stockPost) {
        StockPostDto stockPostDto = new StockPostDto();
        stockPostDto.setBoardNumber(stockPost.getBoardNumber());
        stockPostDto.setUserId(stockPost.getUserId());
        stockPostDto.setTitle(stockPost.getTitle());
        stockPostDto.setContents(stockPost.getContents());
        stockPostDto.setCreateTime(stockPost.getCreateTime());
        stockPostDto.setUpdateTime(stockPost.getUpdateTime());
        stockPostDto.setStockCode(stockPost.getStockCode());
        return stockPostDto;
    }
	
	

}
