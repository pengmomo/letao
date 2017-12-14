$(function () {

    var key = window.location.search.slice(1).split('=')[1];
    key = decodeURI(key);
    // console.log(key);
    $('form input').val(key);

    function getData(option) {
        $('.lt_content').addClass('loading');
        $('.product ul').html('');
        $.ajax({
            url: '/product/queryProduct',
            data: {
                proName: option.key,
                page: 1,
                pageSize: 998,
                price: option.price || 2,
                num: option.num||2,
            },
            success: function (data) {
                console.log(data);
                setTimeout(function(){
                $('.product ul').html(template('search', data))
                $('.lt_content').removeClass('loading');
                },1000)
            }
        })
    }
    getData({
        key: key
    })

    $('form button').click(function (e) {
        e.preventDefault();;

        getData({
            key: $(this).prev().val(),
        })
    })

    // 点击价格
    $('.price-option').click(function () {
        $(this).parent().toggleClass('active');
        console.log()
        key = $(this).parent().parent().parent().siblings('.search').children().children('input').val()
        $(this).children('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

        if ($(this).children('span').hasClass('fa-angle-up')) {
            getData({
                key: key,
                price: 1
            })
        } else {
            getData({
                key: key,
                price: 2
            })
        }
    })

    // 点击库存
    $('.num-option').click(function () {
        // 切换class
        $(this).parent().toggleClass('active');
        // 切换自己的类名
        $(this).children('span').toggleClass("fa-angle-up").toggleClass('fa-angle-down');

        // 箭头朝下 降序
        if ($(this).children('span').hasClass('fa-angle-down')) {
            getData({
                key: key,
                num: 2
            });
        }else{
            getData({
                key: key,
                num: 1
            });
        }

    })

    // 点击立即购买
    $('.product').on('click','button',function(){
        var id = $(this).attr('data-id');
        console.log(id);
        window.location.href = "./product.html?id="+id;
    })

})