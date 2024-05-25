package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "stockPost")
public class StockPost {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int boardNumber;
	
	@Column
	private int userId;
	
	@Column
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String contents;
	
	@Column(columnDefinition = "DATETIME")
	private LocalDateTime createTime;
	
	@Column(columnDefinition = "DATETIME")
	private LocalDateTime updateTime;
	
	@Column
	private int stockCode;
	
	@OneToOne(mappedBy = "stockPostEntity")
    private StockImage stockImage; // StockImage와의 One-to-One 관계
    
    // Getter 메서드 추가
    public StockImage getStockImage() {
        return stockImage;
    }


	public int getBoardNumber() {
		return boardNumber;
	}


	public void setBoardNumber(int boardNumber) {
		this.boardNumber = boardNumber;
	}


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getContents() {
		return contents;
	}


	public void setContents(String contents) {
		this.contents = contents;
	}


	public LocalDateTime getCreateTime() {
		return createTime;
	}


	public void setCreateTime(LocalDateTime createTime) {
		this.createTime = createTime;
	}


	public LocalDateTime getUpdateTime() {
		return updateTime;
	}


	public void setUpdateTime(LocalDateTime updateTime) {
		this.updateTime = updateTime;
	}


	public int getStockCode() {
		return stockCode;
	}


	public void setStockCode(int stockCode) {
		this.stockCode = stockCode;
	}


	@Override
	public String toString() {
		return "StockPost [boardNumber=" + boardNumber + ", userId=" + userId + ", title=" + title + ", contents="
				+ contents + ", createTime=" + createTime + ", updateTime=" + updateTime + ", stockCode=" + stockCode
				+ "]";
	}
	
	
	


}
