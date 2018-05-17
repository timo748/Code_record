### 目录结构

├── build --------------------------------- webpack相关配置文件
│   ├── build.js --------------------------webpack打包配置文件
│   ├── check-versions.js ------------------------------ 检查npm,nodejs版本
│   ├── logo.png ---------------------------------- 项目 logo
│   ├── utils.js --------------------------------------- 配置资源路径，配置css加载器
│   ├── vue-loader.conf.js ----------------------------- 配置css加载器等
│   ├── webpack.base.conf.js --------------------------- webpack基本配置
│   ├── webpack.dev.conf.js ---------------------------- 用于开发的webpack设置
│   ├── webpack.prod.conf.js --------------------------- 用于打包的webpack设置
├── config ---------------------------------- 配置文件
​       ├── index.js ------------------------------ 开发和生产环境配置文件
├── node_modules ---------------------------- 存放依赖的目录
├── src ------------------------------------- 源码
│   ├── assets ------------------------------ 静态文件
│   ├── components -------------------------- 组件
│   ├── main.js ----------------------------- 主js
│   ├── App.vue ----------------------------- 项目入口组件
│   ├── router ------------------------------ 路由
├── package.json ---------------------------- node配置文件
├── .babelrc--------------------------------- babel配置文件
├── .editorconfig---------------------------- 编辑器配置
├── .gitignore------------------------------- 配置git可忽略的文件



### 开发中service

```

    const config = require('../config')

    // config 文件里做了用户自定的服务参数配置

    devServer: {
        clientLogLevel: 'warning',  // 在开发攻击的控制台中显示信息，便于开发调试，你可以将参数配置成 "none" 来进行关闭
         historyApiFallback: { // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
            rewrites: [
               { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
         },
         hot: true,   //启用项目的热刷新，即模块热替换特性
         contentBase: false,   // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。这里禁用，因为配置了 CopyWebpackPlugin 的使用
         compress: true,
         host: HOST || config.dev.host,   //指定使用一个域名。默认是 localhost
         port: PORT || config.dev.port,   //指定要监听请求的端口号：
         open: config.dev.autoOpenBrowser, //open 参数配置，如果配置成 true ，项目启动后会自动打开浏览器
         overlay: config.dev.errorOverlay   //当有错误或则警告的时候在页面上显示一个全屏的遮罩提示
             ? { warnings: false, errors: true }
             : false,
         publicPath: config.dev.assetsPublicPath, //此路径下的打包文件可在浏览器中访问
         proxy: config.dev.proxyTable,           //代理API的请求
         quiet: true,       //启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台,特别是使用了 FriendlyErrorsPlugin 插件的时候
         watchOptions: {   //与监视文件相关的控制选项。是否使用轮询
               poll: config.dev.poll,
         }
    },
```

### 配置文件解析config.js

```
'use strict'

const path = require('path') // 引用项目的 path 模块

module.exports = {
  dev: {

    // 路径配置
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // 各种开发服务配置
    host: 'localhost', // 开发环境域名 可以被 node 全局变量process.env.HOST 重写
    port: 8080, //配置开发服务端口，可以被 node 全局变量 process.env.PORT 重写, 需要使用未被占用的端口
    autoOpenBrowser: false, //服务启动是否自动代开浏览器
    errorOverlay: true,   //是否在发生错误的时候，在页面整屏增加一个错误遮罩
    notifyOnErrors: true,  //是否通知错误 ，在我们的项目配置中和 friendly-errors-webpack-plugin 结合使用
    poll: false, // 服务监听是否轮询操作

    // 配饰是否使用 Eslint Loader 进行语法检测
    // 如果使用，在开发构建阶段，会对你的代码会进行检测
    // 检测出来的警告和错误会白展示在开发工具的控制台

    useEslint: true,  //进行语法检测

    // 配置是否将 eslint 语法检测的警告和错误展示在页面整屏的遮罩上

    showEslintErrorsInOverlay: false,  // 语法检测的警告和错误不展示在遮罩上

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    // 在上面的介绍中，我们知道 source map 是用来将我们构建后被转化的代码对应构建前的代码，便于 debug
    // cheap-module-eval-source-map 和我们介绍的 cheap-module-source-map 很类似，但是 SourceMap 会被作为数据添加到包中
    devtool: 'cheap-module-eval-source-map',

    // 如果你的开发工具不能进行 vue-files 的 debug ，可以将以下设置设置成 false

    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // index.html 文件模板
    index: path.resolve(__dirname, '../dist/index.html'),

    // 打包路径配置
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    //生产环境 source map 配置

    productionSourceMap: true,
    devtool: '#source-map',

    // 因为很多的主流服务都会 通过 gzip 压缩过你的所有静态资源，我们的配置默认不开启 gzip
    // 如果要设置成开启,请先确保已经安装好 compression-webpack-plugin 插件
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // 启动 build 命令的时候，额外添加一个参数，打包后会自动生成一个分析报告文件，例如 npm run build --report ，可以通过配置 true ，false 来关闭
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
```

