function UserFuncBind() {
    setEnterKey("0");

    //Load UserInfo
    var userID = $("#gUserID").val();
    if (userID != "0") {
        getUserInfo(1, userID);
    }

    //UserTip
    $("#userID").autocomplete({
        source: "/User/ajax/uAction.aspx?type=usertip",
        minLength: 1,
        focus: function (event, ui) {
            $("#userID").unbind("keydown", btnUserIDBind);
            return false;
        },
        response: function (event, ui) {
            if (ui.content.length == 1) {
                $("#userID").autocomplete("option", "autoFocus", true);
            } else {
                $("#userID").autocomplete("option", "autoFocus", false);
            }
        },
        select: function (event, ui) {
            HideUsrSelect(1, ui.item.uName, ui.item.uNumber, ui.item.uid, ui.item.uPhone, ui.item.uIntegral, ui.item.uStoreMoney, ui.item.storeTimes);
            //Load UserMoreInfo
            getUserInfo(2, ui.item.uid);
            var currKey = event.keyCode || event.which || event.charCode;
            if (currKey == 13) {
                setEnterKey("-1");
            }
            return false;
        }
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
	.append("<a title='姓名:" + item.uName + "&#13;卡号:" + item.uNumber + "'><span class='itemtitle'>" + item.uName + "</span><span class='itemphone'>" + item.uPhone + "</span></a>")
	.appendTo(ul);
    }
    $("#userID").bind("keydown", btnUserIDBind);



    //GoodsTip
    $("#FindGoods").autocomplete({
        source: "/Goods/ajax/action.aspx?type=goodstip",
        minLength: 1,
        search: function (event, ui) {
            if ($("#FindGoods").attr("act-a") == "on") {
                return false;
            }
        },
        focus: function (event, ui) {
            $("#FindGoods").attr("act-b", "on");
            return false;
        },
        response: function (event, ui) {
            //$("#FindGoods").attr("act-b", "on");
            $("#addNewGoodsData").hide(); /**/
            if (ui.content.length == 0 && $("#FindGoods").val().length > 0) {
                $("#addNewGoodsData").show();
            } else if (ui.content.length == 1) {
                $("#FindGoods").autocomplete("option", "autoFocus", true);
            } else {
                $("#FindGoods").autocomplete("option", "autoFocus", false);
            }
        },
        select: function (event, ui) {
            setGoodsInfo(ui.item.gid, ui.item.gName, ui.item.gNum, ui.item.gSpec, ui.item.gPrice, ui.item.gMaxID, ui.item.gMinID, ui.item.gMaxName, ui.item.gMinName, ui.item.gDiscount, ui.item.isService);
            var currKey = event.keyCode || event.which || event.charCode;
            if (currKey == 13) {
                setEnterKey("-1");
            }
            return false;
        }
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
	.append("<a title='名称:" + item.gName + "&#13;分类:" + item.gMaxName + " - " + item.gMinName + "&#13;单价:￥" + item.gPrice + "&#13;'><span class='itemtitle'>" + item.gName + "</span><span class='itemphone'>" + item.gPrice + "元</span></a>").css("width", getStringWidth(ul, (item.gName + "" + item.gPrice.toString()), 214))
	.appendTo(ul);
    }
    $("#FindGoods").bind("keydown", btnGoodsBind);

    //Init SalesItemData
    $("body").data("dataSales", {});

    //Load Option From Cookie
    try {
        if ($.cookie("saleItem") != null) {
            var saleItem = $.cookie("saleItem").split('|');
            if (saleItem[0] == "1") {
                $("#gPrintList").prop("checked", true)
            } else {
                $("#gPrintList").prop("checked", false)
            }

            if (saleItem[1] == "1") {
                $("#gSendSms").prop("checked", true);
            } else {
                $("#gSendSms").prop("checked", false);
            }
        }
    }
    catch (e) {
    }




    //问号提示
    $('#saleNameTipe').qtip({
        content: {
            text: '1、直接输入商品名称销售。例：小米<br/>2、输入拼音或首字母快速检索。例：xiaomi / xm<br/>3、使用条码或编号快速检索。例：6932531<br/>4、<font color="red">回车</font> 快速增加下一个商品。<br/>5、按 <font color="red">回车</font> 快速结账。<br/>6、<font color="red">Esc</font> 清除当前输入产品。<br/>7、小键盘<font color="red">+ -</font> 快速增减数量。'
        },
        position: {
            my: 'left center',
            at: 'center center',
            adjust: { x: 5 }
        },
        show: {
            event: 'mousemove'
        },
        hide: {
        //event: 'mouseout'
    }
});

//问号提示
$('#saleOkAddUserTipe').qtip({
    content: {
        text: '1、顾客马上就能收到消费通知。<br/>2、<font color="red">您将立即获得一个新会员。</font><br/>3、收集客户资料从此易如反掌。<br/>4、让您在同行中脱颖而出。<br/><span style="text-align: center;display: block;"><a href="http://www.i200.cn/bbs/thread-1720-1-1.html" target="_blank">点此了解操作详情</a><span><br/>'
    },
    position: {
        my: 'left center',
        at: 'center center',
        adjust: { x: 5 }
    },
    show: {
        solo: true
    },
    hide: {
        delay: 100,
        fixed: true
    //event: 'mouseout'
}
});
}

function getSaleNo() {
    $.ajax({
        type: "POST",
        cache: false,
        url: "/Sales/ajax/Action.aspx?type=getsaleno",
        success: function (msg) {
            if (msg != "error") {
                $("#saleNo").val(msg);
            }
        }
    });
}

function getStringWidth(ul, str, min) {
    if ($("#goodsTitleLength").size() < 1) {
        $("body").append('<div style=" display:none;font-size:1.1em;" id="goodsTitleLength"></div>');
    }
    var width = $("#goodsTitleLength").html(str).outerWidth() + 40;
    width = width < min ? min : width;
    var oldwidth = ul.children("li").first().outerWidth()
    oldwidth = oldwidth < min ? min : oldwidth;
    if (width > oldwidth) {
        ul.children("li").css("width", width);
    } else {
        width = oldwidth;
    }
    return width;
}
function choseUser(item) {
    $(item).hide();
    $("#userID").show().focus();
}

function choseUserShow(item) {
    if ($(item).val() == "") {
        HideUsrSelect(2);
    } else {

    }
}

function btnUserIDBind() {
    var currKey = 0, e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    if (currKey == 13) {
        $("#usrIntegral").html("  加载中..").show();
        var sUrl = "/User/ajax/uAction.aspx?type=usertip&term=" + encodeURI($("#userID").val());
        $.ajax({
            type: "POST",
            url: sUrl,
            success: function (msg) {
                $("#usrIntegral").html("").hide();
                if (msg != "error") {
                    if (msg != "none") {
                        var json = $.parseJSON(msg)
                        if (json.length == 1) {
                            HideUsrSelect(1, json[0].uName, json[0].uNumber, json[0].uid, json[0].uPhone, json[0].uIntegral, json[0].uStoreMoney, json[0].storeTimes);
                            //Load UserMoreInfo
                            getUserInfo(2, json[0].uid);
                        }
                    } else {
                        $("#usrIntegral").html("未找到会员").show();
                    }

                }
            }
        });
    }
}

function HideUsrSelect(iType, uName, uNumber, uID, uPhone, uIntegral, uStoreValue, uStoreTimes) {
    if (iType == 1) {
        $("#userID").hide();
        $("#usrNumber").html("[ " + uNumber + " ]").attr("title", "卡号:" + uNumber);
        $("#usrName").html(uName);
        $("#usrPanle").css("display", "inline-block");
        $("#usrChange").show();
        $("#userID").autocomplete("disable");
        $("#userID").unbind("keydown", btnUserIDBind);
        $("#gUserID").val(uID);
        $("#FindGoods").focus();
        $("#zoneIntegral").show();
        //Pay Option
        if (uStoreValue == 0) {
            $("#pt_store input[name='PayType']").attr("disabled", "disabled");
        } else {
            $("#pt_store input[name='PayType']").removeAttr("disabled");
        }
        $("#pt_store .storeMoneyVal").html("￥" + uStoreValue.toString()).attr("rel", uStoreValue.toString());
        $("#pt_store").show();
        if (uStoreTimes != null) {
            $("#pt_times .storeTimesVal").html(uStoreTimes.toString());
            $("#pt_times").show();
        } else {
            $("#pt_times .storeTimesVal").html("");
            $("#pt_times").hide();
        }
        $("#pt_unpaid").show();

        $("#zoneSendSms").show();
    } else if (iType == 2) {
        $("#userID").bind("keydown", btnUserIDBind);
        $("#userID").autocomplete("enable");
        $("#usrName").html("");
        $("#usrNumber").html("[  ]").attr("title", "卡号:");
        $("#usrPanle").hide();
        $("#usrPanle img-coupon").hide();
        $("#usrChange").hide();
        $("#gUserID").val("0");
        $("#userID").val("").hide();
        $("#choseUser").show();
        $("#FindGoods").focus();
        $("#zoneIntegral").hide();
        //Pay Option
        $("#pt_store .storeMoneyVal").html("￥0.00").attr("rel", "0");
        $("#pt_store").hide();
        $("#pt_times").hide();
        $("#pt_unpaid").hide();

        $("#zoneSendSms").hide();

        //Hide UserMoreInfo
        $(".usrMoreInfo").hide();
        $("#userIntegral").html("?");
        $("#userStoreMoney").html("￥?");
        $("#userIntegral").html("?");

        $("#userDiscountHidden").val("-10");
        DiscountOnLoad();

        GlobalCoupon = null;
    }

    $(".OriginAccName").hide();
}

var GlobalCoupon = null;
function getUserInfo(type, uid) {
    var sUrl = "/User/ajax/uAction.aspx?type=userinfo&uid=" + uid;
    $.ajax({
        type: "POST",
        url: sUrl,
        success: function (msg) {
            if (msg != "error") {
                if (msg != "none") {
                    var json = $.parseJSON(msg);
                    if (type == 2) {
                        ;
                    } else {
                        HideUsrSelect(1, json.uName, json.uNumber, json.uid, json.uPhone, json.uIntegral, json.uStoreMoney, json.uStoreTimes);
                        $("#choseUser").hide();
                    }

                    $("#userIntegral").html(json.uIntegral);
                    $("#userStoreMoney").html("￥" + json.uStoreMoney);
                    $("#userBuyDate").html(json.uLastBuyDate == null ? "无" : json.uLastBuyDate);
                    $(".usrMoreInfo").show();

                    //RankDiscount

                    $("#userDiscountHidden").val(Number(json.rankDiscount));
                    DiscountOnLoad();

                    //                    if ($("#gDiscount option[value='" + json.rankDiscount + "']").length > 0) {
                    //                        $("#gDiscount").val(json.rankDiscount);
                    //                    } else {
                    //                        var str = "<option value='" + json.rankDiscount + "'>" + json.rankDiscount + "折</option>";
                    //                        $("#gDiscount option[value='add']").before(str);
                    //                        $("#gDiscount").val(json.rankDiscount);
                    //                    }

                    //Show OriginAccName
                    if (json.OriginAccName != null && json.OriginAccName != "") {
                        $(".OriginAccName .uAccName").html("[ " + json.OriginAccName + " ]").attr("title", "会员归属店铺：" + json.OriginAccName);
                        $(".OriginAccName").show();
                    } else {
                        $(".OriginAccName").hide();
                    }

                    //Check NeedPwd
                    if (json.uNeedPwd != null && json.uNeedPwd == 1) {
                        $("#gNeedPwd").val("1");
                    } else {
                        $("#gNeedPwd").val("0");
                    }

                    //Check CouponAccess
                    if (json.IsCoupon == 1) {
                        //Load CouponList
                        var strUrl = "/AppHome/Coupon/ajax/Action.aspx?type=getusercoupon&userid=" + uid;
                        $("#usrPanle .img-coupon").hide();
                        $.ajax({
                            type: "POST",
                            url: strUrl,
                            success: function (sText) {
                                if (sText != "error") {
                                    if (sText != "none") {
                                        var jsonObj = $.parseJSON(sText);
                                        GlobalCoupon = jsonObj;
                                        if (jsonObj.length > 0) {
                                            $("#usrPanle .img-coupon").show();
                                        }
                                    }
                                }
                            }
                        });

                        //Load CouponGroupId
                        var couponUrl = "/AppHome/Coupon/ajax/Action.aspx?type=getdefault";
                        $.ajax({
                            type: "POST",
                            url: couponUrl,
                            success: function (sText) {
                                if (sText != "error") {
                                    var jsonObj = $.parseJSON(sText);
                                    if (jsonObj.DefaultGroupId == 0) {
                                        $("#CouponSms").attr("disabled", "disabled").removeAttr("checked").parent().attr("title", "请先设置默认发送的优惠券规则!").show();
                                    } else {
                                        $("#CouponSms").removeAttr("disabled").parent().attr("title", "将会以短信方式发送默认的优惠券!").show();
                                    }
                                }
                            }
                        });

                        
                    }
                }
            }
        }
    });
}

function btnGoodsBind() {
    var currKey = 0, e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    if (currKey == 13) {
        //Enter Button
        if ($("#FindGoods").val().length > 0) {
            if ($("#FindGoods").attr("act-b") != "on") {
                $("#FindGoods").attr("act-a", "on");
                var sUrl = "/Goods/ajax/action.aspx?type=goodstip&term=" + encodeURI($("#FindGoods").val());
                setEnterKey("-1");
                $.ajax({
                    type: "POST",
                    url: sUrl,
                    success: function (msg) {
                        $("#FindGoods").attr("act-a", "off");
                        if (msg != "error") {
                            if (msg != "none") {
                                var json = $.parseJSON(msg)
                                if (json.length == 1) {
                                    setGoodsInfo(json[0].gid, json[0].gName, json[0].gNum, json[0].gSpec, json[0].gPrice, json[0].gMaxID, json[0].gMinID, json[0].gMaxName, json[0].gMinName, json[0].gDiscount, json[0].isService);
                                    return true;
                                }
                            }
                        }
                        addGoodsItem();
                        return true;
                    }
                });
            } else {
                //console.log("特殊信息");
            }
        } else {
            setEnterKey("3");
            return true;
        }
    } else if (currKey == 27) {
        //Esc Button
        cancelResult();
    } else if (currKey == 107) {
        //+ Button
        var Nums = $("#gNumber").prop("value");
        $("#gNumber").attr("value", parseFloat(Nums) + 1);
        refreshMoney();
        event.returnValue = false;
    } else if (currKey == 109) {
        //- Button
        var Nums = $("#gNumber").prop("value");
        if (parseFloat(Nums) > 1) {
            $("#gNumber").attr("value", parseFloat(Nums) - 1);
        }
        refreshMoney();
        event.returnValue = false;
    } else if (currKey == 119) {
        //F8 Button
        //showCheckoutBox();
    } else if (currKey != 13 && currKey != 40 && currKey != 38) {
        //Up Down Button
        $("#FindGoods").attr("act-b", "off");

        //initForm
        initForm();
    }
}

function setGoodsInfo(GoodsID, gName, gNum, gGuige, gPrice, maxID, minID, maxName, minName, gDiscount, isService) {
    $("#gName").val(gName);
    $("#gPrice").val(gPrice);
    $("#gSpecific").val(gGuige);
    GoodsQuantity(gNum, isService);
    $("#KuChunSpan").show();
    $("#maxClass").val(maxID);
    SetMinClassHtml(minID);
    $("#gNumber").val("1");

    $("#goodsDiscountHidden").val(Number(gDiscount));
    DiscountOnLoad();

//    if ($("#gDiscount option[value='" + gDiscount + "']").length > 0) {
//        $("#gDiscount").val(gDiscount);
//    } else {
//        var str = "<option value='" + gDiscount + "'>" + gDiscount + "折</option>";
//        $("#gDiscount option[value='add']").before(str);
//        $("#gDiscount").val(gDiscount);
//    }

    var discountVal = $("#gDiscount").val();
    var objMoney = getMoney(gPrice, $("#gNumber").val(), discountVal);
    $("#gOughtMoney").html(objMoney.gMoney);
    $("#gRealPrice").val(objMoney.gRealMoney);
    $("#searchName").html(gName);
    $("#gRemark").val("");
    $("#chkIntegral").prop("checked", "");
    $("#FindGoods").val("").attr("placeholder", gName);

    $("#saveStatus").html("").hide();

    //Add Hidden Value
    $("#goodsID").val(GoodsID);

    //Show AddTip
    $("#searchTip").show();
    $("#addNewGoodsData").hide();

    //Hide SaveTip
    $(".itemList .title").qtip('hide');

    //Add SalesList
    var id = GoodsID.toString() + (new Date()).getTime().toString();
    if (GoodsID == "") {
        //Add Hidden Value
        $("#goodsID").val(tempID);
        GoodsID = tempID.toString();
        id = tempID.toString() + (new Date()).getTime().toString();
    }


    var dataSales = $("body").data("dataSales");
    if (dataSales[id] == null) {
        $("#goodsID").data("key", id);
        dataSales[id] = {};
        dataSales[id]['gid'] = GoodsID;
        dataSales[id]['gName'] = gName;
        dataSales[id]['gMax'] = maxID;
        dataSales[id]['gMin'] = minID;
        dataSales[id]['gMaxNm'] = maxName;
        dataSales[id]['gMinNm'] = minName;
        dataSales[id]['gPrice'] = gPrice;
        dataSales[id]['gGuige'] = gGuige;
        dataSales[id]['gNum'] = 1;
        dataSales[id]['gDiscount'] = discountVal;
        dataSales[id]['gMoney'] = objMoney.gMoney;
        dataSales[id]['RealMoney'] = parseFloat(parseFloat(objMoney.gRealMoney).toFixed(2));
        dataSales[id]['gOPuser'] = $("#gOPUser").val();
        dataSales[id]['gRemark'] = $("#gRemark").val();

        //Goods IsIntegral
        if ($("#chkIntegral").prop("checked")) {
            dataSales[id]['isIntegral'] = 0;
        } else {
            dataSales[id]['isIntegral'] = 1;
        }

        //Name Title
        var titleTip = "";
        titleTip = titleTip + "分类:" + maxName + "-" + minName + "&#13;";
        titleTip = titleTip + "规格:" + gGuige + "&#13;";
        titleTip = titleTip + "销售人员:" + $("#gOPUser").find('option:selected').text() + "&#13;";
        titleTip = titleTip + "备注信息:" + $("#gRemark").val();

        $("#salesList .itemList ul .sumLine").before("<li id='item" + id + "'><span class='title' title='" + titleTip + "'>" + gName + "</span><br /><span class='itemSpan0'>折扣:<span class='listDiscount'>" + getDiscount(discountVal) + "</span></span><span class='itemSpan2'>单价:<span class='listPrice'>" + gPrice + "</span></span><span class='itemSpan'>数量:<span class='listNumber itemNum'>" + 1 + "</span></span><span class='itemSpan3'>小计:<span class='listMoney itemNum'>¥" + objMoney.gRealMoney + "</span></span><span title='删除' class='del'></span><span class='sub'></span><span class='add'></span></li>");
        $("#item" + id + " span.add").click(function () {
            addItemNum(id);
        });
        $("#item" + id + " span.sub").click(function () {
            subItemNum(id);
        });
        $("#item" + id + " span.del").click(function () {
            delItemNum(id);
        });
        refreshListSum();
    } else {
        dataSales[id]['gNum'] = parseFloat(dataSales[id]['gNum'].toString()) + 1;
        $("#gNumber").val(dataSales[id]['gNum']);
        refreshMoney();
    }
}

function searchbyclass(type) {
    var searchStr = "";
    var classID = 0;
    if (type == 1) {
        //MaxID
        classID = $("#maxClass").val();
        searchStr = "^max:" + classID;
    } else {
        //MinID
        if ($("#minClass").css("display") == "none") {
            classID = $("#maxClass").val();
            searchStr = "^max:" + classID;
        } else {
            classID = $("#minClass").val();
            searchStr = "^min:" + classID;
        }
    }
    if (classID != null) {
        $("#FindGoods").autocomplete("search", searchStr);
    }
}


function SetDiscount(item) {
    var itemVal = $(item).val();
    if (itemVal == "add") {
        $(item).val(10);
        $.dialog.prompt('请输入折扣(1-10数字)：', function (data) {
            var patrn = /^[0-9\.]{1,20}$/;
            if (!patrn.test(data)) {
                window.parent.fn_tips("折扣必须为纯数字！");
                return false;
            }
            var str = "<option value='" + data + "'>" + data + "折</option>";
            $("#gDiscount option[value='add']").before(str);
            $("#gDiscount").val(data);
            $("#userDiscountHidden").val(data);
            refreshMoney();
        }, '');
    } else {
        $("#userDiscountHidden").val(itemVal);
        refreshMoney();
    }
}

function showFormTip(itemID, content) {
    $("#" + itemID).qtip({
        suppress: false,
        content: content,
        position: {
            at: 'right center',
            my: 'left center'
        },
        show: {
            event: false,
            ready: true
        },
        hide: false,
        style: {
            classes: 'qtip-shadow'
        }
    });

    window.setTimeout(function () {
        $("#" + itemID).qtip('hide');
    }, 2000);
}

function showItemTip(goodsID, content) {
    if ($("#goodsID").val() == goodsID) {
        var id = $("#goodsID").data("key");
        $("#item" + id + " .title").qtip({
            suppress: false,
            content: content,
            position: {
                at: 'right center',
                my: 'left center'
            },
            show: {
                event: false,
                ready: true
            },
            hide: false,
            style: {
                classes: 'qtip-shadow'
            }
        });
        window.setTimeout(function () {
            $("#item" + id + " .title").qtip('hide');
        }, 3000);
    }
}

var TimerHideSaveTip;
function showSaveTip(goodsID) {
    $("#item" + goodsID + " .title").qtip({
        suppress: false,
        content: "保存为库存商品? <a href='javascript:void(0)' onclick='AddToGoods()' onmouseover='clearTimeout(TimerHideSaveTip)' style='margin-left:5px;' title='保存为您的库存商品!' >[ 保存 ]</a><a href='javascript:void(0)' onclick='$(\"#item" + goodsID + " .title\").qtip(\"hide\")' style='margin-left:5px;color:#999' >[ 取消 ]</a>",
        position: {
            at: 'right center',
            my: 'left center'
        },
        show: {
            event: false,
            ready: true
        },
        hide: false,
        style: {
            classes: 'qtip-shadow qtip-light'
        }
    });
    TimerHideSaveTip = setTimeout(function () {
        $("#item" + goodsID + " .title").qtip('hide');
    }, 5000);
}

function SetItemValue(item, type, typeName) {
    var sItemValue = $(item).val();
    var GoodsID = $("#goodsID").val();
    var id = $("#goodsID").data("key");
    if (GoodsID != undefined) {
        var dataSales = $("body").data("dataSales");
        if (dataSales[id] != null) {
            dataSales[id][type] = sItemValue;

            //Name Title
            var titleTip = "";
            titleTip = titleTip + "分类:" + dataSales[id]['gMaxNm'] + "-" + dataSales[id]['gMinNm'] + "\r";
            titleTip = titleTip + "规格:" + dataSales[id]['gGuige'] + "\r";
            titleTip = titleTip + "销售人员:" + $("#gOPUser").find('option:selected').text() + "\r";
            titleTip = titleTip + "备注信息:" + dataSales[id]['gRemark'];
            $("#item" + id + " .title").attr("title", titleTip);

            showItemTip(GoodsID, typeName + ":" + sItemValue);
        }
    }
}

function SetItemOPuser(item) {
    var sOPuser = $(item).val();
    var GoodsID = $("#goodsID").val();
    var id = $("#goodsID").data("key");
    if (GoodsID != undefined) {
        var dataSales = $("body").data("dataSales");
        if (dataSales[id] != null) {
            dataSales[id]['gOPuser'] = sOPuser;

            //Name Title
            var titleTip = "";
            titleTip = titleTip + "分类:" + dataSales[id]['gMaxNm'] + "-" + dataSales[id]['gMinNm'] + "\r";
            titleTip = titleTip + "规格:" + dataSales[id]['gGuige'] + "\r";
            titleTip = titleTip + "销售人员:" + $("#gOPUser").find('option:selected').text() + "\r";
            titleTip = titleTip + "备注信息:" + dataSales[id]['gRemark'];
            $("#item" + id + " .title").attr("title", titleTip);

            showItemTip(GoodsID, "销售人员:" + $(item).find('option:selected').text());
        }
    }
}

function SetItemIntegral() {
    var GoodsID = $("#goodsID").val();
    var id = $("#goodsID").data("key");
    if (GoodsID != undefined) {
        var dataSales = $("body").data("dataSales");
        if (dataSales[id] != null) {
            var tips = "";
            if ($("#chkIntegral").prop("checked")) {
                dataSales[id]['isIntegral'] = 0;
                tips = "不计算积分";
            } else {
                dataSales[id]['isIntegral'] = 1;
                tips = "积分";
            }
            showItemTip(GoodsID, tips);
        }
    }
}

function delItemNum(gID) {
    var dataSales = $("body").data("dataSales");
    delete dataSales[gID];
    $("#item" + gID + "").fadeOut("normal", function () {
        $(this).remove();
        refreshListSum();
    });
    var nowGoodsID = $("#goodsID").data("key");
    if (nowGoodsID == gID) {
        cancelResult();
    }
}

function addItemNum(gID) {
    var dataSales = $("body").data("dataSales");
    var nowGoodsID = $("#goodsID").data("key");
    var gUpdateNum = parseFloat(dataSales[gID]['gNum'].toString()) + 1;
    var gPrice = dataSales[gID]['gPrice'];
    var gDiscount = dataSales[gID]['gDiscount'];
    var objMoney = getMoney(gPrice, gUpdateNum, gDiscount);
    dataSales[gID]['gNum'] = gUpdateNum;
    dataSales[gID]['gMoney'] = objMoney.gMoney;
    dataSales[gID]['RealMoney'] = parseFloat(parseFloat(objMoney.gRealMoney).toFixed(2));
    $("#item" + gID + " span .listNumber").html(gUpdateNum);
    $("#item" + gID + " span .listMoney").html("¥" + objMoney.gRealMoney);
    if (nowGoodsID == gID) {
        $("#gNumber").val(gUpdateNum);
        refreshMoney();
    }
    refreshListSum();
}

function subItemNum(gID) {
    var dataSales = $("body").data("dataSales");
    var nowGoodsID = $("#goodsID").data("key");
    if (parseFloat(dataSales[gID]['gNum'].toString()) > 1) {
        var gUpdateNum = parseFloat(dataSales[gID]['gNum'].toString()) - 1;
        var gPrice = dataSales[gID]['gPrice'];
        var gDiscount = dataSales[gID]['gDiscount'];
        var objMoney = getMoney(gPrice, gUpdateNum, gDiscount);
        dataSales[gID]['gNum'] = gUpdateNum;
        dataSales[gID]['gMoney'] = objMoney.gMoney;
        dataSales[gID]['RealMoney'] = parseFloat(parseFloat(objMoney.gRealMoney).toFixed(2));
        $("#item" + gID + " span .listNumber").html(gUpdateNum);
        $("#item" + gID + " span .listMoney").html("¥" + objMoney.gRealMoney);
        if (nowGoodsID == gID) {
            $("#gNumber").val(gUpdateNum);
            refreshMoney();
        }
        refreshListSum();
    }
}

function getDiscount(number) {
    if (number == "10") {
        return "全额";
    } else {
        return number + "折";
    }
}

function getMoney(price, count, discount) {
    var gNum = 0;
    var gPrice = 0;
    var gDiscount = 10;
    if (price == undefined && count == undefined) {
        gNum = parseFloat($("#gNumber").val());
        gPrice = parseFloat($("#gPrice").val());
        gDiscount = parseFloat($("#gDiscount").val());
    } else {
        gNum = parseFloat(count);
        gPrice = parseFloat(price);
        gDiscount = parseFloat(discount);
    }

    var gMoney = "0.00";      //AbleMoney
    var gRealMoney = "0.00";   //RealMoney
    if (isNaN(gNum) == false && isNaN(gPrice) == false) {
        gMoney = (gNum * gPrice).toFixed(2).toString();
        gRealMoney = (gNum * gPrice * gDiscount * 0.1).toFixed(2).toString();
    } else {
        gMoney = "0.00";
        gRealMoney = "0.00";
    }

    var objMoney = {
        gNum: gNum,
        gPrice: gPrice,
        gDiscount: gDiscount,
        gMoney: gMoney,
        gRealMoney: gRealMoney
    };

    return objMoney;
}

function refreshMoney() {
    var objMoney = getMoney();

    $("#gOughtMoney").html(objMoney.gMoney);
    $("#gRealPrice").val(objMoney.gRealMoney);
    var GoodsID = $("#goodsID").val();
    var id = $("#goodsID").data("key");
    if (GoodsID != undefined && GoodsID != "") {
        var dataSales = $("body").data("dataSales");
        if (dataSales[id] != null) {
            var gPrice = $("#gPrice").val();
            var gNum = $("#gNumber").val();
            var gDiscount = $("#gDiscount").val();
            dataSales[id]['gPrice'] = gPrice;
            dataSales[id]['gNum'] = gNum;
            dataSales[id]['gDiscount'] = gDiscount;
            dataSales[id]['gMoney'] = objMoney.gMoney;
            dataSales[id]['RealMoney'] = parseFloat(parseFloat(objMoney.gRealMoney).toFixed(2));
            $("#item" + id + " span .listDiscount").html(getDiscount(gDiscount));
            $("#item" + id + " span .listPrice").html(gPrice);
            $("#item" + id + " span .listNumber").html(gNum);
            $("#item" + id + " span .listMoney").html("¥" + objMoney.gRealMoney);
        }
        refreshListSum();
    }
}

function setRealMoney() {
    var gRealMoney = $("#gRealPrice").val();
    var GoodsID = $("#goodsID").val();
    var id = $("#goodsID").data("key");
    if (GoodsID != undefined && GoodsID != "") {
        var dataSales = $("body").data("dataSales");
        if (dataSales[id] != null) {
            dataSales[id]['RealMoney'] = parseFloat(parseFloat(gRealMoney).toFixed(2));
            $("#item" + id + " span .listMoney").html("¥" + (parseFloat(gRealMoney)).toFixed(2).toString());
        }
        refreshListSum();
    }
}

function refreshListSum() {
    var dataSales = $("body").data("dataSales");
    var gItemNum = 0;
    var gSumNum = 0;
    var gSumMonry = 0;
    for (var i in dataSales) {
        gItemNum++;
        gSumNum += parseFloat(dataSales[i]['gNum']);
        gSumMonry += parseFloat(dataSales[i]['RealMoney']);
    }
    if (gItemNum > 0) {
        $("#salesList .sumLine .listItem").html(gItemNum);
        $("#salesList .sumLine .listNum").html(gSumNum);
        $("#salesList .sumLine .listSumMoney").html("¥" + (gSumMonry).toFixed(2).toString());
        $("#salesList ul .sumLine").show();
    } else {
        $("#salesList .sumLine .listItem").html("0");
        $("#salesList .sumLine .listNum").html("0");
        $("#salesList .sumLine .listSumMoney").html("¥0.00");
        $("#salesList ul .sumLine").hide();
    }

    //Show salesList bottomLine
    if (gItemNum > 8) {
        $("#salesList").css("border-bottom", "1px solid #ddd");
        document.getElementById('salesList').scrollTop = document.getElementById('salesList').scrollHeight;
    } else {
        $("#salesList").css("border-bottom", "none");
    }
}

function cancelResult() {
    var goodsID = $("#goodsID").val();
    var id = $("#goodsID").data("key");
    var dataSales = $("body").data("dataSales");
    delete dataSales[id];
    $("#item" + id + "").remove();

    $("#gName").val("");
    $("#gPrice").val("0");
    $("#gSpecific").val("");
    $("#gStock").html("无");
    $("#KuChunSpan").hide();
    $("#gNumber").val("1");
    $("#searchName").html("无");
    $("#searchTip").hide();
    $("#goodsID").val("");
    refreshMoney();
    $("#gRemark").val("");
    $("#gDiscount").val(10);
    $("#FindGoods").attr("placeholder", "直接输入开始销售").focus();
    //初始化折扣
    DiscountOnLoad();
}

function initForm() {
    $("#gName").val("");
    $("#gPrice").val("0");
    $("#gSpecific").val("");
    $("#gStock").html("无");
    $("#KuChunSpan").hide();
    $("#gNumber").val("1");
    $("#searchName").html("无");
    //$("#searchTip").hide();
    $("#goodsID").val("");
    $("#gRemark").val("");
    $("#gOughtMoney").html("0.00");
    $("#gRealPrice").val("0");
    $("#chkIntegral").prop("checked", "");
    $("#searchTip").hide();
    $("#goodsID").data("key", "");
    $("#FindGoods").attr("placeholder", "直接输入开始销售").focus();
    $("#goodsDiscountHidden").val("-10");
    //初始化折扣
    DiscountOnLoad();
}

function replaceNull(item) {
    if ($(item).val() == "") {
        $(item).val("0");
        refreshMoney();
    }
}

function addGoodsItem() {
    var gName = $("#FindGoods").val();
    if (gName != "") {
        var nowDate = new Date();
        var tempID = "-" + (nowDate.getMonth() + 1).toString() + nowDate.getDate().toString() + nowDate.getHours().toString() + nowDate.getMinutes().toString() + nowDate.getSeconds().toString();
        var gPrice = $("#gPrice").val();
        if (gPrice == "" || gPrice == "0") {
            showFormTip("gPrice", "请输入商品单价!");
            $("#gPrice").focus();
            return false;
        }
        var gGuige = $("#gSpecific").val();
        var gNum = $("#gNumber").val();
        var maxID = $("#maxClass").val();
        var maxName = $("#maxClass").find('option:selected').text();
        var minID = 0;
        var minName = "";
        if ($("#minClass").is(":hidden")) {
            minID = 0;
            minName = "";
        } else {
            minID = $("#minClass").val();
            minName = $("#minClass").find('option:selected').text();
        }
        var discountVal = $("#gDiscount").val();
        var gRemark = $("#gRemark").val();
        var objMoney = getMoney(gPrice, gNum, discountVal);

        $("#gName").val(gName);
        $("#searchName").html(gName);
        if ($.trim($("#searchName").text()) == "无") {
            $("#searchTip").hide();
        } else {
            $("#searchTip").show();
        }
        $("#FindGoods").val("").attr("placeholder", gName);
        $("#saveStatus").html("").hide();




        var GoodsID = $("#goodsID").val();
        var id = GoodsID.toString() + (new Date()).getTime().toString();
        if (GoodsID == "") {
            //Add Hidden Value
            $("#goodsID").val(tempID);
            GoodsID = tempID.toString();
            id = tempID.toString() + (new Date()).getTime().toString();
        }

        //Hide SaveTip
        $(".itemList .title").qtip('hide');

        var dataSales = $("body").data("dataSales");
        if (dataSales[id] == null) {
            $("#goodsID").data("key", id);
            dataSales[id] = {};
            dataSales[id]['gid'] = GoodsID;
            dataSales[id]['gName'] = gName;
            dataSales[id]['gMax'] = maxID;
            dataSales[id]['gMin'] = minID;
            dataSales[id]['gMaxNm'] = maxName;
            dataSales[id]['gMinNm'] = minName;
            dataSales[id]['gPrice'] = gPrice;
            dataSales[id]['gGuige'] = gGuige;
            dataSales[id]['gNum'] = gNum;
            dataSales[id]['gDiscount'] = discountVal;
            dataSales[id]['gMoney'] = objMoney.gMoney;
            dataSales[id]['RealMoney'] = parseFloat(parseFloat($("#gRealPrice").val()).toFixed(2));
            dataSales[id]['gOPuser'] = $("#gOPUser").val();
            dataSales[id]['gRemark'] = gRemark;

            //Goods IsIntegral
            if ($("#chkIntegral").prop("checked")) {
                dataSales[id]['isIntegral'] = 0;
            } else {
                dataSales[id]['isIntegral'] = 1;
            }

            //Name Title
            var titleTip = "";
            titleTip = titleTip + "分类:" + maxName + "-" + minName + "&#13;";
            titleTip = titleTip + "规格:" + gGuige + "&#13;";
            titleTip = titleTip + "销售人员:" + $("#gOPUser").find('option:selected').text() + "&#13;";
            titleTip = titleTip + "备注信息:" + gRemark;

            $("#salesList .itemList ul .sumLine").before("<li id='item" + id + "'><span class='title' title='" + titleTip + "'>" + gName + "</span><br /><span class='itemSpan0'>折扣:<span class='listDiscount'>" + getDiscount(discountVal) + "</span></span><span class='itemSpan2'>单价:<span class='listPrice'>" + gPrice + "</span></span><span class='itemSpan'>数量:<span class='listNumber itemNum'>" + gNum + "</span></span><span class='itemSpan3'>小计:<span class='listMoney itemNum'>¥" + parseFloat($("#gRealPrice").val()).toFixed(2) + "</span></span><span title='删除' class='del'></span><span class='sub'></span><span class='add'></span></li>");
            $("#item" + id + " span.add").click(function () {
                addItemNum(id);
            });
            $("#item" + id + " span.sub").click(function () {
                subItemNum(id);
            });
            $("#item" + id + " span.del").click(function () {
                delItemNum(id);
            });
            refreshListSum();
            /**/
            $("#addNewGoodsData").hide();
            if ($("#savetogoodsCheck").attr("checked") == true || $("#savetogoodsCheck").attr("checked") == "checked") {
                $("#savetogoodsCheck").val("10");
                AddToGoods();
                $("#savetogoodsCheck").attr("checked", false);
            } else {
                GoodsCheckeHide();
            }


            //Save Tips
            //showSaveTip(id);

            $("#FindGoods").focus();
            return true;
        } else {
            refreshMoney();
            return false;
        }
    } else {
        initForm();
        return false;
    }
}

function AddToGoods() {
    //Add Goods
    var GoodsID = $("#goodsID").val();
    var id = $("#goodsID").data("key");
    if (GoodsID != undefined) {
        if (parseInt(GoodsID) < 0) {
            var dataSales = $("body").data("dataSales");
            if (dataSales[id] != null) {
                var Goods = {
                    "gName": dataSales[id]['gName'],
                    "gMaxID": dataSales[id]['gMax'],
                    "gMinID": dataSales[id]['gMin'],
                    "gMaxName": dataSales[id]['gMaxNm'],
                    "gMinName": dataSales[id]['gMinNm'],
                    "gPrice": Number(dataSales[id]['gPrice']),
                    "gSpecification": dataSales[id]['gGuige']
                };

                $("#saveStatus").html("[ 正在保存.. ]").show();
                $.post("/Goods/ajax/Action.aspx?type=addgoods", JSON.stringify(Goods),
                    function (data) {
                        if (parseInt(data) == 4) {
                            $.dialog.tips("商品保存失败");
                            $("#saveStatus").html("").hide();
                        }
                        else if (parseInt(data) == 2) {
                            $.dialog.tips("商品已经保存过，不用再次保存");
                            $("#saveStatus").html("").hide();
                        }
                        else if (parseInt(data) == 6) {
                            $.dialog.tips("商品编码重复，请更正信息");
                            $("#saveStatus").html("").hide();
                        }
                        else if (parseInt(data) > 0) {
                            $("#saveStatus").html("").hide();
                            //Replace GoodsID
                            var newGid = parseInt(data);
                            dataSales[id]['gid'] = newGid;
                            /***$("#item" + GoodsID + "").attr("id", "item" + newGid);*/
                            $("#goodsID").val(newGid);
                            showItemTip(newGid, "成功保存为库存商品!");
                        } else {
                            $("#saveStatus").html("").hide();
                        }
                        GoodsCheckeHide();
                    }
                );
            }
        }
    }
}

function SetMaxClassHtml(type) {
    if ($("body").data("goodsClassData") == undefined) {
        GetGoodsClassData(1, type);
        return false;
    } else {
        var obj = $("#maxClass");
        var json = $("body").data("goodsClassData");
        if (json.MaxCount == 0) {
            var sOption = "<option value='0'>默认分类</option>";
            obj.html(sOption);
            $("#minClass").hide();
            $("#btnNewGoodsClass").show();
        } else {
            var strHtml = "";
            for (var item in json.ClassList) {
                strHtml = strHtml + "<option value='" + json.ClassList[item]['MaxID'] + "'>" + json.ClassList[item]['MaxName'] + "</option>";
            }
            obj.html(strHtml);
        }
        if (type == 1) {
            SetMinClassHtml(0);
        }
        return true;
    }
}
function SetMinClassHtml(v) {
    if ($("body").data("goodsClassData") == undefined) {
        GetGoodsClassData(2,0);
        return false;
    } else {
        var obj = $("#minClass");
        var json = $("body").data("goodsClassData");
        var item = $("#maxClass").val();
        if (item.length > 0) {
            if (json.MinCount == 0) {
                obj.html("<option value='0'></option>");
                obj.hide();
            } else {
                var classList = json.ClassList[item];
                if (classList != null) {
                    if (classList['MinClassList'] != null) {
                        var strHtml = "";
                        for (var min in classList['MinClassList']) {
                            strHtml = strHtml + "<option value='" + min + "'>" + classList['MinClassList'][min] + "</option>";
                        }
                        obj.html(strHtml);
                        obj.show();
                    } else {
                        obj.html("<option value='0'></option>");
                        obj.hide();
                    }
                } else {
                    obj.html("<option value='0'></option>");
                    obj.hide();
                }
            }
        } else {
            window.parent.fn_tips("分类信息加载失败！");
            return false;
        }
        if (v != 0) {
            obj.val(v);
        }
        return true;
    }
}
function GetGoodsClassData(l,t) {
    $.ajax({
        type: "GET",
        cache: false,
        url: "/Goods/ajax/Action.aspx?type=getclass",
        success: function (msg) {
            if (msg != "error") {
                if (msg != "none") {
                    var json = $.parseJSON(msg);
                    $("body").data("goodsClassData", json);
                } else {
                    $("body").data("goodsClassData", { "MaxCount": 0, "MinCount": 0, "ClassList": {} });
                }
                if (l == 1) {
                    SetMaxClassHtml(t);
                } else if (l == 2) {
                    SetMinClassHtml();
                }
            } else {
                window.parent.fn_tips("分类信息加载失败！");
            }
        }
    });
}

function showCheckoutBox() {
    var gPrice = $("#gPrice").val();
    var gName = $("#FindGoods").val();
    if (gName != "" && parseFloat(gPrice) > 0) {
        addGoodsItem();
    }
    var dataSales = $("body").data("dataSales");
    var gItemNum = 0;
    var gSumNum = 0;
    var gSumMonry = 0;

    for (var i in dataSales) {
        gItemNum++;
        gSumNum += parseFloat(dataSales[i]['gNum']);
        gSumMonry += parseFloat(dataSales[i]['RealMoney']);
    }

    if (gItemNum > 0) {
        $("#salesCheckOut .boxItemNum").html(gItemNum);
        $("#salesCheckOut .boxItemCnt").html(gSumNum);
        $("#salesCheckOut .boxItemMoney").attr("rel", gSumMonry).html("¥" + (gSumMonry).toFixed(2).toString());
        $("#salesCheckOut #gRealMoney").val(gSumMonry.toFixed(2).toString());


        $("#salesCheckOut input[name='PayType']").removeAttr("checked");
        if ($("#pt_store input[name='PayType']").attr("disabled") == undefined && $("#pt_store").css("display") != "none") {
            $("#salesCheckOut #pt_store input[name='PayType']").click();
        } else {
            $("#salesCheckOut #pt_cash input[name='PayType']").attr("checked", true);
        }

        //Check Coupon
        var gUserId = $("#gUserID").val();
        if (GlobalCoupon != null && gUserId != "0" && GlobalCoupon.length>0) {
            $("#btnCouponList").attr("onclick", "ShowCouponBox(" + gSumMonry + ")").html("点击使用优惠券(" + GlobalCoupon.length + ")").show();
        } else {
            $("#btnCouponList").hide();
        }

        $.dialog({
            id: 'salesBox',
            title: '结账',
            content: document.getElementById('salesCheckOut'),
            lock: true,
            opacity: 0.5,
            padding: 10,
            background: '#FFF',
            ok: function () {
                CheckVal();
                return false;
            },
            okVal: '确认（回车）',
            cancel: true
        });
        $("#gRealMoney").focus();

    } else {
        var GoodsID = $("#goodsID").val();
        if (GoodsID == "" || GoodsID == undefined) {
            var gName = $("#FindGoods").val();
            var gPrice = $("#gPrice").val();
            if (gName != "" && parseFloat(gPrice) > 0) {
                if (addGoodsItem()) {
                    showCheckoutBox();
                }
            } else {
                addGoodsItem();
            }
        }
    }

}

//Show Select CouponList
function ShowCouponBox(moneySum) {
    if (GlobalCoupon.length > 0) {
        $("#CouponListBox .couponlist").show();
        $("#couponIdValue").attr("money", "0");
        var strHtml="";
        var strDisable = "";
        var strDisName = "";
        for (var i in GlobalCoupon) {
            if (GlobalCoupon[i].CouponRuleId == 2) {
                strDisName = GlobalCoupon[i].CouponDesc+" <span style='color:#f50;'>￥" + GlobalCoupon[i].CouponValue + "</span> <span style='color:#999;'>(满" + GlobalCoupon[i].CouponRuleVal + "立减" + GlobalCoupon[i].CouponValue + ")</span>";
                if (GlobalCoupon[i].CouponRuleVal <= moneySum) {
                    strDisable = "";
                } else {
                    strDisable = "disabled='disabled'";
                }
            } else {
                strDisName = GlobalCoupon[i].CouponDesc+" <span style='color:#f50;'>￥" + GlobalCoupon[i].CouponValue + "</span> <span style='color:#999;'>(无限制)</span>";
                strDisable = "";
            }

            strHtml = strHtml + "<label class='radio'><input type='radio' name='CouponListItem' value='" + GlobalCoupon[i].CouponValue + "' onclick='CouponSelect(" + GlobalCoupon[i].Id + "," + GlobalCoupon[i].CouponValue + ",\"" + GlobalCoupon[i].CouponId + "\")' " + strDisable + " /> " + strDisName + "</label>";
        }
        $("#CouponListBox .couponlist .controls").html(strHtml);
    } else {
        $("#CouponListBox .couponlist .controls").html("");
        $("#CouponListBox .couponlist").hide();
    }

    $.dialog({
        id: 'couponlist',
        title: '选择优惠券或输入优惠券编码',
        content: document.getElementById('CouponListBox'),
        lock: true,
        opacity: 0.5,
        padding: 10,
        background: '#FFF',
        ok: function () {
            var couponObj = $("#couponIdValue");
            if (couponObj.val() != "0") {
                var dataSales = $("body").data("dataSales");
                var gSumMonry = 0;

                for (var i in dataSales) {
                    gSumMonry += parseFloat(dataSales[i]['RealMoney']);
                }
                var couponMoneyValue = parseInt(couponObj.attr("money"));
                var lastMoney = gSumMonry - couponMoneyValue;
                if (lastMoney < 0) {
                    $("#salesCheckOut #gRealMoney").val("0");
                } else {
                    $("#salesCheckOut #gRealMoney").val(lastMoney.toFixed(2).toString());
                }
                $("#couponShowZone").html("(优惠 ¥" + couponMoneyValue + ")").show();
                $("#btnCouponList").hide();
            }
        },
        okVal: '使用优惠券',
        cancel: function () {
            $("#couponIdValue").val("0");
        }
    });
    $("#CouponCode").focus();
}

function CouponSelect(id,value,code) {
    $("#couponIdValue").val(id).attr("money", value).attr("code", code);
}

function CouponCancel() {
    $("#couponShowZone").html("").hide();
    $("#btnCouponList").show();
    
    var dataSales = $("body").data("dataSales");
    var gSumMonry = 0;
    for (var i in dataSales) {
        gSumMonry += parseFloat(dataSales[i]['RealMoney']);
    }
    $("#salesCheckOut #gRealMoney").val(gSumMonry.toFixed(2).toString());
    $("#couponIdValue").val("0").attr("money", "0").attr("code", "");
}

function UsrPwdInput() {
    var currKey = 0, e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    if (currKey == 13) {
        CheckVal();
    }
    else {
        $("#UsrPwdPanel").removeClass("error");
    }
}

function CheckPayType(item) {
    var iVal = $(item).val();
    if (iVal == "3") {
        var iNeedPwd = $("#gNeedPwd").val();
        if (iNeedPwd == "1") {
            //Need UsrPwd
            $("#UsrPwdPanel").fadeIn("fast");
            $("#gUsrPwd").val("").focus();
        } else {
            $("#UsrPwdPanel").hide();
        }
    } else {
        $("#UsrPwdPanel").hide();
    }
}

function CheckVal() {
    var stat = 1;
    if ($("body").data("CheckVal") == undefined) {
        stat = 0;
    } else {
        stat = $("body").data("CheckVal");
    }
    if (stat == 0) {
        $("body").data("CheckVal", "1");
        var gRealMoney = $("#gRealMoney").val();
        var gStoreMoney = $("#pt_store .storeMoneyVal").attr("rel");
        var gPayType = $("#salesCheckOut input[name='PayType']:checked").attr("value");
        var gDiffMoney = (parseFloat(gRealMoney) - parseFloat(gStoreMoney)).toFixed(2);
        if (gPayType == "3" && gDiffMoney > 0) {
            $.dialog.confirm('余额不足，是否继续销售？<br/><br/>剩余应付金额：<span style="color:Red;font-weight: bold;font-size: 18px;">￥' + gDiffMoney + "</span>", function () {
                CheckOut();
            });
        } else {
            CheckOut();
        }
    }
}


function CheckOut() {
    var gUserID = $("#gUserID").val();
    var gRealMoney = $("#gRealMoney").val();
    var gDateTime = $("#saleInfoDateTime").val();
    var gPayType = $("#salesCheckOut input[name='PayType']:checked").attr("value");
    var userPwd = $("#gUsrPwd").val();

    var dataSales = $("body").data("dataSales");
    var JsonSales = {};
    var gSendSms = 0;
    var gSendFreeSms = 0;
    var gPrintList = 0;
    var cookieSendSms = 0;

    //Send Sms
    if ($("#gSendSms").prop("checked")) {
        gSendSms = 1;
    } else {
        gSendSms = 0;
    }
    cookieSendSms = gSendSms;

    //Send FreeSms
    if ($("#gSendFreeSms").prop("checked")) {
        gSendFreeSms = 1;
    } else {
        gSendFreeSms = 0;
    }

    if (gUserID.toString() == "0") {
        gSendSms = 0;
        gSendFreeSms = 0;
    }

    //Print Ticket
    if ($("#gPrintList").prop("checked")) {
        gPrintList = 1;
    } else {
        gPrintList = 0;
    }
    JsonSales['saleNo'] = $("#saleNo").val();
    JsonSales['guid'] = gUserID;
    JsonSales['gRealMoney'] = gRealMoney;
    JsonSales['gPayType'] = gPayType;
    JsonSales['gDate'] = gDateTime;
    JsonSales['isSendSMS'] = gSendSms;
    JsonSales['isSendFreeSms'] = gSendFreeSms;
    JsonSales['isPrintTicket'] = gPrintList;
    JsonSales['gList'] = dataSales;
    JsonSales['userPwd'] = userPwd;

    //Check CouponSms
    if ($("#CouponSms").prop("checked")) {
        JsonSales["CouponSms"] = 1;
    } else {
        JsonSales["CouponSms"] = 0;
    }

    var couponItem = $("#couponIdValue");
    if (parseInt(couponItem.val()) > 0) {
        JsonSales['CouponId'] = couponItem.val();
        JsonSales['CouponValue'] = couponItem.attr("money");
        JsonSales['CouponCode'] = couponItem.attr("code");
    }

    $("#salesCheckOut .mask,#salesCheckOut .infotip").show();
    $.dialog.list['salesBox'].button({ name: '确认（回车）', disabled: true }, { name: '取消', disabled: true });

    var ur = "/Sales/ajax/Action.aspx?type=saleadd";
    $.ajax({
        type: "POST",
        url: ur,
        data: JSON.stringify(JsonSales),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText);
        },
        success: function (data) {
            $("body").data("CheckVal", "0");
            $("#salesCheckOut .mask,#salesCheckOut .infotip").hide();
            $.dialog.list['salesBox'].button({ name: '确认（回车）', disabled: false }, { name: '取消', disabled: false });
            if (data == "404") {
                var str = "<div style='height:20px;line-height:20px;width:240px;font-family: 微软雅黑,宋体,Arial;font-size: 12px;display:block;background-color:#FFF1F1;border:1px #FEB0B0 solid;padding:5px;border-radius: 5px;'><img src='/css/warning.png' style='vertical-align:middle;margin-bottom:2px;'>&nbsp;由于未知原因出现错误,请尝试重新登录!</div><div style='height: 40px;line-height: 40px;margin-top: 10px;'>在线客服：<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=2390984097&amp;site=qq&amp;menu=yes'> <img border='0' src='http://wpa.qq.com/pa?p=2:2390984097:41 &amp;r=0.5182679426276702' alt='工作时间:10点至20点' title='QQ:2390984097 工作时间:10点至20点'></a>&nbsp;<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&amp;uin=2219854397&amp;site=qq&amp;menu=yes'> <img border='0' src='http://wpa.qq.com/pa?p=2:2219854397:41 &amp;r=0.5182679426276702' alt='工作时间:10点至20点' title='QQ:2219854397 工作时间:10点至20点'></a></div><div style='height: 30px;line-height: 30px;'>客服电话：<span style='font-size: 16px;color: #F50;font-weight: bold;'>400-600-6815</span></div><div style='height: 30px;line-height: 30px;color:#999'>如多次出现本提示,请联系客服协助处理!</div>"; $.dialog({ content: str, ok: true, lock: true, opacity: 0.5, padding: '20px 80px', title: '错误!' });
            } else {

                var oResult = $.parseJSON(data);
                if (oResult.okVal == 1) {
                    $.dialog.list['salesBox'].close();
                    showResult(oResult, gPrintList);

                    //Save Option
                    $.cookie('saleItem', gPrintList + "|" + cookieSendSms, { expires: 365 });
                }
                else if (oResult.okVal == 4) {
                    $.dialog.tips("会员储值余额不足!");
                }
                else if (oResult.okVal == 5) {
                    $.dialog.tips("会员剩余次数不足!");
                }
                else if (oResult.okVal == 10) {
                    $.dialog.tips("<span style='color: #D14;'>会员消费密码错误,请重新输入!</span>", 3);
                    $("#UsrPwdPanel").addClass("error");
                    $("#gUsrPwd").focus();
                }
                else {
                    $.dialog.tips("销售过程出现错误,请重试!");
                }
            }
        }
    });
}

