package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.StockDto;
import com.example.demo.repository.StockRepository;

@Service
public class WriteService {

	@Autowired
	private StockRepository stockRepository;

	public List<StockDto> getAllStock() {
		return stockRepository.findAll().stream()
				.map(StockDto::mapStockToDto)
				.collect(Collectors.toList());

	}
}
