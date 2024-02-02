function Vue(options) {
  this._init(options);
}

initMixin(Vue);

function initMixin() {
  Vue.prototype._init = function (options) {
    const vm = this; // this是new Vue的实例

    vm.$options = options;
    initState(vm);
    let el = vm.$options.el
    if(el) {
        vm.$mount(el)
    }
  };

  Vue.prototype.$mount = function(el) {
    let vm = this
    const options = this.$options
    el = document.querySelector(el)

    if(!options.render) {
        let template = options.template
        if(!template) {
            template = el.outerHtml
        }

        if(template) {
            const render = compliToFunctions(template)
            options.render = render
        }
    }

    return vm
  }
}
//模板编译的入口函数
function compliToFunctions(template) {
    template
 //把template 转换成ast语法树， 再把ast语法树转换成render需要的格式，返回render函数 等待渲染时候执行，
 //挂载mount时候 执行mountComponent方法 vm._update(vm._render()) 把render函数执行生成vnode 
 //_update里面执行patch patch(vm.$el, vnode) || vm.$el patch方法把vnode转化成真实dom挂载到页面上
}

function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    //初始化data
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;

  data = vm._data = typeof data === "function" ? data.call(vm) : {};

  for (let key in data) {
    Proxy(vm, "_data", key);
  }

  observe(data);
}

//代理
function Proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(val) {
      vm[source][key] = val;
    },
  });
}

const arrayMethods = () => ({});
class Observe {
  constructor(value) {
    Object.defineProperty(value, "__ob", {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    });

    if (Array.isArray(value)) {
      value._proto_ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  observeArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i]);
    }
  }

  walk(value) {
    Object.keys(value).forEach((key) => {
      defineReactive(value, key, value[key]);
    });
  }
}

function defineReactive(data, key, value) {
  //值可能是对象再观察一遍
  observe(value);

  Object.defineProperty(data, key, {
    get() {
      console.log("获取值---" + key);
      return value;
    },
    set(val) {
      console.log("输入值---" + val);
      value = val;
    },
  });
}

//观察data
function observe(data) {
  if (
    Object.prototype.toString.call(data) == "[object Object]" ||
    Array.isArray(data)
  ) {
    return new Observe(data);
  }
}

let instance = new Vue({
  data() {
    return {
      a: 1,
      b: 2,
      c: {
        d: 3,
      },
    };
  },
});
console.log("-----------", instance);
instance.b = {
    ccc: '1'
}
instance.c.d
export default instance;
