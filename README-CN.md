# Vue router modern

[![npm version](https://img.shields.io/npm/v/vue-router-modern.svg?style=flat-square)](https://www.npmjs.org/package/vue-router-modern)
[![npm downloads](https://img.shields.io/npm/dm/vue-router-modern.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vue-router-modern)

Vue.js的路由 - 轻松编写现代化的vue路由。

## 特性

- 支持子模块
- 优雅地编写现代化代码

## 安装

使用npm:

```bash
$ npm install vue-router-modern
```

使用yarn:

```bash
$ yarn add vue-router-modern
```

## 示例

基本使用:

```javascript
// 在vue-init生成的src/router/index.js文件中。
import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Router from 'vue-router-modern';

const router = Router.group(router => {
  router.get('/', HelloWorld, 'HelloWorld');
});

Vue.use(VueRouter);

export default new VueRouter({
  routes: router.parseRoutes(),
})
```

子模块使用:

```javascript
// 在vue-init生成的src/router/index.js文件中。
import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from 'vue-router-modern';
import HomeRouter from './modules/home.js';

const router = new Router();

router.registerChild(HomeRouter);

Vue.use(VueRouter);

export default new VueRouter({
  routes: router.parseRoutes(),
})


// 在src/router/modules/home.js文件中。
import Router from 'vue-router-modern';
import HelloWorld from '@/components/HelloWorld';

export default Router.get('/', HelloWorld, 'HelloWorld');
```

Page redirection:

```javascript
// 在vue-init生成的src/router/index.js文件中。
import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Router from 'vue-router-modern'

const router = Router.group(router => {
  router.get('/', HelloWorld, 'HelloWorld');

  router.redirect('/redirect_to_home', '/');
});

Vue.use(VueRouter);

export default new VueRouter({
  routes: router.parseRoutes()
})
```

## Router API

#### instance()

它将返回一个Router的实例。

#### get(path, component[, name, props, meta, alias])

最基本的路由定义方法。

#### getWithComponents(path, components[, name, props, meta, alias])

用于定义命名视图路由的方法。

#### redirect(path, components[, name, props, meta, alias])

用于定义重定向路由的方法。

#### group(callback)

这个方法用于定义子路由。

此方法的回调函数中的router参数是Router的实例。

示例: 

```javascript
// 用于子模块，它可以定义多个同类型的路由。
export default Router.group(router => {
  // 这个router参数是Router的实例
  router.get('/user', UserComponent);

  router.get('/user/:userId', UserDetailComponent); // 它不是user的子路由，是同级路由
}); 
// 上面代码类似于以下vue-router官方定义:
// [
//   {path: '/user', component: UserComponent},
//   {path: '/user/:userId', component: UserDetailComponent},
// ]
```


### 实例方法

下面将会列出可用方法。

#### get(path, component[, name, props, meta, alias])

最基本的路由定义方法。

#### getWithComponents(path, components[, name, props, meta, alias])

用于定义命名视图路由的方法。

示例:

```javascript
const router = Router.instance();

router.getWithComponents('example_for_named_views', {
  main: MainComponent,
  left: LeftCompoent,
  right: RightComponent,
});
```

#### redirect(path, redirectTo[, name])

用于定义重定向路由的方法。

#### group(callback)

这个方法用于定义子路由。

此方法的回调函数中的router参数是Router的实例。

示例: 

```javascript
const router = Router.instance();

router.get('/posts', PostHomeComponent)
      .group(router => {

        router.get(':id', PostDetailComponent) // 它是posts路由的子路由
        
        router.get('new', PostCreaterComponent) // 它是posts路由的子路由

      })
// 上面代码类似于以下vue-router官方定义:
// {
//   path: '/posts',
//   component: PostHomeComponent,
//   children: [
//     {path: '/user', component: UserComponent},
//     {path: '/user/:userId', component: UserDetailComponent},
//   ]
// }
```

## 贡献

你可以在此仓库中创建一个[pull requests](https://github.com/qiutuleng/vue-router-modern/pulls)。

期待你的想法或代码。

## Issues

如果你有任何问题，请在[Issues](https://github.com/qiutuleng/vue-router-modern/issues)中提出，我将会尽力为你解决。

## License

MIT
