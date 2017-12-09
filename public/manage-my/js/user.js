$(function () {

    var mypageNum = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: mypageNum,
                pageSize: mypageSize,
            },
            success: function (data) {
                console.log(data);
                $('tbody').html(template('userTmp', data));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: mypageNum, //当前页
                    totalPages: Math.ceil(data.total / data.size), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        mypageNum = page;
                        getData();
                    }
                });
            }
        })
    }

    getData()

    // 页面的启用禁用
    $('tbody').on('click','button',function(){
       var id = $(this).parent().attr('data-id');
       var isDelete = null;
        if($(this).html()=='启用'){
            isDelete = 0
        }else{
            isDelete = 1
        }
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(data){
                console.log(data);
                getData();
            }
        })
    })

})