# history 

## Why
为什么要fork这个库呢？由于系统要求，需要将一些参数放置到search中，但由于类型要求，导致组件默认还原还是提交到服务器都存在大量类型转换（search只支持string）。

## state Vs query
`state` 能够很好的解决类型问题，也不能自动离线读存，不过不支持url粘贴复制给其他终端和用户。通常我们使用state存放一些不可见变量

`query` 用于查询参数

###  优缺点
| 类型  | 优点                                 | 缺点                            |
| ----- | ------------------------------------ |
| state | 对象存储支持复杂类型（保留原有类型） | 存放一些用户不可见参数          |
| query | 只支持string类型                     | url中回显方便多人直接且保存使用 |

## 使用
首先安装 `fancy-history`
```
    yarn add fancy-history

    npm install fancy-history
```

在umi2.x环境，修改`.umirc.js` Or `config.js`
```js
    config.resolve.alias.set('history', 'fancy-history');
```


## 当前版本
对应 `history` v4