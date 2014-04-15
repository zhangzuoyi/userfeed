  function initSubCategory(scId){
	  var id=$("#categorySelect").val();
	  $("#subCategorySelect").children("option").hide();
	  $("#subCategorySelect").children("option").eq(0).show();
	  $("#subCategorySelect").find("option."+id).show();
	  $("#subCategorySelect").val(scId);
  }