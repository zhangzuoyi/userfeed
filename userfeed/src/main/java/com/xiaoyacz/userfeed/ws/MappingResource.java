package com.xiaoyacz.userfeed.ws;

import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xiaoyacz.userfeed.dao.UserFeedDao;
import com.xiaoyacz.userfeed.model.UserFeed;
import com.xiaoyacz.userfeed.util.ConfigUtil;

@Path("feed")
@Component
public class MappingResource {
	@Autowired
	private UserFeedDao feedDao;
	
	@POST
	@Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.TEXT_PLAIN)
    public String feed(UserFeed feed) {
		feed.setFeedStatus(ConfigUtil.STATUS_VALID);
		feed.setFeedid(null);
		feed.setFeedTime(new Date());
		feedDao.save(feed);
		return "success";
    }

}
