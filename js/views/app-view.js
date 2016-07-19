/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
    'use strict';

    // The Application
    // ---------------

    //主要是整体上的一个控制
    app.AppView = Backbone.View.extend({

        //绑定页面上主要的DOM节点
        el: '.todoapp',

        // 在底部显示的统计数据模板
        statsTemplate: _.template($('#stats-template').html()),

        // 绑定dom节点上的事件
        events: {
            'keypress .new-todo': 'createOnEnter',
            'click .clear-completed': 'clearCompleted',
            'click .toggle-all': 'toggleAllComplete'
        },

        //在初始化过程中，绑定事件到Todos上，
        //当任务列表改变时会触发对应的事件。
        //最后从localStorage中fetch数据到Todos中。
        initialize: function () {
            this.allCheckbox = this.$('.toggle-all')[0];
            this.$input = this.$('.new-todo');
            this.$footer = this.$('.footer');
            this.$main = this.$('.main');
            this.$list = $('.todo-list');

            this.listenTo(app.todos, 'add', this.addOne);
            this.listenTo(app.todos, 'reset', this.addAll);
            this.listenTo(app.todos, 'change:completed', this.filterOne);
            this.listenTo(app.todos, 'filter', this.filterAll);
            // 返回 render 函数, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 0 毫秒之后
            // 参考 http://www.css88.com/doc/underscore/#debounce
            this.listenTo(app.todos, 'all', _.debounce(this.render, 0));

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.
            // 参考 http://www.css88.com/doc/backbone/#Collection-fetch
            app.todos.fetch({reset: true});
        },

        // 更改当前任务列表的状态
        render: function () {
            var completed = app.todos.completed().length;
            var remaining = app.todos.remaining().length;
            console.log('completed' + completed);
            if (app.todos.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.statsTemplate({
                    completed: completed,
                    remaining: remaining
                }));
                // filters a 标签选中效果处理
                this.$('.filters li a')
                    //先移除a标签的选中效果
                    .removeClass('selected')
                    //再查找相应a标签值给它添加选中效果
                    .filter('[href="#/' + (app.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }
            //根据剩余多少未完成确定标记全部完成的checkbox的显示
            this.allCheckbox.checked = !remaining;
        },

        // 添加一个任务到页面id为todo-list的ul中
        addOne: function (todo) {
            //enter 之后添加li html
            var view = new app.TodoView({model: todo});
            this.$list.append(view.render().el);
        },

        // 首先清空ul.todo-list中的数据，把Todos中的所有数据渲染到页面,页面加载的时候用到
        addAll: function () {
            this.$list.html('');
            app.todos.each(this.addOne, this);
        },

        // 改变状态，设置完成时，隐藏
        filterOne: function (todo) {
            todo.trigger('visible');
        },

        // 遍历状态，将所有已完成的隐藏
        filterAll: function () {
            app.todos.each(this.filterOne, this);
        },

        //生成一个新Todo的所有属性的字典
        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                order: app.todos.nextOrder(),
                completed: false
            };
        },

        //创建一个任务的方法，使用backbone.collection的create方法。
        //将数据保存到localStorage,这是一个html5的js库。
        //需要浏览器支持html5才能用。
        createOnEnter: function (e) {
            if (e.which === ENTER_KEY && this.$input.val().trim()) {
                //创建一个对象之后会在backbone中动态调用Todos的add方法，该方法已绑定addOne。
                // create 自动绑定add方法，然后就调用addOne方法添加数据
                app.todos.create(this.newAttributes());
                this.$input.val('');
            }
        },

        //去掉所有已经完成的任务
        clearCompleted: function () {
            // invoke,任何已完成的列表都会执行destroy
            _.invoke(app.todos.completed(), 'destroy');
            return false;
        },

        //处理页面点击标记全部完成按钮
        //处理逻辑：
        //    如果标记全部按钮已选，则所有都完成
        //    如果未选，则所有的都未完成。
        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;

            app.todos.each(function (todo) {
                todo.save({
                    completed: completed
                });
            });
        }
    });
})(jQuery);
