import axios from 'axios';
import { message } from 'antd';

// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = '/local';
// }

axios.interceptors.response.use(function(response) {
    if (response.status == 200 && response.data.code == 302) {
        window.location.reload();
    }
    return response;
});

export async function Get(url, params = {}) {
    return axios
        .get(url, {
            params,
        })
        .then(res => {
            if (res.status == 200) {
                return res.data;
            } else {
                message.error('请求失败');
                return false;
            }
        });
}

export async function Post(url, data = {}) {
    return axios
        .post(url, data, {
            transformRequest: [
                function(data) {
                    const fd = new FormData();
                    Object.keys(data).map(key => {
                        fd.append(key, data[key]);
                    });
                    return fd;
                },
            ],
        })
        .then(res => {
            if (res.status == 200) {
                return res.data;
            } else {
                message.error('请求失败');
                return false;
            }
        });
}
