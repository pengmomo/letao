$(function () {
    mui.init({
        pullRefresh: {
            container: ".lt_content", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    $.ajax({
                        url: '/cart/queryCart',
                        success: function (data) {
                            console.log(data);
                            $('.shop-car-list').html(template('car', data))
                            setTimeout(function () {
                                mui('.lt_content').pullRefresh().endPulldownToRefresh();
                            }, 100)
                        }
                    })
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $('.shop-car-list').on('tap', 'span.fa-trash-o', function () {
        var id = $(this).attr('data-id')
        console.log(id)

        $.ajax({
            url: '/cart/deleteCart',
            data: {
                id: id
            },
            success: function (data) {
                console.log(data);
                if (data.success) {
                    mui('.lt_content').pullRefresh().pulldownLoading();
                }
            }
        })
    })

    $('.shop-car-list').on('click', 'input[type=checkbox]', function () {
        // 金额
        var price = $(this).parent().next().find('span.price i').html();
        var num = parseInt($(this).parent().next().find('span.num').html());
        console.log(num, price)
        var total = num * price;

        var current =parseFloat($('.lt_order_list span i').html());
        console.log(current)
        

        if($(this).prop('checked')){
            current += total;
        }else{
            current -= total;
        }
        $('.lt_order_list span i').html(current);
        
    })
})