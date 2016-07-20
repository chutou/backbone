title: backbone 入门
speaker: 周文勇
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css

[slide]

# Backbone 入门
## 演讲者：周文勇
[slide]

## 什么是backbone
###Backbone是一个轻量级的前端MVC框架，用于结构化管理页面中的大量JS，建立与服务器、视图间的无缝连接，为构建复杂的应用提供基础框架
主要特点及特性

- 轻量级-16kb,加上信赖库,29kb
- MVC结构化
- 继承机制
- 建立与服务器的无缝连接
- 界面事件管理
- 轻量级模板解析
- 自定义事件管理
- 路由器

[slide]

界面事件管理
```

	events: {  
    // 单击id为”save”的元素时，执行视图的add方法  
    'click #save': 'add',  
    'mousedown .button': 'show',  
    'mouseover .button': 'hide'  
	}
```
[slide]

轻量级模板解析
```

	<ul>  
    <% for(var i = 0; i < len; i++) { %>  
    <li><%=data[i].title%></li>  
    <% } %>  
	</li>  
```

[slide]

自定义事件管理
- on 将一个函数绑定到对象的某个事件中
- off 移除对象某个事件中已绑定的所有函数
- tigger 触发对象的某个事件

```

	// 创建一个Model的实例
	var m = new Backbone.Model();
	
	// 将监听函数绑定到m对象的自定义事件custom中
	m.on('custom', function(index) {
	    // 监听函数接收并显示参数index
	    alert(index);
	});
	
	// 循环触发m对象的custom事件
	for(var i = 0; i < 3; i++) {
	    m.trigger('custom', i);
	}
	
	// 从m对象的custom事件中移除已绑定的所有监听函数
	m.off('custom');
	
	// 试着再次触发custom事件
	m.trigger('custom', i);
```

[slide]

```

	// 创建一个Model的实例
	var m = new Backbone.Model();
	
	// 将监听函数绑定到m对象的all事件中
	m.on('all', function() {
	    alert('all');
	});
	// 将监听函数绑定到m对象的自定义事件show中
	m.on('show', function() {
	    alert('show title');
	});
	// 将另一个监听函数绑定到m对象的自定义事件show中
	m.on('show', function() {
	    alert('show content');
	});
	// 将监听函数绑定到m对象的自定义事件hide中
	m.on('hide', function() {
	    alert('hide');
	});
	
	// 触发m对象的show事件和hide事件
	m.trigger('show');
	m.trigger('hide');

```

[slide]

路由器

```

	var CustomRouter = Backbone.Router.extend({  
	    routes : {  
	        '' : 'index', // 当URL Hash在根目录时执行index方法：url#  
	        'list' : 'getList', // 当URL Hash在list节点时执行getList方法：url#list  
	        'detail/:id' : 'query', // 当URL Hash在detail节点时执行query方法，并将detail后的数据作为参数传递给query方法：url#list/1001  
	        '*error' : 'showError' // 当URL Hash不匹配以上规则时, 执行error方法  
	    },  
	    index : function() {  
	        alert('index');  
	    },  
	    getList : function() {  
	        alert('getList');  
	    },  
	    query : function(id) {  
	        alert('query id: ' + id);  
	    },  
	    showError : function(error) {  
	        alert('error hash: ' + error);  
	    },  
	});  
	  
	var custom = new CustomRouter();  
	Backbone.history.start();  
```
[slide]

## Underscore 信赖库 

- 改变命名空间

```
	var _ = '自定义变量';
	// Underscore对象  
    console.dir(_);  
    // 将Underscore对象重命名为us, 后面都通过us来访问和创建Underscore对象  
    var us = _.noConflict();  
    // 输出"自定义变量"  
    console.dir(_);
	
```

[slide]

## Underscore 信赖库 

- 链式操作

```
	//jquery
	$('a')  
    .css('position', 'relative')  
    .attr('href', '#')  
    .show();
	//underscore
	//Underscore同样支持链式操作，但你需要先调用chain()方法进行声明：	
	var arr = [10, 20, 30];  
	_(arr)  
	    .chain()  
	    .map(function(item){ return item++; })  
	    .first()  
	    .value(); 
	  
	
```

[slide]

## Underscore 信赖库 

