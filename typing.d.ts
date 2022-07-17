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
  path: string;
  prefix?: string;
  suffix?: string;
}


interface IDropDown {
  children: ReactElement;
  options: Array<INavConfig>;
  onClick?: Function;
  style?: any;

}

// 按钮组件参数类型
interface IButton {
  backgroundColor?: string;
  border?: boolean;
  content?: string;
  children?: ReactElement;
  className?: string;
  disable?: boolean;
  loading?: boolean;
  onClick?: Function;
  prefixIcon?: string;
  suffixIcon?: string;
  type?: string;
}
