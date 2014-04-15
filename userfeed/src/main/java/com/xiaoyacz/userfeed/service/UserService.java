package com.xiaoyacz.userfeed.service;

import com.xiaoyacz.userfeed.model.User;

public interface UserService {
	public static final String HASH_ALGORITHM = "SHA-1";//用这个算法加密后密码长度为40
	public static final int HASH_INTERATIONS = 1024;
	public static final int SALT_SIZE = 8;
	public static final String USER_STATUS_VALID="0";//有效的用户状态
	public static final String USER_STATUS_INVALID="1";//无效的用户状态
	/**
	 * 注册用户
	 * @param user
	 */
	void reg(User user);
	/**
	 * 判断用户是否存在
	 * @param loginName
	 * @return
	 */
	boolean isUserExist(String loginName);
}
