var terminal;

$(document).ready(function()
{
	$('[data-toggle="tooltip"]').tooltip();

	terminal = new Terminal()
	terminal.setWidth("100%");
	terminal.setHeight("230px");
	terminal.setTextSize(20);	
	$('#terminal').append(terminal.html);
	terminal.print('Enter some code above!');

	$('#btn-go').click(function()
	{
		terminal.clear();
		var start = performance.now();
		var output = interpret($('#txt-area').val(), $('#input').val());
		// var output = parse.interpret($('#txt-area').val(), $('#input').val());
		var end = performance.now();
		terminal.print(output);
		terminal.print('Time elapsed: ' + (end - start) + 'ms');		
	});		

	$('#hello-world').click(function()
	{
		$('#txt-area').val('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.');
		return false;
	});

	$('#fib-numbers').click(function()
	{
		$('#txt-area').val('+++++++++++>+>>>>++++++++++++++++++++++++++++++++++++++++++++>++++++++++++++++++++++++++++++++<<<<<<[>[>>>>>>+>+<<<<<<<-]>>>>>>>[<<<<<<<+>>>>>>>-]<[>++++++++++[-<-[>>+>+<<<-]>>>[<<<+>>>-]+<[>[-]<[-]]>[<<[>>>+<<<-]>>[-]]<<]>>>[>>+>+<<<-]>>>[<<<+>>>-]+<[>[-]<[-]]>[<<+>>[-]]<<<<<<<]>>>>>[++++++++++++++++++++++++++++++++++++++++++++++++.[-]]++++++++++<[->-<]>++++++++++++++++++++++++++++++++++++++++++++++++.[-]<<<<<<<<<<<<[>>>+>+<<<<-]>>>>[<<<<+>>>>-]<-[>>.>.<<<[-]]<<[>>+>+<<<-]>>>[<<<+>>>-]<<[<+>-]>[<+>-]<<<-]');
		return false;
	});

});
