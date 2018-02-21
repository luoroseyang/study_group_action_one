/**
 * 将需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上	setter和getter
 * 给这个对象的某个值赋值，就会触发setter，就能监听到了数据变化
 */
function Observer(data) {
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function(data) {
    var me = this;
    // 对所有的属性进行监听
    Object.keys(data).forEach(function(key) {
      me.convert(key, data[key]);
    });
  },
  convert: function(key, val) {
    this.defineReactive(this.data, key, val);
  },

  defineReactive: function(data, key, val) {
    var dep = new Dep();
    // 递归监听子属性
    var childObj = observe(val);

    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function() {
        if (Dep.target) {
          // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
          dep.depend();
        }
        return val;
      },
      set: function(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知订阅者
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }
  // 创建新的观察者
  return new Observer(value);
};

/**
* 维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法
*/
var uid = 0;
function Dep() {
  // 标识
  this.id = uid++;
  // 创建数组维护订阅者，便于后续的统一发送通知
  this.subs = [];
}

Dep.prototype = {
  // 添加订阅者
  addSub: function(sub) {
    this.subs.push(sub);
  },
  // watcher中的addDep添加监控
  depend: function() {
    Dep.target.addDep(this);
  },
  // 删除订阅者
  removeSub: function(sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },
  // 向所有的订阅者发送通知
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  }
};

Dep.target = null;