- 模板解析 _.template模板函数只能解析3种模板标签（这比Smarty、JSTL要简单得多）：
1. <%  %>：用于包含JavaScript代码，这些代码将在渲染数据时被执行。
2. <%= %>：用于输出数据，可以是一个变量、某个对象的属性、或函数调用（将输出函数的返回值）。
3. <%- %>：用于输出数据，同时会将数据中包含的HTML字符转换为实体形式（例如它会将双引号转换为&quot;形式），用于避免XSS攻击。

[slide]

```
	<!-- 用于显示渲染后的标签 -->  
	<ul id="element"></ul>  
	  
	<!-- 定义模板，将模板内容放到一个script标签中 -->  
	<script type="text/template" id="tpl">  
	    <% for(var i = 0; i < list.length; i++) { %>  
	        <% var item = list[i] %>  
	        <li>  
	            <span><%=item.firstName%> <%=item.lastName%></span>  
	            <span><%-item.city%></span>  
	        </li>  
	    <% } %>  
	</script>  
	<script type="text/javascript" src="underscore/underscore-min.js"></script>  
	<script type="text/javascript">  
	    // 获取渲染元素和模板内容  
	    var element = $('#element'),  
	        tpl = $('#tpl').html();  
	      
	    // 创建数据, 这些数据可能是你从服务器获取的  
	    var data = {  
	        list: [  
	            {firstName: '<a href="#">Zhang</a>', lastName: 'San', city: 'Shanghai'},  
	            {firstName: 'Li', lastName: 'Si', city: '<a href="#">Beijing</a>'},  
	            {firstName: 'Wang', lastName: 'Wu', city: 'Guangzhou'},  
	            {firstName: 'Zhao', lastName: 'Liu', city: 'Shenzhen'}  
	        ]  
	    }  
	      
	    // 解析模板, 返回解析后的内容  
	    var html = _.template(tpl, data);  
	    // 将解析后的内容填充到渲染元素  
	    element.html(html); 

		// 更高效的调用方式
		// 解析模板, 返回解析后的内容  
		/* var render = _.template(tpl);  
		var html = render(data);  
		// 将解析后的内容填充到渲染元素  
		element.html(html); */
	</script>   
	
```
[slide]

- 自定义标签

```
	_.templateSettings = {  
	    evaluate : /\{%([\s\S]+?)\%\}/g,  
	    interpolate : /\{%=([\s\S]+?)\%\}/g,  
	    escape : /\{%-([\s\S]+?)%\}/g  
	}  
```

[slide]

## Backbone 模块 

- Model 数据模型
- collection 模型集合器
- Router 路由器
- History 开启历史管理
- View 视图(含事件行为和渲染页面)
- Events 事件驱动方法

[slide]

## 直接创建对象

```javascript
var model = new Backbone.Model();

var collection = new Backbone.Collection();

var view = new Backbone.View();

```
[slide]
## 创建数据模型

```

	// 定义Book模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : 'unknown',
	        author : 'unknown',
	        price : 0
	    }
	});
	
	// 实例化模型对象
	var javabook = new Book({
	    name : 'Thinking in Java',
	    author : 'Bruce Eckel',
	    price : 395.70
	});

```

[slide]
## 修改数据模型

```

	// 定义Book模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : 'unknown',
	        author : 'unknown',
	        price : 0
	    }
	});
	
	// 实例化模型对象
	var javabook = new Book();
	
	// 监听模型"change"事件
	javabook.on('change', function(model) {
	    console.log('change事件被触发');
	});
	// 监听模型"change:name"事件
	javabook.on('change:name', function(model, value) {
	    console.log('change:name事件被触发');
	});
	// 监听模型"change:author"事件
	javabook.on('change:author', function(model, value) {
	    console.log('change:author事件被触发');
	});
	// 通过set()方法设置数据
	javabook.set({
	    name : 'Thinking in Java',
	    author : 'unknown',
	    price : 395.70
	});
	
	// 控制台输出结果:
	// change:name事件被触发
	// change事件被触发

```

[slide]

## 删除数据

- unset()方法用于删除对象中指定的属性和数据
- clear()方法用于删除模型中所有的属性和数据

