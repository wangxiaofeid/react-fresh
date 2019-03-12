import { observable, action } from "mobx";
import AbstractList from "@/stores/abstractList";

export default class DemoStore extends AbstractList {
  static namespace = 'demoStore';
  
  constructor() {
    super({
      search: {
        url: '/api/user/list',
        method: 'post'
      },
      add: {
        url: '/api/user/add',
        method: 'post'
      },
      edit: {
        url: '/api/user/edit',
        method: 'post'
      },
      delete: {
        url: '/api/user/delete',
        method: 'post'
      }
    });
  }
}
