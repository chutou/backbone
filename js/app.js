/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

	// 实例化app,就会调用构造函数，app.AppView 的initialize；
	console.log('app view 初始化');
	new app.AppView();
});
