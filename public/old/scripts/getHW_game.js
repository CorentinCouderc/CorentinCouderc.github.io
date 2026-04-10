function getWindowHeight() {
	var windowHeight = 0;
	if (typeof(window.innerHeight) == "number") {
		windowHeight = window.innerHeight;
	} 
	return windowHeight;
}

var isTouchDevice = 'ontouchstart' in document.documentElement;

pageHeight = getWindowHeight();
headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
footerHeight = document.getElementsByTagName("footer")[0].offsetHeight;

if (isTouchDevice){
    result = pageHeight - headerHeight;
}
else{
    divPadding = parseFloat(window.getComputedStyle(document.getElementById("game"), null).getPropertyValue("padding-top"));
    result = pageHeight - footerHeight - headerHeight - 2*divPadding;
}
document.getElementById("game").style.minHeight = result + 'px';
