package com.xiaoyacz.userfeed.ws;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.spring.scope.RequestContextFilter;

public class JerseyApplication extends ResourceConfig{
	public JerseyApplication(){
		register(RequestContextFilter.class);
		register(MappingResource.class);
	}
}
