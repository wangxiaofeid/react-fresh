import { observable, action } from "mobx";
import AbstractList from "@/stores/abstractList";

export default class __pageName2__Store extends AbstractList{
  static namespace = '__pageName__Store';
  
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
    })
  }


}