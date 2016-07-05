/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var TodoRouter = Backbone.Router.extend({
		routes: {
			// 匹配路由，* 匹配所有地址
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.TodoFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			// 匹配成功，会触发app.todos 'filter' this.filterAll函数 
			app.todos.trigger('filter');
		}
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();
