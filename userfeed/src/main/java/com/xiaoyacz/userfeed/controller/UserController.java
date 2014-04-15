package com.xiaoyacz.userfeed.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.xiaoyacz.userfeed.dao.UserDao;
import com.xiaoyacz.userfeed.model.User;
import com.xiaoyacz.userfeed.service.UserService;
import com.xiaoyacz.userfeed.util.ConfigUtil;

@Controller
@RequestMapping(value = "/user")
public class UserController {
	private UserService userService;
	private UserDao userDao;
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Autowired
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	@RequestMapping(value="list",method = RequestMethod.GET)
	public String list(Model model,@RequestParam(value="page",defaultValue="0") int page){
		Pageable pageable=new PageRequest(page, ConfigUtil.PAGE_SIZE,Direction.DESC,"userid");
		model.addAttribute("page",userDao.findAll(pageable));
		return "user/list";
	}
	@RequestMapping(value="reg",method = RequestMethod.GET)
	public String regPage(Model model){
		model.addAttribute(new User());
		return "user/reg";
	}
	@RequestMapping(value="reg",method = RequestMethod.POST)
	public String reg(@Valid User user,BindingResult bindingResult,Model model){
		if(bindingResult.hasErrors()){
			return "user/reg";
		}
		if(userService.isUserExist(user.getLoginName())){
			model.addAttribute("loginNameDuplicate", "用户名已存在");
			return "user/reg";
		}
		userService.reg(user);
		return "redirect:list";
	}
}
