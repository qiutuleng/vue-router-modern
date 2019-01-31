import RouterChildren from './RouterChildren';

class Router {
  constructor() {
    this.setPath(null)
      .setComponent(null)
      .setNamedComponents(null)
      .setRedirectTo(null)
      .setProps(null)
      .setAlias(null);

    this.children = [];
  }

  get(path, component, name, props, meta, alias) {
    return this.setPath(path)
      .setComponent(component)
      .setName(name)
      .setProps(props)
      .setMeta(meta)
      .setAlias(alias);
  }

  static get(...parameters) {
    return Router.instance().get(...parameters);
  }

  getWithNamedComponents(path, components, name, props, meta, alias) {
    return this.get(path, null, name, props, meta, alias).setNamedComponents(components);
  }

  static getWithNamedComponents(...parameters) {
    return Router.instance().getWithNamedComponents(...parameters);
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

    return this.appendChildren(routerChildren);
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
    this.components = null;
    return this;
  }

  setNamedComponents(components) {
    if (typeof components !== 'object') {
      throw new Error('The component variable must be an object');
    }

    this.components = components;
    this.component = null;

    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setProps(props) {
    this.props = props;
    return this;
  }

  setMeta(meta) {
    this.meta = meta;
    return this;
  }

  setAlias(alias) {
    this.alias = alias;
    return this;
  }

  setRedirectTo(redirectTo) {
    this.redirectTo = redirectTo;
    return this;
  }

  hasPath() {
    return !!this.path;
  }

  hasComponent() {
    return !!this.component;
  }

  hasComponents() {
    return !!this.components;
  }

  hasName() {
    return !!this.name;
  }

  hasProps() {
    return !!this.props;
  }

  hasMeta() {
    return !!this.meta;
  }

  hasAlias() {
    return !!this.alias;
  }

  appendChildren(routerChildren) {
    if (!(routerChildren instanceof RouterChildren)) {
      throw new Error('The children variable must be an instance of the RouterChildren.');
    }

    if (this.IsChildDosentExist(routerChildren)) {
      this.children.push(routerChildren);
    }

    return this;
  }

  IsChildDosentExist(routerChildren) {
    return !~this.children.indexOf(routerChildren);
  }

  hasChildren() {
    return this.children.length > 0;
  }

  register(...routers) {
    const parameters = [];

    routers.forEach(
      router => (Array.isArray(router) ? parameters.push(...router) : parameters.push(router)),
    );

    return this.registerChildren(...parameters);
  }

  registerChildren(...routers) {
    routers.forEach((router) => {
      if (!(router instanceof Router)) {
        throw new Error('The router variable must be an instance of the Router.');
      }

      if (router.isRoot()) {
        this.appendChildren(...router.children);
      } else {
        this.appendChildren(RouterChildren.instance(Router).append(router));
      }
    });

    return this;
  }

  isRoot() {
    return !this.path;
  }

  routes() {
    let data;

    if (this.isRoot()) {
      data = this.childrenRoutes();
    } else {
      data = { path: this.path };

      if (this.component) {
        data.component = this.component;
      } else if (this.components) {
        data.components = this.components;
      } else if (this.redirectTo) {
        data.redirect = this.redirectTo;
      }

      if (this.hasMeta()) data.meta = this.meta;
      if (this.hasProps()) data.props = this.props;
      if (this.hasAlias()) data.alias = this.alias;
      if (this.hasName()) data.name = this.name;
      if (this.hasChildren()) data.children = this.childrenRoutes();
    }

    return data;
  }

  childrenRoutes() {
    return [].concat(...this.children.map(routerChildren => routerChildren.routes()));
  }
}

export default Router;
