package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StockPostDto;
import com.example.demo.entity.StockPost;
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
			System.out.println("여기도 잘 탔음");
			stockPostRepository.updateBoard(boardNumber, title, contents);
			return false;
		}
	

}
