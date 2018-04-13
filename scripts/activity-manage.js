var moduleVariable = $(".page-module>.variable"),
	bannerCls = '.banner-rule-variable',
	discountCls = '.decorator-variable',
	discountNCls = '.decoratorN-variable',
	secondKillCls = '.secondKill-variable',
	secondKillNCls = '.secondKillN-variable',
	themeRoomCls = '.themeRoom-variable',
	themeRoomNCls = '.themeRoomN-variable',
	oneImgCls = ".one-img-variable",
	twoImgCls = ".two-img-variable",
	footerImgCls = ".footer-variable",
	$iframe = $("#iframe"),
	bannerListClass = '.banner-variable-list .list';
/**
 * 上传图片浏览图片
 * @param {object} file - document对象
 * @param {number} maxSize - 图片最大值 B单位
 */
function preview(file, maxSize) {
	var maxFileSize;
	if (!maxSize) {
		maxFileSize = 1024 * 1024 * 2;
	} else {
		maxFileSize = maxSize;
	}
	if (file.files && file.files[0]) {
		var fileSize = file.files[0].size;
		if (fileSize > maxFileSize) {
			alert('上传的文件不能超过' + countFileSize(maxFileSize, 0));
			return;
		}
		var reader = new FileReader();
		reader.onload = function(evt) {
			// console.log(file.nextElementSibling);
			file.nextElementSibling.innerHTML = '<img src="' + evt.target.result + '" />';
			// $(file).parent().append('<img src="' + evt.target.result + '" />')
		}
		reader.readAsDataURL(file.files[0]);
	}
}

/**
 * 文件大小转换为MB GB KB格式
 * @param {number} size - 文件大小 B单位
 * @param {number} fixedNum - 小数点后面带几位数
 */
function countFileSize(size, fixedNum = 2) {
	var fsize = parseFloat(size, fixedNum),
		fileSizeString;
	if (fsize < 1024) {
		fileSizeString = fsize.toFixed(fixedNum) + "B";
	} else if (fsize < 1024 * 1024) {
		fileSizeString = (fsize / 1024).toFixed(fixedNum) + "KB";
	} else if (fsize < 1024 * 1024 * 1024) {
		fileSizeString = (fsize / 1024 / 1024).toFixed(fixedNum) + "MB";
	} else if (fsize < 1024 * 1024 * 1024 * 1024) {
		fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(fixedNum) + "GB";
	} else {
		fileSizeString = "0B";
	}
	return fileSizeString;
}
/**
*预览 preview
*/
function previewHtml(){
	window.open("http://10.44.61.30/activity-manage/views/web-index.html","_blank");
}
/**
 * 获取warpper高度
 **/
function setHeight() {
	var warpperHeight = parent.$("#iframe").contents().find(".wrapper").height();
	parent.$("#iframe").css('height', warpperHeight);
}

/**
 * 模块 数组 方法
 * @param {function} bannerSettings - banner设置
 * @param {function} discount - 立减/折扣活动
 * @param {function} secondKill - 一口价活动
 * @param {function} themeRoom - 主题房活动
 * @param {function} footerColumn - 底部栏
 */
function bannerSettings() {
	var html = '<div class="banner-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(bannerCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="swiper-container">' +
		'<div class="swiper-wrapper">' +
		'</div>' +
		'<div class="swiper-pagination"></div>' +
		'</div>' +
		'<div class="rule-box"></div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.banner-wrapper','.banner-rule-variable');
}

function discount() {
	var data = ["109", "168", "520", "1314"]
	var html = '<div class="discount-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(discountCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="title">' +
		'<div class="title-img"></div>' +
		'<div class="rule-box"></div>' +
		'</div>' +
		'<div class="discount-wrapper-content content">' +
		'<div class="city">' +
		'<div class="city-content">' +
		'<p>选择城市</p><i></i>' +
		'</div>' +
		'</div>' +
		'<div class="list">';
	for (var i = 0; data.length > i; i++) {
		html += '<div class="items">' +
			'<div class="img">' +
			'<div class="top"></div>' +
			'<img src="" alt="">' +
			'<p>白云区</p>' +
			'</div>' +
			'<h3>城市便捷广州市白云山店在大金钟那边</h3>' +
			'<div class="foot">' +
			'<p class="price">￥<span>' + data[i] + '</span></p>' +
			'<a class="btn" href="#"><span>立即预订</span></a>' +
			'</div>' +
			'</div>';
	}
	html += '</div>' +
		'<div class="more"><a href="#"><span>查看更多</span></a></div>' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);

	positionFun('.discount-wrapper','.decorator-variable');
}