```

	// 定义Book模型类
	var Book = Backbone.Model.extend();
	
	// 实例化模型对象
	var javabook = new Book({
	    name : 'Java7入门经典',
	    author : 'Ivor Horton',
	    price : 88.50
	});
	
	// 输出: Java7入门经典
	console.log(javabook.get('name'));
	
	// 删除对象name属性
	javabook.unset('name');
	
	// 输出: undefined
	console.log(javabook.get('name'));
	当我们对模型的name属性执行unset()方法后，模型内部会使用delete关键字将name属性从对象中删除。
	
	clear()方法与unset()方法执行过程类似，但clear()方法会删除模型中的所有数据，例如：
	// 定义Book模型类
	var Book = Backbone.Model.extend();
	
	// 实例化模型对象
	var javabook = new Book({
	    name : 'Java7入门经典',
	    author : 'Ivor Horton',
	    price : 88.50
	});
	
	// 删除对象name属性
	javabook.clear();
	
	// 以下均输出: undefined
	console.log(javabook.get('name'));
	console.log(javabook.get('author'));
	console.log(javabook.get('price'));

```

[slide]

## 获取上一个状态的数据

```

	// 定义Book模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : 'unknown',
	        author : 'unknown',
	        price : 0
	    }
	});
	
	// 实例化模型对象
	var javabook = new Book();
	
	// 监听"change:price"事件
	javabook.on('change:price', function(model, value) {
	    var price = model.get('price');
		//previous()方法接收一个属性名，并返回该属性在修改之前的状态；
		//previousAttributes()方法返回一个对象，该对象包含上一个状态的所有数据。
		
		// var price = model.previous('price'); 
	
	    if(price < value) {
	        console.log('价格上涨了' + (value - price) + '元.');
	    } else if(price > value) {
	        console.log('价格下降了' + (value - price) + '元.');
	    } else {
	        console.log('价格没有发生变化.');
	    }
	});
	// 设置新的价格
	javabook.set('price', 50);
	
	// 控制台输出结果:
	// 价格没有发生变化.

```

[slide]

## 将模型数据同步到服务器
- save()方法：在服务器创建或修改数据
- fetch()方法：从服务器获取数据
- destroy()方法：从服务器移除数据

```
	// 定义Book模型类
	var Book = Backbone.Model.extend({
	    urlRoot : '/service'
	});
	
	// 创建实例
	var javabook = new Book({
	    id : 1001,
	    name : 'Thinking in Java',
	    author : 'Bruce Eckel',
	    price : 395.70
	});
	
	// 保存数据
	javabook.save();

```

[slide]

## 模型加入到集合

```javascript
var model_1 = new Backbone.Model({'name':'hello'});
var model_2 = new Backbone.Model({'name':'hi'});

var models = new Backbone.Collection();
models.add( model_1 );
models.add( model_2 );

alert( JSON.stringify(models) );
```

[slide]
## 创建集合

```

	// 定义模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : ''
	    }
	});
	
	// 定义集合类
	var BookList = Backbone.Collection.extend({
	    model : Book
	});
	
	// 创建一系列模型对象
	var book1 = new Book({
	    name : 'Effective Java中文版(第2版)'
	});
	var book2 = new Book({
	    name : 'JAVA核心技术卷II：高级特性（原书第8版）'
	});
	var book3 = new Book({
	    name : '精通Hibernate：Java对象持久化技术详解（第2版）'
	});
	
	// 创建集合对象
	var books = new BookList([book1, book2, book3]);

	//第2种方法
	/*var book2 = book1.clone();  
	book2.set('name', 'JAVA核心技术卷II：高级特性（原书第8版）');  
	  
	var book3 = book1.clone();  
	book3.set('name', '精通Hibernate：Java对象持久化技术详解（第2版）'); */

	// 第3种方法
	
	/*var models = [{  
	    name : 'Effective Java中文版(第2版)'  
	}, {  
	    name : 'JAVA核心技术卷II：高级特性（原书第8版）'  
	}, {  
	    name : '精通Hibernate：Java对象持久化技术详解（第2版）'  
	}];  
	  
	// 创建集合对象  
	var books = new BookList(models); */
	
	// 第四种方式
	
	// 创建集合对象  
	// 定义模型类  
	/*var Book = Backbone.Model.extend({  
	    defaults : {  
	        name : ''  
	    }  
	});  
	  
	var models = [{  
	    name : 'Effective Java中文版(第2版)'  
	}, {  
	    name : 'JAVA核心技术卷II：高级特性（原书第8版）'  
	}, {  
	    name : '精通Hibernate：Java对象持久化技术详解（第2版）'  
	}];  
	  
	// 创建集合对象  
	var books = new Backbone.Collection(models, {  
	    model : Book  
	}); */
	
	
	

```

