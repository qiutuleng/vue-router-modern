import RouterChildren from './RouterChildren';

class Router {
  constructor() {
    this.setPath(null);
    this.setComponent(null);
    this.setRedirectTo(null);
    this.routerChildren = [];
  }

  get(path, component, name) {
    return this.setPath(path).setComponent(component).setName(name);
  }

  static get(...parameters) {
    return Router.instance().get(...parameters);
  }

  redirect(path, redirectTo, name) {
    return this.setPath(path).setRedirectTo(redirectTo).setName(name);
  }

  static redirect(...parameters) {
    return Router.instance().redirect(...parameters);
  }

  group(callback) {
    const routerChildren = RouterChildren.instance(Router);
    callback(routerChildren);
    return this.appendRouterChildren(routerChildren);
  }

  static group(...parameters) {
    return Router.instance().group(...parameters);
  }

  static instance() {
    return new Router();
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  setComponent(component) {
    if (typeof component !== 'object') {
      throw new Error('The component variable must be an object');
    }
    this.component = component;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setRedirectTo(redirectTo) {
    this.redirectTo = redirectTo;
    return this;
  }

  hasName() {
    return !!this.name;
  }

  appendRouterChildren(routerChildren) {
    if (!(routerChildren instanceof RouterChildren)) {
      throw new Error('The routerChildren variable must be an instance of the RouterChildren.');
    }
    if (this.IsRouterChildDosentExist(routerChildren)) {
      this.routerChildren.push(routerChildren);
    }
    return this;
  }

  IsRouterChildDosentExist(routerChildren) {
    return !~this.routerChildren.indexOf(routerChildren);
  }

  hasRouterChildren() {
    return this.routerChildren.length > 0;
  }

  registerChild(...routers) {
    return this.registerChildren(...routers);
  }

  registerChildren(...routers) {
    routers.forEach((router) => {
      if (!(router instanceof Router)) {
        throw new Error('The router variable must be an instance of the Router.');
      }
      if (router.isRoot()) {
        this.appendRouterChildren(...router.routerChildren);
      } else {
        this.appendRouterChildren(RouterChildren.instance(Router).append(router));
      }
    });
    return this;
  }

  isRoot() {
    return this.path === null;
  }

  parseRoutes() {
    let data;
    if (this.isRoot()) {
      data = this.parseChildrenRoutes();
    } else {
      data = { path: this.path };
      if (this.component) {
        data.component = this.component;
      } else if (this.redirectTo) {
        data.redirect = this.redirectTo;
      }
      if (this.hasName()) {
        data.name = this.name;
      }
      if (this.hasRouterChildren()) {
        data.children = this.parseChildrenRoutes();
      }
    }
    return data;
  }

  parseChildrenRoutes() {
    return [].concat(...this.routerChildren.map(routerChildren => routerChildren.parseRouters()));
  }
}

export default Router;