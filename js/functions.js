$(document).ready(function(){ 
	$("#loading").hide();
	$("#main").fadeIn("fast");	

	window.addEventListener('scroll',sliderMove, false);

});

$(document).on("click", "a [target!='_blank']", function () {

	var newUrl = $(this).attr("href");

	if (!newUrl || newUrl[0] === "#") {
		// location.hash = newUrl;
		return;
	}

	$("#main").fadeOut("fast", function () {
		location = newUrl;
	});

	return false;
});

function sliderMove() {
	var scrollTop = $(window).scrollTop() ;

	var x=document.getElementById('slider');

	var main = document.getElementById('main').offsetHeight;
	var documentHeight = $(document).height();	

	slider.style.width = (($(window).scrollTop() / ($(document).height() - $(window).height()))*$(document).width()) + 'px';			

}
