package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.StockPost;

@Repository
public interface StockPostRepository extends JpaRepository<StockPost, Integer>{

	@Query("INSERT INTO StockPost "
            + "(userId, title, contents, stockCode, createTime, updateTime) "
            + "VALUES (:userId, :title, :contents, :stockCode, current_timestamp(), current_timestamp())")
    StockPost postSave(@Param("userId") int getUserId,
    				   @Param("title") String title, 
    				   @Param("contents")String contents, 
    				   @Param("stockCode") int getStockCode);

	@Modifying
	@Query("UPDATE StockPost " 
	       + "SET title = :title, contents = :contents, updateTime = current_timestamp() "
	       + "WHERE boardNumber = :boardNumber")
	void updateBoard(@Param("boardNumber") int boardNumber,
	                 @Param("title") String title,
	                 @Param("contents") String contents);
	
	
}
