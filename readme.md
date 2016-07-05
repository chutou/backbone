# 第一章 Hello Backbonejs

----------

## 1.1 基础概念

请切换至

	step-0 中 helloworld.html

Backbone，英文意思是：勇气， 脊骨，但是在程序里面，尤其是在Backbone后面加上后缀js之后，它就变成了一个框架，一个js库。

Backbone.js，不知道作者是以什么样的目的来对其命名的，可能是希望这个库会成为web端开发中脊梁骨。

Backbone.js提供了一套web开发的框架，通过Models进行key-value绑定及自定义事件处理，通过Collections提供一套丰富的API用于枚举功能，通过Views来进行事件处理及与现有的Application通过RESTful JSON接口进行交互.它是基于jQuery和underscore的一个前端js框架。

整体上来说，Backbone.js是一个web端javascript的MVC框架，算是轻量级的框架。它能让你像写Java（后端）代码组织js代码，定义类，类的属性以及方法。更重要的是它能够优雅的把原本无逻辑的javascript代码进行组织，并且提供数据和逻辑相互分离的方法，减少代码开发过程中的数据和逻辑混乱。

在Backbonejs有几个重要的概念，先介绍一下:Model，Collection，View，Router。其中Model是根据现实数据建立的抽象，比如人（People）；Collection是Model的一个集合，比如一群人；View是对Model和Collection中数据的展示，把数据渲染（Render）到页面上；Router是对路由的处理，就像传统网站通过url现实不同的页面，在单页面应用（SPA）中通过Router来控制前面说的View的展示。

通过Backbone，你可以把你的数据当作Models，通过Models你可以创建数据，进行数据验证，销毁或者保存到服务器上。当界面上的操作引起model中属性的变化时，model会触发change的事件。那些用来显示model状态的views会接受到model触发change的消息，进而发出对应的响应，并且重新渲染新的数据到界面。在一个完整的Backbone应用中，你不需要写那些胶水代码来从DOM中通过特殊的id来获取节点，或者手工的更新HTML页面，因为在model发生变化时，views会很简单的进行自我更新。

## 1.2 backbone的应用范围

稍稍列一下国内用到Backbonejs的站点：

