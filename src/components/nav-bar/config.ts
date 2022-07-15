
const NavConfig: Array<INavConfig> = [
  { name: '主页', path: '/', prefix: 'icon-home-4-line', suffix: '' },
  {
    name: '算法可视化工具',
    children: [
      {
        name: '路径算法可视化',
        path: 'path-visualizer',
        prefix: '',
        suffix: '',
        hasAuth: true,
      },
      {
        name: '排序算法可视化',
        path: 'sort-visualizer',
        prefix: '',
        suffix: '',
        hasAuth: true,
      },
    ],
    prefix: '',
    suffix: '',
    hasMenu: true,
  },
  { name: '个人信息', path: '/admin', prefix: '', suffix: '', hasAuth: true },
];
export default NavConfig;
