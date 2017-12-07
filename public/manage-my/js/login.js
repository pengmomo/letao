$(function () {

    // 测试代码
    // $('button[type=submit]').click(function(e){
    //     e.preventDefault();
    //     $.ajax({
    //         url:'/employee/employeeLogin',
    //         data:$('form').serialize(),
    //         type:'post',
    //         success:function(data){
    //             console.log(data)
    //         }   
    //     })
    // })

    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 用户名
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度必须在3到30之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                },
            },
            // 密码
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                },
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        // console.log('dianji')
        //开启进度条
        NProgress.start();
        $.ajax({
            url: '/employee/employeeLogin',
            data: $('form').serialize(),
            type: 'post',
            success: function (data) {
                console.log(data);
                if (data.success == true) {
                    window.location.href = "./index.html";
                } else {
                    var validator = $("form").data('bootstrapValidator'); //获取表单校验实例

                    //使用表单校验实例可以调用一些常用的方法。
                    if (data.error == 1000) {
                        validator.updateStatus('username', 'INVALID', 'callback');
                    } else if (data.error == 1001) {
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }
                //关闭进度条
                setTimeout(function(){
                    NProgress.done();
                },1000)
            }
        })
    })

    $('button[type=reset]').click(function(){
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm();
    })
})