1. 豆瓣阿尔法城 链接：[http://alphatown.com/](http://alphatown.com/)

2. 豆瓣阅读 链接：[http://read.douban.com/](http://read.douban.com/) 主要用在图书的正文页

3. 百度开发者中心 链接：[http://developer.baidu.com/](http://developer.baidu.com/)

4. 手机搜狐直播间 链接：[http://zhibo.m.sohu.com/](http://zhibo.m.sohu.com/)

5. OATOS企业网盘 链接：[http://app.oatos.com](http://app.oatos.com)

## 1.3 完整DEMO

这个demo的主要功能是点击页面上得“新手报到”按钮，弹出对话框，输入内容之后，把内容拼上固定的字符串显示到页面上。事件触发的逻辑是： click 触发checkIn方法，然后checkIn构造World对象放到已经初始化worlds这个collection中。

# 第二章 Backbonejs中的Model实践
--------


请切换至

	step-1 中 model.html

上一章主要是通过简单的代码对Backbonejs做了一个概括的展示，这一章开始从Model层说起，详细解释Backbonejs中的Model这个东西。

对于Model这一部分，其官网是这么说的：“Model是js应用的核心，包括基础的数据以及围绕着这些数据的逻辑：数据转换、验证、属性计算和访问控制”。这句话基本上高度概括了Model在一个项目中的作用。实际上，不仅仅是js应用，在任何以数据收集和处理的项目中Model都是很重要的一块内容。

Model这个概念在我的印象中是来自于MVC这个东西，Model在其中的作用，除了是对业务中实体对象的抽象，另外的作用就是做持久化，所谓持久化就是把数据存储到磁盘上——文件形式、数据库形式。在web端也有对应的操作，比如存入LocalStorage，或者Cookie。

在web端，Model还有一个重要的功能就是和服务器端进行数据交互，就像是服务器端的程序需要和数据库交互一样。因此Model应该是携带数据流窜于各个模块之间的东西。

下面让我们通过一个一个的实例来逐步了解Model。

先定义一个页面结构，实践时须在注释的地方填上各小节的代码

> 
    <!DOCTYPE html>
	<html>
	<head>
	    <title>the5fire.com-backbone.js-Hello World</title>
	</head>
	<body>
	    <script src="node_modules/jquery/dist/jquery.js"></script>
	    <script src="node_modules/underscore/underscore.js"></script>
	    <script src="node_modules/backbone/backbone.js"></script>
	    <script>
	    (function ($)   
	    })(jQuery);
	    </script>
	</body>
	</html>

## 2.1 最简单的对象
    var Man = Backbone.Model.extend({
    initialize: function(){
        alert('Hey, you create me!');
    }
	});
	var man = new Man;
这个确实很简单了，只是定义了一个最基础的Model，只是实现了initialize这个初始化方法，也称构造函数。这个函数会在Model被实例化时调用。

## 2.2 对象属性赋值的两种方法
第一种，直接定义，设置默认值。
    var Man = Backbone.Model.extend({
	    initialize: function(){
	        alert('Hey, you create me!');
	    },
	    defaults: {
	        name:'张三',
	        age: '38'
	    }
	});
	
	var man = new Man;
	console.log(man.get('name'));

第二种，赋值时定义

	var Man = Backbone.Model.extend({
	    initialize: function(){
	        alert('Hey, you create me!');
	    }
	});
	var man = new Man;
	man.set({name:'the5fire',age:'10'});
	alert(man.get('name'));

从这个对象的取值方式可以知道，属性在一个Model是以字典（或者类似字典）的方式存在的，第一种设定默认值的方式，只不过是实现了Backbone的defaults这个方法，或者是给defaults进行了赋值。

## 2.3 对象中的方法
	var Man = Backbone.Model.extend({
	    initialize: function(){
	        alert('Hey, you create me!');
	    },
	    defaults: {
	        name:'张三',
	        age: '38'
	    },
	    aboutMe: function(){
	        return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
	    }
	});
	var man = new Man;
	alert(man.aboutMe());

也是比较简单，只是增加了一个新的属性，值是一个function。说到这，不知道你是否发现，在所有的定义或者赋值操作中，都是通过字典的方式来完成的，比如extend Backbone的Model，以及定义方法，定义默认值。方法的调用和其他的语言一样，直接 . 即可，参数的定义和传递也一样。

## 2.4 监听对象中属性的变化

假设你有在对象的某个属性发生变化时去处理一些业务的话，下面的示例会有帮助。依然是定义那个类，不同的是我们在构造函数中绑定了name属性的change事件。这样当name发生变化时，就会触发这个function。
	var Man = Backbone.Model.extend({
	    initialize: function(){
	        alert('Hey, you create me!');
	        //初始化时绑定监听
	        this.bind("change:name",function(){
	            var name = this.get("name");
	            alert("你改变了name属性为：" + name);
	        });
	    },
	    defaults: {
	        name:'张三',
	        age: '38'
	    },
	    aboutMe: function(){
	        return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
	    }
	});
	var man = new Man;
	//触发绑定的change事件，alert。
	man.set({name:'the5fire'});
	
	//触发绑定的change事件，alert。
	man.set({name:'the5fire.com'});

## 2.5 为对象添加验证规则，以及错误提示

	var Man = Backbone.Model.extend({
	    initialize: function(){
	        alert('Hey, you create me!');
	        //初始化时绑定监听, change事件会先于validate发生
	        this.bind("change:name",function(){
	            var name = this.get("name");
	            alert("你改变了name属性为：" + name);
	        });
	        this.bind("invalid",function(model,error){
	            alert(error);
	        });
	    },
	    defaults: {
	        name:'张三',
	        age: '38'
	    },
	    validate:function(attributes){
	        if(attributes.name == '') {
	            return "name不能为空！";
	        }
	    },
	    aboutMe: function(){
	        return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
	    }
	});
	var man = new Man;
	// 这种方式添加错误处理也行
	// man.on('invalid', function(model, error){
	//         alert(error);
	// });
	
	//默认set时不进行验证
	man.set({name:''});
	//手动触发验证, set时会触发
	//man.set({name:''}, {'validate':true});
	//save时触发验证。根据验证规则，弹出错误提示。
	man.save();

# 第三章 Backbonejs中的Collections实践
-------

请切换至

	step-2 中 collection.html

上一节介绍了model的使用，model算是对现实中某一物体的抽象，比如你可以定义一本书的model，具有书名（title）还有书页（page_num)等属性。仅仅用一个Model是不足以呈现现实世界的内容，因此基于Model，这节我们来看collection。collection是model对象的一个有序的集合，也可以理解为是model的容器。概念理解起来十分简单，在通过几个例子来看一下，会觉得更容易理解。

## 3.1 关于book和bookshelf的例子
	var Book = Backbone.Model.extend({

	    defaults : {
	        title:'default'
	    },
	
	    initialize: function(){
	        //alert('Hey, you create me!');
	    }
	
	});
	
	var BookShelf = Backbone.Collection.extend({
	    model : Book
	});
	
	var book1 = new Book({title : 'book1'});
	var book2 = new Book({title : 'book2'});
	var book3 = new Book({title : 'book3'});
	
	//注意这里面是数组,或者使用add
	//var bookShelf = new BookShelf([book1, book2, book3]);
	
	var bookShelf = new BookShelf;
	
	bookShelf.add(book1);
	bookShelf.add(book2);
	bookShelf.add(book3);
	bookShelf.remove(book3);
	
	
	//基于underscore这个js库，还可以使用each的方法获取collection中的数据
	
	bookShelf.each(function(book){
	    alert(book.get('title'));
	});



# 第四章 Backbonejs中的Router实践
--------

请切换至

	step-3 中 router.html 查看

前面介绍了Model和Collection，基本上属于程序中静态的数据部分。这一节介绍Backbone中的router，属于动态的部分，见名知意，router——路由的意思，显然是能够控制url指向哪个函数的。具体是怎么做的一会通过几个实例来看看。

在现在的单页应用中，所有的操作、内容都在一个页面上呈现，这意味着浏览器的url始终要定位到当前页面。那么一个页面中的所有的操作总不能都通过事件监听来完成，尤其是对于需要切换页面的场景以及需要分享、收藏固定链接的情况。因此就有了router，通过hash的方式（即#page）来完成。不过随着浏览器发展，大多数的浏览器已经可以通过history api来操控url的改变，可以直接使用 /page 来完成之前需要hash来完成的操作，这种方式看起来更为直观一些。下面提供过几个demo来切实体会一番。

## 4.1 一个简单的例子

	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "*actions" : "defaultRoute"
	    },
	
	    defaultRoute : function(actions){
	        alert(actions);
	    }
	});
	
	var app_router = new AppRouter;
	
	Backbone.history.start();