function discountN() {
	var data = ["109", "168", "520", "1314"]
	var html = '<div class="discountN-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(discountNCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="title">' +
		'<div class="title-img"></div>' +
		'<div class="rule-box"></div>' +
		'</div>' +
		'<div class="discountN-wrapper-content content">' +
		'<div class="city">' +
		'<div class="city-content">' +
		'<p>选择城市</p><i></i>' +
		'</div>' +
		'</div>' +
		'<div class="list">';
	for (var i = 0; data.length > i; i++) {
		html += '<div class="items">' +
			'<div class="img">' +
			'<div class="top"></div>' +
			'<img src="" alt="">' +
			'<p>白云区</p>' +
			'</div>' +
			'<h3>城市便捷广州市白云山店在大金钟那边</h3>' +
			'<div class="foot">' +
			'<p class="price">￥<span>' + data[i] + '</span></p>' +
			'<a class="btn" href="#"><span>立即预订</span></a>' +
			'</div>' +
			'</div>';
	}
	html += '</div>' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.discountN-wrapper','.decoratorN-variable');
}

function secondKill() {
	var data = ["109", "168", "520", "131"]
	var html = '<div class="secondKill-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(secondKillCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="title">' +
		'<div class="title-img"></div>' +
		'<div class="rule-box"></div>' +
		'</div>' +
		'<div class="secondKill-wrapper-content content">' +
		'<div class="city">' +
		'<div class="city-content">' +
		'<p>选择城市</p><i></i>' +
		'</div>' +
		'</div>' +
		'<div class="list">';
	for (var i = 0; data.length > i; i++) {
		html += '<div class="items">' +
			'<div class="img">' +
			'<div class="top"></div>' +
			'<img src="" alt="">' +
			'<p>白云区</p>' +
			'</div>' +
			'<h3>城市便捷广州市白云山店在大金钟那边</h3>' +
			'<div class="foot">' +
			'<p class="price"><span>' + data[i] + '</span>/晚起</p>' +
			'<div class="booking">' +
			'<p>5.01-5.08可用</p>' +
			'<a class="btn" href="#"><span>立即预订</span></a>' +
			'</div>' +
			'</div>' +
			'</div>';
	}
	html += '</div>' +
		'<div class="more"><a href="#"><span>查看更多</span></a></div>' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.secondKill-wrapper','.secondKill-variable');
}

function secondKillN() {
	var data = ["109", "168", "520", "131"]
	var html = '<div class="secondKillN-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(secondKillNCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="title">' +
		'<div class="title-img"></div>' +
		'<div class="rule-box"></div>' +
		'</div>' +
		'<div class="secondKillN-wrapper-content content">' +
		'<div class="city">' +
		'<div class="city-content">' +
		'<p>选择城市</p><i></i>' +
		'</div>' +
		'</div>' +
		'<div class="list">';
	for (var i = 0; data.length > i; i++) {
		html += '<div class="items">' +
			'<div class="img">' +
			'<div class="top"></div>' +
			'<img src="" alt="">' +
			'<p>白云区</p>' +
			'</div>' +
			'<h3>城市便捷广州市白云山店在大金钟那边</h3>' +
			'<div class="foot">' +
			'<p class="price"><span>' + data[i] + '</span>/晚起</p>' +
			'<div class="booking">' +
			'<p>5.01-5.08可用</p>' +
			'<a class="btn" href="#"><span>立即预订</span></a>' +
			'</div>' +
			'</div>' +
			'</div>';
	}
	html += '</div>' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.secondKillN-wrapper','.secondKillN-variable');
}

function themeRoom() {
	var data = ["109", "168", "520", "1314"]
	var html = '<div class="themeRoom-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(themeRoomCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="title">' +
		'<div class="title-img"></div>' +
		'<div class="rule-box"></div>' +
		'</div>' +
		'<div class="themeRoom-wrapper-content content">' +
		'<div class="city">' +
		'<div class="city-content">' +
		'<p>选择城市</p><i></i>' +
		'</div>' +
		'</div>' +
		'<div class="list">';
	for (var i = 0; data.length > i; i++) {
		html += '<div class="items">' +
			'<div class="img">' +
			'<div class="top"></div>' +
			'<img src="" alt="">' +
			'<p>白云区</p>' +
			'</div>' +
			'<h3>城市便捷广州市白云山店在大金钟那边</h3>' +
			'<div class="foot">' +
			'<p class="price">￥<span>' + data[i] + '</span></p>' +
			'<a class="btn" href="#"><span>立即预订</span></a>' +
			'</div>' +
			'</div>';
	}
	html += '</div>' +
		'<div class="more"><a href="#"><span>查看更多</span></a></div>' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.themeRoom-wrapper','.themeRoom-variable');
}

