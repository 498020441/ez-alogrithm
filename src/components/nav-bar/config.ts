
const NavConfig: Array<INavConfig> = [
  { name: '主页', path: '/', prefix: 'icon-home-4-line', suffix: '' },
  {
    name: '算法可视化工具',
    path: '',
    children: [
      {
        name: '路径算法可视化',
        path: '/path-visualizer',
        prefix: 'icon-route-line',
        suffix: '',
        hasAuth: true,
      },
      {
        name: '排序算法可视化',
        path: '/sort-visualizer',
        prefix: 'icon-bar-chart-grouped-line',
        suffix: '',
        hasAuth: true,
      },
    ],
    prefix: 'icon-tools-line',
    suffix: 'icon-arrow-down-s-line',
    hasMenu: true,
  },
  { name: '个人信息', path: '/admin', prefix: 'icon-user-5-line', suffix: '', hasAuth: true },
];
export default NavConfig;
