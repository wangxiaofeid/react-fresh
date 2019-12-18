import { observable, action } from "mobx";
import { message } from "antd";
import { filter } from "lodash";
import createService from "@/utils/createService";

export default class AbstractList {
    @observable pageSize = 10;

    @observable currentPage = 1;

    @observable total = 0;

    @observable dataList = [];

    @observable loading = false;

    @observable searchForm = {};

    editType = "add";
    editItem = {};
    @observable showEdit = false;

    rowKey = "id";

    ajaxConfig = {};

    constructor({ service = {}, search, table, edit, rowKey }) {
        this.service = createService(service);
        this.search = search;
        this.table = table;
        this.edit = edit;
        this.rowKey = rowKey || this.rowKey;
    }

    @action
    changeAttr(obj) {
        Object.keys(obj).forEach(key => {
            this[key] = obj[key];
        });
    }

    @action
    query(currentPage, pageSize, searchForm) {
        this.loading = true;
        const cp = currentPage || this.currentPage || 1;
        const ps = pageSize || this.pageSize || 10;
        const data = Object.assign(
            {
                currentPage: cp,
                pageSize: ps,
            },
            searchForm
        );
        this.service
            .search(data)
            .then(data => {
                const { totalCount, list } = data;
                this.currentPage = cp;
                this.pageSize = ps;
                this.total = totalCount;
                this.searchForm = searchForm || {};
                this.dataList = list || [];
            })
            .finally(() => {
                this.loading = false;
            });
    }

    @action
    async add(data) {
        this.loading = true;
        try {
            const res = await this.service.add(data);
            if (res) {
                message.success("添加成功！");
                this.showEdit = false;
                this.search(1, this.pageSize, this.searchForm);
            }
            this.loading = false;
        } catch (error) {
            console.log(error);
            message.error("请求失败！");
            this.loading = false;
        }
    }

    @action
    async edit(data) {
        this.loading = true;
        try {
            const res = await this.service.update(data);
            if (res) {
                Object.assign(this.editItem, data);
                this.showEdit = false;
                message.success("保存成功！");
            }
            this.loading = false;
        } catch (error) {
            console.log(error);
            message.error("请求失败！");
            this.loading = false;
        }
    }

    @action
    async delete(id) {
        this.loading = true;
        const { rowKey } = this;
        const data = {
            [this.rowKey]: id,
        };
        try {
            const res = await this.service.delete(data);
            if (res) {
                message.success("删除成功！");
                this.dataList = filter(this.dataList, i => i[rowKey] !== data[rowKey]);
            }
            this.loading = false;
        } catch (error) {
            console.log(error);
            message.error("请求失败！");
            this.loading = false;
        }
    }
}
