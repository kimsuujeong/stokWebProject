package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	
	@Query("SELECT u.userId FROM User u WHERE u.email = :email")
	String findUserId(@Param("email") String email);
	
	@Query("SELECT u.nickname FROM User u WHERE u.userId = :userId")
	String findUsernickname(@Param("userId") int userId);

	@Query("SELECT COUNT(l) FROM User l where l.nickname = ?1")
	long countnickname(String nickname);

	@Query("SELECT u.email FROM User u WHERE u.userId = :userId")
	String findUserEmail(@Param("userId") int userId);

	@Query("SELECT u.userId FROM User u WHERE u.email = :email")
	int findUserToEmail(@Param("email") String email);


}
