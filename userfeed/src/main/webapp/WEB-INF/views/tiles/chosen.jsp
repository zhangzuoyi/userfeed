<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<script src="<s:url value='/static/chosen/chosen.jquery.min.js' />"></script>
<script>
  $(function() {
	  $(".chosen-select").chosen();
  });
</script>