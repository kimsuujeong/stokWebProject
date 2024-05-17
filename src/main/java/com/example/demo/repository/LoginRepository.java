package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String>{

	@Query("select m from Login m where m.email = ?1 and m.password = ?2")
	Login findByEmailAndPassword(String email, String password);


}
