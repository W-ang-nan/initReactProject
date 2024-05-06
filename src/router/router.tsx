import { Navigate, useRoutes } from "react-router-dom";
import { getToken } from "@/utils/request/auth";
import Home from "@/views/Home";
import About from "@/views/About";
import Login from "@/views/user/Login";

// 定义路由中的元素类型
interface Router {
  path: string;
  name?: string;
  children?: Array<Router>;
  element: any;
  meta?: any;
}

// 全局路由配置
const routes: Array<Router> = [
  {
    path: "/",
    name: "home",
    element: <Home />,
    meta: {
      title: "首页",
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    element: <About />,
    meta: {
      title: "关于我们",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    element: <Login />,
    meta: {
      title: "登录",
      requiresAuth: false,
    },
  },
];
// 路由拦截
const RouterBeforeEach = (props: { route: any; children: any }) => {
  if (props?.route?.meta?.title) {
    document.title = props.route.meta.title;
  }

  // 判断是否已登录
  const isLogin = getToken();
  console.log(isLogin);

  // // 未登录 需要身份验证的跳转到登录页面
  // if (!isLogin && props?.route?.meta?.requiresAuth) {
  //   return <Navigate to={"/login"} replace />;
  // }
  // // 已登录 登录页面需要跳转到默认页面
  // if (isLogin && ["/login"].includes(props?.route?.path)) {
  //   return <Navigate to={"/"} replace />;
  // }

  return props.children;
};

// 转化路由
const resolveRoute = (routes: any) => {
  return routes.map((item: any) => {
    const route = {
      path: item.path,
      element: item.element,
      children: item.children,
    };
    // 递归处理子路由
    if (item.children) {
      route.children = resolveRoute(item.children);
    }

    if (item.redirect) {
      // 重定向
      route.element = <Navigate to={item.redirect} />;
    } else if (route.element) {
      route.element = (
        <RouterBeforeEach route={item}>{item.element}</RouterBeforeEach>
      );
    } else if (item.component) {
      // element 要接收react.element类型 item.component 是对象 所以要转一下
      route.element = (
        <RouterBeforeEach route={item}>{item.component} </RouterBeforeEach>
      );
    }

    return route;
  });
};

export default function Router() {
  return useRoutes(resolveRoute(routes));
}