function showResult(oResult, isPrint) {
    $("#UsrPwdPanel").hide();
    $("#gUsrPwd").val("");
    if (oResult.isRetail == 1) {
        $("#reTip").html("零售");
        $("#lingshoAddSmsBill").show();
    } else {
        $("#reTip").html("会员 [ " + $("#usrName").html() + " ]");
        $("#lingshoAddSmsBill").hide();
    }
    $("#reRealM").html("¥" + parseFloat(oResult.RealMoney).toFixed(2).toString()).attr("rel", parseFloat(oResult.RealMoney).toFixed(2).toString());
    switch (oResult.payType) {
        case 1:
            $("#reType").html("现金支付");
            $("#reZhaoling").show();
            break;
        case 2:
            $("#reType").html("刷卡支付");
            break;
        case 3:
            $("#reType").html("储值支付");
            break;
        case 4:
            $("#reType").html("按次支付");
            break;
        case 5:
            $("#reType").html("未付款");
            break;
    }
    var sList = "";
    sList += "<dt>现金：</dt><dd>￥" + oResult.cashMoney + "</dd>";
    if (oResult.cardMoney > 0) {
        sList += "<dt>刷卡：</dt><dd>￥" + oResult.cardMoney + "</dd>";
    }
    if (oResult.storeMoney > 0) {
        sList += "<dt>储值：</dt><dd>￥" + oResult.storeMoney + "</dd>";
    }
    if (oResult.storeTimes > 0) {
        sList += "<dt>按次：</dt><dd>￥" + oResult.storeTimes + "</dd>";
    }
    if (oResult.unpaidMoney > 0) {
        sList += "<dt>未付款：</dt><dd>￥" + oResult.unpaidMoney + "</dd>";
    }
    if (oResult.cardMoney > 0 || oResult.storeMoney > 0 || oResult.storeTimes > 0 || oResult.unpaidMoney > 0) {
        $("#saleResult #reList").html(sList).show();
    } else {
        $("#saleResult #reList").html("").hide();
    }

    $("#saleOkAddSmsBill").data("result", { "saleID":oResult.saleID, "isPrint": isPrint });
    $.dialog({
        id: 'salesResultBox',
        title: '支付概要',
        content: document.getElementById('saleResult'),
        lock: true,
        opacity: 0.5,
        icon: 'succeed',
        padding: 10,
        background: '#FFF',
        ok: function () {
            InitData();
            if (isPrint == 1) {
                //Print Ticket
                PrintSales(oResult.saleID);
            }
            getSaleNo();
        },
        okVal: '关闭',
        close: function () {
            InitData();
            $("#calculateZone").hide();
            $("#reZhaoling").hide();
            getSaleNo();
        }
    });
}

