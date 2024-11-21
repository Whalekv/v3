//整个项目api的统一管理
import { mock } from "mockjs";
import request from "./request";
import { da } from "element-plus/es/locales.mjs";
import { Delete } from "@element-plus/icons-vue";

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
        } );
    },

    getUserData(data) {
        return request( {
            url: '/home/getUserData',
            method: 'get',
            data
        } );
    },

    deleteUser(data) {
        return request( {
            url: 'user/deleteUser',
            method: 'get',
            data
        } );
    },

    addUser(data) {
        return request( {
            url: 'user/addUser',
            method: 'post',
            data
        } );
    },

    editUser(data) {
        return request( {
            url: 'user/editUser',
            method: 'post',
            data
        } );
    },
}