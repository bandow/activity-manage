var editModuleClass = ".page-module > .variable",
    moduleClass = ".wrapper > div",
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
	bannerListClass = '.banner-variable-list .list',
	tabContentClass='.tab-content-box > div',
	$iframeBody=$iframe.contents().find("body"),
	$iframeWrapper=$iframe.contents().find(".wrapper"),
	iframeLength=$iframe.length;

/**
*模块 数组 方法
*/
var moduleObject=[
 	{id:1,moduleFun:bannerSettings},
	{id:2,moduleFun:discount},
	{id:3,moduleFun:discountN},
	{id:4,moduleFun:secondKill},
	{id:5,moduleFun:secondKillN},
	{id:6,moduleFun:themeRoom},
	{id:7,moduleFun:themeRoomN},
	{id:8,moduleFun:oneImg},
	{id:9,moduleFun:twoImg},
	{id:10,moduleFun:footerColumn}		 
];
$(function(){
	$(".decorator-side-bar .list dd").on("click",function(){
		var dataId=parseInt($(this).attr('data-id'));

		runModuleFun(dataId);
		//获取warpper高度
		setHeight();
	});			
});		

//执行模块方法 生成模块
function runModuleFun(dataId,cloneModule){
	moduleObject.map(function(item){			
		if(item.id==dataId){
			var wrapperAddId=0;
			if(iframeLength==0){
				wrapperAddId=$(".wrapper > div");
			}else{
				wrapperAddId=$iframe.contents().find(".wrapper > div");
			}				
	        //传入模块顺序Id 和模块标识Id
			item.moduleFun(wrapperAddId.length,item.id,cloneModule);
			
		}
	});	
}

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
 * 复制对应编辑框
 **/
function copyEditBox(classString,dataId,copyFlag){
	console.log(dataId)
	console.log('isIframe:',isIframe());
	var classBoj=isIframe()==true ? parent.$(classString) : $(classString),
	    editObjFirst=$(classBoj)[0],
	    editObjLength=$(classBoj).length,
	    editObjAfter=$(classBoj).eq(editObjLength-1),
	    cloneEdit=null;

        console.log(prevEditObj);
	    if(copyFlag){
	    	//复制
	    	var prevEditObj = isIframe()==true ? parent.$(classString+'[data-id='+(dataId-1)+']') : $(classString+'[data-id='+(dataId-1)+']');
	    	cloneEdit=$(prevEditObj).clone();
	    	$(cloneEdit).hide();

	    }else{
	    	cloneEdit=$(editObjFirst).clone();
	    }

		$(cloneEdit).attr("data-id",dataId);
		editObjAfter.after(cloneEdit);


	//初始化选择颜色控件
    var picker=isIframe()==true ? parent.$(cloneEdit).find('.picker') : $(cloneEdit).find('.picker');
	picker.colpick({
		layout: 'hex',
		submit: 0,
		colorScheme: 'dark',
		onChange: function(hsb, hex, rgb, el, bySetColor) {
			$(el).css('border-color', '#' + hex);
			// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
			if (!bySetColor) $(el).val('#' + hex);
		}
	}).keyup(function() {
		$(this).colpickSetColor(this.value);
	});
	//日历
	var date=isIframe()==true ? parent.$(cloneEdit).find('.date') : $(cloneEdit).find('.date'),
		dateStart=date.find(".date-start"),
		dateEnd=date.find(".date-end");
	date.dateRangePicker({
		autoClose: true,
		format: 'MM-DD',
		separator: ' to ',
		language: 'cn',
		startOfWeek: 'sunday',
		startDate: new Date(),  //默认今天开始
        getValue: function()
		{
			if (dateStart.val() && dateEnd.val() )
				return dateStart.val() + ' to ' +dateEnd.val();
			else
				return '';
		},
		setValue: function(s,s1,s2)
		{
			dateStart.val(s1);
			dateEnd.val(s2);
		}
	});
}

/**
 * 获取iframe的元素
 **/
