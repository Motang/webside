/**
 * checkbox 全选操作
 * 
 * @author Akon(番茄红了) <aultoale@gmail.com>
 * @copyright Copyright (c) 2008 (http://www.tblog.com.cn)
 * @license http://www.gnu.org/licenses/gpl.html GPL 3
 * 
 * @example $('input[@type=checkbox][@name=checkAll]').checkbox(); 自动切换 :
 *          .toggle(element) 全选 : .checked(element) 反选 : .unchecked(element)
 *          获取字符串值 : .val()
 * 
 * 
 * $('input[name=checkAll]').checkbox().toggle('input[name=checkbox]');
 * //自动切换全选/反选
 * $('input[name=checkAll]').checkbox().checked('input[name=checkbox]'); //全选
 * $('input[name=checkAll]').checkbox().unchecked('input[name=checkbox]'); //反选
 * $('input[name=checkbox]').checkbox().val(); //获取字符串值
 */
(function ($) {
$.fn.checkbox = function() {

	var hand = this;

	/**
	 * 切换全选/反选
	 * 
	 * @example .toggle($('input[type=checkbox][name=id]'))
	 */
	this.toggle = function(ele,callback) {
		$(this).attr("disabled", this.disabled(ele));

		$(ele).click(function(e) {
			$(hand).attr("checked", false);
			e.stopPropagation();
			if(callback)
				callback($(this).attr("id"));
		});
		$(this).click(function(e) {
			//var flag = $(this).attr("checked") == true ? true : false;
			var flag = $(this).attr("checked");
			if(flag)
				flag=true;
			else
				flag=false;
			
			$(ele).each(function(i, _checkbox) {
				if (!$(_checkbox).attr("disabled")){
					$(_checkbox).attr("checked", flag);
				}
			});
			e.stopPropagation();
			if(callback)
				callback($(this).attr("id"));
		});
		
		
		
		
		
	};

	/**
	 * 全选
	 */
	this.checked = function(ele) {
		$.each($(ele),function(i, _checkbox) {
			if (!$(_checkbox).attr("disabled"))
				$(_checkbox).attr("checked", true);
		});
	};

	/**
	 * 反选
	 */
	this.unchecked = function(ele) {
		$.each($(ele),function(i, _checkbox) {
			if (!$(_checkbox).attr("disabled"))
				$(_checkbox).attr("checked", false);
		});
	};
	/**
	 * 判断是否可以复选
	 */

	this.disabled = function isDisabled(ele) {
		var flag = true;
		$.each($(ele),function(i, _checkbox) {
			if (!$(_checkbox).attr("disabled")) {
				flag = false;
				return flag;
			}
		});
		return flag;
	}

	/**
	 * 获取已选中值, 并以字符串返回数据
	 */
	this.val = function() {
		var string = "";
		$.each($(this),
				function() {
					if ($(this).attr("checked")
							&& (!$(this).attr("disabled"))
							&& $(this).val()) {
						if (string) {
							string += ",";
						}
						string += $(this).val();
					};
				});
		return string;
	};
	return this;
};
})(jQuery);