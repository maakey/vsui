/**
 * Created by m on 2017/6/2.
 */

;

//vsui-picker

/**
 * vsuiPicker 选择器。
 * @param options 配置项
 * @param {string=} [options.tapName1="单据类型"] 按钮标签名称
 * @param {string=} [options.tapName2="日期筛选"] 时间标签名称
 * @param {string=} [options.btnName1="出库单"] 按钮选择器第一个按钮名称
 * @param {string=} [options.btnName2="入库单"] 按钮选择器第二个按钮名称
 * @param {string=} [options.btnName3="全部"] 按钮选择器第三个按钮名称
 * @param {string=} [options.btnDate1="out"] 按钮选择器第一个按钮回调数据
 * @param {string=} [options.btnDate2="in"] 按钮选择器第二个按钮回调数据
 * @param {string=} [options.btnDate3="all"] 按钮选择器第三个按钮回调数据
 * @param {function=} [options.onChoose] 按钮选择器回调
 * @param {function=} [options.onConfirm] 时间选择器回调
 *
 * @example
 * // 示例：
 * VsuiPicker({
 *     tapName1: "单据类型",
 *     tapName2: "日期筛选",
 *     btnName1: "出库单",
 *     btnName2: "入库单",
 *     btnName3: "全部",
 *     btnDate1: "out",
 *     btnDate2: "in",
 *     btnDate3: "all",
 *     onChoose: function(result){
 *         console.log(result);
 *     },
 *     onConfirm: function(startDate,endDate){
 *         console.log(startDate);
 *         console.log(endDate);
 *     },
 * });
 *
 */
