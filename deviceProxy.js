//
//  Work with mouse, touches, accelerometer
//
//  Created by Alexey Roudenko on 3/13. www.alexeyrudenko.com
//  Copyright (c) 2012. All rights reserved.
//

console.log("hello from deviceProxy");

function setupDevice() {
	console.log("setupDevice");
	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
		document.captureEvents(Event.MOUSELEAVE);
	}

	document.mouseleave = onEndTouch;
	document.onmousedown = onMouseDown;
	document.onmousemove = onMouseMove;
	document.onmouseup = onMouseUp;

	document.body.addEventListener('touchstart', onTouchStart);
	document.body.addEventListener('touchmove', onTouchMove);
	document.body.addEventListener('touchend', onEndTouch);
}

/* --------------------------------------------------------------
# iddle logic
#
#
#
# -------------------------------------------------------------- */
var params = {
	doIddle:true,
	isIddle:true,
	doRender:true,
	doShader:true,
	doLines:false,
	doParticles:true,
	doPhysics:true
};

var date = new Date()
var lastMouseTime = date.getTime() * 0.001;
var deltaTime = 0;

function cleanIddle() {
	var date = new Date()
	lastMouseTime = date.getTime() * 0.001;
}

function checkIddle() {
	var date = new Date()
	deltaTime = date.getTime() * 0.001 - lastMouseTime;

	if (deltaTime > 10) {
		params.isIddle = true;
	} else {
		params.isIddle = false;
	}

	params.doRender = !params.isIddle;
	params.doShader = !params.isIddle;
	params.doParticles = !params.isIddle;
	params.doPhysics = !params.isIddle;
}




/* --------------------------------------------------------------
# events
#
#
#
# -------------------------------------------------------------- */
function onMouseDown(e) {
	infoObject.x = e.pageX * window.devicePixelRatio;
	infoObject.y = e.pageY * window.devicePixelRatio;
	checkPress();
	e.preventDefault();
	cleanIddle();
}

function onMouseMove(e) {
	infoObject.x = e.pageX * window.devicePixelRatio;
	infoObject.y = e.pageY * window.devicePixelRatio;
	e.preventDefault();
	cleanIddle();
}

function onMouseUp(e) {
	checkRelease();
	e.preventDefault();
	infoObject.x = -1;
	infoObject.y = -1;
	cleanIddle();
}


function onTouchStart(e) {
	var touch = e.touches[0];
	infoObject.x = touch.pageX * window.devicePixelRatio;
	infoObject.y = touch.pageY * window.devicePixelRatio;
	checkPress();
	e.preventDefault();
	cleanIddle();
}

function onEndTouch(e) {
	checkRelease();
	infoObject.x = -1;
	infoObject.y = -1;
	e.preventDefault();
	cleanIddle();
}

function onTouchMove(e) {
	var touch = e.touches[0];
	infoObject.x = touch.pageX * window.devicePixelRatio;
	infoObject.y = touch.pageY * window.devicePixelRatio;
	e.preventDefault();
	cleanIddle();
}
