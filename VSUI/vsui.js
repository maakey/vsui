/**
 * Created by m on 2017/6/2.
 */

'use strict';

$(document).ready(function () {
    $(".vsui-header").width($(window).width() - 24);
    $(".vsui-content").width($(window).width() - 24);
    $(".vsui-footer").width($(window).width() - 24);
    $(".vsui-picker").width($(window).width() - 24);



    //vsui-radioPage
    $(".vsui-radio input[type='radio']").on('click', function () {
        $(".vsui-radio").each(
            function () {
                $(this).removeClass("checked");
            });
        $(".vsui-radio-input").removeClass("checked");
        $(".vsui-radio input:checked").each(
            function () {
                $(this).parent("label").addClass("checked");
            });
    });
    $(".vsui-radio-input input[type='text']").on('click', function () {
        $(".vsui-radio").each(
            function () {
                $(this).removeClass("checked");
            });
        $(".vsui-radio-input").addClass("checked");
    });


    $("form.vsui-radioPage").submit(function (e) {
        e.preventDefault();
        // location.href = $(this).attr("action") + "?Identity=" + "3123123";

        var action =$(this).attr("action") ?  "action='" + $(this).attr("action") + "'" : "";
        var method = $(this).attr("method") ? "method='" + $(this).attr("method") + "'" : "";
        var formName = $(this).attr("name") ? "name='" + $(this).attr("name") + "'" : "";
        var input = $(this).children(".checked").children("input");
        //$('.vsui-radio:checked').val();
        var name =input.attr("name")?"name='"+input.attr("name")+"'":"";
        var value = $.trim(input.val());
        if (value.length<1){
            return false;
        }
        var newId=generateMixed(8);

        var html="<form id='"+newId+"' "+action+" "+method+" "+formName+" style='display:none'>";
        html+="<input type=hidden "+name+" value='"+value+"'/>";
        html+="</form>";

        $(this).after(html);
        $("#"+newId).submit();


    });


    //tools
    function generateMixed(n) {
        var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
        var res = "";
        for(var i = 0; i < n ; i ++) {
            var id = Math.ceil(Math.random()*15);
            res += chars[id];
        }
        return res;
    }
    //解决输入框输入法遮挡问题
    $("input[type='text']").on('focus',function(){
        //自动反弹 输入法高度自适应
        var target = this;
        setTimeout(function(){
            target.scrollIntoViewIfNeeded();
        },200);
    });


});