[slide]
## 添加模型

- add()：向集合中的指定位置插入模型，如果没有指定位置，默认追加到集合尾部
- push()：将模型追加到集合尾部（与add方法的实现相同）
- unshift()：将模型插入到集合头部

```
	// 定义模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : '',
	        price : 0
	    }
	});
	
	// 创建集合对象
	var books = new Backbone.Collection(null, {
	    model : Book
	});
	
	books.add({
	    name : '构建高性能Web站点',
	    price : 56.30
	});
	
	books.push({
	    name : '深入分析Java Web技术内幕',
	    price : 51.80
	});
	
	books.unshift({
	    name : '编写高质量代码:Web前端开发修炼之道',
	    price : 36.80
	});
	
	books.push({
	    name : '基于MVC的JavaScript Web富应用开发',
	    price : 42.50
	}, {
	    at : 1
	});
	
	books.unshift({
	    name : 'RESTful Web Services Cookbook中文版',
	    price : 44.30
	
	}, {
	    at : 2
	});
	
	// 在控制台输出集合中的模型列表
	console.dir(books.models);

```

[slide]
## 删除数据

- add()：向集合中的指定位置插入模型，如果没有指定位置，默认追加到集合尾部
- push()：将模型追加到集合尾部（与add方法的实现相同）
- unshift()：将模型插入到集合头部

```

	// 定义模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : '',
	        price : 0
	    }
	});
	
	// 定义初始化数据
	var data = [{
	    name : '构建高性能Web站点',
	    price : 56.30
	}, {
	    name : '深入分析Java Web技术内幕',
	    price : 51.80
	}, {
	    name : '编写高质量代码:Web前端开发修炼之道',
	    price : 36.80
	}, {
	    name : '基于MVC的JavaScript Web富应用开发',
	    price : 42.50
	}, {
	    name : 'RESTful Web Services Cookbook中文版',
	    price : 44.30
	
	}]
	
	// 创建集合对象
	var books = new Backbone.Collection(data, {
	    model : Book
	});
	
	books.remove(books.models[2]);
	books.pop();
	books.shift();
	
	// 在控制台输出集合中的模型列表
	console.dir(books.models);

```

[slide]
## 查找模型

- get()：根据模型的唯一标识（id）查找模型对象
- at()：查找集合中指定位置的模型对象
- where()：根据数据对集合的模型进行筛选

```

	// 定义模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : '',
	        price : 0
	    }
	});
	
	// 定义初始化数据
	var data = [{
	    id : 1001,
	    name : '构建高性能Web站点',
	    price : 56.30
	}, {
	    id : 1002,
	    name : '深入分析Java Web技术内幕',
	    price : 51.80
	}, {
	    id : 1003,
	    name : '编写高质量代码:Web前端开发修炼之道',
	    price : 36.80
	}, {
	    id : 1004,
	    name : '基于MVC的JavaScript Web富应用开发',
	    price : 42.50
	}, {
	    id : 1005,
	    name : 'RESTful Web Services Cookbook中文版',
	    price : 44.30
	}]
	
	// 创建集合对象
	var books = new Backbone.Collection(data, {
	    model : Book
	});
	
	// 根据id和cid查找模型对象
	var book1 = books.get(1001);
	var book2 = books.getByCid('c2');
	// 根据索引查找模型对象  
	var book3 = books.at(1);  
	  
	// 在控制台输出模型  
	console.dir(book3); 
	// 根据price从集合中查找模型  
	var book4 = books.where({  
	    price : 51.80  
	}); 
	
	// 在控制台输出模型
	console.dir(book1);
	console.dir(book2);

```

[slide]
## 自动排序

- get()：根据模型的唯一标识（id）查找模型对象
- getByCid()：根据模型的cid查找模型对象
- at()：查找集合中指定位置的模型对象
- where()：根据数据对集合的模型进行筛选

