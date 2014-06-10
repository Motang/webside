function sortTable(formName,th_id){
 var sort=	jQuery("#page_sort").val();
 var order=	jQuery("#page_order").val();
  var orderId= th_id.substring(3,th_id.length);
 // var _html= jQuery("#"+th_id).html();
  if(order==orderId){
	  if(sort=="desc"){
		  jQuery("#page_sort").val("asc");
		 // jQuery("#"+th_id).html(_html+"(↑)");
	  }else{
		  jQuery("#page_sort").val("desc");
		//  jQuery("#"+th_id).html(_html+"(↓)");
	  }
		  
  }else{
	  jQuery("#page_sort").val("desc");
	//  jQuery("#"+th_id).html(_html+"(↓)");
	  jQuery("#page_order").val(orderId);
  }
	document[formName].submit();
}

function initSortTable(tableId,formId){
	var sort=	jQuery("#page_sort").val();
	var order=jQuery("#page_order").val();
	 var th_id=	"th_"+order;
		jQuery("th[id^='th_']",jQuery("#"+tableId)).each(function(i,_th){
			var _id=jQuery(_th).attr("id");
			
			jQuery(_th).append("<img src='"+ctx+"/images/sort_both.png"+"' />");
			
			jQuery(_th).click(function(){
				  var orderId= _id.substring(3,_id.length);
				  if(order==orderId){
					  if(sort=="desc"){
						  jQuery("#page_sort").val("asc");
					  }else{
						  jQuery("#page_sort").val("desc");
					  }
						  
				  }else{
					  jQuery("#page_sort").val("desc");
					  jQuery("#page_order").val(orderId);
				  }
					document[formId].submit();
			});
			
			
		
			if(_id!=th_id){
				 jQuery("img",jQuery(_th)).attr("src",ctx+"/images/sort_both.png");
				
			}else{
				  if(sort=="desc"){
					  jQuery("img",jQuery(_th)).attr("src",ctx+"/images/sort_desc.png");
				  }else{
					  jQuery("img",jQuery(_th)).attr("src",ctx+"/images/sort_asc.png");
				  }
			}
		});
	 
}

function export_excel(formName){
  var action=	document[formName].action;
  document[formName].action=action+"/export";
  document[formName].submit();
  document[formName].action=action;
}



function mouseTrColor(tableId){
	jQuery("tr[id!='table_first_tr']",jQuery("#"+tableId)).each(function(i,_tr){
		jQuery(_tr).mouseover(function(){
			var bgcolor=jQuery(_tr).attr("bgcolor");
			if(bgcolor!="#FFFF00" && bgcolor!="#ffff00"){
				jQuery(_tr).attr("bgcolor","#ecf6fc");
			}
			return false;
		});
		
		
		jQuery(_tr).mouseout(function(){
			var bgcolor=jQuery(_tr).attr("bgcolor");
			if(bgcolor!="#FFFF00" && bgcolor!="#ffff00"){
				jQuery(_tr).attr("bgcolor","#FFFFFF");
			}
			return false;
		});
		
		
		jQuery(_tr).dblclick(function(){
			var bgcolor=jQuery(_tr).attr("bgcolor");
			if(bgcolor=="#FFFF00" || bgcolor=="#ffff00"){
				jQuery(_tr).attr("bgcolor","#FFFFFF");
			}else{
				jQuery(_tr).attr("bgcolor","#FFFF00");
	
			}	
			return false;
		});
		
		
		
	});
	
}


