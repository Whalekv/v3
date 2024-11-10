import { mock } from "mockjs"

const env = import.meta.env.MODE || 'prod'//当前环境

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api'
    },
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api'
    },
    prod: {
        baseApi: '//future.com/api',
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api'
    },

}

export default {
    env,
    ...EnvConfig[env],
    mock: false
}

//[使用扩展运算符展开配置项]: 如果获取成功，使用扩展运算符 ... 将配置项展开。