需要通过调用Backbone.history.start()方法来初始化这个Router。

在页面上需要有这样的a标签：

	<a href="#actions">testActions</a>

点击该链接时，便会触发defaultRouter这个方法。

## 4.2 这个routes映射要怎么传参数

看下面例子，立马你就知道了

	var AppRouter = Backbone.Router.extend({
	
	    routes: {
	        "posts/:id" : "getPost",
	        "*actions" : "defaultRoute"
	    },
	
	    getPost: function(id) {
	        alert(id);
	    },
	
	    defaultRoute : function(actions){
	        alert(actions);
	    }
	});
	
	var app_router = new AppRouter;
	Backbone.history.start();

对应的页面上应该有一个超链接：
	<a href="#/posts/120">Post 120</a>

从上面已经可以看到匹配#标签之后内容的方法，有两种：一种是用“:”来把#后面的对应的位置作为参数；还有一种是“*”，它可以匹配所有的url，下面再来演练一下。
	
	var AppRouter = Backbone.Router.extend({

	    routes: {
	        "posts/:id" : "getPost",
	        //下面对应的链接为<a href="#/download/user/images/hey.gif">download gif</a>
	        "download/*path": "downloadFile",
	        //下面对应的链接为<a href="#/dashboard/graph">Load Route/Action View</a>
	        ":route/:action": "loadView",
	        "*actions" : "defaultRoute"
	    },
	
	    getPost: function(id) {
	        alert(id);
	    },
	
	    defaultRoute : function(actions){
	        alert(actions);
	    },
	
	    downloadFile: function( path ){
	        alert(path); // user/images/hey.gif
	    },
	
	    loadView: function( route, action ){
	        alert(route + "_" + action); // dashboard_graph
	    }
	
	});
	
	var app_router = new AppRouter;
	Backbone.history.start();


