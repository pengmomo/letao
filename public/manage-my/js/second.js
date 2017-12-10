$(function () {
    var mypageNum = 1;
    var mypageSize = 5;

    function getData() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: mypageNum,
                pageSize: mypageSize
            },
            success: function (data) {
                console.log(data);
                $('tbody').html(template('secondTmp', data));
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
    getData();

    // 上传图片预览
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data.result.picAddr);
            $('form img').attr('src', data.result.picAddr)
        }
    });

    // 页面打开，获取分类数据
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:200
        },
        success:function(data){
            console.log(data);
            $('.dropdown-menu').html('');
            $.each(data.rows,function(i,n){
                var $li = $("<li><a href='javascript:void(0);'>"+n.categoryName+"</a></li>");
                $('.dropdown-menu').append($li)
            })
        }
    })

    // ul点击事件
    $('.dropdown-menu').on('click','li a',function(){
        $('.select').html($(this).html())
    })
})