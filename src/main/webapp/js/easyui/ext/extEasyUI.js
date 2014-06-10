/**
 * 
 * @param {} flag 
 */
function createTabPanel(flag){
	var tabPanel =$('<div id="springrain-index-tabsPanel" class="easyui-tabs" data-options="fit:true,border:false"></div>');
	$('#springrain-index-center').append(tabPanel);
	tabPanel.tabs({
		onLoad:function(panel){
		},
		onSelect : function(title) {
			// $('#springrain-index-tabsPanel').tabs('resize'); //easyui
			// tabs切换时，若出现panel里的内容的宽度变小，可以使用下面的方法。
		},
		onBeforeClose:function (title){
			
		},
		onClose: function(title) {
			
		},
		onContextMenu: function(e, title ,index){
			tabMenuLoad();//加载tab右键
			e.preventDefault();
			$('#springrain-index-tabsMenu').menu('show', {
				left: e.pageX,
				top: e.pageY
			}).data({'tabTitle' : title, 'tabIndex' : index});
		},tools : [ {
			iconCls : 'icon-reload',
			handler : function() {
				var href = $('#springrain-index-tabsPanel').tabs('getSelected').panel('options').href;
				if (href) {/*说明tab是以href方式引入的目标页面*/
					var index = $('#springrain-index-tabsPanel').tabs('getTabIndex', $('#springrain-index-tabsPanel').tabs('getSelected'));
					$('#springrain-index-tabsPanel').tabs('getTab', index).panel('refresh');
				} else {/*说明tab是以content方式引入的目标页面*/
					var panel = $('#springrain-index-tabsPanel').tabs('getSelected').panel('panel');
					var frame = panel.find('iframe');
					try {
						if (frame.length > 0) {
							for ( var i = 0; i < frame.length; i++) {
								frame[i].contentWindow.document.write('');
								frame[i].contentWindow.close();
								frame[i].src = frame[i].src;
							}
							if ($.browser.msie) {
								CollectGarbage();
							}
						}
					} catch (e) {
					}
				}
			}
		}, {
			iconCls : 'icon-cancel',
			handler : function() {
				var index = $('#springrain-index-tabsPanel').tabs('getTabIndex', $('#springrain-index-tabsPanel').tabs('getSelected'));
				var tab = $('#springrain-index-tabsPanel').tabs('getTab', index);
				if (tab.panel('options').closable) {
					$('#springrain-index-tabsPanel').tabs('close', index);
				} else {
					$.messager.alert('提示', '[' + tab.panel('options').title + ']不可以被关闭', 'error');
				}
			}
		} ]
	});
};

/**
 * 用于创建Tab选项卡
 * @param {} tTitle 选项卡(Tab)的标题
 * @param {} tUrl 选项卡的内容
 * @param {} tIconCls css样式
 * @param {} tIsClosable 设置选项卡是否可以关闭(true可以关闭,相反false不可以)
 */
function createTab(tTitle, tUrl, tIcon, tIsClosable) {
	if ($('#springrain-index-tabsPanel').tabs('exists', tTitle)) {
		$('#springrain-index-tabsPanel').tabs('select', tTitle);
	} else {
		$('#springrain-index-tabsPanel').tabs('add', {
			title : tTitle,
			closable : tIsClosable,
			selected : true,
			href : tUrl,
			iconCls : tIcon,
			closed: true,
			style:{
				marginLeft:2,
				marginTop:2
			},
			extractor: function(data){
				return data;
			}
		});
	};
};

//加载tab右键
function tabMenuLoad(){
	$('#springrain-index-tabsMenu').menu({
		onClick: function(item){
			closeTab(this, item.name);
		}
	});
}

