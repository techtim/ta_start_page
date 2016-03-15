//
//  Core
//
//  Created by Alexey Roudenko on 3/13. www.alexeyrudenko.com
//  Copyright (c) 2012. All rights reserved.
//


var meter;


var infoObject = {
	"x":-1,
	"y":-1,
	"volume":0,
	"hasBeat":false,
	"currentFtame":0,
	"ratio":1.0
}

function backingScale(context) {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1 && context.webkitBackingStorePixelRatio < 2) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}

function resizeCanvas() {
	var width = window.innerWidth;
	var height = window.innerHeight;		
	setupTargets();
}

function init() {
	ratio = window.devicePixelRatio || 1;
	infoObject.ratio = window.devicePixelRatio || 1;
	
	window.addEventListener('resize', resizeCanvas, false);
	
	setupDevice();
	
	window.scrollTo(0, 1); 
	setTimeout(function () {window.scrollTo(0, 1);}, 1000);
	
	setup();
	
	// setInterval(onTime, 15);
	document.documentElement.style.overflow = 'hidden';  // firefox, chrome
	document.body.scroll = "no"; // ie only
}

function onTime() {
	// if (doUpdate) update();
	// infoObject.currentFtame++;
}