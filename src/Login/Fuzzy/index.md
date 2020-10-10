# Fuzzy

Fuzzy风格的登录页面

## 基础页面

`header`字段可以传`ReactNode`或者`string`类型，
当传入的类型为`string`时， 会有默认样式， 非必要情况无需自定义样式。

<code src="./demo/index" />

## 设置背景图片

可以自己定义表单的背景图片(`formBackgroundImage`)以及整个页面的背景图片(`backgroundImage`)。

<code src="./demo/customBackground" />

## API

Fuzzy登录组件的属性说明如下：

| 属性 | 说明 | 类型 | 必填 | 默认值 | 版本 |
| :---- | :---- | :---- | :---- | :---- | :---- |
| header | 登录页面顶部文字 | `string` &#124; `ReactNode` | `true` | - |
| copyright | 页面底部**版权所有**方 | `string` &#124; `ReactNode` | `true` | - |
| formBackgroundImage | 设置表单的背景图 | `string` | `false` | - |
| backgroundImage | 设置页面的背景图 | `string` | `false` | - |