function VsuiPicker() {
    const options = arguments[arguments.length - 1];
    const defaults = $.extend({
        tapName1: "单据类型",
        tapName2: "日期筛选",
        btnName1: "出库单",
        btnName2: "入库单",
        btnName3: "全部",
        btnDate1: "out",
        btnDate2: "in",
        btnDate3: "all",
        onChoose: $.noop,
        onConfirm: $.noop,
    }, options);

    let pickerHtml = '<div class="vsui-picker"><div class="vsui-btnPicker" id="vsui-choose" style="display: none"><a href="javascript:;" class="vsui-btn vsui-btn_blue vsui-choose-btn" data-btn-data="' + defaults.btnDate1 + '">' + defaults.btnName1 + '</a><a href="javascript:;" class="vsui-btn vsui-btn_blue vsui-choose-btn" data-btn-data="' + defaults.btnDate2 + '">' + defaults.btnName2 + '</a><a href="javascript:;" class="vsui-btn vsui-btn_blue vsui-choose-btn" data-btn-data="' + defaults.btnDate3 + '">' + defaults.btnName3 + '</a></div><div class="vsui-btnPicker" id="vsui-date" style="display: none"><a href="javascript:;" class="vsui-btn vsui-btn_blue vsui-date-btn" data-date-data="week">七天</a><a href="javascript:;" class="vsui-btn vsui-btn_blue vsui-date-btn" data-date-data="month">三十天</a><a href="javascript:;" class="vsui-btn vsui-btn_blue vsui-date-btn" data-date-data="all">全部</a></div><div class="vsui-datePicker" style="display: none"><div class="vsui-picker__hd">自定义时间</div><div class="vsui-picker__bd"><div class="vsui-picker__middle">至</div></div><div class="vsui-picker__fd"><a href="javascript:;" data-action="select" id="vsui-picker-confirm" class="vsui-btn vsui-btn_blue vsui-picker__action">确定</a></div></div><div class="vsui-picker-tapGroup"><div class="vsui-picker-tap" id="vsTap1">' + defaults.tapName1 + '</div><div class="vsui-picker-tap" id="vsTap2">' + defaults.tapName2 + '</div></div></div><div class="vsui-mask content"></div>';
//添加div
    $(".vsui-header").after(pickerHtml);
    //添加时间选择器
    let startDate = new datePicker({
        start: '1989-01-06',
        end: 2020,
        property: 'start',
    });
    let endDate = new datePicker({
        start: '1993-03-21',
        end: 2020,
        property: 'end',
    });

    //添加picker
    let vsTap1 = false, vsTap2 = false;

    $(".vsui-picker-tap").on('click', function () {
        switch ($(this).attr("id")) {
            case 'vsTap1':
                if (vsTap1) {
                    if (vsTap2) {
                        /*
                         * vsTap1=true, vsTap2=true
                         *
                         * 无事件
                         */
                    } else {
                        /*
                         * vsTap1=true, vsTap2=false
                         *
                         * 高度渐变为 26，切换tapBtn（时间tap删除active）
                         * 关闭#vsui-choose
                         */
                        $("#vsTap2").removeClass('active');
                        $(".vsui-picker").height(26);
                        $(".vsui-mask.content").fadeOut();
                        setTimeout(function () {
                            $("#vsui-choose").hide();
                        },500);
                    }
                    vsTap1 = false;
                } else {
                    if (vsTap2) {
                        /*
                         * vsTap1=false, vsTap2=true
                         * .vsui-picker__mask：none 打开#vsui-choose，
                         * 高度渐变为 84，切换tapBtn（按钮tap删除active，时间tap添加active），渐变关闭#vsui-date，
                         * 关闭.vsui-datePicker
                         */
                        $(".vsui-picker__mask").hide();
                        $("#vsTap1").removeClass('active');
                        $("#vsTap2").addClass('active');
                        $("#vsui-choose").show();
                        $(".vsui-picker").height(84);
                        $("#vsui-date").fadeOut();
                        setTimeout(function () {
                            $(".vsui-datePicker").hide();
                        },500);

                        vsTap2 = false;
                    } else {
                        /*
                         * vsTap1=false, vsTap2=false
                         *
                         * 打开#vsui-choose，
                         * 高度渐变为 84，切换tapBtn（时间tap添加active）
                         */
                        $("#vsui-choose").show();
                        $("#vsTap2").addClass('active');
                        $(".vsui-picker").height(84);
                        //$(".vsui-picker").animate({height: '84px'});
                        $(".vsui-mask.content").fadeIn();
                    }
                    vsTap1 = true;
                }
                break;
            case 'vsTap2':
                if (vsTap1) {
                    if (vsTap2) {
                        /*
                         * vsTap1=true, vsTap2=true
                         *
                         * 无事件
                         */
                    } else {
                        /*
                         * vsTap1=true, vsTap2=false
                         *
                         * 打开.vsui-datePicker
                         * 高度渐变为 307,切换tapBtn（按钮tap添加active，时间tap删除active），渐变打开#vsui-date，
                         * .vsui-picker__mask：block，关闭#vsui-choose
                         */

                        $(".vsui-datePicker").show();
                        $("#vsTap1").addClass('active');
                        $("#vsTap2").removeClass('active');

                        $(".vsui-picker").height(307);

                        $("#vsui-date").fadeIn();
                        setTimeout(function () {
                            $(".vsui-picker__mask").show();
                            $("#vsui-choose").hide();
                        },500);
                        vsTap1 = false;
                        vsTap2 = true;
                    }
                } else {
                    if (vsTap2) {
                        /*
                         * vsTap1=false, vsTap2=true
                         *
                         * .vsui-picker__mask：none
                         * 高度渐变为 26，（按钮tap删除active）
                         * 关闭#vsui-date，.vsui-datePicker
                         */
                        $(".vsui-picker__mask").hide();
                        $("#vsTap1").removeClass('active');
                        $(".vsui-picker").height(26);
                        $(".vsui-mask.content").fadeOut();
                        setTimeout(function () {
                            $("#vsui-date").hide();
                            $(".vsui-datePicker").hide();
                        },500);
                        vsTap2 = false;
                    } else {
                        /*
                         * vsTap1=false, vsTap2=false
                         *
                         * 打开#vsui-date，.vsui-datePicker
                         * 高度渐变为 307,切换tapBtn（按钮tap添加active）
                         * .vsui-picker__mask：block
                         */
                        $("#vsui-date").show();
                        $(".vsui-datePicker").show();
                        $("#vsTap1").addClass('active');
                        $(".vsui-picker").height(307);
                        $(".vsui-mask.content").fadeIn();
                        setTimeout(function () {
                            $(".vsui-picker__mask").show();
                        },500);
                        vsTap2 = true;
                    }
                }
                break;
            default:


        }
    });

    $(".vsui-mask.content").on('click', function () {
        if (vsTap1) {
            /*
             * 同vsTap1=true, vsTap2=false
             */
            $("#vsTap2").removeClass('active');
            $(".vsui-picker").height(26);
            $(".vsui-mask.content").fadeOut();
            setTimeout(function () {
                $("#vsui-choose").hide();
            },500);
            vsTap1 = false;
        } else if (vsTap2) {
            /*
             * 同vsTap1=false, vsTap2=true
             */
            $(".vsui-picker__mask").hide();
            $("#vsTap1").removeClass('active');
            $(".vsui-picker").height(26);
            $(".vsui-mask.content").fadeOut();
            setTimeout(function () {
                $("#vsui-date").hide();
                $(".vsui-datePicker").hide();
            },500);
            vsTap2 = false;
        }
    });

    /*
     * 添加反馈
     */
    $(".vsui-choose-btn").on('click', function () {
        let result = {
            label: $(this).html(),
            value: $(this).data("btn-data"),
        };
        defaults.onChoose(new Result(result));
        /*
         * 同vsTap1=true, vsTap2=false
         */
        $("#vsTap2").removeClass('active');
        $(".vsui-picker").height(26);
        $(".vsui-mask.content").fadeOut();
        setTimeout(function () {
            $("#vsui-choose").hide();
        },500);
        vsTap1 = false;
    });
    $(".vsui-date-btn").on('click', function () {
        let now = new Date();
        let date, year, month, day, nowYear, nowMonth, nowDay, startDate, endDate;
        nowYear = {
            label: now.getFullYear(),
            value: now.getFullYear(),
        };
        nowMonth = {
            label: now.getMonth() + 1,
            value: now.getMonth() + 1,
        };
        nowDay = {
            label: now.getDate(),
            value: now.getDate(),
        };
        switch ($(this).data("date-data")) {
            case 'week':
                date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
                year = {
                    label: date.getFullYear(),
                    value: date.getFullYear(),
                };
                month = {
                    label: date.getMonth() + 1,
                    value: date.getMonth() + 1,
                };
                day = {
                    label: date.getDate(),
                    value: date.getDate(),
                };
                startDate = [new Result(year), new Result(month), new Result(day)];
                endDate = [new Result(nowYear), new Result(nowMonth), new Result(nowDay)];
                break;
            case 'month':
                date = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
                year = {
                    label: date.getFullYear(),
                    value: date.getFullYear(),
                };
                month = {
                    label: date.getMonth() + 1,
                    value: date.getMonth() + 1,
                };
                day = {
                    label: date.getDate(),
                    value: date.getDate(),
                };
                startDate = [new Result(year), new Result(month), new Result(day)];
                endDate = [new Result(nowYear), new Result(nowMonth), new Result(nowDay)];
                break;
            default:
                let all = {
                    label: 'all',
                    value: 0,
                };
                startDate = [new Result(all), new Result(all), new Result(all)];
                endDate = [new Result(all), new Result(all), new Result(all)];
        }
        defaults.onConfirm(startDate, endDate);
        /*
         * 同vsTap1=false, vsTap2=true
         *
         * .vsui-picker__mask：none
         * 高度渐变为 26，（按钮tap删除active）
         * 关闭#vsui-date，.vsui-datePicker
         */
        $(".vsui-picker__mask").hide();
        $("#vsTap1").removeClass('active');
        $(".vsui-picker").height(26);
        $(".vsui-mask.content").fadeOut();
        setTimeout(function () {
            $("#vsui-date").hide();
            $(".vsui-datePicker").hide();
        },500);
        vsTap2 = false;
    });

    $(".vsui-picker__action").on('click', function () {
        defaults.onConfirm(startDate.result, endDate.result);
        /*
         * 同vsTap1=false, vsTap2=true
         *
         * .vsui-picker__mask：none
         * 高度渐变为 26，（按钮tap删除active）
         * 关闭#vsui-date，.vsui-datePicker
         */
        $(".vsui-picker__mask").hide();
        $("#vsTap1").removeClass('active');
        $(".vsui-picker").height(26);
        $(".vsui-mask.content").fadeOut();
        setTimeout(function () {
            $("#vsui-date").hide();
            $(".vsui-datePicker").hide();
        },500);
        vsTap2 = false;
    });
}

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

        var action = $(this).attr("action") ? "action='" + $(this).attr("action") + "'" : "";
        var method = $(this).attr("method") ? "method='" + $(this).attr("method") + "'" : "";
        var formName = $(this).attr("name") ? "name='" + $(this).attr("name") + "'" : "";
        var input = $(this).children(".checked").children("input");
        //$('.vsui-radio:checked').val();
        var name = input.attr("name") ? "name='" + input.attr("name") + "'" : "";
        var value = $.trim(input.val());
        if (value.length < 1) {
            return false;
        }
        var newId = generateMixed(8);

        var html = "<form id='" + newId + "' " + action + " " + method + " " + formName + " style='display:none'>";
        html += "<input type=hidden " + name + " value='" + value + "'/>";
        html += "</form>";

        $(this).after(html);
        $("#" + newId).submit();


    });


    //tools
    function generateMixed(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 15);
            res += chars[id];
        }
        return res;
    }

    //解决输入框输入法遮挡问题
    $("input[type='text']").on('focus', function () {
        //自动反弹 输入法高度自适应
        var target = this;
        setTimeout(function () {
            target.scrollIntoViewIfNeeded();
        }, 200);
    });


});