function getIfameSelectorObj(className){
	if($("#iframe").length==0){
		return $(className);
	}else{
		return $("#iframe").contents().find(className);
	}
}
/**
 * iframe获取父的元素
 **/
function getParentSelectorObj(className){
	if($("#iframe").length==0){
		return parent.$(className);
	}else{
		return $(className);
	}
}

/**
 * 判断是否是在iframe页面
 **/
function isIframe(){
	if($("#iframe").length==0){
		return true;
	}else{
		return false;
	}
}

/**
 * 添加模块代码
 **/
function addModuleWrapper(html){
    getIfameSelectorObj('.wrapper').append(html);
}

/**
 * 模块 数组 方法
 * @param {function} bannerSettings - banner设置
 * @param {function} discount - 立减/折扣活动
 * @param {function} secondKill - 一口价活动
 * @param {function} themeRoom - 主题房活动
 * @param {function} footerColumn - 底部栏
 */
function bannerSettings(dataId,moduleUniqueId,cloneModule) {
	//是否是复制
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
		cloneModule.find('.swiper-container'+(dataId-1)+'').addClass('swiper-container'+dataId+'').removeClass('swiper-container'+(dataId-1)+'');

	}else{
		var html = '<div class="banner-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(bannerCls,this)">编辑</a>' +
			'<a href="javascript:;" onclick="copy(this)">复制</a>' +
			'<a href="javascript:;" onclick="del(this)">删除</a>' +
			'</div>' +
			'<div class="swiper-container'+dataId+'">' +
			'<div class="swiper-wrapper">' +
			'</div>' +
			'<div class="swiper-pagination"></div>' +
			'</div>' +
			'<div class="rule-box"></div>' +
			'</div>';	
		addModuleWrapper(html);	
	}
	//复制对应编辑框
	copyEditBox(bannerCls,dataId,copyFlag);
}

function discount(dataId,moduleUniqueId,cloneModule) {
	//是否是复制
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var data = ["109", "168", "520", "1314"]
		var html = '<div class="discount-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(discountCls,this)">编辑</a>' +
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

		addModuleWrapper(html);
	}
	//复制对应编辑框
	copyEditBox(discountCls,dataId,copyFlag);
}

function discountN(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var data = ["109", "168", "520", "1314"]
		var html = '<div class="discountN-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(discountNCls,this)">编辑</a>' +
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
		addModuleWrapper(html);
	}
	//复制对应编辑框
	copyEditBox(discountNCls,dataId,copyFlag);
}

function secondKill(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var data = ["109", "168", "520", "131"]
		var html = '<div class="secondKill-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(secondKillCls,this)">编辑</a>' +
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
				'<p><em class="start-date">04.25</em>-<em class="end-date">04.27</em>可用</p>' +
				'<a class="btn" href="#"><span>立即预订</span></a>' +
				'</div>' +
				'</div>' +
				'</div>';
		}
		html += '</div>' +
			'<div class="more"><a href="#"><span>查看更多</span></a></div>' +
			'</div>' +
			'</div>';
		addModuleWrapper(html);
	}
	//复制对应编辑框
	copyEditBox(secondKillCls,dataId,copyFlag);
}

function secondKillN(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var data = ["109", "168", "520", "131"]
		var html = '<div class="secondKillN-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(secondKillNCls,this)">编辑</a>' +
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
				'<p><em class="start-date">04.25</em>-<em class="end-date">04.27</em>可用</p>' +
				'<a class="btn" href="#"><span>立即预订</span></a>' +
				'</div>' +
				'</div>' +
				'</div>';
		}
		html += '</div>' +
			'</div>' +
			'</div>';
		addModuleWrapper(html);		
	}
	//复制对应编辑框
	copyEditBox(secondKillNCls,dataId,copyFlag);
}

function themeRoom(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var data = ["109", "168", "520", "1314"]
		var html = '<div class="themeRoom-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(themeRoomCls,this)">编辑</a>' +
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
		addModuleWrapper(html);	
	}
	//复制对应编辑框
	copyEditBox(themeRoomCls,dataId,copyFlag);
}

