//
//  Summer Breath
//	http://www.alexeyrudenko.com/
//
//  Created by Alexey Roudenko on 07/06/15.
//  Copyright (c) 2015 Alexey Roudenko. All rights reserved.
//

var doShader = true;




if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer;
var uniforms;

initGL();

var sprites;
var spriteCenter;
var centerScale = 0.3;

var line;
var lineGeometry;

function initGL() {

	var getSourceSynch = function(url) {
	  var req = new XMLHttpRequest();
	  req.open("GET", url, false);
	  req.send(null);
	  return (req.status == 200) ? req.responseText : null;
	};

	var vertexShader = getSourceSynch("static/imenu/shader.vert");
	var fragmentShader = getSourceSynch("static/imenu/shader.frag");

	container = document.getElementById('container');
	
	// camera = new THREE.Camera(75, window.innerWidth / window.innerHeight, 1, 10000);
	// camera.position.z = 1;
	// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .01, 100);
	// camera.position.z = 1;
	// camera = new THREE.Camera();
	

	var width = window.innerWidth;
	var height = window.innerHeight;
	camera = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1,  10 );
	camera.position.z = 1;


	mousePosition = new THREE.Vector2(0, 0);
	scene = new THREE.Scene();

	var geometry = new THREE.PlaneBufferGeometry(2, 2);
	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_alpha: { type: "f", value: 1.0 },
		

		u_scale: { type: "f", value:  window.devicePixelRatio },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
		p1: { type: "v2", value: new THREE.Vector2() },
		p2: { type: "v2", value: new THREE.Vector2() },
		p3: { type: "v2", value: new THREE.Vector2() },
		p4: { type: "v2", value: new THREE.Vector2() },
		p5: { type: "v2", value: new THREE.Vector2() },
		p6: { type: "v2", value: new THREE.Vector2() }
	};
	var material = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	});
	
	var mesh = new THREE.Mesh(geometry, material);
	if (doShader == true) scene.add(mesh);

	sprites  = new Array();
	for (var i = 0; i < count; i++) { 
		var spriteImg = THREE.ImageUtils.loadTexture("static/imenu/img/ico_0" + (i + 1) + ".png");
		var material = new THREE.SpriteMaterial({map: spriteImg});
		sprite = new THREE.Sprite(material);
		scene.add(sprite);
		sprites[i] = sprite;
	}


	var spriteCenterImg = THREE.ImageUtils.loadTexture("static/imenu/img/ico_center.png");
	var materialC = new THREE.SpriteMaterial({map: spriteCenterImg});
	spriteCenter = new THREE.Sprite(materialC);
	scene.add(spriteCenter);






	lineGeometry = new THREE.Geometry();
	for (i = 0; i < count; i ++) {
		var vertex1 = new THREE.Vector3();
		vertex1.x = 0;
		vertex1.y = 0;
		vertex1.z = 0;
		var vertex2 = new THREE.Vector3();
		vertex2.x = 1;
		vertex2.y = 1;
		vertex2.z = 0;
		lineGeometry.vertices.push( vertex1 );
		lineGeometry.vertices.push( vertex2 );
	}
	var material = new THREE.LineBasicMaterial({color:0xdddddd, linewidth:1});
	
	line = new THREE.Line( lineGeometry, material );
	line.scale.x = line.scale.y = line.scale.z = 1.0;
	scene.add( line );






	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0xffffff);
	container.appendChild(renderer.domElement);










	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	// container.appendChild(stats.domElement);

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);
	
	window.scrollTo(0, 1); 
	setTimeout(function () {   window.scrollTo(0, 1); }, 1000);

	animate();
}

function onWindowResize(event) {
	renderer.setSize(window.innerWidth, window.innerHeight);

	var width = window.innerWidth * window.devicePixelRatio;
	var height = window.innerHeight * window.devicePixelRatio;
	camera.left = -width / 2;
	camera.right = width / 2;
	camera.top = height / 2;
	camera.bottom = - height / 2;
	camera.updateProjectionMatrix();
}

function animate() {
	requestAnimationFrame(animate);
	update();
	render();
	stats.update();
}

var initValue = 0;

function render() {
	if (uniforms) {
		uniforms.u_time.value += 0.05;

		var timev = 0.0;
		timev = 20;var progress0 = Math.min(Math.max(initValue - 0, 0), timev) / timev;
		timev = 20;var progress1 = Math.min(Math.max(initValue - 0, 0), timev) / timev;
		timev = 20;var progress2 = Math.min(Math.max(initValue - 20, 0), timev) / timev;



		var centerX = window.devicePixelRatio * window.innerWidth / 3.0;
		var centerY = window.devicePixelRatio * (window.innerHeight / 3.0 + 100);
		var sizeX = window.devicePixelRatio * window.innerWidth;
		var sizeY = window.devicePixelRatio * window.innerHeight;

		
		uniforms.u_resolution.value.x = renderer.domElement.width;
		uniforms.u_resolution.value.y = renderer.domElement.height;

		var aspect = sizeY / sizeX;

		uniforms.p1.value.x = (particlesX[0]) / sizeX; uniforms.p1.value.y = - aspect * (particlesY[0]) / sizeY;
		uniforms.p2.value.x = (particlesX[1]) / sizeX; uniforms.p2.value.y = - aspect * (particlesY[1]) / sizeY;
		uniforms.p3.value.x = (particlesX[2]) / sizeX; uniforms.p3.value.y = - aspect * (particlesY[2]) / sizeY;
		uniforms.p4.value.x = (particlesX[3]) / sizeX; uniforms.p4.value.y = - aspect * (particlesY[3]) / sizeY;
		uniforms.p5.value.x = (particlesX[4]) / sizeX; uniforms.p5.value.y = - aspect * (particlesY[4]) / sizeY;
		uniforms.p6.value.x = (particlesX[5]) / sizeX; uniforms.p6.value.y = - aspect * (particlesY[5]) / sizeY;


		




		uniforms.u_alpha.value = progress0;

		var scale = 0.25 * window.devicePixelRatio;
		if (selected != -1) {
			centerScale = (centerScale * 19 + 1.0) / 20;
		} else {
			centerScale = (centerScale * 19 + .3) / 20;
		}
		


		var aspect = sizeY / sizeX;
		for (var i = 0; i < count; i++) { 
			var sprite = sprites[i];
			var scalePos = 1.0 + 2.1 * Math.pow(1.0 - progress1, 2)
			sprite.scale.set(scale * 512, scale * 512);
			sprite.position.set(scalePos * (particlesX[i] + 45 * window.devicePixelRatio) + 0 ,  -scalePos * particlesY[i], 0.0);
		}

		var spriteCenterScale = progress1 * centerScale * 0.25 * window.devicePixelRatio + Math.sin(2.0 * uniforms.u_time.value) * .02 * (centerScale - 0.3); 
		spriteCenter.scale.set(spriteCenterScale * 512, spriteCenterScale * 512);
		spriteCenter.position.set(0.0, 0.0, 0.0);		
	}

	

	for (var i = 0; i < count; i++) {
		lineGeometry.vertices[i * 2].x = particlesX[i] * progress0;
		lineGeometry.vertices[i * 2].y = -particlesY[i] * progress0;
	}

	

	lineGeometry.dynamic = true;
	lineGeometry.verticesNeedUpdate = true;	
	lineGeometry.normalsNeedUpdate = true;
	
	renderer.render(scene, camera);
	initValue++;
}