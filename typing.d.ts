// tsconfig.json include字段引入该文件
declare module '*.ts';
declare module '*.tsx';
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
// 切换路由过渡动画组件
interface ITransition {
  children: React.ReactNode;
  type?:
    | 'fade'
    | 'fadeIn'
    | 'fadeOut'
    | 'slideIn'
    | 'slideOut'
    | 'zoom'
    | 'zoomIn'
    | 'zoomOut';
  direction?: '' | 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  delay?: number;
  location: string;
  displayLocation: string;
  updateDisplayLocation: Function;
}

// 定义路由
interface IRoute {
  component?: ReactComponentElement;
  children?: Array<IRoute>;
  default?: boolean;
  exact?: boolean;
  guard?: boolean;
  meta?: any;
  path: string;
  transition?: boolean;
  transitionConfig?: ITransition;
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

interface ILayout {
  children: ReactNode;
}

type BoardSize = {
  width: number;
  height: number;
};

interface IPToolPanel {
  size: BoardSize;
  algorithms: string;
}
