package com.xiaoyacz.userfeed.ws.test;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation.Builder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.client.ClientConfig;
import org.junit.Test;

import com.xiaoyacz.userfeed.model.UserFeed;

public class JerseyClientTest {
	@Test
	public void testFeed(){
		UserFeed feed=new UserFeed();
		feed.setTitle("test");
		feed.setFeedSource("PictureKnow");
		feed.setContent("这个应用很好，但还有需要改进的地方");
		feed.setUserName("张三");
		ClientConfig clientConfig = new ClientConfig();
		Client client = ClientBuilder.newClient(clientConfig);
		WebTarget webTarget = client.target("http://localhost:8080/userfeed/ws/feed");
		Builder request = webTarget.request(MediaType.TEXT_PLAIN);
		Response response = request.post(Entity.entity(feed, MediaType.APPLICATION_XML));

		String result = response.readEntity(String.class);
		System.out.println(result);
	}
}
