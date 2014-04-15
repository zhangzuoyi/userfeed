package com.xiaoyacz.userfeed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.xiaoyacz.userfeed.dao.UserFeedDao;
import com.xiaoyacz.userfeed.model.UserFeed;
import com.xiaoyacz.userfeed.util.ConfigUtil;

@Controller
@RequestMapping(value = "/feed")
public class UserFeedController {
	private UserFeedDao feedDao;
	@Autowired
	public void setFeedDao(UserFeedDao feedDao) {
		this.feedDao = feedDao;
	}

	@RequestMapping(value="list",method = RequestMethod.GET)
	public String list(Model model,@RequestParam(value="page",defaultValue="0") int page){
		Pageable pageable=new PageRequest(page, ConfigUtil.PAGE_SIZE,Direction.DESC,"feedTime");
		model.addAttribute("page",feedDao.findByFeedStatus(ConfigUtil.STATUS_VALID,pageable));
		return "feed/list";
	}
	@RequestMapping(value="del",method = RequestMethod.POST)
	public String delete(@RequestParam("id")Long id,Model model){
		UserFeed feed=feedDao.findOne(id);
		feed.setFeedStatus(ConfigUtil.STATUS_INVALID);
		feedDao.save(feed);
		return "redirect:list";
	}
	@RequestMapping(value="view/{id}",method = RequestMethod.GET)
	public String view(@PathVariable Long id,Model model){
		model.addAttribute(feedDao.findOne(id));
		return "feed/view";
	}
}
