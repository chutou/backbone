/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// Todo的一个集合，数据通过localStorage存储在本地。
	// server.
	var Todos = Backbone.Collection.extend({
		// 设置Collection的模型为Todo
		model: app.Todo,

		//存储到浏览器，以todos-backbone命名的空间中
    //此函数为Backbone插件提供
    //地址：https://github.com/jeromegn/Backbone.localStorage
		localStorage: new Backbone.LocalStorage('todos-backbone'),

		//获取所有已经完成的任务数组
		completed: function () {
			return this.where({completed: true});
		},

		//获取任务列表中未完成的任务数组
    //参考文档：http://backbonejs.org/#Collection-where
		remaining: function () {
			return this.where({completed: false});
		},

		//获得下一个任务的排序序号，通过数据库中的记录数加1实现。
		nextOrder: function () {
			// last获取collection中最后一个元素
			return this.length ? this.last().get('order') + 1 : 1;
		},

		//Backbone内置属性，指明collection的排序规则。
		comparator: 'order'
	});

	// 创建一个全局的Todo的collection对象
	app.todos = new Todos();
})();
