$(document).ready(function(){ 
	$("#main").fadeIn("fast");
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