function Result(item) {
    this.label = item.label;
    this.value = item.value;
}
Result.prototype.toString = function () {
    return this.value;
};
Result.prototype.valueOf = function () {
    return this.value;
};

let _sington;
let temp = {}; // temp 存在上一次滑动的位置

/**
 * picker 多列选择器。
 * @param {array} items picker的数据，即用于生成picker的数据，picker的层级可以自己定义，但建议最多三层。数据格式参考example。
 * @param {Object} options 配置项
 * @param {number=} [options.depth] picker深度(也就是picker有多少列) 取值为1-3。如果为空，则取items第一项的深度。
 * @param {string=} [options.id=default] 作为picker的唯一标识，作用是以id缓存当时的选择。（当你想每次传入的defaultValue都是不一样时，可以使用不同的id区分）
 * @param {string=} [options.className] 自定义类名
 * @param {string=} [options.container] 指定容器
 * @param {array=} [options.defaultValue] 默认选项的value数组
 * @param {function=} [options.onChange] 在picker选中的值发生变化的时候回调
 * @param {function=} [options.onConfirm] 在点击"确定"之后的回调。回调返回选中的结果(Array)，数组长度依赖于picker的层级。
 *
 * @example
 * // 单列picker
 * weui.picker([
 * {
 *     label: '飞机票',
 *     value: 0,
 *     disabled: true // 不可用
 * },
 * {
 *     label: '火车票',
 *     value: 1
 * },
 * {
 *     label: '汽车票',
 *     value: 3
 * },
 * {
 *     label: '公车票',
 *     value: 4,
 * }
 * ], {
 *    className: 'custom-classname',
 *    container: 'body',
 *    defaultValue: [3],
 *    onChange: function (result) {
 *        console.log(result)
 *    },
 *    onConfirm: function (result) {
 *        console.log(result)
 *    },
 *    id: 'singleLinePicker'
 * });
 *
 * @example
 * // 多列picker
 * weui.picker([
 *     {
 *         label: '1',
 *         value: '1'
 *     }, {
 *         label: '2',
 *         value: '2'
 *     }, {
 *         label: '3',
 *         value: '3'
 *     }
 * ], [
 *     {
 *         label: 'A',
 *         value: 'A'
 *     }, {
 *         label: 'B',
 *         value: 'B'
 *     }, {
 *         label: 'C',
 *         value: 'C'
 *     }
 * ], {
 *     defaultValue: ['3', 'A'],
 *     onChange: function (result) {
 *         console.log(result);
 *     },
 *     onConfirm: function (result) {
 *         console.log(result);
 *     },
 *     id: 'multiPickerBtn'
 * });
 *
 * @example
 * // 级联picker
 * weui.picker([
 * {
 *     label: '飞机票',
 *     value: 0,
 *     children: [
 *         {
 *             label: '经济舱',
 *             value: 1
 *         },
 *         {
 *             label: '商务舱',
 *             value: 2
 *         }
 *     ]
 * },
 * {
 *     label: '火车票',
 *     value: 1,
 *     children: [
 *         {
 *             label: '卧铺',
 *             value: 1,
 *             disabled: true // 不可用
 *         },
 *         {
 *             label: '坐票',
 *             value: 2
 *         },
 *         {
 *             label: '站票',
 *             value: 3
 *         }
 *     ]
 * },
 * {
 *     label: '汽车票',
 *     value: 3,
 *     children: [
 *         {
 *             label: '快班',
 *             value: 1
 *         },
 *         {
 *             label: '普通',
 *             value: 2
 *         }
 *     ]
 * }
 * ], {
 *    className: 'custom-classname',
 *    container: 'body',
 *    defaultValue: [1, 3],
 *    onChange: function (result) {
 *        console.log(result)
 *    },
 *    onConfirm: function (result) {
 *        console.log(result)
 *    },
 *    id: 'doubleLinePicker'
 * });
 */
