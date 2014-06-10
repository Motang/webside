/**
 * userorg 页面使用javascript
 * @copyright {@link springrain}
 * @author 9iu.org<Auto generate>
 * @version  2013-07-29 11:36:47
 */


jQuery(document).ready(function(){
    //增加全选事件
   	jQuery(":checkbox[name='check_all']").checkbox().toggle(":checkbox[name='check_li']");
	//validateRules('saveForm');
});

function delUserOrg(id){
    var url = ctx + "/userorg/delete?id=" + id;
        myconfirm("确定要删除么?",function(){
		 jQuery.get(url, null, function(data){
            if (data.status == "success") {
                myalert(data.message);
                myreloadpage();
            }
            else {
                myalert(data.message);
            }
          });
		});
       
    
}
function delMulti(){
     var records = jQuery(":checkbox[name='check_li']").checkbox().val();
    if (records.length == "") {
        myalert('未选中任何记录!');
        return;
    }
	var url = ctx + "/userorg/delMulti";
    myconfirm("记录删除后将不能恢复,确定要删除选中的记录么?",function(){
	 jQuery.get(url, "records=" + records, function(data){
            myalert(data.message);
            myreloadpage();
        });
	});
 
}
