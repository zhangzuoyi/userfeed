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
    <style type="text/css">
    	.simpleTemplate {
		  margin-right: auto;
		  margin-left: auto;
		  max-width: 950px;
		}
    </style>
  </head>

  <body>


    <div class="container simpleTemplate">

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