### build.js

```
    'use strict'

    //打包前判断当先开发环境的 node 和 npm 版本和 package.json 要求的时候一样
    require('./check-versions')()

    process.env.NODE_ENV = 'production'

    const ora = require('ora')  // 在用户打包的时候能够让用户知道正在进行，一个加载中的样式，转啊转
    const rm = require('rimraf') //这个模块是用来清除之前的打的包，因为在vue-cli中每次打包会生成不同的hash
    const path = require('path') //node 路径模块，便于我们操作文件路径
    const chalk = require('chalk') //带颜色的输出模块，能在控制台中输出不同的样色
    const webpack = require('webpack') //webpack 不解释
    const config = require('../config') // 项目中的配置文件，👆上面已经进行了配置介绍
    const webpackConfig = require('./webpack.prod.conf') // 生产环境的配置文件


    const spinner = ora('building for production...')// 实例一个打包加载中实例
    spinner.start() //开始转圈，营造一个正在打包的场景

    // 删除上一次打包的文件，删除成功，开始按照生产环境配置进行打包
    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
      if (err) throw err


        //开始打包，打包结束停止 spinner 转圈，有报错则在控制台输出
      webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err

        // node 环境里的输出配置，process.stdout.write 你可以理解成 js 里的 console
        process.stdout.write(stats.toString({
          colors: true, //让打包的时候有颜色。
          modules: false,  //去掉内置模块信息
          children: false, // 去掉子模块,如果你使用了 ts-loader，设置成 true 会在打包构建阶段展示错误信息
          chunks: false, // 增加包信息（设置为 false 能允许较少的冗长输出）
          chunkModules: false //去除包里内置模块的信息
        }) + '\n\n')


         //打包出错在控制台输出 Build failed with errors ，退出打包程序
        if (stats.hasErrors()) {
          console.log(chalk.red('  Build failed with errors.\n'))
          process.exit(1)
        }

        //打包成功则输出 Build complete 结束打包
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
        ))
      })
    })
```

### webpack.base.conf.js

