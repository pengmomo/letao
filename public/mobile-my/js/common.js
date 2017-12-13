$(function () {
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		indicators: false,
	});
	// 点击搜索按钮去搜索页
	$('span.fa-search').on('tap',function(){
		window.location.href ="./search.html";
	})
	// 点击返回去上一次的页面
	$('span.fa-chevron-left').on('tap',function(){
		console.log('a')
		window.history.back();
	})
	// 点击home回首页
	$('span.fa-home').on('tap',function(){
		window.location.href ="./index.html"
	})

})