```

	// 定义模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : '',
	        price : 0
	    }
	});
	
	// 创建集合对象
	var books = new Backbone.Collection(null, {
	    model : Book,
	    comparator : function(m1, m2) {
	        var price1 = m1.get('price');
	        var price2 = m2.get('price');
	
	        if(price1 > price2) {
	            return 1;
	        } else {
	            return 0;
	        }
	    }
	});
	
	books.add({
	    name : '构建高性能Web站点',
	    price : 56.30
	});
	
	books.push({
	    name : '深入分析Java Web技术内幕',
	    price : 51.80
	});
	
	books.unshift({
	    name : '编写高质量代码:Web前端开发修炼之道',
	    price : 36.80
	});
	
	books.push({
	    name : '基于MVC的JavaScript Web富应用开发',
	    price : 42.50
	}, {
	    at : 1
	});
	
	books.unshift({
	    name : 'RESTful Web Services Cookbook中文版',
	    price : 44.30
	
	}, {
	    at : 2
	});
	
	// 在控制台输出集合中的模型列表
	console.dir(books.models);

```

[slide]
## 从服务器获取集合数据
Collection也提供了两个与服务器进行交互的方法：
- fetch()：用于从服务器接口获取集合的初始化数据，覆盖或追加到集合列表中
- create()：在集合中创建一个新的模型，并将其同步到服务器

```

	// 定义模型类
	var Book = Backbone.Model.extend({
	    defaults : {
	        name : '',
	        price : 0
	    }
	});
	
	// 定义集合类
	var BookList = Backbone.Collection.extend({
	    model : Book,
	    url : '/service'
	});
	
	// 创建集合对象, 并从服务器同步初始化数据
	var books = new BookList();
	books.fetch({
	    success: function(collection, resp) {
	        // 同步成功后在控制台输出集合中的模型列表
	        console.dir(collection.models);
	    }
	});

```

[slide]

## 定义和创建视图

```

	<div title="列表" style="color:red" id="list" class="listview"></div>
	<script type="text/javascript">
	    var ListView = Backbone.View.extend({
	        el : '#list'
	    });
	    var listview = new ListView();
	</script>

	<script type="text/javascript">
	    var ListView = Backbone.View.extend({
	        tagName : 'div',
	        className : 'listview',
	        id : 'list',
	        attributes : {
	            title : '列表',
	            style : 'color:red'
	        },
	        render : function() {
	            this.el.innerHTML = 'Hello World!';
	            document.body.appendChild(this.el);
	        }
	    });
	    var listview = new ListView();
	    listview.render();
	</script>

```


[slide]

## 处理DOM事件

```
	
	// jquery
	<p>
	    <input type="button" value="Create" id="create" />
	    <input type="button" value="Read" id="read" />
	    <input type="button" value="Update" id="update" />
	    <input type="button" value="Delete" id="delete" />
	</p>
	<script type="text/javascript">
	    function createData() {
	        // todo
	    }
	    function readData() {
	        // todo
	    }
	    function updateData() {
	        // todo
	    }
	    function deleteData() {
	        // todo
	    }
	
	    $('#create').on('click', createData);
	    $('#read').on('click', readData);
	    $('#update').on('click', updateData);
	    $('#delete').on('click', deleteData);
	</script>

	// backbone
	
	<p id="view">
	    <input type="button" value="Create" id="create" />
	    <input type="button" value="Read" id="read" />
	    <input type="button" value="Update" id="update" />
	    <input type="button" value="Delete" id="delete" />
	</p>
	<script type="text/javascript">
	    var MyView = Backbone.View.extend({
	        el : '#view',
	        events : {
	            'click #create' : 'createData',
	            'click #read' : 'readData',
	            'click #update' : 'updateData',
	            'click #delete' : 'deleteData'
	        },
	        createData : function() {
	            // todo
	        },
	        readData : function() {
	            // todo
	        },
	        updateData : function() {
	            // todo
	        },
	        deleteData : function() {
	            // todo
	        }
	    });
	    var view = new MyView();
	</script>
	
```

[slide]

## 渲染视图和数据
- render 重载render()方法

[slide]
## 路由控制

```

	var AppRouter = Backbone.Router.extend({
	    routes : {
	        '' : 'main',
	        'topic' : 'renderList',
	        'topic/:id' : 'renderDetail',
	        '*error' : 'renderError'
	    },
	    main : function() {
	        console.log('应用入口方法');
	    },
	    renderList : function() {
	        console.log('渲染列表方法');
	    },
	    renderDetail : function(id) {
	        console.log('渲染详情方法, id为: ' + id);
	    },
	    renderError : function(error) {
	        console.log('URL错误, 错误信息: ' + error);
	    }
	});
	
	var router = new AppRouter();
	Backbone.history.start();
	

	/*http://localhost/index.html // 输出：应用入口方法
	http://localhost/index.html#topic // 输出：渲染列表方法
	http://localhost/index.html#topic/1023 // 输出：渲染详情方法, id为:1023
	http://localhost/index.html#about // 输出：URL错误, 错误信息: about*/
```
[slide]
## 路由相关方法
- route() 可以调用Router.route()方法来动态添加路由规则及Action方法
- navigate() 手动输入触发的
- stop()方法 停止监听

