$(document).ready(function(){ 
	$("#loading").hide();
	$("#main").fadeIn("fast");	

	window.addEventListener('scroll',function() {
		var scrollTop = $(window).scrollTop() ;

		var x=document.getElementById('slider');

		var main = document.getElementById('main').offsetHeight;
		var documentHeight = $(document).height();	

		slider.style.width = (($(window).scrollTop() / ($(document).height() - $(window).height()))*$(document).width()) + 'px';		

	}, false);

});