function picker() {
    //  if (_sington) return _sington;

    // 配置项
    const options = arguments[arguments.length - 1];
    const defaults = $.extend({
        id: 'default',
        className: '',
        container: 'body',
        onChange: $.noop,
        onConfirm: $.noop
    }, options);

    // 数据处理
    let items;
    let isMulti = false; // 是否多列的类型
    if (arguments.length > 2) {
        let i = 0;
        items = [];
        while (i < arguments.length - 1) {
            items.push(arguments[i++]);
        }
        isMulti = true;
    } else {
        items = arguments[0];
    }

    // 获取缓存
    temp[defaults.id] = temp[defaults.id] || [];
    const result = [];
    const lineTemp = temp[defaults.id];
    const $picker = $(render('<div class="vsui-picker__dateItem"></div>', defaults));
    let depth = options.depth || (isMulti ? items.length : depthOf(items[0])), groups = '';

    // 显示与隐藏的方法
    function show() {
        // $(defaults.container).append($picker);
        if (defaults.property == "start") {
            $(".vsui-picker__bd").prepend($picker);
        } else if (defaults.property == "end") {
            $(".vsui-picker__bd").append($picker);
        }

        // 这里获取一下计算后的样式，强制触发渲染. fix IOS10下闪现的问题
        //getStyle($picker[0], 'transform');

        //$picker.find('.weui-mask').addClass('weui-animate-fade-in');
        //$picker.find('.weui-picker').addClass('weui-animate-slide-up');
    }

    function _hide(callback) {
        _hide = $.noop; // 防止二次调用导致报错

        //$picker.find('.weui-mask').addClass('weui-animate-fade-out');
        // $picker.find('.weui-picker')
        //   .addClass('weui-animate-slide-down')
        // .on('animationend webkitAnimationEnd', function () {*/
        $picker.remove();
        _sington = false;
        callback && callback();
        //});
    }

    function hide(callback) {
        _hide(callback);
    }

    // 初始化滚动的方法
    function scroll(items, level) {
        if (lineTemp[level] === undefined && defaults.defaultValue && defaults.defaultValue[level] !== undefined) {
            // 没有缓存选项，而且存在defaultValue
            const defaultVal = defaults.defaultValue[level];
            let index = 0, len = items.length;

            for (; index < len; ++index) {
                if (defaultVal == items[index].value) break;
            }
            if (index < len) {
                lineTemp[level] = index;
            } else {
                console.warn('Picker has not match defaultValue: ' + defaultVal);
            }
        }
        $picker.find('.vsui-picker__group').eq(level).scroll({
            items: items,
            temp: lineTemp[level],
            onChange: function (item, index) {
                //为当前的result赋值。
                if (item) {
                    result[level] = new Result(item);
                } else {
                    result[level] = null;
                }
                lineTemp[level] = index;

                if (isMulti) {
                    defaults.onChange(result);
                } else {
                    /**
                     * @子列表处理
                     * 1. 在没有子列表，或者值列表的数组长度为0时，隐藏掉子列表。
                     * 2. 滑动之后发现重新有子列表时，再次显示子列表。
                     *
                     * @回调处理
                     * 1. 因为滑动实际上是一层一层传递的：父列表滚动完成之后，会call子列表的onChange，从而带动子列表的滑动。
                     * 2. 所以，使用者的传进来onChange回调应该在最后一个子列表滑动时再call
                     */
                    if (item.children && item.children.length > 0) {
                        $picker.find('.vsui-picker__group').eq(level + 1).show();
                        !isMulti && scroll(item.children, level + 1); // 不是多列的情况下才继续处理children
                    } else {
                        //如果子列表test不通过，子孙列表都隐藏。
                        /*const $items = $picker.find('.weui-picker__group');
                         $items.forEach((ele, index) => {
                         if (index > level) {
                         $(ele).hide();
                         }
                         });
                         */
                        result.splice(level + 1);

                        defaults.onChange(result);
                    }
                }
            },
            onConfirm: defaults.onConfirm
        });
    }


    groups = '<div class="vsui-picker__group x4">            <div class="vsui-picker__mask"></div>        <div class="vsui-picker__indicator"></div>        <div class="vsui-picker__content"></div>        </div> <div class="vsui-picker__group x2">        <div class="vsui-picker__mask"></div>        <div class="vsui-picker__indicator"></div>        <div class="vsui-picker__content"></div>        </div>        <div class="vsui-picker__group x2">        <div class="vsui-picker__mask"></div>        <div class="vsui-picker__indicator"></div>        <div class="vsui-picker__content"></div>        </div>';


    //$picker.find('.vsui-picker__dateItem').html(groups);
    $picker.html(groups);
    show();

    if (isMulti) {
        items.forEach((item, index) => {
            scroll(item, index);
        });
    } else {
        scroll(items, 0);
    }

    /*    $picker
     //  .on('click', '.weui-mask', function () { hide(); })
     .on('click', '.vsui-picker__action', function () { hide(); })
     .on('click', '#vsui-picker-confirm', function () {
     defaults.onConfirm(result);
     });*/

    _sington = $picker[0];
    _sington.hide = hide;
    // return _sington;
    this.result = result;
}