## 4.3 手动触发router

上面的例子都是通过页面点击触发router到对应的方法上，在实际的使用中，还存在一种场景就是需要在某一个逻辑中触发某一个事件，就像是jQuery中得trigger一样，下面的代码展示怎么手动触发router。

	var AppRouter = Backbone.Router.extend({

	    routes: {
	        "posts/:id" : "getPost",
	        //下面对应的链接为<a href="#/download/user/images/hey.gif">download gif</a>
	        "download/*path": "downloadFile",
	        //下面对应的链接为<a href="#/dashboard/graph">Load Route/Action View</a>
	        ":route/:action": "loadView",
			"manual": "manual",
	        "*actions" : "defaultRoute"
	    },
	
	    getPost: function(id) {
	        alert(id);
	    },
	
	    defaultRoute : function(actions){
	        alert(actions);
	    },
	
	    downloadFile: function( path ){
	        alert(path); // user/images/hey.gif
	    },
		loadView: function( route, action ){
		    alert(route + "_" + action); // dashboard_graph
		},
		manual: function() {
		    alert("call manual");
		    app_router.navigate("/posts/" + 404, {trigger: true, replace: true});
		}
	
	});
	
	var app_router = new AppRouter;
	Backbone.history.start();

对应着在页面添加一个a标签： <a href="#/manual">manual</a> 然后点击这个链接，便会触发posts/:id对应的方法。

这里需要解释的是navigate后面的两个参数。trigger表示触发事件，如果为false，则只是url变化，并不会触发事件，replace表示url替换，而不是前进到这个url，意味着启用该参数，浏览器的history不会记录这个变动。

# 第五章 Backbonejs中的View实践

请切换至

	step-4 中 view.html 查看代码

前面介绍了存放数据的Model和Collection以及对用户行为进行路由分发的Router（针对链接）。这一节终于可以往页面上放点东西来玩玩了。这节就介绍了Backbone中得View这个模块。Backbone的View是用来显示你的model中的数据到页面的，同时它也可用来监听DOM上的事件然后做出响应。但是这里要提一句的是，相比于Angularjs中model变化之后页面数据自动变化的特性，Backbone要手动来处理。至于这两种方式的对比，各有优劣，可以暂时不关心。

下面依然是通过几个示例来介绍下view的功能,首先给出页面的基本模板：

	<!DOCTYPE html>
	<html>
	<head>
	    <title>backbone view</title>
	</head>
	<body>
	    <script src="node_modules/jquery/dist/jquery.js"></script>
	    <script src="node_modules/underscore/underscore.js"></script>
	    <script src="node_modules/backbone/backbone.js"></script>
	    <script>
	    (function ($){
		//此处添加下面的试验代码
	    })(jQuery);
	    </script>
	</body>
	</html>

## 5.1 一个简单的view

	var SearchView = Backbone.View.extend({
	    initialize: function(){
	        alert('init a SearchView');
	    }
	});
	var searchView = new SearchView();

