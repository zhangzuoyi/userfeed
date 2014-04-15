<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
			<h3>用户反馈列表</h3>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>来源</th>
						<th>标题</th>
						<th>姓名</th>
						<th>邮箱地址</th>
						<th>手机号</th>
						<th>反馈日期</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
				<c:forEach items="${page.content }" var="a" varStatus="vs">
					<tr>
						<td>${vs.count }</td>
						<td>${a.feedSource }</td>
						<td>${a.title }</td>
						<td>${a.userName }</td>
						<td>${a.userEmail }</td>
						<td>${a.userPhone }</td>
						<td><fmt:formatDate value="${a.feedTime }" /></td>
						<td>
							<a class="btn btn-default ajaxView" href="<s:url value='/feed/view/${a.feedid }' />" class="btn">查看</a>
							<a href="#" class="btn btn-default" onclick="delObject('${a.feedid }','<s:url value='/feed/del' />');">删除</a>
						</td>
					</tr>
				</c:forEach>
				</tbody>
			</table>
			
			<ul class="pagination">
			  <c:if test="${page.number>0 }">
			  	<li><a href="<s:url value='/feed/list?page=${page.number-1 }' />">Prev</a></li>
			  </c:if>
			  <c:forEach var="i" begin="1" end="${page.totalPages }">
			  	<c:if test="${page.number==i-1 }">
			  	<li class="active"><a href="<s:url value='/feed/list?page=${i-1 }' />">${i }</a></li>
			  	</c:if>
			  	<c:if test="${page.number!=i-1 }">
			  	<li><a href="<s:url value='/feed/list?page=${i-1 }' />">${i }</a></li>
			  	</c:if>
			  </c:forEach>
			  <c:if test="${page.number<page.totalPages-1 }">
			  	<li><a href="<s:url value='/feed/list?page=${page.number+1 }' />">Next</a></li>
			  </c:if>
			</ul>