/**
 * dataPicker 时间选择器，由picker拓展而来，提供年、月、日的选择。
 * @param options 配置项
 * @param {string=} [options.id=datePicker] 作为picker的唯一标识
 * @param {number=|string|Date} [options.start=2000] 起始年份，如果是 `Number` 类型，表示起始年份；如果是 `String` 类型，格式为 'YYYY-MM-DD'；如果是 `Date` 类型，就传一个 Date
 * @param {number=|string|Date} [options.end=2030] 结束年份，同上
 * @param {string=} [options.cron=* * *] cron 表达式，三位，分别是 dayOfMonth[1-31]，month[1-12] 和 dayOfWeek[0-6]（周日-周六）
 * @param {string=} [options.className] 自定义类名
 * @param {array=} [options.defaultValue] 默认选项的value数组, 如 [1991, 6, 9]
 * @param {function=} [options.onChange] 在picker选中的值发生变化的时候回调
 * @param {function=} [options.onConfirm] 在点击"确定"之后的回调。回调返回选中的结果(Array)，数组长度依赖于picker的层级。
 *
 *@example
 * // 示例1：
 * weui.datePicker({
 *     start: 1990,
 *     end: 2000,
 *     defaultValue: [1991, 6, 9],
 *     onChange: function(result){
 *         console.log(result);
 *     },
 *     onConfirm: function(result){
 *         console.log(result);
 *     },
 *     id: 'datePicker'
 * });
 *
 * // 示例2：
 * weui.datePicker({
 *      start: new Date(), // 从今天开始
 *      end: 2030,
 *      defaultValue: [2020, 6, 9],
 *      onChange: function(result){
 *          console.log(result);
 *      },
 *      onConfirm: function(result){
 *          console.log(result);
 *      },
 *      id: 'datePicker'
 *  });
 *
 *  // 示例3：
 * weui.datePicker({
 *      start: new Date(), // 从今天开始
 *      end: 2030,
 *      cron: '* * 0,6',  // 每逢周日、周六
 *      onChange: function(result){
 *          console.log(result);
 *      },
 *      onConfirm: function(result){
 *          console.log(result);
 *      },
 *      id: 'datePicker'
 *  });
 *
 *  // 示例4：
 * weui.datePicker({
 *      start: new Date(), // 从今天开始
 *      end: 2030,
 *      cron: '1-10 * *',  // 每月1日-10日
 *      onChange: function(result){
 *          console.log(result);
 *      },
 *      onConfirm: function(result){
 *          console.log(result);
 *      },
 *      id: 'datePicker'
 *  });
 */
