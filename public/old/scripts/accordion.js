var acc = document.getElementsByClassName("accordion");
var i;

// set accordion display for each button
for (i = 0; i< acc.length; i++) {
	acc[i].onclick = function () {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight){
			panel.style.maxHeight = null;
			this.className = "accordion";	
		}
		else {
			panel.style.maxHeight = panel.scrollHeight + "px";
			this.className += " active";
		}
	}
}