$(document).ready(function(){ 
	$("#loading").hide();
	$("#main").fadeIn("fast");	
});

$(document).on("click", "a", function () {

	var newUrl = $(this).attr("href");

	if (!newUrl || newUrl[0] === "#") {
		location.hash = newUrl;
		return;
	}

	$("#main").fadeOut("fast", function () {
		location = newUrl;
	});

	return false;
});
