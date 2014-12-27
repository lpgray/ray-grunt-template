# Web前端开发项目初始化模板（基于[gruntjs](http://gruntjs.org)）

## CSS
- 使用Less写样式，然后使用grunt-contrib-less来进行编译、合并
- 使用grunt-contrib-cssmin来进行压缩

## JavaScript
- 使用grunt-contrib-concat进行代码合并
- 使用grunt-contrib-uglify进行代码压缩

## HTML
使用 grunt-includes 来做动态引用公共模板，让我们切图做页面时更专注于每一个页面组件的编写，公共文件在每一个html中引用即可，页面制作，应该是专注组件的。

## Build
- 每次build代码都会生成全新的css与js文件，以构建时间做为文件名称的一部分
- 使用process-html来处理引用部分

## 开发时的Web Server
使用connect-livereload与grunt-contrib-watch配合实现监控修改浏览器自动刷新