function datePicker(options) {
    const defaults = $.extend({
        id: 'datePicker',
        onChange: $.noop,
        onConfirm: $.noop,
        start: 2000,
        end: 2030,
        property: 'start',
        defaultValue: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()],
        cron: '* * *'
    }, options);

    // 兼容原来的 start、end 传 Number 的用法
    if (typeof defaults.start === 'number') {
        defaults.start = new Date(`${defaults.start}-01-01`);
    }
    else if (typeof defaults.start === 'string') {
        defaults.start = new Date(defaults.start);
    }
    if (typeof defaults.end === 'number') {
        defaults.end = new Date(`${defaults.end}-12-31`);
    }
    else if (typeof defaults.end === 'string') {
        defaults.end = new Date(defaults.end);
    }

    const findBy = (array, key, value) => {
        for (let i = 0, len = array.length; i < len; i++) {
            const obj = array[i];
            if (obj[key] == value) {
                return obj;
            }
        }
    };

    const date = [];
    const interval = parse(defaults.cron, defaults.start, defaults.end);
    let obj;
    do {
        obj = interval.next();

        const year = obj.value.getFullYear();
        const month = obj.value.getMonth() + 1;
        const day = obj.value.getDate();

        let Y = findBy(date, 'value', year);
        if (!Y) {
            Y = {
                label: year,
                value: year,
                children: []
            };
            date.push(Y);
        }
        let M = findBy(Y.children, 'value', month);
        if (!M) {
            M = {
                label: String(month).length == 2 ? String(month) : '0' + month,
                value: month,
                children: []
            };
            Y.children.push(M);
        }
        M.children.push({
            label: String(day).length == 2 ? String(day) : '0' + day,
            value: day
        });


    }
    while (!obj.done);

    return new picker(date, defaults);
}

/**
 * set transition
 * @param $target
 * @param time
 */
const setTransition = ($target, time) => {
    return $target.css({
        '-webkit-transition': `all ${time}s`,
        'transition': `all ${time}s`
    });
};


/**
 * set translate
 */
const setTranslate = ($target, diff) => {
    return $target.css({
        '-webkit-transform': `translate3d(0, ${diff}px, 0)`,
        'transform': `translate3d(0, ${diff}px, 0)`
    });
};

/**
 * @desc get index of middle item
 * @param items
 * @returns {number}
 */
const getDefaultIndex = (items) => {
    let current = Math.floor(items.length / 2);
    let count = 0;
    while (!!items[current] && items[current].disabled) {
        current = ++current % items.length;
        count++;

        if (count > items.length) {
            throw new Error('No selectable item.');
        }
    }

    return current;
};

const getDefaultTranslate = (offset, rowHeight, items) => {
    const currentIndex = getDefaultIndex(items);

    return (offset - currentIndex) * rowHeight;
};

/**
 * get max translate
 * @param offset
 * @param rowHeight
 * @returns {number}
 */
const getMax = (offset, rowHeight) => {
    return offset * rowHeight;
};

/**
 * get min translate
 * @param offset
 * @param rowHeight
 * @param length
 * @returns {number}
 */
const getMin = (offset, rowHeight, length) => {
    return -(rowHeight * (length - offset - 1));
};

