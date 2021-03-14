# history 

## Why
为什么要fork这个库呢？由于系统要求，需要将一些参数放置到search中，但由于类型要求，导致组件默认还原还是提交到服务器都存在大量类型转换（search只支持string）。

## state Vs query
`state` 能够很好的解决类型问题，也不能自动离线读存，不过不支持url粘贴复制给其他终端和用户。通常我们使用state存放一些不可见变量

`query` 用于查询参数

###  Difference
<table>
<thead>
<tr>
<th>类型</th>
<th>优点</th>
<th>缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td>state</td>
<td>对象存储支持复杂类型（保留原有类型）</td>
<td>存放一些用户不可见参数</td>
</tr>
<tr>
<td>query</td>
<td>只支持string类型</td>
<td>url中回显方便多人直接且保存使用</td>
</tr>
</body>
</table>

## Usage
首先安装 `fancy-history`
```
yarn add fancy-history

npm install fancy-history
```

在umi2.x环境，修改`.umirc.js` Or `config.js`
```js
{
    // ... some config
    chainWebpack(config, { webpack }) {
        config.resolve.alias.set('history', 'fancy-history');
    }
}
```
## Q&A
Q：为什么配置 `.umirc.js` alias无效？   
A：因为`history`为内置会覆盖别名，按照umi配置优先级 chainWebpack>内置config>umi 。所以需要配置chainWebpack中再次覆盖内置别名
   
Q：配置也写到chainWebpack中，fancy-history也安装，还是没有生效？   
A：由于umi会生成dll，需要保证umi-dlls有更新才能生效，可以删除node_modules/umi-dlls 重新生成即可生效

## Version
fork `history` v4

## ⚠️warning⚠️
目前构建脚本未完成