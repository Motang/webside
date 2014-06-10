/** 
 *自定义的校验方法(校验两次密码是否相同) 
 * @param param为传入第一次输入的密码框的id 
 * @call repeat['#id'] 
 */  
$.extend($.fn.validatebox.defaults.rules,{  
	equalTo : {
	    validator: function (value, param) {
	       return value == $(param[0]).val();
	    },
	    message: '两次输入的字符不一至'
	},
	email : {
		validator: function (value, param) {
		       return  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		},
		message: '非法邮箱地址'
	},
	phone : {
		validator: function (value,param){
			return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value);
		},
		message: '电话号码不正确'
	},
	mobile : {
		validator: function (value,param){
			return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$/.test(value);
		},
		message: '手机号码不正确'
	},
	tel :{
		validator : function (value,param){
			return /^(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(value);
		},
		message: '联系电话不正确'
	},
	number :{
		validator : function (value,param){
			return /^\d+$/.test(value);
		},
        message: '请输入数字'
	}
});