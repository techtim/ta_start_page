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

function onMouseDown(e) {
	infoObject.x = e.pageX * window.devicePixelRatio;
	infoObject.y = e.pageY * window.devicePixelRatio;
	checkPress();
	e.preventDefault();
}

function onMouseMove(e) {
	infoObject.x = e.pageX * window.devicePixelRatio;
	infoObject.y = e.pageY * window.devicePixelRatio;
	e.preventDefault();
}

function onMouseUp(e) {
	checkRelease();
	e.preventDefault();
		infoObject.x = -1;
	infoObject.y = -1;	

}


function onTouchStart(e) {
	var touch = e.touches[0];
	infoObject.x = touch.pageX * window.devicePixelRatio;
	infoObject.y = touch.pageY * window.devicePixelRatio;
	checkPress();
	e.preventDefault();
}

function onEndTouch(e) {
	checkRelease();
	infoObject.x = -1;
	infoObject.y = -1;	
	e.preventDefault();
}

function onTouchMove(e) {
	var touch = e.touches[0];
	infoObject.x = touch.pageX * window.devicePixelRatio;
	infoObject.y = touch.pageY * window.devicePixelRatio;
	e.preventDefault();
}

