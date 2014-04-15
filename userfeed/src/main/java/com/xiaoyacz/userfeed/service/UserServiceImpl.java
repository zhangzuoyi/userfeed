package com.xiaoyacz.userfeed.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha1Hash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xiaoyacz.userfeed.dao.UserDao;
import com.xiaoyacz.userfeed.model.User;
@Service
@Transactional
public class UserServiceImpl implements UserService {
	private UserDao userDao;
	
	@Autowired
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	@Override
	public void reg(User user) {
		user.setRegTime(new Date());
		user.setUserStatus(USER_STATUS_VALID);
		encryptPassword(user,user.getPsw());
		userDao.save(user);
	}
	/**
	 * 用户密码加密
	 * @param user
	 * @param plainPassword
	 */
	private void encryptPassword(User user,String plainPassword){
	    ByteSource salt=new SecureRandomNumberGenerator().nextBytes(SALT_SIZE);
	    user.setPsw(new Sha1Hash(plainPassword,salt,HASH_INTERATIONS).toHex());
	    user.setSalt(salt.toHex());
	}
	@Override
	public boolean isUserExist(String loginName) {
		List<User> list=userDao.findByLoginName(loginName);
		if(list.size()>0){
			return true;
		}
		return false;
	}
}
