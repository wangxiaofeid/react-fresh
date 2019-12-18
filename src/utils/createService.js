import { Get, Post, JsonPost } from "./fetchHander";

export default apiConfig => {
    const service = {};
    Object.keys(apiConfig).forEach(key => {
        const { method = "get", url, isFormData } = apiConfig[key];
        service[key] = (data = {}, errorHandle) => {
            const request = method === "get" ? Get : isFormData ? Post : JsonPost;
            return request(url, data)
                .then(res => res.data)
                .then((res = {}) => {
                    if (res && res.success) {
                        return res.result || true;
                    } else {
                        if (errorHandle) {
                            errorHandle(res);
                        } else {
                            throw res;
                        }
                    }
                });
        };
    });
    return service;
};
