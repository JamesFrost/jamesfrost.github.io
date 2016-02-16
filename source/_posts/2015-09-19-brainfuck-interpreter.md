---
layout: post
title: "Brainfuck Interpreter"
date: 2015-09-19 15:05:03
comments: true
description: "Javascript interpreter for the Brainfuck programming language."
keywords: "javascript, brainfuck, interpreter"
category: project
projectlinks: 
  github : "https://github.com/JamesFrost/brainfuck.js"
tags:
- project
- program
---

<script src="{{ site.baseurl }}/js/brainfuck/brainfuck.min.js"></script>
<script src="{{ site.baseurl }}/js/brainfuck/brainfuck-page.js"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=desert"></script>

<p>{{ page.description }}</p>

<img src="https://travis-ci.org/JamesFrost/brainfuck.js.svg?branch=master">
<br>
<a href="https://nodei.co/npm/brainfuck.js/"><img src="https://nodei.co/npm/brainfuck.js.png"></a>

<hr>
<h2>Demo</h2>
<b><u>programs:</u></b> <small><button class="btn" id="hello-world">hello world</button> <button class="btn" id="fib-numbers">fibonacci numbers</button> <button class="btn" id="bottles">bottles of beer</button></small>
<div class="form-group">
	<textarea id="txt-area" class="form-control" rows="6" placeholder="Code"></textarea>
</div>
<div class="form-group">
	<input type="text" class="form-control" id="input" placeholder="Input">
	<button id="btn-go" class="btn btn-defaultform-control">Go</button>
</div>
<div class="form-group">
</div>
<br>
<h4>Output:</h4>

<div id="output">Enter some code above!</div>
<br>
<div id="performance"></div>

<hr>

<h2>Usage</h2>

<pre class="prettyprint">
	var parser = new BrainfuckParser();
	parser.parse(code, input);
</pre>

<hr>

<h2>What is Brainfuck?</h2>
<p>'Brainfuck is a programming language noted for its extreme minimalism. The language consists of only eight simple commands and an instruction pointer. It is designed to challenge and amuse programmers.'</p>

<h2>Syntax</h2>
<ul>
	<li>> - Increment the data pointer (to point to the next cell to the right). </li>
	<li>< - Decrement the data pointer (to point to the next cell to the left). </li>
	<li>+ - Increment (increase by one) the byte at the data pointer. </li>
	<li>- - Decrement (decrease by one) the byte at the data pointer. </li>
	<li>. - Output the byte at the data pointer. </li>
	<li>, - Accept one byte of input, storing its value in the byte at the data pointer. </li>
	<li>[ - If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command. </li>
	<li>] - If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.</li>
</ul>