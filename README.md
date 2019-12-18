# react-fresh

# babel 注意事项

```
// Stage 0
"@babel/plugin-proposal-function-bind",

// Stage 1
"@babel/plugin-proposal-export-default-from",
"@babel/plugin-proposal-logical-assignment-operators",
["@babel/plugin-proposal-optional-chaining", { "loose": false }],
["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
"@babel/plugin-proposal-do-expressions",

// Stage 2
["@babel/plugin-proposal-decorators", { "legacy": true }],
"@babel/plugin-proposal-function-sent",
"@babel/plugin-proposal-export-namespace-from",
"@babel/plugin-proposal-numeric-separator",
"@babel/plugin-proposal-throw-expressions",

// Stage 3
"@babel/plugin-syntax-dynamic-import",
"@babel/plugin-syntax-import-meta",
["@babel/plugin-proposal-class-properties", { "loose": false }],
"@babel/plugin-proposal-json-strings"
```

# mobx

```
observable // 受监听数据
action // 动作
transaction // 批处理
computed // 计算结果
autorun // 自动执行
(1) autorun 和 @computed 都会根据所观察的变量发生变化的时候触发
(2) @computed 所计算得到的新值可以 observable
```

# Prettier 代码优化

```
https://prettier.io/docs/en/cli.html
prettier --config --write "src/**/*.js"
```