是不是觉得很没有技术含量，所有的模块定义都一样。

## 5.2 el属性

这个属性用来引用DOM中的某个元素，每一个Backbone的view都会有这么个属性，如果没有显示声明，Backbone会默认的构造一个，表示一个空的div元素。el标签可以在定义view的时候在属性中声明，也可以在实例化view的时候通过参数传递。

	var SearchView = Backbone.View.extend({
	    initialize: function(){
	        alert('init a SearchView');
	    }
	});
	
	var searchView = new SearchView({el: $("#search_container")});

这段代码简单的演示了在实例化的时候传递el属性给View。下面我们来看看模板的渲染。

	var SearchView = Backbone.View.extend({
	    initialize: function(){
	    },
	    render: function(context) {
	        //使用underscore这个库，来编译模板
	        var template = _.template($("#search_template").html());
	        //加载模板到对应的el属性中
	        $(this.el).html(template(context));
	    }
	});
	var searchView = new SearchView({el: $("#search_container")});
	
	//这个reander的方法可以放到view的构造函数中
	//这样初始化时就会自动渲染
	searchView.render({search_label: "搜索渲染"});

运行页面之后，会发现script模板中的html代码已经添加到了我们定义的div中。

这里面需要注意的是在模板中定义的所有变量必须在render的时候传递参数过去，不然就会报错。 关于el还有一个东西叫做$el,这个东西是对view中元素的缓存。

## 5.3 再来看view中event的使用

页面上的操作除了可以由之前的router来处理之外，在一个view中定义元素，还可以使用event来进行事件绑定。这里要注意的是在view中定义的dom元素是指你el标签所定义的那一部分dom节点，event进行事件绑定时会在该节点范围内查找。

来，继续看代码。

	var SearchView = Backbone.View.extend({
	    el: "#search_container",
	
	    initialize: function(){
	        this.render({search_label: "搜索按钮"});
	    },
	    render: function(context) {
	        //使用underscore这个库，来编译模板
	        var template = _.template($("#search_template").html());
	        //加载模板到对应的el属性中
	        $(this.el).html(template(context));
	    },
	
	    events:{  //就是在这里绑定的
	        //定义类型为button的input标签的点击事件，触发函数doSearch
	        'click input[type=button]' : 'doSearch'
	
	    },
	
	    doSearch: function(event){
	        alert("search for " + $("#search_input").val());
	    }
	
	});
	
	var searchView = new SearchView();

自己运行下，是不是比写$("input[type=button]").bind('click',function(){})好看多了。


## 5.4 View中的模板

上面已经简单的演示了模板的用法，如果你用过django模板的话，你会发现模板差不多都是那么回事。上面只是简单的单个变量的渲染，那么逻辑部分怎么处理呢，下面来看下。

把最开始定义的模板中的内容换成下面这个。

	<ul>
	<% _.each(labels, function(name) { %>
	    <% if(name != "label2") {%>
	    <li><%= name %></li>
	    <% } %>
	<% }); %>
	</ul>

下面是js代码
	
	var SearchView = Backbone.View.extend({
	    el: "#search_container",
	
	    initialize: function(){
	        var labels = ['label1', 'label2', 'label3'];
	        this.render({labels: labels});
	    },
	
	    render: function(context) {
	        //使用underscore这个库，来编译模板
	        var template = _.template($("#search_template").html());
	        //加载模板到对应的el属性中
	        $(this.el).html(template(context));
	    },
	
	});
	
	var searchView = new SearchView();

再次运行，有木有觉得还不错，模板中使用的就基本的js语法。

总结一下，关于view中的东西就介绍这么多，文档上还有几个其他的属性，不过大体用法都一致。在以后的实践中用到在介绍。

# 第六章 实战演练：todos分析

请切换至

	step-5 中 index.html 查看代码

