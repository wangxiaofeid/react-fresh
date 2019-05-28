import { observable, action } from 'mobx';
import { message } from 'antd';
import { Get, Post } from '@/fetchHander';
import _ from 'lodash';

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

    ajaxConfig = {};

    constructor(config) {
        this.ajaxConfig = Object.assign(this.ajaxConfig, config);
        this.rowKey = config.rowKey || this.rowKey;
    }

    @action changeAttr(obj) {
        Object.keys(obj).forEach(key => {
            this[key] = obj[key];
        });
    }

    @action async search(currentPage, pageSize, searchForm) {
        this.loading = true;
        const { url, method = 'get' } = this.ajaxConfig.search;
        const cp = currentPage || this.currentPage || 1;
        const ps = pageSize || this.pageSize || 10;
        try {
            const data = Object.assign(
                {
                    currentPage: cp,
                    pageSize: ps,
                },
                searchForm
            );
            const action = method == 'get' ? Get : Post;
            const res = await action(url, data);
            if (res) {
                const { totalCount, list } = res.data;
                this.currentPage = cp;
                this.pageSize = ps;
                this.total = totalCount;
                this.searchForm = searchForm || {};
                this.dataList = list;
            }
            this.loading = false;
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
            const action = method == 'get' ? Get : Post;
            const res = await action(url, data);
            if (res) {
                message.success('添加成功！');
                this.showEdit = false;
                this.search(1, this.pageSize, this.searchForm);
            }
            this.loading = false;
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
            const action = method == 'get' ? Get : Post;
            const res = await action(url, data);
            if (res) {
                Object.assign(this.editItem, data);
                this.showEdit = false;
                message.success('保存成功！');
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
            [this.rowKey]: id,
        };
        try {
            const action = method == 'get' ? Get : Post;
            const res = await action(url, data);
            if (res) {
                message.success('删除成功！');
                this.dataList = _.filter(this.dataList, i => i[rowKey] !== data[rowKey]);
            }
            this.loading = false;
        } catch (error) {
            console.log(error);
            message.error('请求失败！');
            this.loading = false;
        }
    }
}
