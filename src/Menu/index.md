# Menu

菜单组件会自动从url获取<br/>


## 基础页面

<code src="./demo/index" />

## 自定义菜单

启用自定义菜单后， 将不自动获取远程菜单。

<code src="./demo/staticMenu" />

## API

Menu组件的属性说明如下：

| 属性 | 说明 | 类型 | 必填 | 默认值 | 版本 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| logoutPage | 退出登录后的重定向页面 | `string` | 是 | - |
| showSystemList | 是否显示右上角系统列表控件 | `boolean` | 否 | - |
| onSystemChange | 系统切换时的点击事件 | `function(system)` | 否 | - |
| staticMenu | 设置静态菜单， 设置该项后将不获取远程菜单 | `boolean` | 否 | - |
| systemName | 系统名称， 用于页面左上角显示， 若同时设置`systemName` 和 `logo`项目， 菜单收起后显示`logo`， 若仅设置`systemName`或仅设置`logo`， 菜单收起后不显示任何 | `string` | 否 | - |
| logo | 系统logo， 用于页面左上角显示， 建议传入`<img />` | `ReactNode` | 否 | - |
| className | 页面外部的`class`， 用于修改样式 | `string` | 否 | - |

