/*
An interpreter for the Brainfuck language.

Each character in the code is converted to its ASCII value, 
and the corresponding function called. For example: '>' has an
ASCII value of 62, and as such will call the '_62' method.
*/

var BrainfuckParser = function() 
{
	this.byteCells = new Array(30000);
};

BrainfuckParser.prototype.reset = function() 
{
	this.code = "";
	this.dataPointer = 0;
	this.instructionPointer = 0;
	this.output = "";
	this.input = "";

	for(var i = 0; i < this.byteCells.length; ++i)
		this.byteCells[i] = 0;
};

BrainfuckParser.prototype._62 = function() { ++this.dataPointer; };
BrainfuckParser.prototype._60 = function() { --this.dataPointer; };
BrainfuckParser.prototype._43 = function() { ++this.byteCells[this.dataPointer]; this.byteCells[this.dataPointer] = this.validateByte(this.byteCells[this.dataPointer]); };
BrainfuckParser.prototype._45 = function() { --this.byteCells[this.dataPointer]; this.byteCells[this.dataPointer] = this.validateByte(this.byteCells[this.dataPointer]); };
BrainfuckParser.prototype._46 = function() { this.output += String.fromCharCode(this.byteCells[this.dataPointer]); };
BrainfuckParser.prototype._44 = function() { this.byteCells[this.dataPointer] = this.input.shift().charCodeAt(); console.log(this.byteCells[this.dataPointer]); };

BrainfuckParser.prototype._91 = function() 
{ 
	if(this.byteCells[this.dataPointer] != 0)
		return;

	var bracketStack = [this.instructionPointer];
	while(bracketStack.length != 0)
	{
		++this.instructionPointer;

		switch(this.code[this.instructionPointer])
		{
			case ']':
				bracketStack.pop();
				break;

			case '[':
				bracketStack.push(this.instructionPointer);
				break;
		}		
	}
	return this.instructionPointer; 
};

BrainfuckParser.prototype._93 = function() 
{ 
	if(this.byteCells[this.dataPointer] == 0)
		return;

	var bracketStack = [this.instructionPointer];
	while(bracketStack.length != 0)
	{
		--this.instructionPointer;

		switch(this.code[this.instructionPointer])		
		{
			case ']':
				bracketStack.push(this.instructionPointer);
				break;

			case '[':
				bracketStack.pop();
				break;
		}
	}
	return this.instructionPointer;
};

BrainfuckParser.prototype.validateByte = function(byteValue) 
{
	if(this.byteValue > 255)
		return 0;
	if(this.byteValue < 0)
		return 255;
	return byteValue;
};

BrainfuckParser.prototype.parse = function(code, input) 
{
	this.reset();
	this.code = code.trim().replace(/ /g, "").replace(/(\r\n|\n|\r)/gm,"").split("");
	this.input = input.split("");

	do 
	{
		if(typeof this['_' + this.code[this.instructionPointer].charCodeAt(0)] === "undefined")
			throw 'Syntax Error - Invalid Symbol';

		this['_' + this.code[this.instructionPointer].charCodeAt(0)]();
	}
	while(++this.instructionPointer < this.code.length);

	return this.output;
};
