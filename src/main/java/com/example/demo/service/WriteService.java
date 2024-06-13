package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StockDto;
import com.example.demo.entity.StockImage;
import com.example.demo.entity.StockPost;
import com.example.demo.repository.StockImageRepository;
import com.example.demo.repository.StockPostRepository;
import com.example.demo.repository.StockRepository;
import com.example.demo.repository.UserRepository;

@Service
public class WriteService {

	@Autowired
	private StockRepository stockRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private StockPostRepository stockPostRepository;
	
	@Autowired
	private StockImageRepository stockImageRepository;

	public List<StockDto> getAllStock() {
		return stockRepository.findAll().stream()
				.map(StockDto::mapStockToDto)
				.collect(Collectors.toList());

	}

	public String getUserId(String email) {
		return userRepository.findUserId(email);
	}

	public String getStockCode(String stockName) {
		return stockRepository.findStockCode(stockName);
	}
	
	public StockPost insertBoard(int getUserId, String title, String contents, int getStockCode) {
		
		StockPost stockPost = new StockPost();
	    stockPost.setUserId(getUserId);
	    stockPost.setTitle(title);
	    stockPost.setContents(contents);
	    stockPost.setStockCode(getStockCode);
	    stockPost.setCreateTime(LocalDateTime.now());
	    stockPost.setUpdateTime(LocalDateTime.now());

	    return stockPostRepository.save(stockPost);
	    
	}

	public StockImage insertImage(int boardId, String imageURL, String chatgpt) {
		
		StockImage stockImage = new StockImage();
		stockImage.setBoardNumber(boardId);
		stockImage.setImageURL(imageURL);
		stockImage.setChatgpt(chatgpt);
		
		return stockImageRepository.save(stockImage);
		
	}

}
