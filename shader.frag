//
//  Summer Breath
//	http://www.alexeyrudenko.com/
//
//  Created by Alexey Roudenko on 15/12/15.
//  Copyright (c) 2015 Alexey Roudenko. All rights reserved.
//

precision lowp float; // or lowp

uniform float u_time;
uniform float u_scale;
uniform float u_alpha;

uniform vec2 u_resolution;
// uniform vec2 points[7];

uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;
uniform vec2 p4;
uniform vec2 p5;
uniform vec2 p6;


void main()	{

	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	vec2 aspectVec = vec2(1.0, u_resolution.y / u_resolution.x);

	vec2 p0 = vec2(0.0, 0.0);
	vec2 c = (0.5 - uv) * aspectVec;
    vec2 uvd0 = c + p0;
    vec2 uvd1 = c + p1;
    vec2 uvd2 = c + p2;
    vec2 uvd3 = c + p3;
    vec2 uvd4 = c + p4;
    vec2 uvd5 = c + p5;
    vec2 uvd6 = c + p6;


	float minValue = 200.0;
	float r0 = min(1.0 / (dot(uvd0, uvd0)), minValue);
	float r1 = min(1.0 / (dot(uvd1, uvd1)), minValue);
	float r2 = min(1.0 / (dot(uvd2, uvd2)), minValue);
	float r3 = min(1.0 / (dot(uvd3, uvd3)), minValue);
	float r4 = min(1.0 / (dot(uvd4, uvd4)), minValue);
	float r5 = min(1.0 / (dot(uvd5, uvd5)), minValue);
	float r6 = min(1.0 / (dot(uvd6, uvd6)), minValue);	
	float summ = 0.001 * (r0 + r1 + r2 + r3 + r4 + r5 + r6);
	
	float value = (1.0 * sin(300.0 * summ / u_scale + .6 * u_time));
	float col = smoothstep(0.01, 0.9, value);
	vec3 color = vec3(col, col, col) + 0.8 + .035 / summ;// / sqrt(u_scale / .6);
	gl_FragColor = vec4(color + (1.0 - sqrt(u_alpha)), 1.0);
}