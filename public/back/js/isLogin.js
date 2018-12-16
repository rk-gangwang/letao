// 判断是否登录，
// 如果没登录，直接拦截到login登录页面
$(function(){
    $.ajax({
        type: 'get',
        url: '/employee/checkRootLogin',
        dataType: 'json',
        success: function( info ){
            // console.log(info)
            if(info.error === 400){
                location.href = 'login.html'
            }
        }
    })
})