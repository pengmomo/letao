$(function () {
    function getHistory() {
        var history = window.localStorage.getItem('search_history');
        if(history==null){
            history=[]
        }else{
            history= JSON.parse(history)
        }
        return history;
    }

    function getData(){
        var history = getHistory();
        $('.history-list ul').html(template('searchTmp',history));
    }

    getData()

    $('form button').click(function(e){
        var search = $(this).prev().val().trim();
        console.log(search)
        if(search==''){
            e.preventDefault();
            
        }

        var history = getHistory();
        var index = history.indexOf(search);
        if(index!=-1){
            history.splice(index,1)
        }
        history.unshift(search);
        window.localStorage.setItem('search_history',JSON.stringify(history));
        getData()
    })

    $('.history-list').on('click','span.fa-close',function(){
        var index = $(this).parent().index();
        var history = getHistory();
        history.splice(index,1);
        window.localStorage.setItem('search_history',JSON.stringify(history))
        getData()
    })

    $('.search-history span').last().click(function(){
        console.log('a')

        window.localStorage.removeItem('search_history');
        getData()
    })

})