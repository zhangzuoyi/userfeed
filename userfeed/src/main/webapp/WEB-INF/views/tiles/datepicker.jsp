<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<link href="<s:url value='/static/jqueryui/jquery-ui-1.10.2.custom.css' />" rel="stylesheet">
<script src="<s:url value='/static/jqueryui/jquery-ui-1.10.2.custom.min.js' />"></script>
<script>
  $(function() {
    $( ".datepicker" ).datepicker({dateFormat: 'yy-mm-dd',changeMonth: true,
        changeYear: true});
  });
</script>