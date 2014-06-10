/**
 * blog 页面使用javascript
 * @copyright {@link 9iu.org}
 * @author springrain<Auto generate>
 * @version  2013-09-07 09:37:01
 */


jQuery(document).ready(function(){
    //增加全选事件
   	jQuery(":checkbox[name='check_all']").checkbox().toggle(":checkbox[name='check_li']");
	//validateRules('saveForm');
});

function delBlog(id){
    var url = ctx + "/blog/delete?id=" + id;
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
	var url = ctx + "/blog/delMulti";
    myconfirm("记录删除后将不能恢复,确定要删除选中的记录么?",function(){
	 jQuery.get(url, "records=" + records, function(data){
            myalert(data.message);
            myreloadpage();
        });
	});
 
}