$.fn.scroll = function (options) {
    const defaults = $.extend({
        items: [],                                  // 数据
        scrollable: '.vsui-picker__content',        // 滚动的元素
        offset: 1,                                  // 列表初始化时的偏移量（列表初始化时，选项是聚焦在中间的，通过offset强制往上挪3项，以达到初始选项是为顶部的那项）
        rowHeight: 34,                              // 列表每一行的高度
        onChange: $.noop,                           // onChange回调
        temp: null,                                 // translate的缓存
        bodyHeight: 3 * 34                          // picker的高度，用于辅助点击滚动的计算
    }, options);
    const items = defaults.items.map((item) => {
        return `<div class="vsui-picker__item${item.disabled ? ' vsui-picker__item_disabled' : ''}">${item.label}</div>`;
    }).join('');
    const $this = $(this);

    $this.find('.vsui-picker__content').html(items);

    let $scrollable = $this.find(defaults.scrollable);        // 可滚动的元素
    let start;                                                  // 保存开始按下的位置
    let end;                                                    // 保存结束时的位置
    let startTime;                                              // 开始触摸的时间
    let translate;                                              // 缓存 translate
    const points = [];                                          // 记录移动点
    const windowHeight = window.innerHeight;                    // 屏幕的高度

    // 首次触发选中事件
    // 如果有缓存的选项，则用缓存的选项，否则使用中间值。
    if (defaults.temp !== null && defaults.temp < defaults.items.length) {
        const index = defaults.temp;
        defaults.onChange.call(this, defaults.items[index], index);
        translate = (defaults.offset - index) * defaults.rowHeight;
    } else {
        const index = getDefaultIndex(defaults.items);
        defaults.onChange.call(this, defaults.items[index], index);
        translate = getDefaultTranslate(defaults.offset, defaults.rowHeight, defaults.items);
    }
    setTranslate($scrollable, translate);

    const stop = (diff) => {
        translate += diff;

        // 移动到最接近的那一行
        translate = Math.round(translate / defaults.rowHeight) * defaults.rowHeight;
        const max = getMax(defaults.offset, defaults.rowHeight);
        const min = getMin(defaults.offset, defaults.rowHeight, defaults.items.length);
        // 不要超过最大值或者最小值
        if (translate > max) {
            translate = max;
        }
        if (translate < min) {
            translate = min;
        }

        // 如果是 disabled 的就跳过
        let index = defaults.offset - translate / defaults.rowHeight;
        while (!!defaults.items[index] && defaults.items[index].disabled) {
            diff > 0 ? ++index : --index;
        }
        translate = (defaults.offset - index) * defaults.rowHeight;
        setTransition($scrollable, .3);
        setTranslate($scrollable, translate);

        // 触发选择事件
        defaults.onChange.call(this, defaults.items[index], index);
    };

    function _start(pageY) {
        start = pageY;
        startTime = +new Date();
    }

    function _move(pageY) {
        end = pageY;
        const diff = end - start;

        setTransition($scrollable, 0);
        setTranslate($scrollable, (translate + diff));
        startTime = +new Date();
        points.push({time: startTime, y: end});
        if (points.length > 40) {
            points.shift();
        }
    }

    function _end(pageY) {
        if (!start) return;

        /**
         * 思路:
         * 0. touchstart 记录按下的点和时间
         * 1. touchmove 移动时记录前 40个经过的点和时间
         * 2. touchend 松开手时, 记录该点和时间. 如果松开手时的时间, 距离上一次 move时的时间超过 100ms, 那么认为停止了, 不执行惯性滑动
         *    如果间隔时间在 100ms 内, 查找 100ms 内最近的那个点, 和松开手时的那个点, 计算距离和时间差, 算出速度
         *    速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离
         */
        const endTime = new Date().getTime();
        const relativeY = windowHeight - (defaults.bodyHeight / 2);
        end = pageY;

        // 如果上次时间距离松开手的时间超过 100ms, 则停止了, 没有惯性滑动
        if (endTime - startTime > 100) {
            //如果end和start相差小于10，则视为
            if (Math.abs(end - start) > 10) {
                stop(end - start);
            } else {
                stop(relativeY - end);
            }
        } else {
            if (Math.abs(end - start) > 10) {
                const endPos = points.length - 1;
                let startPos = endPos;
                for (let i = endPos; i > 0 && startTime - points[i].time < 100; i--) {
                    startPos = i;
                }

                if (startPos !== endPos) {
                    const ep = points[endPos];
                    const sp = points[startPos];
                    const t = ep.time - sp.time;
                    const s = ep.y - sp.y;
                    const v = s / t; // 出手时的速度
                    const diff = v * 150 + (end - start); // 滑行 150ms,这里直接影响“灵敏度”
                    stop(diff);
                }
                else {
                    stop(0);
                }
            } else {
                stop(relativeY - end);
            }
        }

        start = null;
    }

    /**
     * 因为现在没有移除匿名函数的方法，所以先暴力移除（offAll），并且改变$scrollable。
     */
    $scrollable = $this
        .offAll()
        .on('touchstart', function (evt) {
            _start(evt.changedTouches[0].pageY);
        })
        .on('touchmove', function (evt) {
            _move(evt.changedTouches[0].pageY);
            evt.preventDefault();
        })
        .on('touchend', function (evt) {
            _end(evt.changedTouches[0].pageY);
        })
        .find(defaults.scrollable);

    // 判断是否支持touch事件 https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
    const isSupportTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch;
    if (!isSupportTouch) {
        $this
            .on('mousedown', function (evt) {
                _start(evt.pageY);
                evt.stopPropagation();
                evt.preventDefault();
            })
            .on('mousemove', function (evt) {
                if (!start) return;

                _move(evt.pageY);
                evt.stopPropagation();
                evt.preventDefault();
            })
            .on('mouseup mouseleave', function (evt) {
                _end(evt.pageY);
                evt.stopPropagation();
                evt.preventDefault();
            });

    }
};
const regex = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
const constraints = [[1, 31], [1, 12], [0, 6]];

/**
 * Schedule
 */
