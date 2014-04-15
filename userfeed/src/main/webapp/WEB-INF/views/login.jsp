<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<style>
<!--
input{margin:10px 0px;}
.panel{padding:10px 10px 20px 10px;}
-->
</style>
<div class="col-md-4 col-md-offset-4 panel panel-default">
	<form class="form-signin" role="form" method="post">
        <h2 class="form-signin-heading">请登录</h2>
        <%
		String error = (String) request.getAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME);
		if(error != null){
		%>
			<div class="alert alert-warning" style="color:red;">登录失败，请重试.</div>
		<%
		}
		%>
        <input type="text" name="username" class="form-control" placeholder="用户名" required autofocus>
        <input type="password" name="password" class="form-control" placeholder="密码" required>
        <!-- <label class="checkbox">
          <input type="checkbox" value="rememberMe"> 记住我
        </label> -->
        <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
      </form>
</div>