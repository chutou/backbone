/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	/**
	*基本的Todo模型，属性为：title,done。
	**/
	app.Todo = Backbone.Model.extend({
		// 设置默认的属性
		defaults: {
			title: '',
			completed: false
		},

		// 设置任务完成状态
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});

			console.log('model completed' + this.get('completed'))
		}
	});
})();
