<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
	<div class="row row-offcanvas row-offcanvas-right">

        <div class="col-md-2 sidebar-offcanvas" id="sidebar" role="navigation">
          <div class="list-group">
            <a href="<s:url value='/feed/list' />" class="list-group-item active">用户反馈</a>
            <a href="<s:url value='/user/list' />" class="list-group-item">用户管理</a>
          </div>
        </div><!--/span-->
        <div class="col-md-10">
        	<t:insertAttribute name="content" />
        </div><!--/span-->

      </div><!--/row-->