function Compile(el, vm) {
  // 先将跟节点el转换成文档碎片fragment进行解析编译操作，解析完成，再将fragment添加回原来的真实dom节点中
  this.$vm = vm;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function(el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    console.log('fragment:', fragment)
    return fragment;
  },

  init: function() {
    this.compileElement(this.$fragment);
  },
  // 遍历所有节点及其子节点，进行扫描解析编译
  compileElement: function(el) {
    var childNodes = el.childNodes,
      me = this;
    // 遍历所有节点及其子节点
    [].slice.call(childNodes).forEach(function(node) {
      var text = node.textContent;
      // {{xxxx}}
      var reg = /\{\{(.*)\}\}/;
      // 按元素节点方式编译,调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新函数进行绑定
      if (me.isElementNode(node)) {
        me.compile(node);
        // 如果是纯文本，检测{{}}
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1);
      }
      // 递归遍历子节点
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },
  // 对元素进行解析，分析属性
  compile: function(node) {
    var nodeAttrs = node.attributes,
      me = this;
      console.log('nodeAttrs:', nodeAttrs);
    // 遍历dom的所有属性
    [].slice.call(nodeAttrs).forEach(function(attr) {
      var attrName = attr.name;
      // 规定：指令以 v-xxx 命名
      // 如 <span v-text="content"></span> 中指令为 v-text
      if (me.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        // 事件指令 v-on:click
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令 v-text
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        // 移除属性，无需再dom中展示
        node.removeAttribute(attrName);
      }
    });
  },

  compileText: function(node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function(attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function(dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function(node) {
    return node.nodeType == 1;
  },

  isTextNode: function(node) {
    return node.nodeType == 3;
  }
};

// 指令处理集合
var compileUtil = {
  text: function(node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },

  html: function(node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },
  // 针对input~ 需要响应dom的改变去改变data的数据
  model: function(node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this;
    var val = this._getVMVal(vm, exp);
    node.addEventListener('input', function(e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  class: function(node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },
  /**
   * [用来绑定数据变化之后的通知]
   * @method
   * @param  {[type]} node [要绑定的节点，#app]
   * @param  {[type]} vm   [vm对象，存着data]
   * @param  {[type]} exp  [表达式 ex:{{a}}中的a]
   * @param  {[type]} dir  [要更新的内容的类型(html, text, class)]
   * @return {[type]}      [null]
   */
  bind: function(node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];

    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    // updaterFn作为参数，响应vm中exp的变化，进而执行对应的update
    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function(node, vm, exp, dir) {
    console.log('添加事件：', node, vm, exp, dir);
    var eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },
  // 针对a.b的情况取属性值
  _getVMVal: function(vm, exp) {
    var val = vm;
    exp = exp.split('.');
    exp.forEach(function(k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function(vm, exp, value) {
    var val = vm;
    exp = exp.split('.');
    exp.forEach(function(k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};


var updater = {
  textUpdater: function(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  htmlUpdater: function(node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  classUpdater: function(node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, '').replace(/\s$/, '');

    var space = className && String(value) ? ' ' : '';

    node.className = className + space + value;
  },

  modelUpdater: function(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};