function themeRoomN(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var data = ["109", "168", "520", "1314"]
		var html = '<div class="themeRoomN-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(themeRoomNCls,this)">编辑</a>' +
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
		addModuleWrapper(html);		
	}
	//复制对应编辑框
	copyEditBox(themeRoomNCls,dataId,copyFlag);
}

function oneImg(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var html = '<div class="one-img-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(oneImgCls,this)">编辑</a>' +
			'<a href="javascript:;" onclick="copy(this)">复制</a>' +
			'<a href="javascript:;" onclick="del(this)">删除</a>' +
			'</div>' +
			'<div class="one-img-container"></div>' +
			'</div>';
		addModuleWrapper(html);		
	}
	//复制对应编辑框
	copyEditBox(oneImgCls,dataId,copyFlag);
}

function twoImg(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var html = '<div class="two-img-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(twoImgCls,this)">编辑</a>' +
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
		addModuleWrapper(html);		
	}
	//复制对应编辑框
	copyEditBox(twoImgCls,dataId,copyFlag);
}

function footerColumn(dataId,moduleUniqueId,cloneModule) {
	var copyFlag=false;
	if(cloneModule){
		copyFlag=true;
		cloneModule.attr('data-id',dataId)
		//复制克隆
		getIfameSelectorObj('.wrapper').append(cloneModule);
	}else{
		var html = '<div class="footer-wrapper module-list" data-id='+dataId+' data-module-id='+moduleUniqueId+'>' +
			'<div class="exit-list">' +
			'<a href="javascript:;" onclick="shiftUp(this)">上移</a>' +
			'<a href="javascript:;" onclick="shiftDown(this)">下移</a>' +
			'<a href="javascript:;" onclick="edit(footerImgCls,this)">编辑</a>' +
			'<a href="javascript:;" onclick="copy(this)">复制</a>' +
			'<a href="javascript:;" onclick="del(this)">删除</a>' +
			'</div>' +
			'<div class="footer-container">' +
			'</div>' +
			'</div>';
		addModuleWrapper(html);		
	}
	//复制对应编辑框
	copyEditBox(footerImgCls,dataId,copyFlag);
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

	$(".decorator-right-content").on('click',titleObj, function() {
		var _this = $(this),
			index_this = $(titleObj).index(_this);

		_this.addClass('on').siblings().removeClass('on');
		$(contentObj).eq(index_this).show().siblings().hide();
	});
}

/**
 *banner设置 初始化 添加图片
 */
function addImgInit(num, textNum,moudleDataId) {
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
	if(moudleDataId){
		$(".variable[data-id='"+moudleDataId+"'] .banner-variable-list").append(html);
	}else{
		$(".banner-variable-list").append(html);	
	}
}

function addImg(obj) {
	var editParent=getEditParent(obj),
	    dataId=$(editParent).attr('data-id'),
	    $tabContent=$(editParent).find(tabContentClass),
	    $bannerList=$tabContent.eq(0).find(bannerListClass),
        index = $bannerList.length;

	addImgInit(index, index + 1,dataId);
}

//获取编辑框
function getEditParent(obj) {
	return $(obj).parents('.variable');
}

/**
 *banner设置 删除图片
 */
