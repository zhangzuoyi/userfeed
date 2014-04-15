<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<link href="<s:url value='/static/jquery-validation/style.css' />" rel="stylesheet">
<script src="<s:url value='/static/jquery-validation/jquery.validate.min.js' />"></script>
<script src="<s:url value='/static/jquery-validation/messages_zh.js' />"></script>
<script>
  $(function() {
	  $.validator.addMethod("regexp", function (value, element) {
		    return this.optional(element) || /^[a-zA-Z0-9_]+$/.test(value);
	  }, '只能由数字字母和下划线组成.');
	  $("#submitForm").validate({
  		rules: {
  			loginName:{
  				required: true,
  				maxlength: 50,
  				regexp: true
  			},
  			psw:{
  				required: true,
  				minlength: 6,
  				maxlength: 50
  			},
  			rePsw:{
  				required: true,
  				equalTo: "#psw"
  			}
  		}
	  });
  });
</script>