经过前面的几篇文章，Backbone中的Model, Collection，Router，View，都简单的介绍了一下，我觉得看完这几篇文章，差不多就能开始使用Backbone来做东西了，所有的项目无外乎对这几个模块的使用。不过对于实际项目经验少些的同学，要拿起来用估计会有些麻烦。因此这里就先找个现成的案例分析一下。

## 6.1 获取代码

todos的代码这里下载：[https://github.com/jashkenas/backbone/](https://github.com/jashkenas/backbone/) 
建议自己clone一份到本地。
线上的地址是：[http://backbonejs.org/examples/todos/index.html](http://backbonejs.org/examples/todos/index.html)

用浏览器打开index.html文件，推荐使用chome浏览器，就可以看到和官网一样的界面了。关键代码都在todos.js这个文件里。

![todo images](https://camo.githubusercontent.com/0152ae81d2a5ffc5682bfad0a81c6c3eff7766b6/687474703a2f2f7468653566697265626c6f672e62302e7570616979756e2e636f6d2f73746174696366696c652f746f646f732e706e67)

从这个界面我们可以总结出来,下面这些功能:

	* 任务管理
	    添加任务
	    修改任务
	    删除任务
	* 统计
	    任务总计
	    已完成数目

这个项目仅仅是在web端运行的，没有服务器进行支持，因此在项目中使用了一个叫做backbone-localstorage的js库，用来把数据存储到前端。

## 6.2 路由配置
	
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

##6.3 页面布局html代码

	<!doctype html>
	<html lang="en" data-framework="backbonejs">
		<head>
			<meta charset="utf-8">
			<title>Backbone.js • TodoMVC</title>
			<link rel="stylesheet" href="node_modules/todomvc-common/base.css">
			<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
		</head>
		<body>
			<section class="todoapp">
				<header class="header">
					<h1>todos</h1>
					<input class="new-todo" placeholder="What needs to be done?" autofocus>
				</header>
				<section class="main">
					<input class="toggle-all" type="checkbox">
					<label for="toggle-all">Mark all as complete</label>
					<ul class="todo-list"></ul>
				</section>
				<footer class="footer"></footer>
			</section>
			<script src="node_modules/todomvc-common/base.js"></script>
			<script src="node_modules/jquery/dist/jquery.js"></script>
			<script src="node_modules/underscore/underscore.js"></script>
			<script src="node_modules/backbone/backbone.js"></script>
			<script src="node_modules/backbone.localstorage/backbone.localStorage.js"></script>
			<script src="js/models/todo.js"></script>
			<script src="js/collections/todos.js"></script>
			<script src="js/views/todo-view.js"></script>
			<script src="js/views/app-view.js"></script>
			<script src="js/routers/router.js"></script>
			<script src="js/app.js"></script>
		</body>
	</html>


## 6.4从模型下手

请切换至

	step-6 中 index.html 查看代码

因为Backbone为MVC模式，根据对这种模式的使用经验，我们从模型开始分析。首先我们来看Model部分的代码:

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


这段代码是很好理解的，不过我依然是画蛇添足的加上了一些注释。这个Todo显然就是对应页面上的每一个任务条目。那么显然应该有一个collection来统治（管理）所有的任务，所以再来看collection：

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

collection的主要功能有以下几个：
	
	1、获取完成的任务;
	2、获取未完成的任务;
	3、获取下一个要插入数据的序号;
	4、按序存放Todo对象。

# 第七章 实战演练：todos分析 View的应用

请切换至

	step-7 中 index.html 查看代码

在上一篇文章中我们把todos这个实例的数据模型进行了简单的分析，有关于数据模型的操作也都知道了。接着我们来看剩下的两个view的模型，以及它们对页面的操作。

## 7.1 为什么要两个view

首先要分析下，这俩view是用来干嘛的。有人可能会问了，这里不就是一个页面吗？一个view掌控全局不就完了？

我觉得这就是新手和老手的主要区别之一，喜欢在一个方法里面搞定一切，喜欢把东西都拧到一块去，觉得这样看起来容易。熟不知，这样的代码对于日后的扩展会造成很大的麻烦。因此我们需要学习下优秀的设计，从好的代码中汲取营养。

这里面的精华就是，将对数据的操作和对页面的操作进行分离，也就是现在代码里面TodoView和AppView。前者的作用是对把Model中的数据渲染到模板中;后者是对已经渲染好的数据进行处理。两者各有分工，TodoView可以看做是加工后的数据，这个数据就是待使用的html数据。

## 7.2 TodoView的代码分析

TodoView是和Model一对一的关系，在页面上一个View也就展示为一个item。除此之外，每个view上还有其他的功能，比如编辑模式，展示模式，还有对用户的输入的监听。详细还是来看下代码：

	/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
	var app = app || {};
	
	(function ($) {
		'use strict';
	
		// Todo Item View
		// --------------
	
		// The DOM element for a todo item...
		app.TodoView = Backbone.View.extend({
			//下面这个标签的作用是，把template模板中获取到的html代码放到这标签中。
			tagName:  'li',
	
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
					this.model.save({ title: trimmedValue });
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


## 7.3 AppView的代码分析

再来看AppView，功能是显示所有任务列表，显示整体的列表状态（如：完成多少，未完成多少）

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
				this.listenTo(app.todos, 'all', _.debounce(this.render, 0));
	
				// Suppresses 'add' events with {reset: true} and prevents the app view
				// from being re-rendered for every model. Only renders when the 'reset'
				// event is triggered at the end of the fetch.
				app.todos.fetch({reset: true});
			},
	
			// 更改当前任务列表的状态
			render: function () {
				var completed = app.todos.completed().length;
				var remaining = app.todos.remaining().length;
				console.log('completed'+ completed);
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
				var view = new app.TodoView({ model: todo });
				this.$list.append(view.render().el);
			},
	
			// 首先清空ul#todo-list中的数据，把Todos中的所有数据渲染到页面,页面加载的时候用到
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

## 7.5 实例化appview

	/*global $ */
	/*jshint unused:false */
	var app = app || {};
	var ENTER_KEY = 13;
	var ESC_KEY = 27;
	
	$(function () {
		'use strict';
	
		// 实例化app,就会调用构造函数，app.AppView 的initialize；
		new app.AppView();
	});


## 7.4 页面模板分析

请切换至

	step-8 中 index.html 查看代码

在前几篇的view介绍中我们已经认识过了简单的模板使用，以及变量参数的传递，如：

	<script type="text/template" id="item-template">
			<div class="view">
				<input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
				<label><%- title %></label>
				<button class="edit-btn"></button>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="<%- title %>">
		</script>
		<script type="text/template" id="stats-template">
			<span class="todo-count"><strong><%= remaining %></strong> <%= remaining === 1 ? 'item' : 'items' %> left</span>
			<ul class="filters">
				<li>
					<a class="selected" href="#/">All</a>
				</li>
				<li>
					<a href="#/active">Active</a>
				</li>
				<li>
					<a href="#/completed">Completed</a>
				</li>
			</ul>
			<% if (completed) { %>
			<span style="float: right"><%= completed %></span>
			<button class="clear-completed">Clear completed</button>
			<% } %>
		</script>

文章中我们了解到在todos这个实例中，view的使用，以及具体的TodoView和AppView中各个函数的作用，这意味着所有的肉和菜都已经放到你碗里了，下面就是如何吃下去的问题了

# 第八章 实战演练：todos分析 总结

在前两篇文章中，我们已经对这个todos的功能、数据模型以及各个模块的实现细节进行了分析，这篇文章我们要对前面的分析进行一个整合。

首先让我们来回顾一下我们分析的流程：1. 先对页面功能进行了分析；2. 然后又分析了数据模型；3. 最后又对view的功能和代码进行了详解。你是不是觉得这个分析里面少了点什么？没错，就知道经验丰富的你已经看出来了，这里面少了对于流程的分析。这篇文章就对整体流程进行分析。

所以从我的分析中可以看的出来，我是先对各个原材料进行分析，然后再整体的分析（当然前提是我是理解流程的），这并不是分析代码的唯一方法，有时我也会采用跟着流程分析代码的方法。当然还有很多其他的分析方法，大家都有自己的套路嘛。

和桌面应用项目的分析一样，网站的入口点就在于网页加载的时候。对于todos，自然就是在页面加载完之后执行的操作了，然后就看到下面的代码。

首先是对AppView的一个实例化：
	var App = new AppView;

实例化，自然就会调用构造函数：
	
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
			this.listenTo(app.todos, 'all', _.debounce(this.render, 0));

			// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			app.todos.fetch({reset: true});
		},

注意其中的Todos.fetch()方法，前面说过，这个项目是在客户端保存数据，所以使用fetch方法并不会发送请求到服务器。另外在前面关于collection的单独讲解中我们也介绍了fetch执行完成之后，会调用set（默认）或者reset（需要手动设置 {reset: true} ）。所以在没有指明fetch的reset参数的情况下，backbonejs的Collection中的set方法会遍历Todos的内容并且调用add方法。

在initialize中我们绑定了add到addOne上，因此在fetch的时候会Backbonejs会帮我们调用addOne（其实也是在collection的set方法中）。和collection中的set类似的，我们可以自定义reset方法，自行来处理fetch到得数据，但是需要在fetch时手动添加reset参数。

这里先来看下我们绑定到reset上的addAll方法是如何处理fetch过来的数据的:

	// 添加一个任务到页面id为todo-list的ul中
		addOne: function (todo) {
			var view = new app.TodoView({ model: todo });
			this.$list.append(view.render().el);
		},

		// 首先清空ul#todo-list中的数据，把Todos中的所有数据渲染到页面,页面加载的时候用到
		addAll: function () {
			this.$list.html('');
			app.todos.each(this.addOne, this);
		},

在addAll中调用addOne方法，关于Todos.each很好理解，就是语法糖（简化的for循环）。关于addOne方法的细节下面介绍。

然后再来看添加任务的流程，一个良好的代码命名风格始终是让人满心欢喜的。因此很显然，添加一个任务，自然就是addOne,其实你看events中的绑定也能知道，先看一下绑定：

	// 绑定dom节点上的事件
	events: {
		'keypress .new-todo': 'createOnEnter',
		'click .clear-completed': 'clearCompleted',
		'click .toggle-all': 'toggleAllComplete'
	},
这里并没有addOne方法的绑定，但是却有createOnEnter，语意其实一样的。来看主线，createOnEnter这个方法：

	//创建一个任务的方法，使用backbone.collection的create方法。
    //将数据保存到localStorage,这是一个html5的js库。
    //需要浏览器支持html5才能用。
		createOnEnter: function (e) {
			if (e.which === ENTER_KEY && this.$input.val().trim()) {
				//创建一个对象之后会在backbone中动态调用Todos的add方法，该方法已绑定addOne。
				app.todos.create(this.newAttributes());
				this.$input.val('');
			}
		},

注释已写明，Todos.create会调用addOne这个方法。由此顺理成章的来到addOne里面：

	// 添加一个任务到页面id为todo-list的ul中
		addOne: function (todo) {
			var view = new app.TodoView({ model: todo });
			this.$list.append(view.render().el);
		},

在里面实例化了一个TodoView类，前面我们说过，这个类是主管各个任务的显示的。具体代码就不细说了。

有了添加再来看更新，关于单个任务的操作，我们直接找TodoView就ok了。所以直接找到

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

其中的edit事件的绑定就是更新的一个开头，而updateOnEnter就是更新的具体动作。所以只要搞清楚这俩方法的作用一切就明了了。这里同样不用细说。

在往后还有删除一条记录以及清楚已有记录的功能，根据上面的分析过程，我想大家都很容易的去‘顺藤模瓜’。