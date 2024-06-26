package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockPostDto {
    
    private int boardNumber;
    private int userId;
    private String title;
    private String contents;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private int stockCode;
    private String stockName;
    private String imageURL;
    private String nickname;
    private String email;
    private String chatgpt;

}