```
  'use strict'
    const path = require('path')  // node 路径模块
    const utils = require('./utils') //node 内部常用的工具类，其中包括：格式化字符串、对象的序列化、实现对象继承等常用方法
    const config = require('../config') //👆上面我们介绍的，项目配置文件
    const vueLoaderConfig = require('./vue-loader.conf') //👆 上面我们介绍的 vue 加载器配置文件

    //返回当前配置文件位置是 build ，该方法放回 build/../dir 的相对路基
    function resolve (dir) {
      return path.join(__dirname, '..', dir)
    }

    // eslint 语法检测配置
    const createLintingRule = () => ({
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
      }
    })

    // webpack 通用配置内容
    module.exports = {
      context: path.resolve(__dirname, '../'),  // 上下文，基础目录，用于从配置中解析入口起点和 loader
      entry: {
        app: './src/main.js'  //起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。
      },
      output: {
        path: config.build.assetsRoot,   //输出 bundle 的路径
        filename: '[name].js',          //输出 bundle 的名称
        publicPath: process.env.NODE_ENV === 'production' // 指定资源文件引用的目录，例如图片
          ? config.build.assetsPublicPath
          : config.dev.assetsPublicPath
      },
      resolve: {
        extensions: ['.js', '.vue', '.json'], //配置模块如何解析,
        alias: {                              // 创建应用的别名，
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
        }
      },
  module: {
    rules: [
      //判断配置中是否要是用 eslint 语法检测，如果使用，就将 createLintingRule 配置对象返回
      ...(config.dev.useEslint ? [createLintingRule()] : []),

     //👇是一些比较常用的加载器，及配置，不做详细介绍了
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(css | scss)$/,
        loader: 'style-loader!css-loader!!sass-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {

    //防止因为 vue 资源本身就自带的 无用的 node 注入，浏览器兼容处理
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
```

### webpack.dev.conf.js

```
'use strict'
    const utils = require('./utils')  //node 工具模块
    const webpack = require('webpack') //webpack 不解释
    const config = require('../config')//👆提到的配置文件
    const merge = require('webpack-merge') // merge 工具，用来合并生产和开发环境通用的基础 webpack 配置
    const path = require('path')            //node 的路径模块
    const baseWebpackConfig = require('./webpack.base.conf') //生产和开发环境通用的基础 webpack 配置
    const CopyWebpackPlugin = require('copy-webpack-plugin') //拷贝插件
    const HtmlWebpackPlugin = require('html-webpack-plugin')  //动态生成 html 插件
    const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') //友好的错误输出插件
    const portfinder = require('portfinder') //能够获取一个可用的随机端口号

    const HOST = process.env.HOST   //node 全局环境变量的主机
    const PORT = process.env.PORT && Number(process.env.PORT)   //node 全局环境变量的端口

    //合并基础配置加载器的配置部分
    const devWebpackConfig = merge(baseWebpackConfig, {

      module: {
        // 为 .vue 文件意外的独立样式文件配置加载器
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
      },

      // cheap-module-eval-source-map 在开发环境中很快
      devtool: config.dev.devtool,

      // 开发服务配置，👆 已经细讲过，顺便回顾一下
      devServer: {
         clientLogLevel: 'warning',  // 在开发攻击的控制台中显示信息，便于开发调试，你可以将参数配置成 "none" 来进行关闭
         historyApiFallback: { // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
            rewrites: [
               { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
         },
         hot: true,   //启用项目的热刷新，即模块热替换特性
         contentBase: false,   // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。这里禁用，因为配置了 CopyWebpackPlugin 的使用
         compress: true,
         host: HOST || config.dev.host,   //指定使用一个域名。默认是 localhost
         port: PORT || config.dev.port,   //指定要监听请求的端口号：
         open: config.dev.autoOpenBrowser, //open 参数配置，如果配置成 true ，项目启动后会自动打开浏览器
         overlay: config.dev.errorOverlay   //当有错误或则警告的时候在页面上显示一个全屏的遮罩提示
               ? { warnings: false, errors: true }
               : false,
         publicPath: config.dev.assetsPublicPath, //此路径下的打包文件可在浏览器中访问
         proxy: config.dev.proxyTable,           //代理API的请求
         quiet: true,       //启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台,特别是使用了 FriendlyErrorsPlugin 插件的时候
         watchOptions: {   //与监视文件相关的控制选项。是否使用轮询
               poll: config.dev.poll,
         }
       },

      plugins: [
        // DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
        new webpack.DefinePlugin({
          'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(), //启用热替换模块(Hot Module Replacement)，也被称为 HMR
        new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.NoEmitOnErrorsPlugin(), 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段

        //HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true
        }),


        // 拷贝自定义的静态资源文件
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
          }
        ])
      ]
    })

    // 实例一个异步对象，执行 devWebpackConfig 配置编译
    module.exports = new Promise((resolve, reject) => {
      portfinder.basePort = process.env.PORT || config.dev.port  //设置基础端口
      portfinder.getPort((err, port) => {获取端口，输出构建新
        if (err) {
          reject(err)
        } else {
          // 如果进行 e2e 测试，需要发布新端口
          process.env.PORT = port

          // 更新 devServer 的端口
          devWebpackConfig.devServer.port = port

          devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
              messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
            },
            onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
          }))

           //执行打包配置文件
          resolve(devWebpackConfig)
        }
      })
    })
```

