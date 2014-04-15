package com.xiaoyacz.userfeed.util;

import java.util.ResourceBundle;

public class ConfigUtil {
	private static ResourceBundle rb;
	public static final int PAGE_SIZE;
	public static final String STATUS_VALID="0";//有效的状态
	public static final String STATUS_INVALID="1";//无效的状态
	static{
		rb=ResourceBundle.getBundle("application");
		PAGE_SIZE=Integer.valueOf(rb.getString("page.size"));
	}
	public static int getPageSize(){
		return PAGE_SIZE;
	}
}
