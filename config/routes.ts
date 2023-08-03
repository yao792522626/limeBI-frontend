export default [
  {
    path: 'user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/regiter', component: './User/Register' },
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
  { name: '图表中心', path: '/chartCenter', icon: 'PieChartOutlined', component: './ChartCenter' },
  {
    name: '查看图表',
    path: '/viewChartData/:id',
    icon: 'checkCircle',
    component: './ViewChartData',
    hideInMenu: true,
  },
  {
    name: '个人中心',
    path: '/person',
    icon: 'UserOutlined',
    routes: [
      {
        name: '个人信息',
        path: '/person/Info',
        icon: 'UserSwitchOutlined',
        component: './PersonCenter/PersonInfo',
      },
      {
        name: '我的图表',
        path: '/person/myChart',
        icon: 'UserSwitchOutlined',
        component: './PersonCenter/PersonChartManage',
      },
    ],
  },
  {
    name: '管理员页面',
    path: '/admin',
    icon: 'TeamOutlined',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { name: '管理员', path: '/admin/sub-page', icon: 'UserSwitchOutlined', component: './Admin' },
      {
        name: '用户管理',
        path: '/admin/userManage',
        icon: 'UserSwitchOutlined',
        component: './Admin/UserManage',
      },
      {
        name: '新增用户',
        path: '/admin/addUser',
        icon: 'UserSwitchOutlined',
        component: './Admin/addUser',
      },
      {
        name: '图表管理',
        path: 's/admin/chartManage',
        icon: 'PieChartOutlined',
        component: './Admin/ChartManage',
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { name: '404页面', path: '*', layout: false, component: './Error/404' },
];
//@ts-ignore
