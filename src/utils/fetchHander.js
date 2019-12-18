import axios from "axios";

axios.interceptors.response.use(function(response) {
    if (response.status == 200 && response.data.code == 302) {
        window.location.href = "/user/login";
    }
    return response;
});

export function Get(url, params = {}) {
    return axios.get(url, {
        params,
    });
}

export function Post(url, data = {}) {
    return axios.post(url, data);
}

export function JsonPost(url, data = {}) {
    return axios.post(url, data, {
        transformRequest: [
            function(data) {
                const fd = new FormData();
                Object.keys(data).map(key => {
                    fd.append(key, data[key]);
                });
                return fd;
            },
        ],
    });
}
