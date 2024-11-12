//整个项目api的统一管理
import { mock } from "mockjs";
import request from "./request";

//请求首页左侧表格的数据

export default {
    getTableData() {
        return request( {
            // url: '/api/home/getTableData',
            url: '/home/getTableData',
            method: 'get',
            mock: true
        } );
    },
    getCountData() {
        return request( {
            // url: '/api/home/getTableData',
            url: '/home/getCountData',
            method: 'get',
            mock: true
        } );
    },
    getChartData() {
        return request( {
            url: '/home/getChartData',
            method: 'get',
            mock: true
        } );
    },

    getUserData() {
        return request( {
            url: '/home/getUserData',
            method: 'get',
            mock: true
        } );
    },
}