//关闭tab
function closeTab(menu, itemName){
	var curTabTitle = $(menu).data('tabTitle');
	var curTabIndex = $(menu).data('tabIndex');
    var tabs = $('#springrain-index-tabsPanel');
    var curPanelParams=tabs.tabs('getTab', curTabTitle).panel('options');
    //刷新
    if (itemName == "m-updateTab") {
    	tabs.tabs('getTab', curTabTitle).panel('refresh', curPanelParams.href);
    	return;
	}
    //关闭
    if (itemName == "m-closeTab") {
    	if (!curPanelParams.closable) {
    		showMessage('温馨提示', '本页不能关闭！');
			return;
		}
        tabs.tabs('close', curTabTitle);
        return;
    }
    var allTabs = tabs.tabs("tabs");
    var closeTabsTitle = [];
    $.each(allTabs, function(i, n){
		var panelParams=$(this).panel('options');
		//除此之外全部关闭的title收集
		if(itemName == "m-closeOtherTab" && panelParams.closable && panelParams.title != curTabTitle){
			closeTabsTitle.push(panelParams.title);
		//关闭所有的title收集
		}else if(itemName == "m-closeAllTab" && panelParams.closable){
			closeTabsTitle.push(panelParams.title);
		//当前页左侧全部关闭	
		}else if(itemName == "m-closeThisLeft" && panelParams.closable){
			if (i<curTabIndex) {
				closeTabsTitle.push(panelParams.title);
			}
		//当前页右侧全部关闭	
		}else if(itemName == "m-closeThisRight" && panelParams.closable){
			if (i>curTabIndex) {
				closeTabsTitle.push(panelParams.title);
			}
		}	
	});
    //执行关闭
    for(var i = 0; i<closeTabsTitle.length; i++){
    	tabs.tabs('close', closeTabsTitle[i]);
    }
}
//使用方法 springrain.loadProgressBar();
var springrain = {
	//加载进度条
	loadProgressBar : function(){
		$("<div id='springrain-progressBar'></div><div id='springrain-loadimg'><span></span></div>").appendTo('body');
		var w=$(window).width(),h=$(window).height();
		$('#springrain-progressBar').css({'width':'100%','height':h,'position':'absolute','background':'#fff','z-index':88888888,'left':0,'top':0}).fadeTo('slow',0.8);
		$('#springrain-loadimg').css({'position':'absolute','background':'url(${ctx}/static/images/load/point-loading.gif) no-repeat center center','z-index':88888889,'width':'100px','height':'100px','left':(w-100)/2,'top':((h-100)/2)-30}).find('span').css({'position':'absolute','left':0,'bottom':'-40px','width':110,'display':'block','height':40,'text-align':'center'});
	},
	//关闭进度条
	stopProgressBar : function() {
		$('#springrain-progressBar').remove();
		$('#springrain-loadimg').remove();
	},
	//全屏
	fullscreen : function() {
		var docElm = document.documentElement;
		if (docElm.requestFullscreen) {
			docElm.requestFullscreen();
		} else if (docElm.mozRequestFullScreen) {
			docElm.mozRequestFullScreen();
		} else if (docElm.webkitRequestFullScreen) {
			docElm.webkitRequestFullScreen();
		}
	},
	//退出全屏
	exitFullscreen : function() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	},
	//IE全屏
	fullscreenIE : function() {
		if ($.browser.msie) {
			var wsh = new ActiveXObject("WScript.Shell");
			wsh.sendKeys("{F11}");
		}
	}

};
/*-------------------------------------------------------------------------------------------------------------------------*/
var jt={
		dialog:{
			loadMsg:'数据装载中,请稍候...',
			cache: false,
			modal: false
		},
		messager:{
			showType:'slide',
			showSpeed:600,
			width:250,
			height:100,
			timeout:3000
		}
};

var config = {
		datagridR: function(){
			
		}
};
/*-------------------------------------------------------------------------------------------------------------------------*/
 /**
  * 
  * @param {} mTitle 消息提示框的标题
  * @param {} mMsg 消息提示框的内容
  */
function showMessage(mTitle, mMsg) {
	$.messager.show({
				title : mTitle,
				msg : mMsg,
				showType : 'show',
				timeout:5000
			});
};

function showDialog(dId, dTitle, dWidth, dHeight){
	dId.dialog({
		closed: false,
		title: dTitle,
		noheader: false,
		fit: false,
		width: dWidth,
		height: dHeight,
		border : true,
		cache: false,
		modal: true,
		loadingMessage: '数据装载中,请稍候...',
		onMove: function(left,top){
		//	alert($(window).height()+"--"+$(window).width());
		}
	});
	$('#springrain-index-dialog').dialog('refresh');

}

