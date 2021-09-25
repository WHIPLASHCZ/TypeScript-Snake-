const path = require('path');   //用于拼接路径的模块

const htmlWebpackPlugin = require('html-webpack-plugin');   //html文件解析插件
module.exports = {
    mode:'development', //开发模式
    entry:'./src/main.ts',  //打包入口
    output:{                //打包出口
        path:path.resolve(__dirname,'./dist'),//打包后目录
        filename:'bundle.js',    //打包后文件名称
        // environment:{
        //     arrowFunction:false
        // }
    },
    devServer:{     //虚拟打包设置

    },
    resolve:{
        extensions:['.ts','.js','.jpg']    //指定可以作为模块使用的文件格式
    },
    module:{    //loader
        rules:[
            {
                test:/\.ts/,    //匹配ts后缀的文件
                use:[
                    {
                        loader:'babel-loader',
                        // 设置babel相关选项
                        options:{
                            // 设置预定义环境
                            presets:[
                                [   //指定环境的插件
                                    '@babel/preset-env',
                                    {   //兼容的目标浏览器
                                        targets:{
                                            'chrome':'70',
                                        },
                                        // 指定corejs的版本
                                        "corejs":"3",
                                        // 使用corejs的方式：按需加载
                                        'useBuiltIns':'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ], //用ts-loader处理ts文件
                exclude:/node-modules/ //排除
            },
            {
                    test:/\.(jpg|png|jpeg|gif|svg)$/,   //处理哪些文件
                    use:[
                        {
                            loader:'url-loader',
                            options:{
                                outputPath:'img',   //出口文件夹
                                name:'[name]-[hash:6].[ext]',   //指定文件名：原文件名加六位哈希值
                                limit:1024*200      //转换base64下限：单位为字节，在下限以下的图片不进行打包，直接转化为base64编码
                            }
                        }
                    ]
            },
            {
                test:/\.less$/,
                use:[
                'style-loader'
                ,'css-loader'
                ,
                {
                    loader:'postcss-loader',
                    options:{
                        postcssOptions:{
                            plugins:[
                                [
                                    "postcss-preset-env",
                                    {
                                        browsers:'last 2 versions'
                                    }
                                ]
                            ]
                        }
                    }
                }
                ,'less-loader']
            }
        ]
    },
    plugins:[   //插件
        new  htmlWebpackPlugin({
            template:'./src/demo.html'  //指定网页模板 打包的html文件会根据这个模板生成 然后把打包的js文件引入
        })
    ]
}