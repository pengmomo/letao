$(function(){
    var id = window.location.search.slice(1).split('=')[1]
    console.log(id);
    $.ajax({
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:function(data){
            console.log(data)
            $('.mui-scroll').html(template('productTmp',data));

            var gallery = mui('.mui-slider');
            gallery.slider({
              interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            $('.mui-slider-indicator').children().first('div').addClass('mui-active')

            var startSize = data.size.split('-')[0];
            var endSize = data.size.split('-')[1];
            console.log(endSize);
            for(var i = startSize;i<=endSize;i++){
                $('<span class="size">'+i+'</span>').appendTo('.list-size')
            }

            mui('.mui-numbox').numbox()
        }
    })

    $('.mui-scroll').on('click','span.size',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })

    $('.lt_footer .right button.mui-btn-danger').click(function(){

        var shoeSize = $('.list-size span.size.active').html()
        if(!shoeSize){
            mui.toast('请选择商品的尺码')
        }

        var num = $('.mui-numbox-input').val();
        console.log(num)

        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num:num,
                size:shoeSize
            },
            success:function(data){
                console.log(data);
                if(data.error==400){
                    window.location.href="./login.html";
                }
            }
        })
    })
})