function CalculateMoney(item) {
    var value = $(item).val();
    value = $.trim(value.replace(/[^\d\.]/g, ''));
    $(item).val(value);
    if (value != "") {
        $("#cal_getMoney").text(parseFloat(parseFloat(value).toFixed(2) - parseFloat($("#reRealM").attr("rel")).toFixed(2)).toFixed(2));
    }
}


function InitData() {
    $("body").data("dataSales", {});

    $("#salesList li[id^='item']").remove();
    $("#salesList .sumLine .listItem").html("0");
    $("#salesList .sumLine .listNum").html("0");
    $("#salesList .sumLine .listSumMoney").html("¥0.00");
    $("#salesList ul .sumLine").hide();


    $("#FindGoods").val("");
    $("#FindGoods").attr("placeholder", "直接输入开始销售");
    $("#gName").val("");
    $("#gPrice").val("0");
    $("#gSpecific").val("");
    $("#gNumber").val("1");
    $("#gStock").html("无");
    $("#KuChunSpan").hide();
    $("#searchName").html("无");
    $("#searchTip").hide();
    $("#gOughtMoney").html("0");
    $("#gRealPrice").val("0");
    $("#gDiscount").val("10");
    $("#gRemark").val("");
    $("#chkIntegral").prop("checked", "");

    $("#goodsID").val("");

    //    $("#gMaxID").val("");
    //    $("#gMinID").val("");
    //    $("#gMaxName").val("");
    //    $("#gMinName").val("");
    //    $("#gMoney").val("");

    $("#saleResult").hide();
    HideUsrSelect(2);
    $("#FindGoods").focus();

    $("#newUserName").val("");
    $("#newUserPhone").val("");
    $("#newUserSix").val("1");
}

