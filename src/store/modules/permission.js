import { constantRoutes } from "@/router";
import { getRouters } from "@/api/menu";
import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";
import InnerLink from "@/layout/components/InnerLink";

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes);
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      // 顶部导航菜单默认添加统计报表栏指向首页
      const index = [
        {
          path: "index",
          meta: {
            title: "统计报表",
            icon: "dashboard",
          },
        },
      ];
      state.topbarRouters = routes.concat(index);
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes;
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        // getRouters().then((res) => {
        // const sdata = JSON.parse(JSON.stringify(res.data))
        // const rdata = JSON.parse(JSON.stringify(res.data))
        // const sidebarRoutes = filterAsyncRouter(sdata)
        // const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        // rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
        // commit('SET_ROUTES', rewriteRoutes)
        // commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
        // commit('SET_DEFAULT_ROUTES', sidebarRoutes)
        // commit('SET_TOPBAR_ROUTES', sidebarRoutes)
        // resolve(rewriteRoutes)
        // });
        // 向后台请求动态路由，这里设置假路由数据
        var res = {
          code: 200,
          msg: "获取动态路由成功",
          data: [
            // 系统维护
            {
              name: "System",
              path: "/system",
              redirect: null,
              component: "Layout",
              meta: {
                title: "系统维护",
                icon: "system",
              },
              children: [
                {
                  name: "User",
                  path: "/system/user",
                  redirect: null,
                  component: "system/user/index",
                  meta: {
                    title: "用户管理",
                    icon: null,
                  },
                },
                {
                  name: "Role",
                  path: "/system/role",
                  redirect: null,
                  component: "system/role/index",
                  meta: {
                    title: "角色管理",
                    icon: null,
                  },
                },
                {
                  name: "Permission",
                  path: "/system/permission",
                  redirect: null,
                  component: "system/permission/index",
                  meta: {
                    title: "权限管理",
                    icon: null,
                  },
                },
                {
                  name: "Password",
                  path: "/system/password",
                  redirect: null,
                  component: "system/password/index",
                  meta: {
                    title: "密码管理",
                    icon: null,
                  },
                },
                {
                  name: "Warning",
                  path: "/system/warning",
                  redirect: null,
                  component: "system/warningSet/index",
                  meta: {
                    title: "预警设置",
                    icon: null,
                  },
                },
                {
                  name: "Basic",
                  path: "/system/basic",
                  redirect: null,
                  component: "system/basic/index",
                  meta: {
                    title: "系统运行环境",
                    icon: null,
                  },
                },
                {
                  name: "Copyright",
                  path: "/system/copyright",
                  redirect: null,
                  component: "system/copyright/index",
                  meta: {
                    title: "版权信息",
                    icon: null,
                  },
                },
              ],
            },
            // 政策指导
            {
              name: "PolicyGuide",
              path: "/policyGuide",
              redirect: null,
              component: "Layout",
              meta: {
                title: "政策指导",
                icon: "guide",
              },
              children: [
                {
                  name: "Policy",
                  path: "/policy",
                  redirect: null,
                  component: "options/policyGuide/index",
                  meta: {
                    title: "政策指导",
                    icon: null,
                  },
                },
              ],
            },
          ],
        };
        const accessedRoutes = filterAsyncRouter(res.data);
        accessedRoutes.push({
          path: "*",
          redirect: "/404",
          hidden: true,
        });
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else if (route.component === "ParentView") {
        route.component = ParentView;
      } else if (route.component === "InnerLink") {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route["children"];
      delete route["redirect"];
    }
    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView" && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + "/" + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + "/" + el.path;
    }
    children = children.concat(el);
  });
  return children;
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === "development") {
    return (resolve) => require([`@/views/${view}`], resolve);
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`);
  }
};

export default permission;