function themeRoomN() {
	var data = ["109", "168", "520", "1314"]
	var html = '<div class="themeRoomN-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(themeRoomNCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="title">' +
		'<div class="title-img"></div>' +
		'<div class="rule-box"></div>' +
		'</div>' +
		'<div class="themeRoomN-wrapper-content content">' +
		'<div class="city">' +
		'<div class="city-content">' +
		'<p>选择城市</p><i></i>' +
		'</div>' +
		'</div>' +
		'<div class="list">';
	for (var i = 0; data.length > i; i++) {
		html += '<div class="items">' +
			'<div class="img">' +
			'<div class="top"></div>' +
			'<img src="" alt="">' +
			'<p>白云区</p>' +
			'</div>' +
			'<h3>城市便捷广州市白云山店在大金钟那边</h3>' +
			'<div class="foot">' +
			'<p class="price">￥<span>' + data[i] + '</span></p>' +
			'<a class="btn" href="#"><span>立即预订</span></a>' +
			'</div>' +
			'</div>';
	}
	html += '</div>' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.themeRoomN-wrapper','.themeRoomN-variable');
}

function oneImg() {
	var html = '<div class="one-img-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(oneImgCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="one-img-container">' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.one-img-wrapper','.one-img-variable');
}

function twoImg() {
	var html = '<div class="two-img-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(twoImgCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="two-img-container">' +
		'<div class="title">'+
		'<div class="title-img"></div>'+
		'<div class="rule-box"></div>'+
		'</div>'+
		'<div class="lr">'+
		'<div class="l"></div>' +
		'<div class="r"></div>' +
		'</div>' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.two-img-wrapper','.two-img-variable');
}

function footerColumn() {
	var html = '<div class="footer-wrapper">' +
		'<div class="exit-list">' +
		'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
		'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
		'<a href="javascript:;" onclick="exit(footerImgCls)">编辑</a>' +
		'<a href="javascript:;" onclick="copy(this)">复制</a>' +
		'<a href="javascript:;" onclick="del(this)">删除</a>' +
		'</div>' +
		'<div class="footer-container">' +
		'</div>' +
		'</div>';
	$iframe.contents().find(".wrapper").append(html);
	positionFun('.footer-wrapper','.footer-variable');
}

/**
 * 页面设置 保存 方法
 * @param {function} 
 */
function settingPreserve() {
	var settingRusult = {
		settingName: $(".page-name").find("input").val(),
		bgPicture: $(".background-picture").find(".add-img img").attr("src"),
		bgColour: $("#picker").val(),
		shareName: $(".share-name").find("input").val(),
		shareCopy: $(".share-copy").find("input").val(),
		shareImg: $(".share-picture").find(".add-img").html()
	}
	if (settingRusult.settingName == "") {
		alert("页面名称不能为空");
		return;
	}
	if (settingRusult.shareName == "") {
		alert("分享标题不能为空");
		return;
	}
	if (settingRusult.shareCopy == "") {
		alert("分享文案不能为空");
		return;
	}
	if (settingRusult.shareImg == "") {
		alert("分享小图不能为空");
		return;
	}
	// console.log("保存成功");
	// console.log(settingRusult);
	$iframe.contents().find("title").html(settingRusult.settingName);
	$iframe.contents().find(".wrapper").css({
		'background-image': 'url(' + settingRusult.bgPicture + ')',
		'background-size': '100% auto',
		'background-repeat': 'no-repeat'
	});
	$iframe.contents().find("body").css("background-color", settingRusult.bgColour);
	//获取warpper高度
	setHeight();
}
/*
 * tab切换
 * @param { object } titleObj - tab标题元素选择器
 * @param { object } contentObj - tab切换内容元素选择器
 */

