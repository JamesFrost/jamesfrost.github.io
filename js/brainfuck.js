var commands;
var byteCells;
var dataPointer;

commands = new Array(8);
commands.incrementDataPointer = function() {++dataPointer;}
commands.decrementDataPointer = function() {--dataPointer;}
commands.incrementByte = function() {++byteCells[dataPointer]; byteCells[dataPointer] = validateByte(byteCells[dataPointer]);}
commands.decrementByte = function() {--byteCells[dataPointer]; byteCells[dataPointer] = validateByte(byteCells[dataPointer]);}
commands.outputByte = function(output) {output += String.fromCharCode(byteCells[dataPointer]); return output;}
commands.acceptInput = function(input) {byteCells[dataPointer] = input.shift(); return input;}

commands.jumpForward = function(code,instructionPointer,bracketStack) 
{
	while(bracketStack.length != 0)
	{
		++instructionPointer;

		if(code[instructionPointer] == ']')
			bracketStack.pop();
		else if(code[instructionPointer] == '[')
			bracketStack.push(instructionPointer);
	}
	return instructionPointer;
}

commands.jumpBackward = function(code,instructionPointer, bracketStack)
{
	while(bracketStack.length != 0)
	{
		--instructionPointer;

		if(code[instructionPointer] == ']')
			bracketStack.push(instructionPointer);
		else if(code[instructionPointer] == '[')
			bracketStack.pop();
	}
	return instructionPointer;
}

function validateByte(byteValue)
{
	if(byteValue > 255)
		return 0;
	if(byteValue < 0)
		return 255;
	return byteValue;
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

function step(code,input,output)
{		
	var instructionPointer = 0;
	var loop = 0 ;
	do
	{
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
		else if(code[instructionPointer] == '[')
		{	
			if(byteCells[dataPointer] == 0)
				instructionPointer = commands.jumpForward(code,instructionPointer, [instructionPointer]);
		}
		else if(code[instructionPointer] == ']')
		{
			if(byteCells[dataPointer] != 0)
				instructionPointer = commands.jumpBackward(code,instructionPointer, [instructionPointer]);
		}
		else 
			return 'Invalid input: ' + code[instructionPointer];

		if(++loop > 900000000)
		{
			return output;
		}

	} while(++instructionPointer < code.length);
	return output;
}

function interpret(brainfuck,input)
{
	byteCells = getNewByteCells();
	dataPointer = 0;
	output = "";

	var code = brainfuck.trim().replace(/ /g, "").replace(/(\r\n|\n|\r)/gm,"").split("");
	return step(code, input, output);
}
