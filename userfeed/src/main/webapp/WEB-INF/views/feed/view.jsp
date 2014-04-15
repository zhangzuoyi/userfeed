<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<div class="row">
  <div class="col-md-8 col-md-offset-2">
  	<div class="row">
  		<h3>用户反馈信息</h3>
  	</div>
  	<div class="row">
  		<div class="col-md-3">
  			来源
  		</div>
  		<div class="col-md-9">
  			${userFeed.feedSource }
  		</div>
  	</div>
  	<div class="row">
  		<div class="col-md-3">
  			标题
  		</div>
  		<div class="col-md-9">
  			${userFeed.title }
  		</div>
  	</div>
  	<div class="row">
  		<div class="col-md-3">
  			内容
  		</div>
  		<div class="col-md-9">
  			${userFeed.content }
  		</div>
  	</div>
  	<div class="row">
  		<div class="col-md-3">
  			反馈时间
  		</div>
  		<div class="col-md-9">
  			<fmt:formatDate value="${userFeed.feedTime }"/>
  		</div>
  	</div>
  </div>
</div>