function tabSwitch(titleObj, contentObj) {
	//初始化
	$(titleObj).first().addClass('on');
	$(contentObj).first().addClass('on');

	$(titleObj).on('click', function() {
		var _this = $(this),
			index_this = $(titleObj).index(_this);

		_this.addClass('on').siblings().removeClass('on');
		$(contentObj).eq(index_this).show().siblings().hide();
	});
}

/**
 *banner设置 初始化 添加图片
 */
function addImgInit(num, textNum) {
	var html = '';
	html += '<div class="list" data-id="' + num + '">';
	html += '<p><span>图片<i>' + textNum + '</i></span><span onclick="deleteImg(this)">删除</span></p>';
	html += '<div class="upload-img-big" style="margin:0 0 10px 0">';
	html += '<em></em><em></em>';
	html += '<input type="file" onchange="preview(this,1048576)" accept="image/gif, image/jpeg" >';
	html += '<div class="add-img"></div>';
	html += '</div>';
	html += '<p><span>图片<i>' + textNum + '</i>跳转链接</span></p>';
	html += '<input type="text">';
	html += '</div>';
	$(".banner-variable-list").append(html);
}

function addImg() {
	var index = $(bannerListClass).length;
	addImgInit(index, index + 1);
}

/**
 *banner设置 删除图片
 */
function deleteImg(obj) {
	var _this = $(obj);
	_this.parent().parent().remove();
	$(bannerListClass).map(function(index, item) {
		$(item).attr('data-id', index);
		$(item).find("i").text(index + 1);
	});
}

/*
 * 移入 上移 下移 编辑  复制  删除
 * @param { function } shiftUp - 上移
 * @param { function } shiftDown - 下移
 * @param { function } exit - 编辑
 * @param { function } copy - 复制
 * @param { function } del - 删除
 */

function shiftUp(obj) {
	var _this = $(obj),
	    prevParent=_this.parent().parent().prev(),
	    _parent = _this.parent().parent();
	_parent.prev().before(_parent);
	//dada-id排序
	var dataId=_this.parent().parent().attr("data-id"),
	    prevDataId= prevParent.attr("data-id");
	_parent.attr("data-id",prevDataId);
	prevParent.attr("data-id",dataId);
}

function shiftDown(obj) {
	var _this = $(obj);
	var _parent = _this.parent().parent(),
	    prevParent=_this.parent().parent().next();
	_parent.next().after(_parent);
	//dada-id排序
	var dataId=_this.parent().parent().attr("data-id"),
	    prevDataId= prevParent.attr("data-id");
	_parent.attr("data-id",prevDataId);
	prevParent.attr("data-id",dataId);
}

function exit(obj){
	parent.moduleVariable.hide();
	parent.$(obj).show();
}

function copy(obj) {
	var _this = $(obj),
		_parent = _this.parent().parent();
	_parent.before(_parent.clone());
	setHeight();
}

function del(obj) {
	var _this = $(obj),
		_warpper = _this.parent().parent().parent().height(),
		_parent = _this.parent().parent().height(),
		thisParent=_this.parent().parent();
		warpperParent=_this.parent().parent().parent(),
		$moudelDiv=warpperParent.find(">div");
	//删掉本身div的高度 
	parent.$iframe.height(_warpper - _parent);
	_this.parent().parent().remove();
	parent.moduleVariable.hide();
	//dada-id排序
	var thisParentDataId=thisParent.attr("data-id");
	$moudelDiv.map(function(index,el){
		var elDataId=parseInt($(el).attr("data-id"));
		if(elDataId > thisParentDataId){
			$(el).attr("data-id",elDataId-1);
		}
	});
}
/**
 *banner设置 保存
 */
function bannerSetting(obj) {

	var $swiperWrapper = $iframe.contents().find(".banner-wrapper .swiper-wrapper"),
		$bannerScript = $iframe.contents().find('.banner-script');
	var code = "var mySwiper = new Swiper ('.swiper-container', {" +
		"loop: true," +
		"autopaly:{" +
		"stopOnLastSlice:true," +
		"}," +
		"pagination: {" +
		"el: '.swiper-pagination'," +
		"clickable:true," +
		"}," +
		"observer:true," +
		"}) ";

	$swiperWrapper.html('');

	var validateFlag = [].every.call($(bannerListClass), function(item, index) {
		var inputValue = $(item).find('input[type="text"]').val(),
			addImgHtml = $(item).find('.add-img').html();
		return addImgHtml && inputValue && isURL(inputValue);
	});
	if (!validateFlag) {
		alert('图片和连接不能为空，且连接格式必须正确！');
		return;
	}

	[].map.call($(bannerListClass), function(item, index, array) {
		var addImgHtml = $(item).find('.add-img').html(),
			inputValue = $(item).find('input[type="text"]').val(),
			htmlSlide = '<div class="swiper-slide" data-id="' + index + '"><a href="' + inputValue + '">' + addImgHtml + '</a></div>';
		$swiperWrapper.append(htmlSlide);
		// console.log(array);
		// console.log(array.length);
	});


	if ($(bannerListClass).length > 1) {
		if ($bannerScript.length == 0) {
			addScript(code);
		}
		$iframe.contents().find(".swiper-pagination").show();
	} else if ($(bannerListClass).length == 1) {
		$iframe.contents().find(".swiper-pagination").hide();
	}

	setHeight();
};
/**
 *banner设置 保存
 */
