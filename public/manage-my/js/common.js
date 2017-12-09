$(function () {
    // 判断是否登录
    $.ajax({
        url: '/employee/checkRootLogin',
        success: function (data) {
            if (data.error) {
                window.location.href = './login.html'
            }
        }
    })

    // 点击收起左边
    $('.lt-main .header a.glyphicon-align-justify').click(function () {
        $('.lt-aside').toggle();
        $('.lt-main').toggleClass('fullScreen');
    })

    // 点击弹出模态框
    $('.lt-main .header a.glyphicon-log-out').click(function () {
        $('.modal-sure').modal('show')
    })

    // 点击确定退出系统调回登陆页面 调出登出接口
    $('.modal-sure button.btn-primary').click(function () {
        $('.modal-sure').modal('hide');
        $.ajax({
            url: '/employee/employeeLogout',
            success: function (data) {
                console.log(data);
                window.location.href = './login.html'
            }
        })
    })

      // 侧边栏 展开 收起
      $('.content ul >li:eq(1)>a').click(function(){
          $(this).siblings('ol').slideToggle();
      })

})