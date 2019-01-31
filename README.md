# Vue router modern

[![npm version](https://img.shields.io/npm/v/vue-router-modern.svg?style=flat-square)](https://www.npmjs.org/package/vue-router-modern)
[![npm downloads](https://img.shields.io/npm/dm/vue-router-modern.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vue-router-modern)

Router of Vue.js - Easily write modern vue routes.

[中文 / Chinese](./README.zh-CN.md)

## Features

- Support sub-module.
- Gracefully writing modern code.

## Installation

Using npm:

```bash
$ npm install vue-router-modern
```

Using yarn:

```bash
$ yarn add vue-router-modern
```

## Example

Basic using:

```javascript
// in src/router/index.js file generated by vue-init
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

Sub-module using:

```javascript
// in src/router/modules/home.js file
import Router from 'vue-router-modern';
import HelloWorld from '@/components/HelloWorld';

export default Router.get('/', HelloWorld, 'HelloWorld');
```

```javascript
// in src/router/index.js file generated by vue-init
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

Page redirection:

```javascript
// in src/router/index.js file generated by vue-init
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

## Router class methods

#### instance()

It will return an instance of Router.

Example:

```javascript
const router = Router.instance();
```

#### get(path, component[, name, props, meta, alias])

Basic route definition method.

Example:

```javascript
import HomeComponent from '@/components/Home'

const router = Router.get('/', HomeComponent);
```

#### getWithNamedComponents(path, components[, name, props, meta, alias])

The route definition method for named views.

Example:

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

The route definition method for redirecting.

Example:

```javascript
const router = Router.redirect('/redirect_to_home', '/');
```

#### group(callback)

Group method is used to define sub-routing.

The callback function has a `router` parameter of Router instance.

Example: 

```javascript
// For basic using.
import HomeComponent from '@/components/Home';

const router = Router.group(rotuer => {
  router.get('/', HomeComponent);
});
```

```javascript
// For sub-module using, It's can be define multiple routes of the same type
// in src/router/users.js

export default Router.group(router => {
  // The router parameter is a Router instance.
  router.get('/user', UserComponent);

  router.get('/user/:userId', UserDetailComponent); // It is not a sub-route of the user.
});
```


### Instance methods

#### routes()

Generate official routes rules.

Example:

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

The available instance methods are listed below.

#### get(path, component[, name, props, meta, alias])

Basic route definition method.

#### getWithNamedComponents(path, components[, name, props, meta, alias])

The route definition method for named views.

Example:

```javascript
const router = Router.instance();

router.getWithNamedComponents('example_for_named_views', {
  main: MainComponent,
  left: LeftCompoent,
  right: RightComponent,
});
```

#### redirect(path, redirectTo[, name])

The route definition method for redirecting.

#### group(callback)

Group method is used to define sub-routing.

The callback function has a `router` parameter of Router instance.

Example: 

```javascript
const router = Router.instance();

router.get('/posts', PostHomeComponent)
      .group(router => {

        router.get(':id', PostDetailComponent); // It's a sub-route for posts
        
        router.get('new', PostCreaterComponent); // Its' a sub-router for posts

      });

// The routes like this of vue-router official definition:
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

Register sub-routes, usually used for sub-modules. Reference sub-module [example](#example)

Example:
```javascript
// in src/router/index.js file generated by vue-init
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

## Contributing

You can create a [pull requests](https://github.com/qiutuleng/vue-router-modern/pulls) to this repository.

Welcome your ideas or code.

## Issues

If you have any questions, please ask your question in the [Issues](https://github.com/qiutuleng/vue-router-modern/issues) and I will try my best to help you.

## License

MIT
