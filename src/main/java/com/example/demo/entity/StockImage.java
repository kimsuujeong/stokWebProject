package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "stockImage")
public class StockImage {
	
	@Id
	private int boardNumber;
	
	@Column
	private String imageURL;
	
	@Column
	private String chatgpt;
	
	@ManyToOne
    @JoinColumn(name = "boardNumber", insertable=false, updatable=false)
    private StockPost stockPostEntity;

}