```

	router.navigate('topic/1000', {
	    trigger: true
	});

```

[slide]

## 添加实例方法和静态方法

```javascript

      var Model =  Backbone.Model.extend({
        initializa : function(){ // 动态方法
          console.log('aaaaaaaaaaaa');
        }
      }, {
        aboutMe : function(){ //静态方法
          console.log('bbbbbbbbbbbb');
        }
      })
    var m = new Model；

```


[slide]

## 继承方式

```javascript
var Model =  Backbone.Model.extend({
	initializa : function(){ // 动态方法
		console.log('aaaaaaaaaaaa');
	}
});
var ChildModel = Model.extend({
	aboutMe : function(){
		console.log('bbbbbbbbbbbb');
	}
});

var model = new ChildModel;

model.initializa();
model.aboutMe();


```

[slide]

## 自定义事件

```javascript
var M = Backbone.Model.extend({
	defaults : {
		name : 'hello'
	},
	initialize : function(){  //初始化构造函数

		this.on('change:name',function(model){

			console.log(model);
			console.log(JSON.stringify(model));

		});

	}
});

var model = new M;
model.set('name','hi');

```
[slide]

## 模型与视图

```javascript
var M = Backbone.Model.extend({
		defaults : {
			name : 'hello'
		}
	});

	var V = Backbone.View.extend({

		initialize : function(){

			this.listenTo( this.model , 'change' , this.show );

		},
		show : function(model){
			$('body').append( '<div>'+ model.get('name') +'</div>' );
		}

	});


	var m = new M;
	var v = new V({model:m});
	m.set('name','hi');
```


[slide]

## 数据与服务

- 添加与修改

```javascript
Backbone.sync = function(method, model) {
	  alert(method + ": " + JSON.stringify(model));
	  model.id = 1;
};

var M = Backbone.Model.extend({
	defaults : {
		name : 'hello'
	},
	url : '/user'
});

var m = new M;
m.save();
m.save({name : 'hi'});

```
[slide]
 
- 获取

```javascript

Backbone.sync = function(method, model) {
	  alert(method + ": " + JSON.stringify(model));
};

var C = Backbone.Collection.extend({
	initialize : function(){
		this.on('reset',function(){
			alert(123);
		});
	}, 
	url: '/users'
});

var models = new C;
models.fetch();

```

[slide]

## 路由


```javascript
var Workspace = Backbone.Router.extend({

	routes: {
		"help":                 "help",    // #help
		"search/:query":        "search",  // #search/kiwis
		"search/:query/p:page": "search"   // #search/kiwis/p7
	},
	
	help: function() {
		alert(1);
	},
	
	search: function(query, page) {
		console.log(query);
		console.log(page);
	}

});

var w = new Workspace;
Backbone.history.start();

```

[slide]

## 事件委托

```javascript
var V =  Backbone.View.extend({
    el : 'ul',
    events: {
      "click li"                : "showLi",
      "click a"                : "showA",
    },

    showLi: function() {
      console.log('我是 li');
    },

    showA: function() {
     console.log('我是 A');
    }
});

  var view = new V;
```

[slide]

## 模板

```javascript
$(function(){

	var M = Backbone.Model.extend({
		defaults : {
			name : 'hello'
		}
	});
	
	var V = Backbone.View.extend({
			
		initialize : function(){
			
			this.listenTo( this.model , 'change' , this.show );
			
		},
		show : function(model){
			$('body').append( this.template(this.model.toJSON()) );
		},
		template: _.template($('#template').html())
		
	});
	
	
	var m = new M;
	var v = new V({model:m});
	m.set('name','hi');

});

<script type="text/template" id="template">
	<% _.each(name, function(name) { %>
		<div><%= name %></div>
	<% }) %>
</script>

```
[slide]

## 参考资料

[Backbone.js API中文文档](http://www.css88.com/doc/backbone/)

[Backbone.js入门教程第二版](http://www.kancloud.cn/kancloud/backbonejs-learning-note/49378)

