<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="<s:url value='/static/images/favicon.png' />">

    <title>用户反馈管理</title>

    <!-- Bootstrap core CSS -->
    <link href="<s:url value='/static/bootstrap/css/bootstrap.css' />" rel="stylesheet">

    <!-- Custom styles for this template -->
    <!--<link href="navbar-static-top.css" rel="stylesheet">-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Static navbar -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">用户反馈管理</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <%-- <li class="active"><a href="<s:url value='/' />">首页</a></li>
            <li><a href="#about">关于我们</a></li>
            <li><a href="#contact">联系我们</a></li> --%>
            <!-- <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li> -->
          </ul>
          <shiro:authenticated>
	          <ul class="nav navbar-nav navbar-right">
	            <%-- <li class="active"><a href="<s:url value='/myaccount' />">销售记账</a></li> --%>
	           	<li class="dropdown">
	              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><shiro:principal property="loginName"/> <b class="caret"></b></a>
	              <ul class="dropdown-menu">
	                <li><a href="#">修改密码</a></li>
	                <li><a href="<s:url value='/logout' />">注销</a></li>
	              </ul>
	            </li>
	          </ul>
          </shiro:authenticated>
          <shiro:notAuthenticated>
	          <ul class="nav navbar-nav navbar-right">
	            <li class="active"><a href="<s:url value='/login' />">登录</a></li>
	            <%-- <li><a href="<s:url value='/user/reg' />">注册</a></li> --%>
	          </ul>
          </shiro:notAuthenticated>
        </div><!--/.nav-collapse -->
      </div>
    </div>


    <div class="container">

      <t:insertAttribute name="content" />

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <t:useAttribute id="list" name="items" classname="java.util.List" />
	<c:forEach var="item" items="${list}">
	  <t:insertAttribute value="${item}" flush="true" />
	</c:forEach>
  </body>
</html>