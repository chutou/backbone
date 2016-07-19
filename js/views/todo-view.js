/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
    'use strict';

    // Todo Item View
    // --------------

    // The DOM element for a todo item...
    app.TodoView = Backbone.View.extend({
        //下面这个标签的作用是，把template模板中获取到的html代码放到这标签中。
        tagName: 'li',

        // 获取一个任务条目的模板,缓存到这个属性上。
        template: _.template($('#item-template').html()),

        // 为每一个任务条目绑定事件
        events: {
            'click .toggle': 'toggleCompleted',
            'dblclick label': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'keydown .edit': 'revertOnEscape',
            'blur .edit': 'close',
            //新增点击进行编辑
            'click .edit-btn': 'edit'
        },

        //在初始化时设置对model的change事件的监听
        //设置对model是否显示隐藏
        //设置对model的destroy的监听，保证页面数据和model数据一致
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        // 渲染todo中的数据到 item-template 中，然后返回对自己的引用this
        render: function () {
            // Backbone LocalStorage is adding `id` attribute instantly after
            // creating a model.  This causes our TodoView to render twice. Once
            // after creating a model and once on `id` change.  We want to
            // filter out the second redundant render, which is caused by this
            // `id` change.  It's known Backbone LocalStorage bug, therefore
            // we've to create a workaround.
            // https://github.com/tastejs/todomvc/issues/469
            if (this.model.changed.id !== undefined) {
                return;
            }
            // JSON.stringify(app.todos);
            // app.todos.toJSON();
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        },
        // 控制任务隐藏显示
        toggleVisible: function () {
            this.$el.toggleClass('hidden', this.isHidden());
        },
        //隐藏时做数据判断
        isHidden: function () {
            return this.model.get('completed') ?
            app.TodoFilter === 'active' :
            app.TodoFilter === 'completed';
        },

        // 控制任务完成或者未完成
        toggleCompleted: function () {
            this.model.toggle();
        },

        // 修改任务条目的样式和input选中
        edit: function () {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        // 关闭编辑模式，并把修改内容同步到Model和界面
        close: function () {
            var value = this.$input.val();
            var trimmedValue = value.trim();

            // We don't want to handle blur events from an item that is no
            // longer being edited. Relying on the CSS class here has the
            // benefit of us not having to maintain state in the DOM and the
            // JavaScript logic.
            if (!this.$el.hasClass('editing')) {
                return;
            }

            if (trimmedValue) {
                //有值内容保存到localstore
                this.model.save({title: trimmedValue});
            } else {
                //无值内容直接从页面清除
                this.clear();
            }

            this.$el.removeClass('editing');
        },

        // 按下回车之后，关闭编辑模式
        updateOnEnter: function (e) {
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        // 按下esc键 关闭编辑模式
        revertOnEscape: function (e) {
            if (e.which === ESC_KEY) {
                this.$el.removeClass('editing');
                // Also reset the hidden input back to the original value.
                this.$input.val(this.model.get('title'));
            }
        },

        // 移除对应条目，以及对应的数据对象
        clear: function () {
            this.model.destroy();
        }
    });
})(jQuery);
