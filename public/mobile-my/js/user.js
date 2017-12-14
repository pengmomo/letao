$(function () {
    $('.button').click(function () {
        $.ajax({
            url: '/user/logout',
            success: function (data) {
                console.log(data);
                if(data.success){
                    window.location.href="./login.html"
                }
            }
        })
    })
})