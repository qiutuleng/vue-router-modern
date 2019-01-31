class RouterChildren {
  constructor(routerClass, parent = null) {
    this.routers = [];
    this.setRouterClass(routerClass);
    this.setParent(parent);
  }

  static instance(...parameters) {
    return new RouterChildren(...parameters);
  }

  get(...parameters) {
    const router = this.getRouterClass().get(...parameters);

    this.append(router);

    return router;
  }

  getWithNamedComponents(...parameters) {
    const router = this.getRouterClass().getWithNamedComponents(...parameters);

    this.append(router);

    return router;
  }

  redirect(...parameters) {
    const router = this.getRouterClass().redirect(...parameters);

    this.append(router);

    return router;
  }

  isDosentExist(router) {
    return !~this.routers.indexOf(router);
  }

  append(router) {
    if (this.isDosentExist(router)) {
      this.routers.push(router);
    }

    return this;
  }

  setRouterClass(routerClass) {
    if (typeof routerClass !== 'function') {
      throw new Error('The routerClass variable must be an Router class');
    }

    this.routerClass = routerClass;
  }

  getRouterClass() {
    return this.routerClass;
  }

  setParent(parent) {
    if (!(parent instanceof this.getRouterClass()) && parent !== null) {
      throw new Error('The parent variable must be an instance of the Router or null');
    }

    this.parent = parent;

    return this;
  }

  getParent() {
    return this.parent;
  }

  routes() {
    return this.routers.map(router => router.routes());
  }
}

export default RouterChildren;
