export default [
  {
    path: 'user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  { name: '欢迎页面', path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    name: 'BI智能分析(同步)',
    icon: 'BarChartOutlined',
    path: '/addChart',
    component: './Chart/addChart',
  },
  {
    name: 'BI智能分析(异步)',
    icon: 'BarChartOutlined',
    path: '/addChartAsync',
    component: './Chart/addChartAysnc',
  },
  { name: '图表管理', path: '/myChart', icon: 'PieChartOutlined', component: './ChartManage' },
  {
    name: '管理员页面',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { name: '404页面', path: '*', layout: false, component: './Error/404' },
];
