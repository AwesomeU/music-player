## 页面骨架开发
> includes：

 - 页面入口 + header组件
 - 路由配置 + tab菜单栏 
 	- 在router中配置路由，加入默认url tab标签页锁定
 	```
	{
        path: '/',
        redirect: '/recommend'
    }
 	```
 	- 配置完router，引入到vue实例（main.js）
 	- flex布局
