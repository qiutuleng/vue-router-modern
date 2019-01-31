# Vue router modern

[![npm version](https://img.shields.io/npm/v/vue-router-modern.svg?style=flat-square)](https://www.npmjs.org/package/vue-router-modern)
[![npm downloads](https://img.shields.io/npm/dm/vue-router-modern.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vue-router-modern)

Vue.js 的路由 - 轻松编写现代化的 vue 路由。

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

### 基本使用

```javascript
// 在vue-init生成的src/router/index.js文件中。

import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Router from 'vue-router-modern';

const router = Router.group(router => {
  router.get('/', HelloWorld);
});

Vue.use(VueRouter);

export default new VueRouter({
  routes: router.routes(),
})
```

### 子模块

```javascript
// 在src/router/home.js文件中

import Router from 'vue-router-modern';
import HelloWorld from '@/components/HelloWorld';

export default Router.get('/', HelloWorld, 'HelloWorld');
```

```javascript
// 在vue-init生成的src/router/index.js文件中。

import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from 'vue-router-modern';
import HomeRouter from './modules/home.js';

const router = new Router();

router.register(HomeRouter);

Vue.use(VueRouter);

export default new VueRouter({
  routes: router.routes(),
})
```

### 页面重定向

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
  routes: router.routes()
})
```

## Router 类方法

#### instance()

它将返回一个Router的实例。

示例：

```javascript
const router = Router.instance();
```

#### get(path, component[, name, props, meta, alias])

最基本的路由定义方法。

示例：

```javascript
import HomeComponent from '@/components/Home'

const router = Router.get('/', HomeComponent);
```

#### getWithNamedComponents(path, components[, name, props, meta, alias])

用于定义命名视图路由的方法。

示例：

```javascript
import MainComponent from '@/components/example_for_named_views/Main';
import LeftComponent from '@/components/example_for_named_views/Left';
import RightComponent from '@/components/example_for_named_views/Right';

const router = Router.getWithNamedComponents('example_for_named_views', {
  main: MainComponent,
  left: LeftComponent,
  right: RightComponent,
});
```

#### redirect(path, components[, name, props, meta, alias])

用于定义重定向路由的方法。

示例：

```javascript
const router = Router.redirect('/redirect_to_home', '/');
```

#### group(callback)

这个方法用于定义子路由。

此方法的回调函数中的 router 参数是 `Router` 的实例。

示例： 

```javascript
// 基本使用。
import HomeComponent from '@/components/Home';

const router = Router.group(rotuer => {
  router.get('/', HomeComponent);
});
```

```javascript
// 用于子模块，它可以定义多个同类型的路由。
// 在 src/router/users.js 文件中

export default Router.group(router => {
  // router 参数是 Router 的实例。
  router.get('/user', UserComponent);

  router.get('/user/:userId', UserDetailComponent); // 它不是 user 的子路由，它是同级的路由
});
```


### Instance methods

下面将会列出可用方法。

#### routes()

生成官方格式的路由规则，用于实例化官方 `Vue Router`。

示例：

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

const router = new Router();

router.get('/', HelloWorld);

Vue.use(VueRouter);

export default new VueRouter({
  routes: router.routes(),
})
```

#### get(path, component[, name, props, meta, alias])

最基本的路由定义方法。

#### getWithNamedComponents(path, components[, name, props, meta, alias])

用于定义命名视图路由的方法。

示例：

```javascript
const router = Router.instance();

router.getWithNamedComponents('example_for_named_views', {
  main: MainComponent,
  left: LeftCompoent,
  right: RightComponent,
});
```

#### redirect(path, redirectTo[, name])

用于定义重定向路由的方法。

#### group(callback)

这个方法用于定义子路由。

此方法的回调函数中的 router 参数是 `Router` 的实例。

示例：

```javascript
const router = Router.instance();

router.get('/posts', PostHomeComponent)
      .group(router => {

        router.get(':id', PostDetailComponent) // 它是posts路由的子路由
        
        router.get('new', PostCreatorComponent) // 它是posts路由的子路由

      });

// 上面代码类似于以下 vue-router 官方定义：
// {
//   path: '/posts',
//   component: PostHomeComponent,
//   children: [
//     {path: '/user', component: UserComponent},
//     {path: '/user/:userId', component: UserDetailComponent},
//   ]
// }
```

#### register(router[, router2[, ...routerN]])

注册子路由，通常用于子模块。 参考子模块[示例](#示例)

示例：

```javascript
// 在 vue-init 生成的 src/router/index.js 文件中。

import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router-modern';
import UserRouter from './modules/user/index.js';
import PostRouter from './modules/post/index.js';

const router = Router.instance();

router.register(UserRouter, PostRouter)

Vue.use(VueRouter);

export default new VueRouter({
  routes: router.routes()
})
```

## 贡献

你可以在此仓库中创建一个 [pull requests](https://github.com/qiutuleng/vue-router-modern/pulls) 。

期待你的想法或代码。

## Issues

如果你有任何问题，请在 [Issues](https://github.com/qiutuleng/vue-router-modern/issues) 中提出，我将会尽力为你解决。

## License

MIT
