var commands;
var byteCells;
var dataPointer;

commands = new Array(8);
commands.incrementDataPointer = function() {++dataPointer;}
commands.decrementDataPointer = function() {--dataPointer;}
commands.incrementByte = function() {++byteCells[dataPointer];}
commands.decrementByte = function() {--byteCells[dataPointer];}
commands.outputByte = function(output) {output += String.fromCharCode(byteCells[dataPointer]); return output;}
commands.acceptInput = function(input) {byteCells[dataPointer] = input.shift(); return input;}

commands.jumpForward = function(code,instructionPointer,bracketStack) 
{
	if(bracketStack.length == 0)
		return instructionPointer;

	++instructionPointer;

	if(code[instructionPointer] == ']')
		bracketStack.pop();
	else if(code[instructionPointer] == '[')
		bracketStack.push(instructionPointer);

	return commands.jumpForward(code, instructionPointer, bracketStack);
}

commands.jumpBackward = function(code,instructionPointer, bracketStack)
{
	if(bracketStack.length == 0)
		return instructionPointer;

	--instructionPointer;

	if(code[instructionPointer] == ']')
		bracketStack.push(instructionPointer);
	else if(code[instructionPointer] == '[')
		bracketStack.pop();

	return commands.jumpBackward(code, instructionPointer, bracketStack);
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

function processLine(code,input,instructionPointer,output)
{
	if(instructionPointer >= 511)
		return output;

	if(code[instructionPointer] == '>')
	{
		commands.incrementDataPointer();
	}
	else if(code[instructionPointer] == '<')
	{
		commands.decrementDataPointer();
	}
	else if(code[instructionPointer] == '+')
	{
		commands.incrementByte();
	}
	else if(code[instructionPointer] == '-')
	{
		commands.decrementByte();
	}
	else if(code[instructionPointer] == '.')
	{
		output = commands.outputByte(output);
	}
	else if(code[instructionPointer] == ',')
	{
		input = commands.acceptInput(input);
	}
	else if(code[instructionPointer] == '[' && byteCells[dataPointer] == 0)
	{
		var bracketStack = [];
		bracketStack.push(instructionPointer);		
		instructionPointer = commands.jumpForward(code,instructionPointer, bracketStack);
	}
	else if(code[instructionPointer] == ']' && byteCells[dataPointer] != 0)
	{
		var bracketStack = [];
		bracketStack.push(instructionPointer);		
		instructionPointer = commands.jumpBackward(code,instructionPointer, bracketStack);
	}
	// else 
	// 	return 'Invalid input: ' + code[instructionPointer];

	++instructionPointer;

	return processLine(code, input, instructionPointer, output);
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
	return processLine(code, input, 0, output);
}
