const delay = require('mocker-api/utils/delay');
const user = require('./user');
const isMock = process.env.MOCK;

const proxy = {
    ...user,
};
module.exports = isMock ? delay(proxy, 1000) : {};

/** 
'GET /api/get': (req, res) => {
    const { id } = req.query;
    res.json({
        test: '牛',
        id: id || '没传ID啊',
    });
},
'POST /api/post': (req, res) => {
    const { id } = req.body;
    console.log(req);
    res.json({
        test: '牛',
        id: id || '没传ID啊',
    });
},

fetch('/api/get?id=123');

fetch('/api/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: 111 }),
});
*/