function clearNoNum(obj,num) {
    //先把非数字的都替换掉，除了数字和.
    obj.value = obj.value.replace(/[^\d.-]/g, "");
    //必须保证第一个为数字而不是.
    obj.value = obj.value.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    obj.value = obj.value.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    if (num == 999) {
        if (Number(obj.value) > 999) {
            obj.value = 999;
            $.dialog.tips("单商品单次销售不可超过999件！");
        }
    } else if (num == 999999) {
        if (Number(obj.value) > 999999) {
            obj.value = 999999;
            $.dialog.tips("这个商品太贵了，生意专家不敢卖！");
        }
    }
}




//小票打印
var LODOP; //声明为全局变量
function PrintSales(saleID) {
    try {
        LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
        if ((LODOP != null) && (typeof (LODOP.VERSION) != "undefined")) {
            var ur = "/PrintData/salesList.aspx?saleid=" + saleID;
            $.ajax({
                type: "POST",
                url: ur,
                async: false,
                success: function (msg) {
                    if (msg.length > 1) {
                        //LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
                        LODOP.PRINT_INIT("www_i200_cn");
                        LODOP.ADD_PRINT_HTM("2mm", "0mm", "48mm", "100%", msg);
                        LODOP.SET_PRINT_STYLE("HOrient", 2);
                        LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", 1); //打印后自动关闭预览窗口
                        //LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
                        //LODOP.SET_PRINT_PAGESIZE(3, "58mm","2mm", "");
                        //LODOP.PREVIEW();
                        //LODOP.PRINT();
                        try {
                            var flag = $.cookie('printset').split('|');

                            if (flag[2] != "") {
                                LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", flag[2]); //打印后自动关闭预览窗口
                            } else {
                                LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "100%");
                            }

                            if (flag[0] == "1") {
                                if (flag[1] == "1") {
                                    LODOP.PRINT();
                                } else {
                                    LODOP.PRINTA();
                                }
                            } else {
                                if (flag[1] == "1") {
                                    LODOP.SET_PREVIEW_WINDOW(1, 1, 1, 580, 500, "");
                                    LODOP.PREVIEW();
                                } else {
                                    LODOP.SET_PREVIEW_WINDOW(1, 1, 0, 580, 500, ""); //打印前弹出选择打印机的对话框
                                    LODOP.PREVIEW();
                                }
                            }
                        }
                        catch (ex) {
                            LODOP.SET_PREVIEW_WINDOW(1, 1, 0, 580, 500, ""); //打印前弹出选择打印机的对话框
                            LODOP.PREVIEW();
                        }

                    } else {
                        alert("数据读取失败，请重试！");
                    }
                }
            });
        }
    } catch (err) {
        window.parent.art.dialog.open("/PrintData/install.aspx?saleid=" + saleID, { title: '打印控件安装', lock: true, opacity: 0.5 });
    }
}


