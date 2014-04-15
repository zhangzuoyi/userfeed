package com.xiaoyacz.userfeed.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.xiaoyacz.userfeed.model.UserFeed;

public interface UserFeedDao extends PagingAndSortingRepository<UserFeed,Long> {
	Page<UserFeed> findByFeedStatus(String feedStatus, Pageable pageable);
}
