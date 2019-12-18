module.exports = {
    'POST /api/user/add': {
        success: true,
    },
    'GET /api/user/delete': {
        success: true,
    },
    'POST /api/user/update': {
        success: true,
    },
    'GET /api/user/query': {
        success: true,
        result: {
            currentPage: 1,
            pageCount: 12,
            pageSize: 10,
            totalCount: 12,
            list: [
                {
                    id: 1,
                    name: 'eK0mU4zX7',
                    phone: '45543264738',
                },
                {
                    id: 2,
                    name: 'xZ6bH7dJ2',
                    phone: '59756476794',
                },
                {
                    id: 3,
                    name: 'qB5nG4cN4',
                    phone: '45773681855',
                },
                {
                    id: 4,
                    name: 'oG4qW8lZ3',
                    phone: '41296816192',
                },
                {
                    id: 5,
                    name: 'aO5oV4vW4',
                    phone: '17237195867',
                },
                {
                    id: 6,
                    name: 'eN4gU3cE3',
                    phone: '06596069723',
                },
                {
                    id: 7,
                    name: 'zF3eG8vS2',
                    phone: '82523304343',
                },
                {
                    id: 8,
                    name: 'nD3cO7nS5',
                    phone: '56086180315',
                },
                {
                    id: 9,
                    name: 'dL7eN6wP2',
                    phone: '13109426641',
                },
                {
                    id: 10,
                    name: 'kY3fB9qK2',
                    phone: '24437222994',
                },
            ],
        },
    },
    'GET /api/role/query': {
        success: true,
        data: [
            {
                value: 'admin',
                label: '管理员',
            },
            {
                value: 'user',
                label: '普通用户',
            },
        ],
    },
};