function deleteImg(obj) {
	var editParent=getEditParent(obj),
	    dataId=$(editParent).attr('data-id'),
	    $tabContent=$(editParent).find(tabContentClass);

	$(obj).parent().parent().remove();
	var $bannerList=$tabContent.eq(0).find(bannerListClass);
	$bannerList.map(function(index, item) {
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
	    $moduleParent = _this.parent().parent(),
	    $modulePrevParent=_this.parent().parent().prev(),
	    dataId=_this.parent().parent().attr("data-id"),
	    prevDataId= $modulePrevParent.attr("data-id"),
	    $editModule=parent.$(editModuleClass+'[data-id="'+dataId+'"]'),
	    $editPrevModule=parent.$(editModuleClass+'[data-id="'+prevDataId+'"]');

	$moduleParent.prev().before($moduleParent);
	//dada-id排序
	$moduleParent.attr("data-id",prevDataId);
	$modulePrevParent.attr("data-id",dataId);
	$editModule.attr("data-id",prevDataId);
	$editPrevModule.attr("data-id",dataId);
}

function shiftDown(obj) {
	var _this = $(obj)
	    $moduleParent = _this.parent().parent(),
	    $moduleNextParent=_this.parent().parent().next(),
	    dataId=_this.parent().parent().attr("data-id"),
	    nextDataId= $moduleNextParent.attr("data-id"),
	    $editModule=parent.$(editModuleClass+'[data-id="'+dataId+'"]'),
	    $editNextModule=parent.$(editModuleClass+'[data-id="'+nextDataId+'"]');

	$moduleParent.next().after($moduleParent);
	//dada-id排序
	$moduleParent.attr("data-id",nextDataId);
	$moduleNextParent.attr("data-id",dataId);
	$editModule.attr("data-id",nextDataId);
	$editNextModule.attr("data-id",dataId);
}

function edit(editClass,obj){
	var $moudleParent=$(obj).parent().parent(),
	    dataId=$moudleParent.attr('data-id'),
	    currentEditClass=editClass+'[data-id="'+dataId+'"]';
	parent.$(editModuleClass).hide();  
	parent.$(currentEditClass).show();

	positionFun($moudleParent,parent.$(currentEditClass));
}

function copy(obj) {
	var _this = $(obj),
		$moudleParent = _this.parent().parent(),
		moduleId= $moudleParent.attr('data-module-id'),
	    dataId=$moudleParent.attr('data-id'),
        cloneModule=$moudleParent.clone();//克隆方法

	runModuleFun(moduleId,$(cloneModule));
    setHeight();
}

function del(obj) {
	var _this = $(obj),
	    $moduleParent = _this.parent().parent(),
	    $wrapperParent=_this.parent().parent().parent(),
		wrapperHeight= $wrapperParent.height(),
		moduleHeight = _this.parent().parent().height(),
		$moudelDiv=$wrapperParent.find(">div"),
		$editModuleDiv=parent.$(editModuleClass),
		thisParentDataId=$moduleParent.attr("data-id");;

	//删掉本身div的高度 
	parent.$iframe.height(wrapperHeight - moduleHeight);
	_this.parent().parent().remove();
	parent.$(editModuleClass+'[data-id="'+thisParentDataId+'"]').remove();

	//dada-id排序
	$moudelDiv.map(function(index,el){
		var elDataId=parseInt($(el).attr("data-id"));
		if(elDataId > thisParentDataId){
			$(el).attr("data-id",elDataId-1);
		}
	});

	$editModuleDiv.map(function(index,el){
		var elDataId=parseInt($(el).attr("data-id"));
		if(elDataId > thisParentDataId){
			$(el).attr("data-id",elDataId-1);
		}
	});
}
/**
 *banner 模块 设置
 */
function saveBannerSetting(obj) {
	console.log(isIframe());

	var _this=$(obj),
	    editParent=$(obj).parents('.variable'),
	    dataId=$(editParent).attr("data-id"),
	    editParentDataId=$(obj).parents('.variable[data-id="'+dataId+'"]'),
	    $bannerScript = $iframe.contents().find('.moudle-banner-script[data-id="'+dataId+'"]'),
		$tabContent=$(editParentDataId).find(tabContentClass),
		$bannerTabCotent=$tabContent.eq(0),
		$currentBannerList=$bannerTabCotent.find(bannerListClass),
		dataId=$(editParent).attr('data-id'),
		$moudleWrapper=$iframe.contents().find('.module-list[data-id="'+dataId+'"]'),
		$swiperWrapper = $moudleWrapper.find(".swiper-container"+dataId+" .swiper-wrapper");

	var $ruleTabCotent=$tabContent.eq(1),
	    ruleImg = $ruleTabCotent.find(".add-img").html(),
		ruleTitle = $ruleTabCotent.find(".rule-tilte").val(),
		pickerColor = $ruleTabCotent.find(".picker").val(),
		ruleTextHtml = $ruleTabCotent.find(".newruleText0 .w-e-text").html(),
		$ruleBoxWrapper = $moudleWrapper.find(".rule-box"),
		$ruleScript = $iframe.contents().find('.rule-script');

    console.log($currentBannerList)
	var validateFlag = [].every.call($currentBannerList, function(item, index) {
		var inputValue = $(item).find('input[type="text"]').val(),
			addImgHtml = $(item).find('.add-img').html();
		return addImgHtml && inputValue && isURL(inputValue);
	});

	if (!validateFlag) {
		alert('图片和连接不能为空，且连接格式必须正确！');
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

	$swiperWrapper.html('');   //清空banner模版内容
	$ruleBoxWrapper.html('');  //清空banner模版规则内容

    //循环赋值banner img
	[].map.call($currentBannerList, function(item, index, array) {
		var addImgHtml = $(item).find('.add-img').html(),
			inputValue = $(item).find('input[type="text"]').val(),
			htmlSlide = '<div class="swiper-slide" data-id="' + index + '"><a href="' + inputValue + '">' + addImgHtml + '</a></div>';
		$swiperWrapper.append(htmlSlide);
	});
	var ruleHtml = '<div class="rule">' + ruleImg + '</div>';
	ruleHtml += '<div class="mask"></div>';
	ruleHtml += '<div class="rule-mask">';
	ruleHtml += '<h2 style="color:' + pickerColor + '">' + ruleTitle + '</h2>';
	ruleHtml += '<div class="rule-mask-content">';
	ruleHtml += '' + ruleTextHtml + '';
	ruleHtml += '</div>';
	ruleHtml += '<div class="rule-mask-close"><a href="javascript:;"></a></div>';
	ruleHtml += '</div>';
	$ruleBoxWrapper.append(ruleHtml);

	var swiperScriptCode = "var mySwiper = new Swiper ('.swiper-container"+dataId+"', {" +
		"loop: true," +
		"autopaly:{" +
		"stopOnLastSlice:true," +
		"}," +
		"pagination: {" +
		"el: '.swiper-pagination'," +
		"clickable:true," +
		"}," +
		"observer:true," +
		"});",
		ruleScriptCode='$("body").on("click",".rule",function(){' +
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
		'});',
		bannerscript ='<script class="rule-script">'+ swiperScriptCode + '</script>',
		    ruleScript='<script class="rule-script">' + ruleScriptCode + '</script>';

    
		if ($currentBannerList.length > 1) {
			if ($bannerScript.length == 0) {
				$iframeBody.append(bannerscript);
			}
			$swiperWrapper.find(".swiper-pagination").show();
		} else if ($currentBannerList.length == 1) {
			$swiperWrapper.find(".swiper-pagination").hide();
		}

		if ($ruleScript.length == 0) {
			$iframeBody.append(ruleScript);
		}
	setHeight();
};

/**
*6大列表 标题设置 专区设置 自定义样式 保存
*/
function saveActivitySetting(obj) {
	var _this=$(obj),
	    editParent=$(obj).parents('.variable'),
	    dataId=$(editParent).attr("data-id"),
	    editParentDataId=$(obj).parents('.variable[data-id="'+dataId+'"]'),
	    $tabContent1=editParentDataId.find(tabContentClass).eq(0),
	    $tabContent2=editParentDataId.find(tabContentClass).eq(1),
	    $tabContent4=editParentDataId.find(tabContentClass).eq(3),
	    $tabContent5=editParentDataId.find(tabContentClass).eq(4),
        $moudleWrapper=$iframe.contents().find('.module-list[data-id="'+dataId+'"]'),

		titleImg = $tabContent1.find(".upload-img-big .add-img").html(),
		ruleImg = $tabContent1.find(".upload-img .add-img").html(),
		ruleTitle = $tabContent1.find(".rule-title").val(),
		pickerColor = $tabContent1.find(".picker").val(),
		ruleTextHtml1 = $tabContent1.find(".newruleText1 .w-e-text").html(),
		ruleTextHtml2 = $tabContent1.find(".newruleText2 .w-e-text").html(),
		ruleTextHtml3 = $tabContent1.find(".newruleText3 .w-e-text").html(),
		ruleTextHtml4 = $tabContent1.find(".newruleText4 .w-e-text").html(),
		ruleTextHtml5 = $tabContent1.find(".newruleText5 .w-e-text").html(),
		ruleTextHtml6 = $tabContent1.find(".newruleText6 .w-e-text").html(),

		$ruleBoxWrapper = $moudleWrapper.find(".rule-box"),
		$titleScript = $moudleWrapper.find('.rule-script');

	//自定义样式设置保存
	var selectCityBtnColor = $tabContent5.find(".picker1").val(),
		selectCityFontColor = $tabContent5.find(".picker2").val(),
		priceColor = $tabContent5.find(".picker3").val(),
		hotelsNameColor = $tabContent5.find(".picker4").val(),
		bookingBtnColor =$tabContent5.find(".picker5").val(),
		hotelListBgColor = $tabContent5.find(".picker6").val(),
		moreSelectBtnColor = $tabContent5.find(".picker7").val(),
		moreSelectBtnBorderColor = $tabContent5.find(".picker8").val(),
		moreSelectFontColor = $tabContent5.find(".picker9").val();

	var allPickerColor = $tabContent5.find(".dvl-css-setting-colour");
	var colorFlag = [].every.call($(allPickerColor), function(item, index) {
		var inputValue = $(item).find('input[type="text"]').val();
		return inputValue;
	});


	$moudleWrapper.find(".title .title-img").html("");
	$ruleBoxWrapper.html("");

	// if (titleImg == "") {
	// 	alert("标题图片图片不能为空");
	// 	return;
	// }
	// if (ruleImg == "") {
	// 	alert("活动规则按钮不能为空");
	// 	return;
	// }
	// if (ruleTitle == "") {
	// 	alert("规则弹窗标题不能为空");
	// 	return;
	// }
	// if (pickerColor == "") {
	// 	alert("规则弹窗标题颜色不能为空");
	// 	return;
	// }
	// if(ruleTextHtml1){
	// 	if (ruleTextHtml1 == "<p><br></p>") {
	// 		alert("规则内容不能为空");
	// 		return;
	// 	}
	// }else if(ruleTextHtml2){
	// 	if (ruleTextHtml1 == "<p><br></p>") {
	// 		alert("规则内容不能为空");
	// 		return;
	// 	}
	// }else if(ruleTextHtml3){
	// 	if (ruleTextHtml1 == "<p><br></p>") {
	// 		alert("规则内容不能为空");
	// 		return;
	// 	}
	// }else if(ruleTextHtml4){
	// 	if (ruleTextHtml1 == "<p><br></p>") {
	// 		alert("规则内容不能为空");
	// 		return;
	// 	}
	// }else if(ruleTextHtml5){
	// 	if (ruleTextHtml1 == "<p><br></p>") {
	// 		alert("规则内容不能为空");
	// 		return;
	// 	}
	// }else if(ruleTextHtml6){
	// 	if (ruleTextHtml1 == "<p><br></p>") {
	// 		alert("规则内容不能为空");
	// 		return;
	// 	}
	// }

	// if (!colorFlag) {
	// 	alert('颜色不能为空');
	// 	return;
	// }
	

	var ruleHtml = '<div class="rule">' + ruleImg + '</div>';
	ruleHtml += '<div class="mask"></div>';
	ruleHtml += '<div class="rule-mask">';
	ruleHtml += '<h2 style="color:' + pickerColor + '">' + ruleTitle + '</h2>';
	ruleHtml += '<div class="rule-mask-content">';
	if(ruleTextHtml1){
		ruleHtml += '' + ruleTextHtml1 + '';
	}else if(ruleTextHtml2){
		ruleHtml += '' + ruleTextHtml2 + '';
	}else if(ruleTextHtml3){
		ruleHtml += '' + ruleTextHtml3 + '';
	}else if(ruleTextHtml4){
		ruleHtml += '' + ruleTextHtml4 + '';
	}else if(ruleTextHtml5){
		ruleHtml += '' + ruleTextHtml5 + '';
	}else if(ruleTextHtml6){
		ruleHtml += '' + ruleTextHtml6 + '';
	}
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

	$moudleWrapper.find(".title .title-img").append(titleImg);
	$moudleWrapper.find(".title .rule-box").append(ruleHtml);


	if ($titleScript.length == 0) {
		$iframe.contents().find("body").append(script);
	}


    //立减/折扣活动设置  专区设置保存
	var topImg = $moudleWrapper.find(".top"),
		seeMoreSrc = $tabContent2.find(".see-more-src").val(),
		hotelRuleImg = $tabContent2.find(".add-img").html();

	topImg.html("");

	$tabContent2.find(".select-city").each(function(index, el) {
		if ($(this).val() == '0') {
			$moudleWrapper.find(".city").show();
		} else {
			$moudleWrapper.find(".city").hide();
		}
	});

	$tabContent2.find(".show-city").each(function(index, el) {
		var showCityText = $(this).find("option:selected").text();
		$moudleWrapper.find(".city-content p").text(showCityText);
	});

	$tabContent2.find(".show-canton").each(function(index, el) {
		if ($(this).val() == '0') {
			$moudleWrapper.find(".img p").show();
		} else {
			$moudleWrapper.find(".img p").hide();
		}
	});
	topImg.append(hotelRuleImg);
	$moudleWrapper.find(".more a").attr("href", seeMoreSrc);

	//预定时间
	var dateStart=$tabContent4.find(".date-start").val(),
		dateEnd=$tabContent4.find(".date-end").val();

	$moudleWrapper.find(".start-date").text(dateStart.replace("-", "."));
	$moudleWrapper.find(".end-date").text(dateEnd.replace("-", "."));

	//自定义样式设置保存输出
	$moudleWrapper.find(".city").css({
		'background-color': selectCityBtnColor
	});
	$moudleWrapper.find(".city-content p").css({
		'color': selectCityFontColor
	});
	$moudleWrapper.find(".price").css({
		'color': priceColor
	});
	$moudleWrapper.find(".items h3").css({
		'color': hotelsNameColor
	});
	$moudleWrapper.find(".btn").css({
		'background-color': bookingBtnColor
	});
	$moudleWrapper.find(".content").css({
		'background-color': hotelListBgColor
	});
	$moudleWrapper.find(".more").css({
		'background-color': moreSelectBtnColor,
		'border': '1px solid' + moreSelectBtnBorderColor
	});
	$moudleWrapper.find(".more p").css({
		'color': moreSelectFontColor
	});

	setHeight();
}
/**
 * 一图模块设置
 **/
function oneImgSetting(obj) {
	var _this=$(obj),
	    editParent=$(obj).parents('.variable'),
	    dataId=$(editParent).attr("data-id"),
	    editParentDataId=$(obj).parents('.variable[data-id="'+dataId+'"]'),
        $moudleWrapper=$iframe.contents().find('.module-list[data-id="'+dataId+'"]'),

		$oneImgWrapper = $moudleWrapper.find(".one-img-container"),
		addImgHtml = editParentDataId.find('.add-img').html(),
		wxInputValue = editParentDataId.find('.wx-src[type="text"]').val(),
		appInputValue = editParentDataId.find('.app-scr[type="text"]').val(),

		wxHtmlImg = '<a href="' + wxInputValue + '">' + addImgHtml + '</a>',
		appHtmlImg = '<a href="' + appInputValue + '">' + addImgHtml + '</a>';

	$oneImgWrapper.html('');

	// 选择微信
	if (editParentDataId.find('.oivl-setting .wx').is(':checked')) {
		$oneImgWrapper.append(wxHtmlImg);
	}
	// 选择app
	if (editParentDataId.find('.oivl-setting .app').is(':checked')) {
		$oneImgWrapper.append(appHtmlImg);
	}

	setHeight();
}
/******
***二图模块设置
******/
function saveTwoSetting(obj){
	var _this=$(obj),
	    editParent=$(obj).parents('.variable'),
	    dataId=$(editParent).attr("data-id"),
	    editParentDataId=$(obj).parents('.variable[data-id="'+dataId+'"]'),
        $moudleWrapper=$iframe.contents().find('.module-list[data-id="'+dataId+'"]'),

        $tabContent1=editParentDataId.find(tabContentClass).eq(0),
	    $tabContent2=editParentDataId.find(tabContentClass).eq(1),

		ruleTitleImg = $tabContent1.find(".title-img .add-img").html(),
		ruleImg = $tabContent1.find(".activity-rule-img .add-img").html(),
		ruleTitle = $tabContent1.find(".two-img-rule-tilte").val(),
		pickerColor = $tabContent1.find(".picker").val(),
		ruleTextHtml = $tabContent1.find(".newruleText7 .w-e-text").html(),

		$ruleBoxWrapper = $moudleWrapper.find(".two-img-container .rule-box"),
		$titleImg = $moudleWrapper.find(".title-img");
		$ruleScript = $moudleWrapper.find('.rule-script');

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

	$moudleWrapper.find(".rule-box").append(ruleHtml);
	if ($ruleScript.length == 0) {
		$iframe.contents().find("body").append(script);
	}

	$moudleWrapper.find(".title-img").html(ruleTitleImg);

	//二图模块图片设置
	var $twoImgWrapperL = $moudleWrapper.find(".two-img-container .l"),
		$twoImgWrapperR = $moudleWrapper.find(".two-img-container .r"),
		addTwoImgHtmlL = $tabContent2.find('.one .add-img').html(),
		addTwoImgHtmlR = $tabContent2.find('.two .add-img').html(),
		wxInputValueL = $tabContent2.find('.wxl[type="text"]').val(),
		appInputValueL = $tabContent2.find('.appl[type="text"]').val(),
		wxInputValueR = $tabContent2.find('.wxr[type="text"]').val(),
		appInputValueR = $tabContent2.find('.appr[type="text"]').val();
	HtmlImgwxL = '<a href="' + wxInputValueL + '">' + addTwoImgHtmlL + '</a>';
	HtmlImgappL = '<a href="' + appInputValueL + '">' + addTwoImgHtmlL + '</a>';
	HtmlImgwxR = '<a href="' + wxInputValueR + '">' + addTwoImgHtmlR + '</a>';
	HtmlImgappR = '<a href="' + appInputValueR + '">' + addTwoImgHtmlR + '</a>';

	$twoImgWrapperL.html('');
	$twoImgWrapperR.html('');

	// 选择微信
	if ($tabContent2.find('.wx').is(':checked')) {
		$twoImgWrapperL.append(HtmlImgwxL);
		$twoImgWrapperR.append(HtmlImgwxR);
	}
	// 选择app
	if ($tabContent2.find('.app').is(':checked')) {
		$twoImgWrapperL.append(HtmlImgappL);
		$twoImgWrapperR.append(HtmlImgappR);
	}

	setHeight();
}

/**
 *底部栏模块设置
 **/
function footerSetting(obj) {
	var _this=$(obj),
	    editParent=$(obj).parents('.variable'),
	    dataId=$(editParent).attr("data-id"),
	    editParentDataId=$(obj).parents('.variable[data-id="'+dataId+'"]'),
        $moudleWrapper=$iframe.contents().find('.module-list[data-id="'+dataId+'"]'),
		$footerImgWrapper = $moudleWrapper.find(".footer-container "),
		addTwoImgHtmlL = editParentDataId.find('.add-img').html(),
		$footerScript = $moudleWrapper.find('.footer-script');

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
function positionFun(moudleObj,editObj){
	if(moudleObj[0]){
		var rect=moudleObj[0].getBoundingClientRect(); 
		editObj.css("margin-top",rect.top);		
	}
}