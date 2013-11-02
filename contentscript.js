/**
*  @author HiwayChe
*  @date 2013/11/2
*/

var extension_current_href_index = -1;

$.fn.centerVertical = function(){
	var height = $(this).offset().top - screen.availHeight/2;
	window.scrollTo(0, height);
	return this;
}

$.fn.moveInScreen = function(){
	if($(this).offset().top >= screen.availHeight + window.scrollY - 100 || $(this).offset().top < window.scrollY){
		return $(this).centerVertical();
	}
	return this;
}

$(function(){
	
	$(document).keyup(function(){
		if(event.keyCode === 27){//esc
			$("input:text:first").blur();
			return ;
		}
		if(!$(event.target).prop("tagName")){
			return ;
		}
		var tagName = $(event.target).prop("tagName").toLowerCase();
		if('input' === tagName || 'select' === tagName || 'textarea' === tagName)
		{
			return;
		}
		if(event.keyCode == 74){// j -> down
		        extension_current_href_index += 1;
			navigate2Link();
		}

		else if(event.keyCode == 75){// k -> up
			extension_current_href_index -= 1;
			navigate2Link();
		}
		else if(event.keyCode == 73){// 'i' -> input	
			window.scrollTo(0, 0);
			extension_current_href_index = -1;
			$("input:text:first").focusin().select();
			event.preventDefault();
		}
	});

});

function navigate2Link(){
	if(extension_current_href_index < 0){
		extension_current_href_index = 0;
	}
	var searchResultSelector = getSearchResultSelector();
	if(!searchResultSelector){
		return ;	
	}
	if($(searchResultSelector).length - 1 < extension_current_href_index){
		extension_current_href_index -= 1;
		return ;
	}
	if(window.console){
		window.console.log(searchResultSelector+" "+extension_current_href_index);
	}
	$(searchResultSelector).find("a").removeClass("focused").end().eq(extension_current_href_index).find("a").first().addClass("focused").moveInScreen().focus();
}

function getSearchResultSelector(){
	if($("div#content_left").length > 0){//baidu has div#content_left
		return "div#content_left>table,div#content_left>div";
	}else if($("div#rcnt").length > 0){//google has div#rcnt
		return "ol#rso>li";
	}else{
		return undefined;
	}
}