function bannerRuleSetting() {
	var ruleVariable = $(".rule-variable"),
		ruleImg = ruleVariable.find(".add-img").html(),
		ruleTitle = ruleVariable.find(".rule-tilte").val(),
		pickerColor = ruleVariable.find("#picker1").val(),
		ruleTextHtml = ruleVariable.find("#ruleText .w-e-text").html(),
		$ruleBoxWrapper = $iframe.contents().find(".banner-wrapper .rule-box"),
		$ruleScript = $iframe.contents().find('.rule-script');

	$ruleBoxWrapper.html("");

	if (ruleImg == "") {
		alert("规则弹窗按钮图片不能为空");
		return;
	}
	if (ruleTitle == "") {
		alert("规则弹窗标题不能为空");
		return;
	}
	if (pickerColor == "") {
		alert("规则弹窗标题颜色");
		return;
	}
	if (ruleTextHtml == "<p><br></p>") {
		alert("规则内容不能为空");
		return;
	}

	var code = '$("body").on("click",".rule",function(){' +
		'$(this).next().show();' +
		'$(this).next().next().addClass("on");' +
		'});' +
		'$("body").on("click",".rule-mask-close",function(){' +
		'$(this).parent().prev().hide();' +
		'$(this).parent().removeClass("on");' +
		'});' +
		'$("body").on("click",".mask",function(){' +
		'$(this).hide();' +
		'$(this).prev().removeClass("on");' +
		'});';
	var script = ('<script class="rule-script">' + code + '</script>');

	var ruleHtml = '<div class="rule">' + ruleImg + '</div>';
	ruleHtml += '<div class="mask"></div>';
	ruleHtml += '<div class="rule-mask">';
	ruleHtml += '<h2 style="color:' + pickerColor + '">' + ruleTitle + '</h2>';
	ruleHtml += '<div class="rule-mask-content">';
	ruleHtml += '' + ruleTextHtml + '';
	ruleHtml += '</div>';
	ruleHtml += '<div class="rule-mask-close"><a href="javascript:;"></a></div>';
	ruleHtml += '</div>';

	$iframe.contents().find(".banner-wrapper .rule-box").append(ruleHtml);
	if ($ruleScript.length == 0) {
		$iframe.contents().find("body").append(script);
	}

	setHeight();
}
/**
 *all 立减/折扣活动设置 标题设置保存
 */
