# Menu

菜单组件会自动从url获取一下参数， 如果使用该组件请务必**在跳转到该组件时在url上携带参数**<br/> 如果你使用静态菜单， 那当我没说。

| 属性 | 说明 | 必携带 |
| :---- | :---- | :---- |
| tab | 需要默认展开的菜单的id | 否 |
| title | 用于页面左上角展示的title, 传入`systemName`参数才会显示`title`。 若不传`title`则显示`systemName` | 否 |
| token | 用户登陆后的`accessToken`字段， 用于请求 | 是 |
| userId | 用户登陆后的`userId`字段， 用于请求 | 是 |
| tenantId | 用户登陆后的`tenantId`字段， 用于请求 | 是 |
| systemCode | 该系统的`systemCode`(你懂的)， 用于请求 | 是 |

## 基础页面

<code src="./demo/index" />

## 自定义菜单

启用自定义菜单后， 将不自动获取远程菜单。

<code src="./demo/staticMenu" />

## 自定义icon

组件会默认使用`<FolderOutlined />`作为非叶子节点的icon， 使用`<FileTextOutlined />`作为叶子节点的icon。 如果希望
自己定义icon，则可以使用`formatMenu`参数， 覆写需要更改的子节点的`icon`属性。 如果叶子不想使用默认icon， 期望隐藏的话，
可以配置`useDefaultIcon`为`false`。 **如果覆写过icon属性，则不受useDefaultIcon控制， 永远显示覆写过的icon**。<br/>

<code src="./demo/customIcon" />

## API

Menu组件的属性说明如下：

| 属性 | 说明 | 类型 | 必填 | 默认值 | 版本 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| ~~logoutPage~~ | 退出登录后的重定向页面, 已于**1.1.5-snapshot**版本废弃 | `string` | 是 | - |
| onLogout | 退出登录后的回调函数 | `function` | 是 | - | 1.1.5-snapshot |
| showSystemList | 是否显示右上角系统列表控件 | `boolean` | 否 | `true` |
| onSystemChange | 系统切换时的点击事件 | `function(system)` | 否 | - |
| staticMenu | 设置静态菜单， 设置该项后将不获取远程菜单 | `Array<Menu>` | 否 | - |
| systemName | 系统名称， 用于页面左上角显示， 若同时设置`systemName` 和 `logo`项目， 菜单收起后显示`logo`， 若仅设置`systemName`或仅设置`logo`， 菜单收起后不显示任何 | `string` | 否 | - |
| logo | 系统logo， 用于页面左上角显示， 建议传入`<img />` | `ReactNode` | 否 | - |
| className | 页面外部的`class`， 用于修改样式 | `string` | 否 | - |
| onMenuChange | 菜单切换的事件， 如果设置该参数， 则取消默认的跳转操作。 回调函数中包含两个参数`menu`当前点击的菜单, `setIframeUrl`接受一个`string`类型的参数，用于跳转地址 | `function(menu, setIframeUrl)` | 否 | - |
| formatMenu | 用于格式化菜单， 修改从远程获取的菜单 | `function(menu)` | 否 | - |
| useDefaultIcon | 是否使用默认的icon | `boolean` | 否 | `true` |
| showBreadcrumb | 是否显示面包屑 | `boolean` | 否 | `true` |
