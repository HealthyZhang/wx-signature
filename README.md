## 适用于微信小程序的签名组件(canvas实现手动签名)

适用于微信小程序的签名组件
1. 安装依赖：

```
npm install wx-signatrue
```

2. 构建：

[ 小程序官方文档 ](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

3. JSON文件引用；

```json
	"usingComponents": {
		"signature": "tryspace/index"
	}
```		
4. wxml调用

```html
<signature placeHolder="slkdfjk" id="sign"></signature>
```
5.  参数
  placeHolder 

6. 可调用方法； 
```
	//签名转图片；
	this.selectComponent('#sign').getImg().then(res => {
		console.log(res)
	})
	// 清空签名
	this.selectComponent('#sign').getImg().clearDraw()
```

7. **canvas画布大小根据signature外部包含的标签的大小而变动**
