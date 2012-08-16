String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

$.fn.getStyleObject = function(){
	var dom = this.get(0);
	var style;
	var returns = {};
	if(window.getComputedStyle){
		var camelize = function(a,b){
			return b.toUpperCase();
		}
		style = window.getComputedStyle(dom, null);
		for(var i = 0, l = style.length; i < l; i++){
			var prop = style[i];
			var camel = prop.replace(/\-([a-z])/, camelize);
			var val = style.getPropertyValue(prop);
			returns[camel] = val;
		}
		return returns;
	}
	if(dom.currentStyle){
		style = dom.currentStyle;
		for(var prop in style){
			returns[prop] = style[prop];
		}
		return returns;
	}
	if(style = dom.style){
		for(var prop in style){
			if(typeof style[prop] != 'function'){
				returns[prop] = style[prop];
			}
		}
		return returns;
	}
	return returns;
}


function setEndOfContenteditable(contentEditableElement)
{
	var range,selection;
	if(document.createRange) {//Firefox, Chrome, Opera, Safari, IE 9+
		range = document.createRange();//Create a range (a range is a like the selection but invisible)
		range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
		range.collapse(true);//collapse the range to the end point. false means collapse to end rather than the start
		selection = window.getSelection();//get the selection object (allows you to change selection)
		selection.removeAllRanges();//remove any selections already made
		selection.addRange(range);//make the range you have just created the visible selection
	} else if(document.selection) {//IE 8 and lower 
		range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
		range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
		range.collapse(true);//collapse the range to the end point. false means collapse to end rather than the start
		range.select();//Select the range (make it the visible selection
	}

}


function getOriginalWidthOfImg(img_element) {
	var t = new Image();
	t.src = (img_element.getAttribute ? img_element.getAttribute("src") : false) || img_element.src;
	return t.width;
}