class Schedule {
    constructor(fields, start, end) {
        /**
         * dayOfMonth
         * @type {Array}
         */
        this._dates = fields[0];

        /**
         * month
         * @type {Array}
         */
        this._months = fields[1];

        /**
         * dayOfWeek
         * @type {Array}
         */
        this._days = fields[2];

        /**
         * start
         * @type {Date}
         */
        this._start = start;

        /**
         * end
         * @type {Date}
         */
        this._end = end;

        /**
         * cursor
         * @type {Date}
         * @private
         */
        this._pointer = start;
    }

    _findNext() {
        let next;
        while (true) {
            if (this._end.getTime() - this._pointer.getTime() <= 0) {
                throw new Error(`out of range, end is ${this._end}, current is ${this._pointer}`);
            }

            const month = this._pointer.getMonth();
            const date = this._pointer.getDate();
            const day = this._pointer.getDay();

            if (this._months.indexOf(month + 1) === -1) {
                this._pointer.setMonth(month + 1);
                this._pointer.setDate(1);
                continue;
            }

            if (this._dates.indexOf(date) === -1) {
                this._pointer.setDate(date + 1);
                continue;
            }

            if (this._days.indexOf(day) === -1) {
                this._pointer.setDate(date + 1);
                continue;
            }

            next = new Date(this._pointer);

            break;
        }
        return next;
    }

    /**
     * fetch next data
     */
    next() {
        const value = this._findNext();
        // move next date
        this._pointer.setDate(this._pointer.getDate() + 1);
        return {
            value: value,
            done: !this.hasNext()
        };
    }

    /**
     * has next
     * @returns {boolean}
     */
    hasNext() {
        try {
            this._findNext();
            return true;
        }
        catch (e) {
            return false;
        }
    }
}

function parseField(field, constraints) {
    const low = constraints[0];
    const high = constraints[1];
    let result = [];
    let pointer;

    // * 号等于最低到最高
    field = field.replace(/\*/g, low + '-' + high);

    // 处理 1,2,5-9 这种情况
    const fields = field.split(',');
    for (let i = 0, len = fields.length; i < len; i++) {
        const f = fields[i];
        if (f.match(regex)) {
            f.replace(regex, function ($0, lower, upper, step) {
                // ref to `cron-parser`
                step = parseInt(step) || 1;
                // Positive integer higher than constraints[0]
                lower = Math.min(Math.max(low, ~~Math.abs(lower)), high);

                // Positive integer lower than constraints[1]
                upper = upper ? Math.min(high, ~~Math.abs(upper)) : lower;

                // Count from the lower barrier to the upper
                pointer = lower;

                do {
                    result.push(pointer);
                    pointer += step;
                } while (pointer <= upper);
            });
        }
    }
    return result;
}

/**
 *
 * @param expr
 * @param start
 * @param end
 * @returns {*}
 */
function parse(expr, start, end) {
    const atoms = expr.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);
    const fields = [];
    atoms.forEach((atom, index) => {
        const constraint = constraints[index];
        fields.push(parseField(atom, constraint));
    });
    return new Schedule(fields, start, end);
}


let render = function (tpl, data) {
    const code = 'var p=[];with(this){p.push(\'' +
        tpl
            .replace(/[\r\t\n]/g, ' ')
            .split('<%').join('\t')
            .replace(/((^|%>)[^\t]*)'/g, '$1\r')
            .replace(/\t=(.*?)%>/g, '\',$1,\'')
            .split('\t').join('\');')
            .split('%>').join('p.push(\'')
            .split('\r').join('\\\'')
        + '\');}return p.join(\'\');';
    return new Function(code).apply(data);
};
const depthOf = (object) => {
    let depth = 1;
    if (object.children && object.children[0]) {
        depth = depthOf(object.children[0]) + 1;
    }
    return depth;
};
/**
 * getStyle 获得元素计算后的样式值
 * (from http://stackoverflow.com/questions/2664045/how-to-get-an-html-elements-style-values-in-javascript)
 */
let getStyle = function (el, styleProp) {
    let value, defaultView = (el.ownerDocument || document).defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
        // sanitize property name to css notation
        // (hypen separated words eg. font-Size)
        styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) { // IE
        // sanitize property name to camelCase
        styleProp = styleProp.replace(/\-(\w)/g, (str, letter) => {
            return letter.toUpperCase();
        });
        value = el.currentStyle[styleProp];
        // convert other units to pixels on IE
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return ((value) => {
                var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                el.runtimeStyle.left = el.currentStyle.left;
                el.style.left = value || 0;
                value = el.style.pixelLeft + 'px';
                el.style.left = oldLeft;
                el.runtimeStyle.left = oldRsLeft;
                return value;
            })(value);
        }
        return value;
    }
};
$.fn.offAll = function () {
    /*this.forEach(($element, index) => {
     var clone = $element.cloneNode(true);
     $element.parentNode.replaceChild(clone, $element);

     this[index] = clone;
     });*/
    return this;
};
