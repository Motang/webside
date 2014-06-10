/**
 * fwlog 页面使用javascript
 * @copyright {@link springrain}
 * @author 9iu.org<Auto generate>
 * @version  2013-07-29 11:36:44
 */


jQuery(document).ready(function(){
    
});

//提交表单
function submitUpdateForm(){
var flag=jQuery("#updateForm").form("validate");
if(flag){
submitForm("updateForm");
}

}