### webpack.prod.conf.js

```
  'use strict'
    const path = require('path') // node 路径模块
    const utils = require('./utils') //小工具函数
    const webpack = require('webpack') // webpack 不解释
    const config = require('../config')//👆提到的配置文件
    const merge = require('webpack-merge') // merge 工具，用来合并生产和开发环境通用的基础 webpack 配置
    const baseWebpackConfig = require('./webpack.base.conf')//产和开发环境通用的基础 webpack 配置
    const CopyWebpackPlugin = require('copy-webpack-plugin') //拷贝插件
    const HtmlWebpackPlugin = require('html-webpack-plugin')  //动态生成 html 插件
    const ExtractTextPlugin = require('extract-text-webpack-plugin')//用来做文件分离的插件
    const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')//优化提炼出来的css
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')// 压缩 js 文件插件

    //生产环境配置
    const env = require('../config/prod.env')

    //合并基础配置加载器的配置部分
    const webpackConfig = merge(baseWebpackConfig, {
    //为独立分离出来的样式配置加载器和source，map
      module: {
        rules: utils.styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true,
          usePostCSS: true
        })
      },
      //配置线上的 source map 便于排查问题
      devtool: config.build.productionSourceMap ? config.build.devtool : false,
      //配置输出，路径，文件名
      output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
      },
      plugins: [
        // DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
        new webpack.DefinePlugin({
          'process.env': env
        }),

        // 使用 UglifyJsPlugin 插件对 js 进行压缩
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false
            }
          },
          //配置插件的source map
          sourceMap: config.build.productionSourceMap,
          parallel: true
        }),
        // 提取 css 到单独的文件，分离文件异步加载，提高加载速度
        new ExtractTextPlugin({
          filename: utils.assetsPath('css/[name].[contenthash].css'),

          //如果把 allChunks 参数设置陈 false ，就不会把css 从代码块中分离出来
          //代码块加载的时候 css 会被 styles-loader 动态的加载
          allChunks: true,
        }),

        //使用这个插件，从不同的组件中复制脱离出来，进行 css 压缩
        new OptimizeCSSPlugin({
          cssProcessorOptions: config.build.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),

        //自动生成 html 文件，通常 index.html 文件都会带一个哈希值来清除缓存
        new HtmlWebpackPlugin({
          filename: config.build.index,
          template: 'index.html',
          inject: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },

          chunksSortMode: 'dependency'
        }),
        //该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 渲染模块没有变化的时候，id 不会变。
        new webpack.HashedModuleIdsPlugin(),

        // 提升或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
        new webpack.optimize.ModuleConcatenationPlugin(),

        // 分离渲染的js 到独立的文件中
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks (module) {
            //被引用到的包会从 node_modules 中提取出来
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
          }
        }),

        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          minChunks: Infinity
        }),

        new webpack.optimize.CommonsChunkPlugin({
          name: 'app',
          async: 'vendor-async',
          children: true,
          minChunks: 3
        }),

        // 拷贝自定义的静态资源文件
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
          }
        ])
      ]
    })

    //判断如果配置了生产环境压缩，是则使用插件进行压缩
    if (config.build.productionGzip) {
      const CompressionWebpackPlugin = require('compression-webpack-plugin')

      webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }

    //是否要生成代码打包分析报告
    if (config.build.bundleAnalyzerReport) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }

    module.exports = webpackConfig

```

