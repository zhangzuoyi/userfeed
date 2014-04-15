<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
<!--
.error{color:red;}
-->
</style>
<div class="row">
  <div class="col-md-6 col-md-offset-3">
  	<h3 class="text-center">用户注册</h3>
  	<sf:form cssClass="form-horizontal" role="form" method="post" modelAttribute="user" id="submitForm">
  	  <c:if test="${loginNameDuplicate!=null }">
  	  	<div class="alert alert-danger">
  	  		${loginNameDuplicate }
  	  	</div>
  	  </c:if>
  	  <sf:errors cssClass="error"></sf:errors>
	  <div class="form-group">
	    <sf:label path="loginName" cssClass="col-sm-3 control-label">用户名</sf:label>
	    <div class="col-sm-9">
	      <sf:input type="text" cssClass="form-control" path="loginName" placeholder="用户名" />
	      <sf:errors path="loginName" cssClass="error" />
	    </div>
	  </div>
	  <div class="form-group">
	    <sf:label path="psw" cssClass="col-sm-3 control-label">密码</sf:label>
	    <div class="col-sm-9">
	      <sf:input type="password" cssClass="form-control" path="psw" placeholder="Password" />
	      <sf:errors path="psw" cssClass="error" />
	    </div>
	  </div>
	  <div class="form-group">
	    <label for="rePsw" class="col-sm-3 control-label">重复密码</label>
	    <div class="col-sm-9">
	      <input type="password" class="form-control" name="rePsw" placeholder="Password" />
	    </div>
	  </div>
	  <div class="form-group">
	    <sf:label path="realName" cssClass="col-sm-3 control-label">真实姓名</sf:label>
	    <div class="col-sm-9">
	      <sf:input type="text" cssClass="form-control" path="realName" placeholder="真实姓名" />
	      <sf:errors path="realName" cssClass="error" />
	    </div>
	  </div>
	  <div class="form-group">
	    <sf:label path="email" cssClass="col-sm-3 control-label">邮箱地址</sf:label>
	    <div class="col-sm-9">
	      <sf:input type="text" cssClass="form-control" path="email" placeholder="Email" />
	      <sf:errors path="email" cssClass="error" />
	    </div>
	  </div>
	  <div class="form-group">
	    <sf:label path="userRole" cssClass="col-sm-3 control-label">用户角色</sf:label>
	    <div class="col-sm-9">
	      <sf:input type="text" cssClass="form-control" path="userRole" placeholder="角色" />
	      <sf:errors path="userRole" cssClass="error" />
	    </div>
	  </div>
	  <div class="form-group">
	    <div class="col-sm-offset-2 col-sm-10">
	      <button type="submit" class="btn btn-default">注册</button>
	    </div>
	  </div>
	</sf:form>
  </div>
</div>