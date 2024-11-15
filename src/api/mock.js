import Mock from 'mockjs';
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'

Mock.mock(/\/api\/home\/getTableData/, 'get', homeApi.getTableData)
Mock.mock(/\/api\/home\/getCountData/, 'get', homeApi.getCountData)
Mock.mock(/\/api\/home\/getChartData/, 'get', homeApi.getChartData)
Mock.mock(/\/api\/home\/getUserData/, 'get', userApi.getUserList)