/*****************************/

function EmptyForm() {
    $("#FindGoods").val("");
    $("#FindGoods").attr("placeholder", "直接输入开始销售").focus();
    $("#gName").val("");
    $("#gPrice").val("0");
    $("#gSpecific").val("");
    $("#gStock").html("无");
    $("#KuChunSpan").hide();
    $("#gNumber").val("1");
    $("#goodsID").val("");
    refreshMoney();
    $("#gRemark").val("");
    $("#addNewGoodsData").hide();
    //$("#gDiscount").val(10);
}
function NewGoodsChecked(e) {
    if ($(e).attr("checked")) {
        if ($("#FindGoods").val().length > 0) {
            if ($(e).val() == "10") {
                $.dialog.tips("正在保存商品");
            }
        } else {
            $.dialog.tips("您还没有输入商品名称！");
            $(e).attr("checked", false);
        }
    }
}
function FindGoodsFocus(e) {
    if ($(e).val().length > 0) {
        $("#saleNameClose").show();
        $("#saleNameTipe").hide();
        $("#searchTip").hide();
        $("#FindGoods").attr("placeholder", "直接输入开始销售");
    } else {
        $("#saleNameClose").hide();
        $("#saleNameTipe").show();
    }
}
function FindGoodsBlur() {
    if ($("#saleNameClose").css("display") != "none") {
        setTimeout(function () {
            if (document.activeElement.id != "FindGoods") {
                $("#saleNameClose").hide();
                $("#saleNameTipe").show();
            }
        }, 2000);
    }
    if ($("#goodsID").val().length < 1 && $("#FindGoods").val().length > 0) {
        $("#addNewGoodsData").show();
        $("#searchTip").hide();
    } else {
        $("#addNewGoodsData").hide();
    }
}
function GoodsNameChange() {
    if ($("#savetogoodsCheck").val() != "0") {
        $("#savetogoodsCheck").val("0");
    }
}
function GoodsCheckeHide() {
    $("#savetogoodsCheck").attr("checked", false);
    $("#savetogoodsCheck").val("0");
    $("#addNewGoodsData").hide();
}
function EnterClick() {
    if ($("#saleNameTipe").attr("keyval") != "1") {
        if ($.dialog.list['salesResultBox'] != undefined) {
            $.dialog.list['salesResultBox'].close();
        }
        else if ($.dialog.list['salesBox'] != undefined) {
            CheckVal();
            return false;
        } else {
            var index = 0;
            var list = art.dialog.list;
            for (var i in list) {
                index = index + 1;
            };
            if (index < 2) {
                if ($("#FindGoods").val().length > 0) {
                    addGoodsItem();
                }
                else {
                    showCheckoutBox();
                }
            }
        }
    } else {
        $("#saleNameTipe").attr("keyval", "0")
    }
}
function keyUp(e) {
    var currKey = 0, e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    var evenId = e.target.id;
    if (currKey == 119) {
        addGoodsItem();
    }
    else if (currKey == 13) {
        if ($.dialog.list["saleOkSmsBillBox"] != undefined) {
            if (evenId == "newUserPhone") {
                if (VerificationPhone()) {
                    $("#newUserName").focus();
                } else {
                    alert("请输入正确的手机号");
                }
            } else if (evenId == "newUserName") {
                SaleOkSmsBillBoxClick();
            }
        } else {
            var keyfunct = $("#saleNameTipe").attr("keyfunct");
            if (keyfunct != undefined) {
                if (keyfunct == "1") {
                    addGoodsItem();
                } else if (keyfunct == "2") {
                    showCheckoutBox();
                } else if (keyfunct == "3") {
                    EnterClick();
                }
                else if (keyfunct == "0") {
                    if (evenId != "FindGoods" && evenId != "userID" && evenId != "gUsrPwd") {
                        $("#saleNameTipe").attr("keyval", "0")
                        EnterClick();
                    }
                }
            }
            $("#saleNameTipe").attr("keyfunct", "0");
        }
    } else if (currKey == 27) {
        EmptyForm();
    } else if (currKey == 120) {
        if ($.dialog.list['salesResultBox'] != undefined) {
            SetOddChange();
        }
    }
}
document.onkeyup = keyUp;


