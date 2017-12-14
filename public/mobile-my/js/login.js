$(function(){
    $('form button[type=submit]').click(function(e){
        e.preventDefault();
        $.ajax({
            url:'/user/login',
            data:$('form').serialize(),
            type:'post',
            success:function(data){
                console.log(data);
                if(data.success){
                    window.history.back();
                }else{
                    mui.toast('账号或密码错误')
                }
            }
        })
    })
    
})