/**
 * 
 * @Title: isSelectedOneLine
 * @Description: 检查datagrid是否选中一行
 * @param object
 * @returns {Boolean}
 * @throws
 */
function isSelectedOneLine(object){
	var row=object.datagrid('getSelected');
	if (row) {
		return true;
	}else {
		return false;
	}
}


/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
 */
var createGridHeaderContextMenu = function(e, field) {
	e.preventDefault();
	var grid = $(this);/* grid本身 */
	var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
	if (!headerContextMenu) {
		var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
		var fields = grid.datagrid('getColumnFields');
		for ( var i = 0; i < fields.length; i++) {
			var fildOption = grid.datagrid('getColumnOption', fields[i]);
			if (!fildOption.hidden) {
				$('<div iconCls="icon-ok" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			} else {
				$('<div iconCls="icon-empty" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			}
		}
		headerContextMenu = this.headerContextMenu = tmenu.menu({
			onClick : function(item) {
				var field = $(item.target).attr('field');
				if (item.iconCls == 'icon-ok') {
					grid.datagrid('hideColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-empty'
					});
				} else {
					grid.datagrid('showColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-ok'
					});
				}
			}
		});
	}
	headerContextMenu.menu('show', {
		left : e.pageX,
		top : e.pageY
	});
};
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;



/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其支持平滑数据格式
 */
$.fn.tree.defaults.loadFilter = function(data, parent) {
	var opt = $(this).data().tree.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'name';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};


/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展treegrid，使其支持平滑数据格式
 */
$.fn.treegrid.defaults.loadFilter = function(data, parentId) {
	var opt = $(this).data().treegrid.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'name';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};

/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展combotree，使其支持平滑数据格式
 */
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

$.fn.combobox.defaults.loadFilter = $.fn.tree.defaults.loadFilter;



/**
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
$.fn.panel.defaults.onBeforeDestroy = function() {
	var frame = $('iframe', this);
	try {
		if (frame.length > 0) {
			for ( var i = 0; i < frame.length; i++) {
				frame[i].contentWindow.document.write('');
				frame[i].contentWindow.close();
			}
			frame.remove();
			if ($.browser.msie) {
				CollectGarbage();
			}
		}
	} catch (e) {
	}
};


/**
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI,jQuery cookie plugin
 * 
 * 更换EasyUI主题的方法
 * 
 * @param themeName
 *            主题名称
 */
changeTheme = function(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
	$easyuiTheme.attr('href', href);

	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for ( var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			$(ifr).contents().find('#easyuiTheme').attr('href', href);
		}
	}

	$.cookie('easyuiThemeName', themeName, {
		expires : 7
	});
};





/**
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 * 通用错误提示
 * 
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 */
var easyuiErrorFunction = function(XMLHttpRequest) {
	$.messager.progress('close');
	$.messager.alert('错误', XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;


/* @author 孙宇
* 
* 增加formatString功能
* 
* 使用方法：formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
* 
* @returns 格式化后的字符串
*/
formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};

/**
 * @author 孙宇
 * 
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 * 
 * @returns list
 */
stringToList = function(value) {
	if (value != undefined && value != '') {
		var values = [];
		var t = value.split(',');
		for ( var i = 0; i < t.length; i++) {
			values.push('' + t[i]);/* 避免他将ID当成数字 */
		}
		return values;
	} else {
		return [];
	}
};

/**
 * @author 孙宇
 * 
 * @requires jQuery
 * 
 * 将form表单元素的值序列化成对象
 * 
 * @returns object
 */
serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};


/**
 * @author 夏悸
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其可以获取实心节点
 */
$.extend($.fn.tree.methods, {
	getCheckedExt : function(jq) {// 获取checked节点(包括实心)
		var checked = $(jq).tree("getChecked");
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	},
	getSolidExt : function(jq) {// 获取实心节点
		var checked = [];
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	}
});


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}