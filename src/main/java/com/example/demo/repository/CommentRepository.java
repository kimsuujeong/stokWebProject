package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{

	 @Query("SELECT c FROM Comment c WHERE c.boardNumber = :boardNumber")
	List<Comment> findByCommnet(@Param("boardNumber") int boardNumber);


}
