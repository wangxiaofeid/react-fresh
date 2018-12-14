import { observable, action } from "mobx"
import { message } from 'antd'
import axios from 'axios'
import _ from 'lodash'
const methods = ['get', 'delete']

export default class AbstractList {
  @observable pageSize = 10;
  @observable currentPage = 1;
  @observable total = 0;
  @observable dataList = [];
  @observable loading = false;
  @observable searchForm = {};

  editType = 'add';
  editItem = {};
  @observable showEdit = false;


  rowKey = 'id';
  ajaxConfig = {
  };

  constructor(config) {
    this.ajaxConfig = Object.assign(this.ajaxConfig, config);
    this.rowKey = config.rowKey || this.rowKey;
  }

  @action changeAttr(obj) {
    for(let key in obj) {
      this[key] = obj[key]
    }
  }

  @action async search(currentPage, pageSize, searchForm) {
    this.loading = true;
    const { url, method = 'get' } = this.ajaxConfig.search;
    const cp = currentPage || this.currentPage || 1;
    const ps = pageSize || this.pageSize || 10;
    try {
      const data = Object.assign({
        currentPage: cp,
        pageSize: ps,
      }, searchForm);
      const res = await axios({
        url,
        method,
        [methods.includes(method) ? 'params' : 'data'] : data
      });
      this.loading = false;
      if (res.status == 200 && res.data.status) {
        const { totalCount, list } = res.data.data;
        this.currentPage = cp;
        this.pageSize = ps;
        this.total = totalCount;
        this.searchForm = searchForm || {};
        this.dataList = list;
      } else {
        message.error('请求失败！');
      }
    } catch (error) {
      console.log(error);
      message.error('请求失败！');
      this.loading = false;
    }
  }

  @action async add(data) {
    this.loading = true;
    const { url, method = 'post' } = this.ajaxConfig.add;
    try {
      const res = await axios({
        url,
        method,
        [methods.includes(method) ? 'params' : 'data'] : data
      });
      this.loading = false;
      if (res.status == 200 && res.data.status) {
        message.success('添加成功！');
        this.showEdit = false;
        this.search(1, this.pageSize, this.searchForm);
      } else {
        message.error('请求失败！');
      }
    } catch (error) {
      console.log(error);
      message.error('请求失败！');
      this.loading = false;
    }
  }

  @action async edit(data) {
    this.loading = true;
    const { url, method = 'post' } = this.ajaxConfig.edit;
    try {
      const res = await axios({
        url,
        method,
        [methods.includes(method) ? 'params' : 'data'] : data
      });
      if (res.status == 200 && res.data.status) {
        Object.assign(this.editItem, data);
        this.showEdit = false;
        message.success('保存成功！');
      } else {
        message.error('请求失败！');
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      message.error('请求失败！');
      this.loading = false;
    }
  }

  @action async delete(id) {
    this.loading = true;
    const { rowKey } = this;
    const { url, method = 'post' } = this.ajaxConfig.delete;
    const data = {
      [this.rowKey]: id
    };
    try {
      const res = await axios({
        url,
        method,
        [methods.includes(method) ? 'params' : 'data'] : data
      });
      if (res.status == 200 && res.data.status) {
        message.success('删除成功！');
        _.remove(this.dataList, i => i[rowKey] == data[rowKey])
      } else {
        message.error('请求失败！');
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      message.error('请求失败！');
      this.loading = false;
    }
  }
}