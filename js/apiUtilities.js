function getTwitterStats(callback)
{
	$.ajax({
		type: 'GET',
		url: 'http://ec2-54-171-72-220.eu-west-1.compute.amazonaws.com:7070/twitter',
		context: document.body,
		success: function(result) 
		{						
			callback(result);
			return result;
		},
		error: function(result)
		{
			console.log('failed');
			console.log(result.responseText);
		}
	});	
}

function getGithubStats(callback)
{
	$.ajax({
		type: 'GET',
		url: 'http://ec2-54-171-72-220.eu-west-1.compute.amazonaws.com:7070/github',
		context: document.body,
		success: function(result) 
		{						
			callback(result);
			return result;
		},
		error: function(result)
		{
			console.log('failed');
			console.log(result.responseText);
		}
	});	
}
