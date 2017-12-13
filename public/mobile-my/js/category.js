$(function(){
    $.ajax({
        url:'/category/queryTopCategory',
        success:function(data){
            console.log(data);
            $('.content_left ul').html(template('leftList',data));
            $('.content_left li').first().children('a').click();
        }
    })

    $('.content_left ul').on('click','li a',function(){
        $(this).parent().addClass('active').siblings().removeClass('active');
        var id = $(this).attr('data-id');
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:id,
            },
            success:function(data){
                console.log(data);
                $('.content_right ul').html(template('rightList',data))
            }
        })
    })
})