function getData(page) {
    $.ajax({
        type: "get",
        url: "http://192.168.1.108/sql.php?page=" + page,
        dataType: "json",
        // data: {
        // 'page': page
        // },
        success: function(data) {
            var str = "";
            for (var i = 0; i < data.content.length; i++) {
                str += '<li class="col-md-4 dynamic_list"><a href="article_details.html"><img src="src/images/h-01.jpg" alt=""><h5>' + data.content[i].title + '</h5><p>xxxxxxxxxxxxxxxxx</p></a></li>';
            }
            $(".dynamicListMain").html(str);

            var pageNum = Math.ceil(data.count / 6); //获取得到的数据页数
            var curPage = page; //获取当前页
            var result = "";
            /*若页数大于1则添加上一页、下一页链接*/
            if (curPage > 1) {
                //str = "<ul><li><a href='javascript:void(0);onclick=preEvent();' id='pre' data-num='1'>上一页</a></li>"
                result = '<ul class="pagination"><li><a href="#" aria-label="Previous" onclick=preEvent() id="pre"><span aria-hidden="true" data-num=' + curPage + '>上一页</span></a></li>';
            } else {
                // result = '<ul class="pagination">';
                result = '<ul class="pagination"><li><a href="javascript:void();" aria-label="Previous" id="pre"><span aria-hidden="true" data-num=' + curPage + '>上一页</span></a></li>';
            }
            /*循环输出每一页的链接*/
            for (var i = 0; i < pageNum; i++) {
                if (i + 1 == curPage) {
                    result += '<li><a href="#" class="nav_active" aria-label="Previous" onclick=getData(' + (parseInt(i) + 1) + ')><span aria-hidden="true">' + (parseInt(i) + 1) + '</span></a></li>';
                } else {
                    result += '<li><a href="#" aria-label="Previous" onclick=getData(' + (parseInt(i) + 1) + ')><span aria-hidden="true">' + (parseInt(i) + 1) + '</span></a></li>';
                }
            }
            if (result.indexOf("上一页") > -1) {
                result += '<li><a href="#" aria-label="Previous" onclick=nextEvent() data-num=' + curPage + '><span aria-hidden="true" id="next">下一页</span></a></li>' +
                    '<li><a href="#" aria-label="Previous" onclick=nextEvent()><span aria-hidden="true" id="pageNum">共' + pageNum + '页</span></a></li>';
            } else {
                result += '<li><a href="#" aria-label="Previous" onclick=nextEvent()><span aria-hidden="true" id="pageNum">共' + pageNum + '页</span></a></li></ul>';
            }
            console.log(result);
            $(".pageContent").html(result);
            //把当前页码存到上一页、下一页的data-num属性中，这样可以在点击上一页或者下一页时知道应该跳到哪页
            $("#pre").attr("data-num", curPage);
            $("#next").attr("data-num", curPage);
        },
        error: function(data) {
            alert("请求失败");
        }
    });
}

getData(1);
/**
 * 上一页点击事件
 */
function preEvent() {
    var curPage = $("#pre").attr("data-num");
    console.log(curPage)
    if (curPage <= 1) {
        $(this).attr('disabled', true);
    } else {
        curPage = parseInt(curPage) - 1;
        getData(curPage);
    }
}
/**
 * 下一页点击事件
 */
function nextEvent() {
    var curPage = $("#next").attr("data-num");
    var pageNum = $("#pageNum").text();
    if (curPage >= pageNum) {
        $(this).attr('disabled', true);
    } else {
        curPage = parseInt(curPage) + 1;
        getData(curPage);
    }
}