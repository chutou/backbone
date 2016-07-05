# 第一章 Hello Backbonejs

----------
## 1.1 基础概念

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

来看完整的代码:

请切换至

	step-0 中 helloworld.html

# 第二章 Backbonejs中的Model实践
--------

上一章主要是通过简单的代码对Backbonejs做了一个概括的展示，这一章开始从Model层说起，详细解释Backbonejs中的Model这个东西。

对于Model这一部分，其官网是这么说的：“Model是js应用的核心，包括基础的数据以及围绕着这些数据的逻辑：数据转换、验证、属性计算和访问控制”。这句话基本上高度概括了Model在一个项目中的作用。实际上，不仅仅是js应用，在任何以数据收集和处理的项目中Model都是很重要的一块内容。

Model这个概念在我的印象中是来自于MVC这个东西，Model在其中的作用，除了是对业务中实体对象的抽象，另外的作用就是做持久化，所谓持久化就是把数据存储到磁盘上——文件形式、数据库形式。在web端也有对应的操作，比如存入LocalStorage，或者Cookie。

在web端，Model还有一个重要的功能就是和服务器端进行数据交互，就像是服务器端的程序需要和数据库交互一样。因此Model应该是携带数据流窜于各个模块之间的东西。

下面让我们通过一个一个的实例来逐步了解Model。

先定义一个页面结构，实践时须在注释的地方填上各小节的代码

请切换至

	step-1 中 model.html
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

请切换至

	step-2 中 collection.html


# 第四章 Backbonejs中的Router实践
--------

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

	step-3 中 router.html

# 第五章 Backbonejs中的View实践

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