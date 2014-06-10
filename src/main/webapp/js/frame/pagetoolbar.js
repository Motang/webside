//上一页
function upPage(formName){
var pageindex=document.getElementById("pageIndex").value;
pageindex=parseInt(pageindex)-1;
document.getElementById("pageIndex").value=pageindex;
document[formName].submit();
}
//下一页
function downPage(formName){
var pageindex=document.getElementById("pageIndex").value;
pageindex=parseInt(pageindex)+1;
document.getElementById("pageIndex").value=pageindex;
document[formName].submit();
}

//首页
function startPage(formName){
document.getElementById("pageIndex").value="1";
document[formName].submit();
}
//末页
function endPage(formName){
document.getElementById("pageIndex").value=document.getElementById("pageCount").innerHTML;
document[formName].submit();
}
