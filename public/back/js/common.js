// 测试进度条方法
//NProgress.start();  // 开启进度条
//
//setTimeout(function() {
//  // 结束进度条
//  NProgress.done();
//}, 2000);

/*
 * 需求: 在第一个ajax发送的时候, 开启进度条
 *       在全部的ajax回来的时候, 关闭进度条
 *
 * ajax全局事件
 *    .ajaxComplete()  当每个ajax完成时,调用     (不管成功还是失败)
 *    .ajaxSuccess()   当ajax返回成功时调用
 *    .ajaxError()     当ajax返回失败时调用
 *    .ajaxSend()      当ajax发送前调用
 *
 *    .ajaxStart()     当第一个ajax发送时调用
 *    .ajaxStop()      当全部的ajax请求完成时调用
 * */

$(function () {
    // 进度条效果
    $(document).ajaxStart(function () {
        NProgress.start()
    })

    $(document).ajaxStop(function () {
        //  setTimeout(function(){
        NProgress.done()
        //  },500)
    })

    // 点击二级导航菜单展示效果
    $('.category').click(function(){
        $('.category .child').stop().slideToggle()
    })

    // 点击左侧菜单按钮隐藏侧边栏
    $('.lt_main .icon-left').click(function(){
        $('.lt_aside').toggleClass('hidemenu')
        $('.lt_main').toggleClass('hidemenu')
        $('.lt_main .topbar').toggleClass('hidemenu')
    })

    // 退出功能

    // 点击退出按钮
    $('.lt_main .icon-right').click(function(){
        $('#myModal').modal('show')
    })
    // 点击模态框里确定按钮退出账号
    // 发送ajax，销毁服务器中的session
    // 成功跳转到登录页面
    $('#btn-out').click(function(){
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function( info ){
                // console.log(info)
                if(info.success){
                    location.href = 'login.html'
                }
            }
        })
    })

})