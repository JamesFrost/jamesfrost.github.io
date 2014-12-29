$(document).ready(function(){    
	$("#main").fadeIn("fast");
});

$(window).unload(function () {
	$("main").fadeOut(3000);
});