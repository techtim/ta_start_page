//
//  Module for nodes
//
//  Created by Alexey Roudenko on 15/14. www.alexeyrudenko.com
//  Copyright (c) 2015 All rights reserved.
//


var doUpdate = true;

var number = 0;
var count = 5;


var particlesX = new Array();
var particlesY = new Array();

var speedX = new Array();
var speedY = new Array();

var targetX = new Array();
var targetY = new Array();

var mouseLength = new Array();
var targetLength = new Array();

var URLS = ["contacts", "design", "projects", "team", "studio"];


var selectedX = 0;
var selectedY = 0;

function setup() {
	console.log("setupModule");

	
	for (var i = 0; i < count; i++) { 
		particlesX[i] = targetX[i] * 0.01;
		particlesY[i] = targetY[i] * 0.01;
		speedX[i] = 0;
		speedY[i] = 0;
 	}	
 	updateTargets(true);
}

function navigateUrl(_pushed) {
	console.log("_pushed "+_pushed)
	document.location.assign(URLS[_pushed]);
	// document.location.replace(URLS[_pushed]);
}

var nearest = -1;
var selected = -1;
var pushed = -1;
var pushedCount = 0;


// for touch
var waitForSetSelected = false;
function checkPress() {
	if (nearest != -1) {
		console.log("checkPress " + nearest + " " + selected);
		selected = nearest;
		document.body.style.cursor = 'move';
	} else {
		waitForSetSelected = true;
	}
}

function checkRelease(){
	var centerX = window.devicePixelRatio * window.innerWidth / 2.0;
	var centerY = window.devicePixelRatio * window.innerHeight / 2.0;
	var mouseDX = -infoObject.x + centerX;
	var mouseDY = -infoObject.y + centerY;
	var delta = Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY);
	if (delta < 100) {
		pushed = selected;
	} 
	if (selected != -1) {
		pushed = selected;
	}
	selected = -1;
	document.body.style.cursor = 'auto';
}

function updateTargets(updateStart) {
	var coordX = 0;
	var coordY = 0;
	var date = new Date()
	var time = date.getTime() * 0.0004;

	var radius =  0.01 * ((window.devicePixelRatio * window.innerHeight / 2 - 500) + 250); 
	var centerX = window.devicePixelRatio * window.innerWidth / 2.0;
	var centerY = window.devicePixelRatio * window.innerHeight / 2.0;
	var displace = 40;
	for (var i = 0; i < count; i++) {
		var angle = i * 2 * Math.PI / count - 17;
		var radius =  window.devicePixelRatio * (window.innerHeight / 2 - 150 + Math.sin(angle * 10.1 + time) * displace); 
		targetX[i] = -radius * Math.sin(angle) * 1.5 + Math.sin(angle * 10.1) * 20;
		targetY[i] = -radius * Math.cos(angle) + Math.cos(angle * 10.1) * 10;

		if (updateStart == true) {
			particlesX[i] = targetX[i];
			particlesY[i] = targetY[i];
		}
	}

	//document.getElementById("values").innerHTML = "selected:" + selected + ", nearest:" + nearest;	
}



function update() {

	updateTargets(false);

	var coordX = 0;
	var coordY = 0;
	
	var minMouseDistance = 80 * window.devicePixelRatio;
	var centerX = window.devicePixelRatio * window.innerWidth / 2.0;
	var centerY = window.devicePixelRatio * window.innerHeight / 2.0;

	if (selected == -1)  nearest = -1;
	var nearestLength = 10000;
	document.body.style.cursor = 'default';
	for (var i = 0; i < count; i++) { 
		var mouseDX = particlesX[i] - infoObject.x + centerX;
		var mouseDY = particlesY[i] - infoObject.y + centerY;
		var targetDX = particlesX[i] - targetX[i];
		var targetDY = particlesY[i] - targetY[i];			
		mouseLength[i] = Math.sqrt(mouseDX * mouseDX + mouseDY * mouseDY);
		targetLength[i] = Math.sqrt(targetDX * targetDX + targetDY * targetDY);
		if (mouseLength[i] < nearestLength && mouseLength[i] < minMouseDistance && targetLength[i] < minMouseDistance + 50) {
			nearest = i;
			nearestLength = mouseLength[i];			
		}
	}

	if (nearest != -1) {
		document.body.style.cursor = 'pointer';
	}

	if (waitForSetSelected && nearest != -1) {
		selected = nearest;
		waitForSetSelected = false;
		document.body.style.cursor = 'move';
	}


	for (var i = 0; i < count; i++) {
		var mouseDX = particlesX[i] - infoObject.x + centerX;
		var mouseDY = particlesY[i] - infoObject.y + centerY;
		var targetDX = particlesX[i] - targetX[i];
		var targetDY = particlesY[i] - targetY[i];




		var fade = 0.8;

		var multiplyMouse = 5;
		var multiplyTarget = 0.00008;
		

		var sign = -1;

			if (i != nearest) {
				if (mouseLength[i] > minMouseDistance) {
					multiplyMouse = 0; 
				}
			} 

		if (nearest != -1 && i != nearest) {
			sign = 1;
		}
		var skip = false;
		if (selected != -1) {
			if (i == selected) {
				multiplyMouse = 20; 
				multiplyTarget = 0; 
				skip = true;
			} else {
				sign = 1;
			} 
			document.body.style.cursor = 'move';
		} 



		if (pushed == -1) {
			if (skip == false) {
				var forceX = sign * multiplyMouse * mouseDX / (mouseLength[i] + 200.0) - multiplyTarget * targetDX * targetLength[i];
				var forceY = sign * multiplyMouse * mouseDY / (mouseLength[i] + 200.0) - multiplyTarget * targetDY * targetLength[i];
				
				speedX[i] += forceX;
				speedY[i] += forceY;
				
				speedX[i] *= fade;
				speedY[i] *= fade;
				particlesX[i] = particlesX[i] + speedX[i];
				particlesY[i] = particlesY[i] + speedY[i];
			} else {
				targetX[i] = infoObject.x - centerX;
				targetY[i] = infoObject.y - centerY;

				particlesX[i] = (particlesX[i] * 2 + targetX[i] * 8) / 10;
				particlesY[i] = (particlesY[i] * 2 + targetY[i] * 8) / 10;


			}
		} else {
			particlesX[i] = particlesX[i] * 0.895;
			particlesY[i] = particlesY[i] * 0.895;
			pushedCount++;
		}

		if (pushedCount == 250) {
			navigateUrl(pushed);
		}
	} 
}