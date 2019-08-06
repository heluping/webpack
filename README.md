### webpack配置:
- 准备工作：
	- 新建文件夹
	- 在根目录下新建src文件夹 在src文件下下面新建 index.js文件  作为项目的主入口文件
	- 在根目录下新建index.html文件

- 初始化项目
	- `yarn init`
	全部回车 此时会生成一个package.json文件

- 安装依赖
	- `yarn add webpack webpack-cli`  

- 配置出入口文件
	- 在项目根目录下新建一个webpack.config.js 文件,并配置出入口文件
	```javascript
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js'
		}
	```
	- 此时在cmd终端中 cd进入项目根目录 运行 webpack 即可看到 会生成一个 dist文件夹 下面有一个 bundle.js 也可以在index.html
	中引入此js


- 添加本地服务器
	- `yarn add webpack-dev-server`
	- 并在package.json中修改
	```javascript
		"scripts":{
			"start": "webpack-dev-server --open"
		}
	```
	- 在cmd终端中  输出 yarn start  即可开启本地服务器


- 配置热更新
	- `yarn add html-webpack-plugin`
	- 在webpack中添加此插件的配置
	```javascript
		const HtmlWebpackPlugin = require('html-webpack-plugin')
		plugins: [new HtmlWebpackPlugin({
			filename: 'app',
			template: path.resolve(__dirname, 'index.html')
		})]
	```
	- 在终端中运行yarn start, 此时可以看到 index.html body标签最下面即会加载一个 bundle.js了，这个文件存在于内存中。
	并没有在物理磁盘中，加载速度相当快。


- 静态资源管理（css、scss、less、图片、视频） 此时如果你想在js中引入 `import 'xxx.css'` 或者 import pic from 'xxx.jpg' 等文件还是不可以的 因为没有添加解释器 js无法识别此类文件
	- 安装解释器 `yarn add style-loader css-loader`
	- 在webpack.config.js中配置
	```javascript
		module: {
			rules: [
				{
					test: \/\.css$\,        //表示匹配以 .css结尾的文件
					use: ['style-loader', 'css-loader']    //表示用里面的解释器去解析此类文件
				}
			]
		}
	```
	- 此时可以在js中通过import方法引入样式表了，在index.html中会生成一个style标签 标签内就是引入的xxx.css的内容
	- 同理，对于scss、less、图片等文件也是利用其对应的loader，然后进行此操作

- 修改webpack.config.js在目录中的位置
	- 如果想更改webpack.config.js在文件夹中的位置，比如想放在 config/webpack.config.js 也是可以的
	修改package.json文件
	`"script": "webpack-dev-server --open --config config/webpack.config.js"` 

- 多入口多出口
	```javascript
		entry: {
			index: path.resolve(__dirname, 'src/index.js'),
			app: path.resolve(__dirname, 'src/app.js')
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js'
		}
	```

- 清理文件
	- 每次 打包以后 都会在dist文件夹中生成一些文件 有的文件也许已经废弃不要了 那么就可以使用插件 使得每一次打包时都把文件夹清理一遍
	- `yarn add clean-webpack-plugin`
	- `const {CleanWebpackPlugin} = require('clean-webpack-plugin')`
	- `plugins: [new CleanWebpackPlugin()]`

- 错误追踪(source map)
	- 追踪错误的具体位置
	- `devtool: 'cheap-module-eval-source-map'`

- 使用express框架代替 webpack-dev-server 构建服务器
	- [参考链接](https://www.webpackjs.com/guides/development/ "参考链接")

- 热更新(hot module replacement)
	- [参考链接](https://www.webpackjs.com/guides/hot-module-replacement/ "参考链接")

- tree shaking(移除未引用代码)
	- 在package.json文件中添加 `sideEffects: false` 表示所有的包都不含副作用，即可以安全的移除其中的export关键字
	只保留用到的代码
	- `sideEffects: ['../../src/test.js']` 表示忽略这个文件 因为里面具有副作用
	- 压缩输出（删除未引用的代码），将webpack的 `mode: production` 即可以启动亚索输出

- 开发环境和生产环境的分离(开发环境中需要本地服务器以及热更新等而生产环境只需要尽量小的压缩文件)
	- 需要用到 webpack-merge 以及 uglifyjs-webpack-plugin两个插件，所以可以先安装 `yarn add webpack-merge` `yarn add uglifyjs-webpack-plugin`

	- 既然要分离，则要新建一个 webpack.dev.js 以及webpack.pro.js 文件，分别做对应的功能。同时，也保留之前的webpack.config.js文件，里面是通用代码。

	- 在两个文件中引入通用文件，并做各自的拓展
		```javascript
		//webpack.dev.js
		const merge = require('webpack-merge')
		const common = require('./webpack.config.js')
		module.exports = merge(common, {
			devtool: 'inline-source-map',
			devServer: {
				contentBase: '../dist'
			}
		})
		//webpack.pro.js
		const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
		module.exports = merge(common, {
			plugins: [new UglifyJsPlugin()]
			})
		```
	- 配置package.json中的 scripts字段
		- `"start": "webpack-dev-server --open --config config/webpack.dev.js"`   `"build": "webpack --config config/webpack.pro.js"`

- 抽取公共依赖，生成公共文件
	- 将vue或者react、axios、lodash等抽取出来生成一个vendor.js文件等操作
	
	```javascript
    optimization : {     //和entry output同级
    		splitChunks: {
    			cacheGroups: {
    				commons: {
    					chunks: "initial",
    					minChunks: 2,
    					maxInitialRequests: 5,
    					minSize: 0
    				},
    				vendor: {
    					test: /node_modules/,
    					chunks: "initial",
    					name: "vendor",
    					priority: 10,
    					enforce: true
    				}
    			}
    		}
    	}
    ```
    - extract-text-webpack-plugin 则可以分离css
    - 动态引入 类似于 `import('lodash').then(_=>{console.log(_)})` 这种语法 在执行的时候才去引入依赖，只需要在入口文件中新加字段 `chunkFilename: '[name].bundle.js'`

- 懒加载
	- 和动态引入类似


- 缓存（让每次生成的名字不一样，即可以不被缓存了）
	- 使用hash命名 `output:{ filename: [name].[chunkhash].js`


- shimming 全局变量(即无需引入 就可以在对应的地方或许到相应的变量) 和externals还是有区别的，externals是利用cnd引入依赖，而此处的依赖还是要打包进vendor.js里面的
	- ```javascript
		plugins: [new webpackProvidePlugin({
			_: 'lodash'
		})]
	  ```


- typescript
	- 首先要使用两个依赖 `yarn add typescript ts-loader`
	- 新建 tsconfig.js
		```javascript
			{
				"compilerOptions": {
					"outDir": "./dist/",
					"noImplicitAny": true,
					"module": "es6",
					"target": "es5",
					"jsx": "react",
					"allowJs": true
				}
			}
		```
	- 配置webpack
		```javascript
			entry: path.resolve(__dirname, 'src/index.ts'),
			module: {
				rules: [{
					test: /.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}]
			},
			resolve: {
    			extensions: [ '.tsx', '.ts', '.js' ]
  			}
		```
	- 使用其它库的时候要重新安装ts的声明 `yarn add types/lodash` 其它的可以参考 [参考链接](http://microsoft.github.io/TypeSearch/)