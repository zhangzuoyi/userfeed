<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
			<h3>用户列表</h3>
			<p class="text-right">
				<a href="<s:url value='/user/reg' />" class="btn btn-default">新增</a>
			</p>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>登录名</th>
						<th>真实姓名</th>
						<th>邮箱地址</th>
						<th>手机号</th>
						<th>角色</th>
						<th>注册日期</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
				<c:forEach items="${page.content }" var="a" varStatus="vs">
					<tr>
						<td>${vs.count }</td>
						<td>${a.loginName }</td>
						<td>${a.realName }</td>
						<td>${a.email }</td>
						<td>${a.mobilePhone }</td>
						<td>${a.userRole }</td>
						<td><fmt:formatDate value="${a.regTime }" /></td>
						<td>
						<%-- <a class="btn ajaxView" href="<s:url value='/admin/article/view/${a.id }' />" class="btn">查看</a>
						<a href="<s:url value='/admin/article/edit/${a.id }' />" class="btn">修改</a>
						<a href="#" class="btn" onclick="delArticle('${a.id }');">删除</a> --%>
						</td>
					</tr>
				</c:forEach>
				</tbody>
			</table>
			
			<ul class="pagination">
			  <c:if test="${page.number>0 }">
			  	<li><a href="<s:url value='/user/list?page=${page.number-1 }' />">Prev</a></li>
			  </c:if>
			  <c:forEach var="i" begin="1" end="${page.totalPages }">
			  	<c:if test="${page.number==i-1 }">
			  	<li class="active"><a href="<s:url value='/user/list?page=${i-1 }' />">${i }</a></li>
			  	</c:if>
			  	<c:if test="${page.number!=i-1 }">
			  	<li><a href="<s:url value='/user/list?page=${i-1 }' />">${i }</a></li>
			  	</c:if>
			  </c:forEach>
			  <c:if test="${page.number<page.totalPages-1 }">
			  	<li><a href="<s:url value='/user/list?page=${page.number+1 }' />">Next</a></li>
			  </c:if>
			</ul>