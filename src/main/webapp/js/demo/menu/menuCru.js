/**
 * menu 页面使用javascript
 * @copyright {@link springrain}
 * @author 9iu.org<Auto generate>
 * @version  2013-07-29 11:36:45
 */


jQuery(document).ready(function(){
    
});

//提交表单
function submitUpdateForm(){
var flag=jQuery("#updateForm").form("validate");
if(flag){
	var pid=jQuery('#pid');
	if(!pid){
		myalert("对不起，父类菜单必须选择");
	}
	submitForm("updateForm");
}

}