function setEnterKey(v) {
    var keyfunct = $("#saleNameTipe").attr("keyfunct");
    if (keyfunct == "0") {
        $("#saleNameTipe").attr("keyfunct", v);
    }
}

function DiscountOnLoad() {
    //userDiscountHidden   goodsDiscountHidden
    var html = '<option value="10">全额</option><option value="9">九折</option><option value="8">八折</option><option value="7">七折</option><option value="add">自定义</option>';
    $("#gDiscount").html(html);

    var goodsVal = $("#goodsDiscountHidden").val();
    var userVal = $("#userDiscountHidden").val();

    if (goodsVal != "-10") {
        if ($("#gDiscount option[value='" + goodsVal + "']").length > 0) {
            $("#gDiscount").val(goodsVal);
        } else {
            var str = "<option value='" + goodsVal + "'>" + goodsVal + "折</option>";
            $("#gDiscount option[value='add']").before(str);
            $("#gDiscount").val(goodsVal);
        }
    } else if (userVal != "-10") {
        if ($("#gDiscount option[value='" + userVal + "']").length > 0) {
            $("#gDiscount").val(userVal);
        } else {
            var str = "<option value='" + userVal + "'>" + userVal + "折</option>";
            $("#gDiscount option[value='add']").before(str);
            $("#gDiscount").val(userVal);
        }
    }
}



