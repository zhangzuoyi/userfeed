<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
	<form id="delForm" method="post">
		<input type="hidden" id="delId" name="id" />
	</form>
	<div id="dialog-message" title="删除确认">
        <p>
            确定删除吗？
        </p>
    </div>
<link href="<s:url value='/static/jqueryui/jquery-ui-1.10.2.custom.css' />" rel="stylesheet">
<script src="<s:url value='/static/jqueryui/jquery-ui-1.10.2.custom.min.js' />"></script>
<script type="text/javascript">
<!--
$(function(){
	$("#dialog-message").dialog({
	    autoOpen: false,
	    modal: true,
	    buttons: {
	        "Ok": function () {
	            $(this).dialog("close");
	            $("#delForm").submit();//2 再提交删除
	        },
			"No": function () {
	            $(this).dialog("close");
	        }
	    }
	});
});

function delObject(aid,action){
	var delId=document.getElementById("delId");
	delId.value=aid;//1 先设值
	$("#delForm").attr("action",action);
	$('#dialog-message').dialog('open');
}
//-->
</script>