$(document).ready(function()
{
	if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) 
	{
		$('[data-toggle="popover"]').popover()	
		
		$('.col-lg-4').hover(function(){ $(this).popover('show');	}, function() {$(this).popover('hide');});
	}
});