function GoodsQuantity(num, isService) {
    if (Number(num) == 0 && isService=="0") {
        $.dialog({ icon: 'face-sad', content: '此商品库存已为零！<br/>继续销售将出现负库存！', lock: true, opacity: .1, ok: true });
    }
    $("#gStock").html(num);
}

function SetOddChange() {
    $('#calculateZone').toggle();
    $('#cal_realMoney').val('').focus();
    $('#cal_getMoney').html('');
}

function CheckSmsBanlance() {
    var ur = "/sms/ajax/Action.aspx?type=balance";
    $.ajax({
        type: "POST",
        url: ur,
        cache: false,
        success: function (data) {
            if (parseInt(data) == 0) {
                $("#gSendSms").attr("disabled", "disabled").removeAttr("checked").parent().append("<span class='salesSmsTips' style='color:red;margin-left:5px;' title='您的短信余额为0,请充值!'>(短信余额不足)</span>");

                //FreeSmsShow
                //$("#gSendFreeSms").removeAttr("disabled").attr("checked", "checked").parent().parent().show();
                $("#gSendFreeSms").parent().parent().show();
                $('#freeSmsTips').qtip({
                    content: {
                        text: '<span style="color:red;font-weight:bold;">【因业务调整，免费电子账单功能暂停服务】</span><br/>1.短信余额不足可以使用免费短信账单<br/>2.免费短信账单模板不能自定义<br/>3.免费短信账单会附加生意专家自定义内容'
                    },
                    position: {
                        my: 'left center',
                        at: 'center center',
                        adjust: { x: 5 }
                    },
                    show: {
                        event: 'mousemove'
                    },
                    hide: {
                    //event: 'mouseout'
                }
            });
        } else {
            $("#gSendSms").removeAttr("disabled").parent().find(".salesSmsTips").remove();
                
            //FreeSmsHide
            $("#gSendFreeSms").attr("disabled", "disabled").removeAttr("checked").parent().parent().hide();
        }
    }
});
}