function discountTitleSetting(obj,iframeObj,number) {
	var _this=$(obj),
		dvlTitleSetting = _this.find(".dvl-title-setting"),
		titleImg = dvlTitleSetting.find(".upload-img-big .add-img").html(),
		ruleImg = dvlTitleSetting.find(".upload-img .add-img").html(),
		ruleTitle = dvlTitleSetting.find(".rule-title").val(),
		pickerColor = dvlTitleSetting.find("#newpicker"+number+"").val(),
		ruleTextHtml = dvlTitleSetting.find("#newruleText"+number+" .w-e-text").html(),
		$ruleBoxWrapper = $iframe.contents().find(""+iframeObj+" .rule-box"),
		$titleScript = $iframe.contents().find('.rule-script');

	$iframe.contents().find(""+iframeObj+" .title .title-img").html("");
	$ruleBoxWrapper.html("");

	if (titleImg == "") {
		alert("标题图片图片不能为空");
		return;
	}
	if (ruleImg == "") {
		alert("活动规则按钮不能为空");
		return;
	}
	if (ruleTitle == "") {
		alert("规则弹窗标题不能为空");
		return;
	}
	if (pickerColor == "") {
		alert("规则弹窗标题颜色不能为空");
		return;
	}
	if (ruleTextHtml == "<p><br></p>") {
		alert("规则内容不能为空");
		return;
	}

	var ruleHtml = '<div class="rule">' + ruleImg + '</div>';
	ruleHtml += '<div class="mask"></div>';
	ruleHtml += '<div class="rule-mask">';
	ruleHtml += '<h2 style="color:' + pickerColor + '">' + ruleTitle + '</h2>';
	ruleHtml += '<div class="rule-mask-content">';
	ruleHtml += '' + ruleTextHtml + '';
	ruleHtml += '</div>';
	ruleHtml += '<div class="rule-mask-close"><a href="javascript:;"></a></div>';
	ruleHtml += '</div>';

	var code = '$("body").on("click",".rule",function(){' +
		'$(this).next().show();' +
		'$(this).next().next().addClass("on");' +
		'});' +
		'$("body").on("click",".rule-mask-close",function(){' +
		'$(this).parent().prev().hide();' +
		'$(this).parent().removeClass("on");' +
		'});' +
		'$("body").on("click",".mask",function(){' +
		'$(this).hide();' +
		'$(this).prev().removeClass("on");' +
		'});';

	var script = ('<script class="title-script">' + code + '</script>');

	$iframe.contents().find(""+iframeObj+" .title .title-img").append(titleImg);
	$iframe.contents().find(""+iframeObj+" .title .rule-box").append(ruleHtml);

	if ($titleScript.length == 0) {
		$iframe.contents().find("body").append(script);
	}

	setHeight();
}
/**
 *all 立减/折扣活动设置  专区设置保存
 */
function discountPrefectureSetting(obj,iframeObj) {
	var topImg = $iframe.contents().find(""+iframeObj+" .top");
	var seeMoreSrc = $(""+obj+" .see-more-src").val();
	var hotelRuleImg = $(""+obj+" .dvl-prefecture-setting").find(".add-img").html();

	topImg.html("");

	// console.log($(".decoratorN-variable .see-more-src"));
	// console.log($(""+obj+" .see-more-src"));

	// if (seeMoreSrc == "") {
	// 	alert("查看更多链接不能为空");
	// } else 
	// if (!isURL(seeMoreSrc)) {
	// 	alert("查看更多链接格式不正确");
	// }

	$(""+obj+" .select-city").each(function(index, el) {
		if ($(this).val() == '0') {
			$iframe.contents().find(""+iframeObj+" .city").show();
		} else {
			$iframe.contents().find(""+iframeObj+" .city").hide();
		}
	});

	$(""+obj+" .show-city").each(function(index, el) {
		var showCityText = $(this).find("option:selected").text();
		$iframe.contents().find(""+iframeObj+" .city-content p").text(showCityText);
	});

	$(""+obj+" .show-canton").each(function(index, el) {
		if ($(this).val() == '0') {
			$iframe.contents().find(""+iframeObj+" .img p").show();
		} else {
			$iframe.contents().find(""+iframeObj+" .img p").hide();
		}
	});

	topImg.append(hotelRuleImg);
	$iframe.contents().find(""+iframeObj+" .more a").attr("href", seeMoreSrc);
}
/**
 *立减/折扣活动设置  活动码设置保存
 */
function discountActivityCodeSetting() {

}
/**
 *立减/折扣活动设置  预订设置保存
 */
function discountBookingSetting() {

}
/**
 *all 立减/折扣活动设置  自定义样式设置保存
 */
