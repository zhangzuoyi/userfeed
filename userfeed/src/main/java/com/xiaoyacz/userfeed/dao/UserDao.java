package com.xiaoyacz.userfeed.dao;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.xiaoyacz.userfeed.model.User;

public interface UserDao extends PagingAndSortingRepository<User,Long>{
	public User findByLoginNameAndUserStatus(String loginName,String userStatus);
	public List<User> findByLoginName(String loginName);
}
