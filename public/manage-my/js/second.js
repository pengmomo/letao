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
            $('input[name=brandLogo]').val(data.result.picAddr);
            $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    });

    // 页面打开，获取分类数据
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 200
        },
        success: function (data) {
            console.log(data);
            $('.dropdown-menu').html('');
            $.each(data.rows, function (i, n) {
                var $li = $("<li><a data-id='" + n.id + "' href='javascript:void(0);'>" + n.categoryName + "</a></li>");
                $('.dropdown-menu').append($li);
            })
        }
    })

    // ul点击事件
    $('.dropdown-menu').on('click', 'li a', function () {
        $('.select').html($(this).html())
        $('input[name=categoryId]').val($(this).attr('data-id'));
        $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')
    })

    // 表单校验
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类不能为空'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    }
                }
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url:'/category/addSecondCategory',
            data:$('form').serialize(),
            type:'post',
            success:function(data){
                console.log(data);
                getData();
                $('.modal-add').modal('hide');
                $("form").data('bootstrapValidator').resetForm()
                $("form input").val('');
                $("form img").attr('src','./images/none.png');
                $('.select').html('请选择');
            }
        })
    });
})