function discountColorSetting(obj,iframeObj,number) {
	var dvlColorSetting = $(""+obj+" .dvl-css-setting"),
		selectCityBtnColor = dvlColorSetting.find("#picker3"+number+"").val(),
		selectCityFontColor = dvlColorSetting.find("#picker4"+number+"").val(),
		priceColor = dvlColorSetting.find("#picker5"+number+"").val(),
		hotelsNameColor = dvlColorSetting.find("#picker6"+number+"").val(),
		bookingBtnColor = dvlColorSetting.find("#picker7"+number+"").val(),
		hotelListBgColor = dvlColorSetting.find("#picker8"+number+"").val(),
		moreSelectBtnColor = dvlColorSetting.find("#picker9"+number+"").val(),
		moreSelectBtnBorderColor = dvlColorSetting.find("#picker10"+number+"").val(),
		moreSelectFontColor = dvlColorSetting.find("#picker11"+number+"").val();

	var allPickerColor = $(""+obj+" .dvl-css-setting .dvl-css-setting-colour");
	var colorFlag = [].every.call($(allPickerColor), function(item, index) {
		var inputValue = $(item).find('input[type="text"]').val();
		return inputValue;
	});
	if (!colorFlag) {
		alert('颜色不能为空');
		return;
	}

	$iframe.contents().find(""+iframeObj+" .city").css({
		'background-color': selectCityBtnColor
	});
	$iframe.contents().find(""+iframeObj+" .city-content p").css({
		'color': selectCityFontColor
	});
	$iframe.contents().find(""+iframeObj+" .price").css({
		'color': priceColor
	});
	$iframe.contents().find(""+iframeObj+" .items h3").css({
		'color': hotelsNameColor
	});
	$iframe.contents().find(""+iframeObj+" .btn").css({
		'background-color': bookingBtnColor
	});
	$iframe.contents().find(""+iframeObj+" .content").css({
		'background-color': hotelListBgColor
	});
	$iframe.contents().find(""+iframeObj+" .more").css({
		'background-color': moreSelectBtnColor,
		'border': '1px solid' + moreSelectBtnBorderColor
	});
	$iframe.contents().find(""+iframeObj+" .more p").css({
		'color': moreSelectFontColor
	});
}
/**
 * 一图模块设置
 **/
function oneImgSetting() {
	var $oneImgWrapper = $iframe.contents().find(".one-img-wrapper .one-img-container"),
		addImgHtml = $(".one-img-variable-list").find('.add-img').html(),
		wxInputValue = $(".one-img-variable-list").find('.wx-src[type="text"]').val(),
		appInputValue = $(".one-img-variable-list").find('.app-scr[type="text"]').val(),
		wxHtmlImg = '<a href="' + wxInputValue + '">' + addImgHtml + '</a>';
	appHtmlImg = '<a href="' + appInputValue + '">' + addImgHtml + '</a>';

	$oneImgWrapper.html('');
	// 选择微信
	if ($('.one-img-variable .oivl-setting .wx').is(':checked')) {
		$oneImgWrapper.append(wxHtmlImg);
	}
	// 选择app
	if ($('.one-img-variable .oivl-setting .app').is(':checked')) {
		$oneImgWrapper.append(appHtmlImg);
	}

	setHeight();
}
/******
***二图标题设置
******/
function twoTitleSetting(){
	var ruleVariable = $(".rule-variable"),
		ruleTitleImg = ruleVariable.find(".title-img .add-img").html(),
		ruleImg = ruleVariable.find(".activity-rule-img .add-img").html(),
		ruleTitle = ruleVariable.find(".two-img-rule-tilte").val(),
		pickerColor = ruleVariable.find("#picker12").val(),
		ruleTextHtml = ruleVariable.find("#ruleText3 .w-e-text").html(),
		$ruleBoxWrapper = $iframe.contents().find(".two-img-container .rule-box"),
		$titleImg = $iframe.contents().find(".two-img-wrapper .title-img");
		$ruleScript = $iframe.contents().find('.rule-script');

	$titleImg .html("");
	$ruleBoxWrapper.html("");

	if (ruleTitleImg == "") {
		alert("上传标题图片不能为空");
		return;
	}
	if (ruleImg == "") {
		alert("规则弹窗按钮图片不能为空");
		return;
	}
	if (ruleTitle == "") {
		alert("规则弹窗标题不能为空");
		return;
	}
	if (pickerColor == "") {
		alert("规则弹窗标题颜色");
		return;
	}
	if (ruleTextHtml == "<p><br></p>") {
		alert("规则内容不能为空");
		return;
	}

	var code = '$("body").on("click",".rule",function(){' +
		'$(this).next().show();' +
		'$(this).next().next().addClass("on");' +
		'});' +
		'$("body").on("click",".rule-mask-close",function(){' +
		'$(this).parent().prev().hide();' +
		'$(this).parent().removeClass("on");' +
		'});' +
		'$("body").on("click",".mask",function(){' +
		'$(this).hide();' +
		'$(this).prev().removeClass("on");' +
		'});';
	var script = ('<script class="rule-script">' + code + '</script>');

	var ruleHtml = '<div class="rule">' + ruleImg + '</div>';
	ruleHtml += '<div class="mask"></div>';
	ruleHtml += '<div class="rule-mask">';
	ruleHtml += '<h2 style="color:' + pickerColor + '">' + ruleTitle + '</h2>';
	ruleHtml += '<div class="rule-mask-content">';
	ruleHtml += '' + ruleTextHtml + '';
	ruleHtml += '</div>';
	ruleHtml += '<div class="rule-mask-close"><a href="javascript:;"></a></div>';
	ruleHtml += '</div>';

	$iframe.contents().find(".two-img-wrapper .rule-box").append(ruleHtml);
	if ($ruleScript.length == 0) {
		$iframe.contents().find("body").append(script);
	}

	$iframe.contents().find(".two-img-wrapper .title-img").html(ruleTitleImg);

	setHeight();
}
/**
 *二图模块图片设置
 **/
