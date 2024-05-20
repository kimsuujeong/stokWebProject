package com.example.demo.dto;

import com.example.demo.entity.Stock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockDto {
	
	private int stockCode;
	private String stockName;
	
	public static StockDto mapStockToDto(Stock stock) {
        return StockDto.builder()
                       .stockCode(stock.getStockCode())
                       .stockName(stock.getStockName())
                       .build();
    }

}