function saleOkSmsBillOnclick() {
    $.dialog.list["salesResultBox"].hide();
    $.dialog({
        id: 'saleOkSmsBillBox',
        title: '立即发出电子账单',
        content: document.getElementById('saleOkAddSmsBill'),
        lock: true,
        opacity: 0.5,
        icon: 'succeed',
        padding: 10,
        background: '#FFF',
        ok: function () {
            SaleOkSmsBillBoxClick();
            return false;
        },
        okVal: '发送',
        close: function () {
            if ($.dialog.list["salesResultBox"] != undefined) {
                $.dialog.list["salesResultBox"].show();
            }
        }
    });

    $("#newUserPhone").focus();
}
function SaleOkSmsBillBoxClick() {
    if (VerificationPhone()) {
        var json = $("#saleOkAddSmsBill").data("result");
        var userName = $("#newUserName").val();
        var userSix = $("#newUserSix").val();
        var userPhone = $("#newUserPhone").val();
        var data = { "uname": userName, "usix": userSix, "uphone": userPhone, "saleno": json.saleID };

        //newaccount
        $.doAjax("/Function/SalesNewUser.ashx?type=newaccount", data, function (msg) {
            //msg 返回结果 //1 无提示，2 新录入会员，11 电子账单发送成功，12，录入新会员 电子账单成功 
            if (msg == "2") {
                $.dialog.tips("恭喜您又多了一个会员！");
            } else if (msg == "11") {
                $.dialog.tips("电子账单发送成功！");
            } else if (msg == "12") {
                $.dialog.tips("电子账单发送成功！恭喜您又多了一个会员！");
            }
        }, false, false);

        $.dialog.list["saleOkSmsBillBox"].close();
        $.dialog.list["salesResultBox"].close();
        InitData();
        if (json.isPrint == 1) {
            //Print Ticket
            PrintSales(json.saleID);
        }
        getSaleNo();
    } else {
        alert("请输入正确的手机号");
    }
}
function VerificationPhone() {
    var obj = $.trim($("#newUserPhone").val());
    var reg = new RegExp('^(1[3587]{1}[\\d]{9})');
    return reg.test(obj);
}
function InputNumber(e) {
    var value = $(e).val();
    value = value.replace(/[^\d]/g, '');
    $(e).val(value);
}