function twoImgSetting() {
	var $twoImgWrapperL = $iframe.contents().find(".two-img-wrapper .two-img-container .l"),
		$twoImgWrapperR = $iframe.contents().find(".two-img-wrapper .two-img-container .r"),
		addTwoImgHtmlL = $(".two-img-variable-list").find('.one .add-img').html(),
		addTwoImgHtmlR = $(".two-img-variable-list").find('.two .add-img').html(),
		wxInputValueL = $(".two-img-variable-list").find('.wxl[type="text"]').val(),
		appInputValueL = $(".two-img-variable-list").find('.appl[type="text"]').val(),
		wxInputValueR = $(".two-img-variable-list").find('.wxr[type="text"]').val(),
		appInputValueR = $(".two-img-variable-list").find('.appr[type="text"]').val();
	HtmlImgwxL = '<a href="' + wxInputValueL + '">' + addTwoImgHtmlL + '</a>';
	HtmlImgappL = '<a href="' + appInputValueL + '">' + addTwoImgHtmlL + '</a>';
	HtmlImgwxR = '<a href="' + wxInputValueR + '">' + addTwoImgHtmlR + '</a>';
	HtmlImgappR = '<a href="' + appInputValueR + '">' + addTwoImgHtmlR + '</a>';

	$twoImgWrapperL.html('');
	$twoImgWrapperR.html('');

	// 选择微信
	if ($('.two-img-variable-list .oivl-setting .wx').is(':checked')) {
		$twoImgWrapperL.append(HtmlImgwxL);
		$twoImgWrapperR.append(HtmlImgwxR);
	}
	// 选择app
	if ($('.two-img-variable-list .oivl-setting .app').is(':checked')) {
		$twoImgWrapperL.append(HtmlImgappL);
		$twoImgWrapperR.append(HtmlImgappR);
	}

	setHeight();
}
/**
 *底部栏设置图片设置
 **/
function footerSetting() {
	var $footerImgWrapper = $iframe.contents().find(".footer-wrapper .footer-container "),
		addTwoImgHtmlL = $(".footer-variable ").find('.add-img').html(),
		$footerScript = $iframe.contents().find('.footer-script');
	HtmlImg = addTwoImgHtmlL;

	var code = '$("body").on("click",".footer-container",function(){' +
		'$("html,body").animate({scrollTop: "0px"}, 800);' +
	'})';
	var script = ('<script class="footer-script">' + code + '</script>');

	$footerImgWrapper.html('');
	$footerImgWrapper.append(HtmlImg);

	if ($footerScript.length == 0) {
		$iframe.contents().find("body").append(script);
	}

	setHeight();

	
}
/**
 *动态添加代码方法
 */
function addScript(code) {
	var script = ('<script class="banner-script">' + code + '</script>');
	$iframe.contents().find("body").append(script);
}
/**
 *js验证url的格式合法性
 */
function isURL(str_url) { // 验证url
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)" +
		"?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
		+
		"(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
		+
		"|" // 允许IP和DOMAIN（域名）
		+
		"([0-9a-z_!~*'()-]+\.)*" // 域名- www.
		+
		"([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
		+
		"[a-z]{2,6})" // first level domain- .com or .museum
		+
		"(:[0-9]{1,4})?" // 端口- :80
		+
		"((/?)|" // a slash isn't required if there is no file name
		+
		"(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp(strRegex);
	return re.test(str_url);
}
/**
 *js定位方法
*/
function positionFun(obj,subObj){
	var _subThis=$(subObj),
		_thisIframe=$iframe.contents().find(obj)[0];
	if(_thisIframe){
		var rect=_thisIframe.getBoundingClientRect();
		_subThis.css("margin-top",rect.top);
	}
}