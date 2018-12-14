import { observable, action } from "mobx"

export class AppStore {
  @observable num = 1;
  @observable loading = false;
  menus = [{
    label: '一级目录1',
    key: '1',
    icon: 'desktop',
    children: [{
      label: '二级页面',
      link: '/demo1',
      key: '3'
    }]
  }, {
    label: '一级目录2',
    key: '2',
    icon: 'appstore',
    link: '/demo2'
  }, {
    label: '一级目录3',
    key: '3',
    icon: 'appstore',
    children: [{
      label: '二级页面',
      key: '4',
      children: [{
        label: '三级页面',
        link: '/demo',
        key: '5'
      }]
    }]
  }];
  
  static getInstance() { // 单例模式
    if (!AppStore.instance) {
      AppStore.instance = new AppStore();
    }
    return AppStore.instance;
  }

  @action setLoading(loading) {
    this.loading = loading;
  }

  @action plus() {
    this.num += 1;
  }
}

const appStore = AppStore.getInstance();
const Stores = {
  appStore
}

/* 当前文件夹下store */ 
const req = require.context('.', false, /Store$/);
req.keys().map(key => {
  const Store = req(key).default;
  const namespace = Store.namespace || key;
  appStore[namespace] = stores[namespace] = new Store(appStore);
});

/* page下store */ 
const reqPage = require.context('../pages', true, /store$/);
reqPage.keys().map(key => {
  const Store = reqPage(key).default;
  const namespace = Store.namespace || key;
  appStore[namespace] = Stores[namespace] = new Store(appStore);
});

export default Stores;
