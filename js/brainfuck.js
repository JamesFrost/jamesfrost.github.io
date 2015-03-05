var commands;
var byteCells;
var dataPointer;
var output;

commands = new Array(8);
commands.incrementDataPointer = function() {++dataPointer;}
commands.decrementDataPointer = function() {--dataPointer;}
commands.incrementByte = function() {++byteCells[dataPointer];}
commands.decrementByte = function() {--byteCells[dataPointer];}
commands.outputByte = function() {output += String.fromCharCode(byteCells[dataPointer]);}
commands.acceptInput = function(input) {byteCells[dataPointer] = input.shift(); return input;}

commands.jumpForward = function(code,instructionPointer) 
{
	if(byteCells[dataPointer] == 0)
	{
		var bracketQueue = 1; 
		while(bracketQueue != 0)
		{
			console.log('jumpForward');
			++instructionPointer;

			if(code[instructionPointer] == ']') {
				--bracketQueue;
				continue;
			}
			if(code[instructionPointer] == '[') {
				++bracketQueue;
				continue;
			}
		}
	}
	// instructionPointer++;
	return instructionPointer;
}

commands.jumpBackward = function(code,instructionPointer)
{
	if(byteCells[dataPointer] != 0)
	{
		var bracketQueue = 1;
		while(bracketQueue != 0)
		{
			console.log('jumping backward');
			// console.log('bracketQueue: ' + bracketQueue);
			--instructionPointer;

			if(code[instructionPointer] == '[') 
			{
				--bracketQueue;
				continue;
			}
			if(code[instructionPointer] == ']') 
			{
				++bracketQueue;
				continue;
			}
		}
	}
	// instructionPointer++;
	// console.log('returning jumpBackward');
	return instructionPointer;
}

function getNewByteCells()
{
	var byteCells = new Array(30000);
	for(var i = 0; i < byteCells.length; ++i)
	{
		byteCells[i] = 0;
	}
	return byteCells;
}

/*
>	increment the data pointer (to point to the next cell to the right).
<	decrement the data pointer (to point to the next cell to the left).
+	increment (increase by one) the byte at the data pointer.
-	decrement (decrease by one) the byte at the data pointer.
.	output the byte at the data pointer.
,	accept one byte of input, storing its value in the byte at the data pointer.
[	if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
]	if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.*/

function interpret(brainfuck,input)
{
	byteCells = getNewByteCells();
	dataPointer = 0;
	output = "";

	var code = brainfuck.trim().replace(/ /g, "").replace(/(\r\n|\n|\r)/gm,"").split("");

	for(var instructionPointer = 0; instructionPointer < code.length; ++instructionPointer)
	{
		if(code[instructionPointer] == '>')
		{
			commands.incrementDataPointer();
			continue;
		}
		if(code[instructionPointer] == '<')
		{
			commands.decrementDataPointer();
			continue;
		}
		if(code[instructionPointer] == '+')
		{
			commands.incrementByte();
			continue;
		}
		if(code[instructionPointer] == '-')
		{
			commands.decrementByte();
			continue;
		}
		if(code[instructionPointer] == '.')
		{
			commands.outputByte();
			continue;
		}
		if(code[instructionPointer] == ',')
		{
			input = commands.acceptInput(input);
			continue;
		}
		if(code[instructionPointer] == '[')
		{
			// instructionPointer = commands.jumpForward(code,instructionPointer);
			if(byteCells[dataPointer] == 0)
			{
				var bracketQueue = 1; 
				while(bracketQueue != 0)
				{
					console.log('jumpForward');
					++instructionPointer;

					if(code[instructionPointer] == ']') {
						--bracketQueue;
						continue;
					}
					if(code[instructionPointer] == '[') {
						++bracketQueue;
						continue;
					}
				}
			}
			continue;
		}
		if(code[instructionPointer] == ']')
		{
			// instructionPointer = commands.jumpBackward(code,instructionPointer);
			if(byteCells[dataPointer] != 0)
			{
				var bracketQueue = 1;
				while(bracketQueue != 0)
				{
					console.log('jumping backward');
			// console.log('bracketQueue: ' + bracketQueue);
			--instructionPointer;

			if(code[instructionPointer] == '[') 
			{
				--bracketQueue;
				continue;
			}
			if(code[instructionPointer] == ']') 
			{
				++bracketQueue;
				continue;
			}
		}
	}
	continue;
}
return 'Invalid input: ' + code[instructionPointer];
}
return output;
}
