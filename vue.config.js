
// 自动引入
const AutoImport = require('unplugin-auto-import/webpack')
const ElementPlus = require('unplugin-element-plus/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = {
    // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
    integrity: false,
    // css相关配置
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'vue-test'
                return args
            })
    },
    // css: {
    //     loaderOptions: {
    //         scss: {
    //             // additionalData: `@import './src/style/element/index.scss';`
    //             // additionalData: `@import "~@/style/element/index.scss";`,
    //             additionalData: `@use "~@/style/element/index.scss" as *;`,
    //         }
    //     }
    // },
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'scss',
    //         patterns: []
    //     }
    // },
    devServer: {
        hot: true,
        disableHostCheck: true,
        port: 8088,
        overlay: {
            warnings: false,
            errors: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // http 代理配置
        proxy: {
            '/pagev4': {
                // target: 'http://192.168.8.81:8626/cdss',
                target: 'http://192.168.8.81:666/page',
                changeOrigin: true,
                pathRewrite: { '^/pagev4': '' }
            },
        },
    },
    configureWebpack: {
        plugins: [
            ElementPlus(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver({
                    importStyle: 'sass'
                })],
            }),
        ]
    }
}