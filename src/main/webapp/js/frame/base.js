function myreloadpage(){
	  setTimeout(function(){location.reload();},1000);
}

function submitForm(formName){
	document[formName].submit();
}


function f_newTab(tabId,iframeId,tabTitle,tabHref){
	 try{
		var _fid=getCurrIframeId();
	     //jQuery.cookie(iframeId,_fid,{ expires:1000,path:"/"});
		jQuery.cookie(iframeId,_fid,{path:"/"});
		top.parent.qxTabAdd(tabId,iframeId,tabTitle,tabHref,false);
	 }catch(err){
	 	 window.location.href=tabHref;
		 //window.open(tabHref,"_blank" ,"resizable:true");
		// window.open(tabHref,"_blank");
	 }
}

function getCurrIframeId(){
	var id=null;
	   jQuery.each(jQuery("iframe",jQuery(self.parent.document.getElementById("systemTabs"))),function(i,_iframe){
	            if(window==_iframe.contentWindow){
	            	id= _iframe.id;
	             return false;
	            }
	           });
	   
	   return id;
	}


function reloadParentFrame(){
	try{
	var _fid=getCurrIframeId();
	var pid=  jQuery.cookie(_fid);
	
	var _iframe=  jQuery("iframe[id='"+pid+"']",jQuery(self.parent.document.getElementById("systemTabs"))).get(0);
	//清除cookie
         //  jQuery.cookie(_fid,null);
          _iframe.contentWindow.location.reload();
          
	}catch(e){
		
	}
		
    
}