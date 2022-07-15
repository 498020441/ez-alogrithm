// tsconfig.json include字段引入该文件
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare module '*.ts';
declare module '*.tsx';

// 定义路由
interface IRoute {
  component?: ReactComponentElement;
  children?: Array<IRoute>;
  exact?: boolean;
  guard?: boolean;
  meta?: any;
  path: string;
  redirect?: string;
}
// nav bar config参数类型
interface INavConfig {
  children?: Array<INavConfig>;
  hasAuth?: boolean;
  hasMenu?: boolean;
  name: string;
  path?: string;
  prefix?: string;
  suffix?: string;
}
// dropdown 组件定义的参数类型
interface IDropDownItem {
  label: string;
  value: string | number;
  linkTo: string;
}

interface IDropDown {
  children: ReactNode;
  options: Array<IDropDownItem>;
  style?: any;
}

// 按钮组件参数类型
interface IButton {
  border?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
  content?: string;
  children?: ReactElement | string;
  disable?: boolean;
  loading?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
}
