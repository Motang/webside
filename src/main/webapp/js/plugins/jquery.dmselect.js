
<!--定义select列表项option-->
/**
 *jquery 下拉框多选的插件
 * @author 郑永生
 * @date 2009-10-24
 */
(function ($) {
	/**
	 * jquery 插件 入口
	 * 
	 * @param source
	 *            ajax请求的路径
	 * @param options
	 *            配置各种属性
	 * 
	 * 
	 * source:请求路径 
	 * param:用户需要传递的参数,如果需要动态绑定文本框的值,必须用"#"开头
	 * textName:用定义ajax传递时,文本框的名字
	 * hiddenId:把id值要赋予的表单元素 
	 * ajaxKey :返回json 数据的 key 
	 * ajaxValue:返回json 数据的 value
	 * checkboxName:checkbox的名字
	 * divId: 要显示的div的Id
	 * hiddenId:赋值给隐藏域的Id
	 * jsonValue :json格式的数据源;---不经过ajax请求
	 *  
	 */
	
	
	$.fn.dmselect = function (source, options) {
		if (!source) {
			return;
		}
		options = options || {};
		options.source = source;
		options.textName = options.textName || false;
		options.param = options.param || false;
		options.ajaxKey = options.id || "id";
		options.ajaxValue = options.ajaxValue || "name";
		options.checkboxName = options.checkboxName || "checkbox";
		options.jsonValue=options.jsonValue||false;
		this.each(function () {// 遍历需要进行自动提示的文本框对象
			var _this_id = this.id;
			options.hiddenId = options.hiddenId || (_this_id + "_hidden");
			options.divId = options.divId || ("dmSelect_" + _this_id + "_div");
			options.hiddenId = options.hiddenId || (_this_id + "_hidden");
			new jquery_dmSelect(this, options);// 实例化一个 自动提示的对象
		});
		return this;
	};
	jquery_dmSelect = function (_this, options) {
		$(_this).attr("readonly", "readonly");  //设置控件只读
		$(_this).css({"BORDER-BOTTOM":"gray 1px solid", "BORDER-LEFT":"gray 1px solid", "HEIGHT":"17px", "BORDER-TOP":"gray 1px solid", "BORDER-RIGHT":"gray 1px solid"});
		var top = $(_this).offset().top;   //获取控件top、left位置和width、height
		var left = $(_this).offset().left;
		var height = $(_this).height();
		var width = $(_this).width() + 3;
		var option_open = false;      //标记是否打开下拉option
		
		
		if(options.jsonValue){//json数据源
			draw_div_fn(options.jsonValue);
		}else{//没有提过数据源 就进行ajax请求
		/**
	     *ajax 请求
	     */
		var params = "";
		if (options.param) // 加入用户自定义的参数
		params = params + getParamStr(options.param);
		  $.ajax({type:"POST", data:params, dataType:"json", url:options.source, success:function (_json) {
			   draw_div_fn(_json);
		      }});
		}
		/**
         * 画出div
         */
		function draw_div_fn(_json) {//循环遍历后台返回的json数据
			//var div_html = "<div id='" + options.divId + "' style='position:absolute;background-color:#FFFFFF;top:" + (top + height + 3) + "px;left:" + left + "px;width:" + ((width < 30) ? 30 : width) + "px;height:" + __dropheight(_json.length) + "px;border:1px #666666 solid;overflow-x:hidden;overflow-y:auto;display:none;z-index:99999;'>";
           var div_html = "<div id='" + options.divId + "' style='position:absolute;background-color:#FFFFFF;border:1px #666666 solid;overflow-x:hidden;overflow-y:auto;display:none;z-index:99999;'>";
              //for循环填充option
			div_html += "<table>";
			var checkAllId=options.divId+"_dmselectcheckboxall";
			//添加全选
			div_html += "<tr><td><input type='checkbox' id='"+checkAllId+"' /></td><td>全选</td></tr>";
			$.each(_json,function(i,_obj) {
				div_html += "<tr><td><input type='checkbox' class='"+checkAllId+"' name='" + options.checkboxName + "' id='" +_obj[options.ajaxKey] + "' value='" + _obj[options.ajaxKey] + "' /></td><td class='dmselecttd'>" + _obj[options.ajaxValue] + "</td></tr>";
			});
			div_html += "</table></div>";
			$("body").append(div_html);  //添加到body中,重新定位,不会受其外边的元素的css.影响...
		// 设置定位
	    	resetPosition();
		// 用户修改窗口大小,重新定位
		$(window).load(resetPosition).resize(resetPosition);
			//添加单击事件
			click_text_fn();
		   //初始化选中事件
			init_checkbox_fn();
			  //添加全选
				$("#"+checkAllId).checkbox().toggle(":checkbox[class='"+checkAllId+"']",function(checkAllId){
					checkbox_values_texts(":checkbox[class='"+checkAllId+"']");
				});
				
				//为复选框添加 单击事件
			$(":checkbox[class='"+checkAllId+"']", $("#" + options.divId)).click(function(){
				checkbox_values_texts(":checkbox[class='"+checkAllId+"']");
			
			});
			
		}
		/**
         *初始化选中复选框
         */
		function init_checkbox_fn() {
			var str = document.getElementById(options.hiddenId).value;
		
			if (typeof (str) == "undefined" || str == "") {
				return null;
			}
			var strs = new Array();
			strs = str.split(",");
			for (var i = 0; i < strs.length; i++) {
				if(strs[i]!=null&&strs[i]!="")
			  	$("#"+strs[i], $("#" + options.divId)).attr("checked",true);
			}
		}
		/**
   * 单击文本框 显示div 事件
   */
		function click_text_fn() {
			$(_this).click(function (event) {
				if (option_open) {
					__hide_option();
				} else {
					__open_option();
					$(document).bind("click", __hide_option);
				}
				event.stopPropagation();
			});
		}


		
//计算 选中的文本框和隐藏域的值	
 function checkbox_values_texts(checkboxClss){
	 var _val = "";//记录选中的值
		var _hiddenVal="";
		$.each($(checkboxClss, $("#" + options.divId)),function () {//循环遍历所有的被选中的checkbox
			if ($(this).attr("checked")) {//如果被选中
				_hiddenVal=_hiddenVal+$(this).attr("value")+",";
				var _td = $(this).parent("td").next();//获得对应的文本
				_val = _val + _td.html() + ",";//拼接文本
			}
		});
		
		$(_this).val(_val);//把值赋给文本框
		document.getElementById(options.hiddenId).value=_hiddenVal;
		//event.stopPropagation();
		//return false;
 }
		
 
 //计算下拉option显示高度
		function __dropheight(l) {
			var h;
			if (l > 10 || l < 1) {
				h = 10 * 20;
			} else {
				h = (l - 1) * 20;
				h += 4;
			}
			return h;
		}  
  //显示下拉option
		function __open_option() {
			resetPosition();
			$("#" + options.divId).show();
			option_open = true;
		} 
 //隐藏下拉option
		function __hide_option() {
			var eventObj = document.activeElement; // 当前的获得焦点的对象
			var divObj = $(eventObj).parents("div").eq(0);
			var focusId = divObj.attr("id");
			if (!focusId) {// 如果父类不存在(则是div自己)
			}
			focusId = eventObj.id;
			if (focusId == options.divId) {
				return null;
			}
			$("#"+options.divId).hide();
			option_open = false;
			$(document).unbind("click", __hide_option);
		}
		
		/**
		 * 定位函数
		 */
		function resetPosition() {
	
			var offset = $(_this).offset();
			
				$("#"+options.divId).width($(_this).width() + 6);// 设置层宽度
				$("#"+options.divId).css( {
					top : (offset.top + _this.offsetHeight) + 'px',
					left : offset.left + 'px',
					// width :offset.width + 'px',
					height : '250px'
				// overflow:'scroll'
						});
			
		
		}
		
	};
})(jQuery);

