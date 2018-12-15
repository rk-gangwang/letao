$(function () {
    /*
     * 1. 进行表单校验配置
     *    校验要求:
     *        (1) 用户名不能为空, 长度为2-6位
     *        (2) 密码不能为空, 长度为6-12位
     * */

     $('#form').bootstrapValidator({
         //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
         //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },

            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
    })

    // 登录按钮4
    $('#form').on('success.form.bv',function( e ){
        e.preventDefault()
        // console.log('表单提交成功')

        // 发送ajax请求校验表单
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function(info){
                console.log(info)
                if(info.success){
                    // 登陆成功
                    location.href = 'index.html'
                }
                if(info.error === 1000){
                    // alert('用户名不存在')
                    // 调用实例的更新校验方法 updateStatus 将校验状态更新失败
                    // 参数1: 字段名称 (username)
                    // 参数2: 校验状态 NOT_VALIDATED未校验, VALIDATING校验中, INVALID失败 or VALID成功
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(info.error === 1001){
                    // alert('密码错误')
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
            }
        })
    })

    $('[type = "reset"]').click(function(){
        $('#form').data('bootstrapValidator').resetForm()
    })

})