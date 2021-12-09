import { constantRoutes } from "@/router";
// import { getRouters } from "@/api/menu";
import Layout from "@/layout/index";
// import ParentView from "@/components/ParentView";
// import InnerLink from "@/layout/components/InnerLink";

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    // defaultRoutes: [],
    // topbarRouters: [],
    // sidebarRouters: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
    // SET_DEFAULT_ROUTES: (state, routes) => {
    //   state.defaultRoutes = constantRoutes.concat(routes);
    // },
    // 顶部导航菜单默认添加统计报表栏指向首页
    // SET_TOPBAR_ROUTES: (state, routes) => {
    //   const index = [
    //     {
    //       path: "index",
    //       meta: {
    //         title: "统计报表",
    //         icon: "dashboard",
    //       },
    //     },
    //   ];
    //   state.topbarRouters = routes.concat(index);
    // },
    // SET_SIDEBAR_ROUTERS: (state, routes) => {
    //   state.sidebarRouters = routes;
    // },
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
                icon: null,
              },
              children: [
                {
                  name: "User",
                  path: "/system/user",
                  redirect: null,
                  component: "system/user/index",
                  hidden: false,
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
                  hidden: false,
                  meta: {
                    title: "角色管理",
                    icon: null,
                  },
                },
                {
                  name: "Menu",
                  path: "/system/menu",
                  redirect: null,
                  component: "system/menu/index",
                  hidden: false,
                  meta: {
                    title: "菜单管理",
                    icon: null,
                  },
                },
              ],
            },

            // 用户操作
            {
              name: "Options",
              path: "/options",
              redirect: null,
              component: "Layout",
              meta: {
                title: "用户操作",
                icon: null,
              },
              children: [
                {
                  name: "Pagination",
                  path: "/options/pagination",
                  redirect: null,
                  component: "options/table-pagination",
                  hidden: false,
                  meta: {
                    title: "分页表格",
                    icon: null,
                  },
                },
                {
                  name: "Response",
                  path: "/options/response",
                  redirect: null,
                  component: "options/response",
                  hidden: false,
                  meta: {
                    title: "响应式原理",
                    icon: null,
                  },
                },
                {
                  name: "echarts",
                  path: "/options/echarts",
                  redirect: null,
                  component: "options/echarts-demo",
                  hidden: false,
                  meta: {
                    title: "统计图模块",
                    icon: null,
                  },
                },
                {
                  name: "tree",
                  path: "/options/tree",
                  redirect: null,
                  component: "options/tree-organization",
                  hidden: false,
                  meta: {
                    title: "树形组织架构",
                    icon: null,
                  },
                },
                {
                  name: "immer",
                  path: "/options/immer",
                  redirect: null,
                  component: "options/immer-demo",
                  hidden: false,
                  meta: {
                    title: "不可变数据结构库",
                    icon: null,
                  },
                },
                {
                  name: "upload",
                  path: "/options/upload",
                  redirect: null,
                  component: "options/upload-demo",
                  hidden: false,
                  meta: {
                    title: "文件上传",
                    icon: null,
                  },
                },
                {
                  name: "page",
                  path: "/options/page",
                  redirect: null,
                  component: "options/page-demo",
                  hidden: false,
                  meta: {
                    title: "页面跳转",
                    icon: null,
                  },
                },
                {
                  name: "pagedetail",
                  path: "/options/pagedetail",
                  redirect: null,
                  component: "options/page-demo/PageDetail",
                  hidden: true,
                  meta: {
                    title: "页面详情",
                    icon: null,
                  },
                },
                {
                  name: "chain",
                  path: "/options/chain",
                  redirect: null,
                  component: "options/tree-table",
                  hidden: false,
                  meta: {
                    title: "左树右表",
                    icon: null,
                  },
                },
                {
                  name: "dict",
                  path: "/options/dict",
                  redirect: null,
                  component: "options/dict-demo",
                  hidden: false,
                  meta: {
                    title: "数据字典",
                    icon: null,
                  },
                },
                {
                  name: "editor",
                  path: "/options/editor",
                  redirect: null,
                  component: "options/editor-demo",
                  hidden: false,
                  meta: {
                    title: "富文本",
                    icon: null,
                  },
                },
                {
                  name: "axios",
                  path: "/options/axios",
                  redirect: null,
                  component: "options/axios-demo",
                  hidden: false,
                  meta: {
                    title: "接口请求",
                    icon: null,
                  },
                },
                {
                  name: "select",
                  path: "/options/select",
                  redirect: null,
                  component: "options/tree-select",
                  hidden: false,
                  meta: {
                    title: "树形结构",
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
        console.log("动态路由", accessedRoutes);
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
export function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter((route) => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
}

// function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
//   return asyncRouterMap.filter((route) => {
//     if (type && route.children) {
//       route.children = filterChildren(route.children);
//     }
//     if (route.component) {
//       // Layout ParentView 组件特殊处理
//       if (route.component === "Layout") {
//         route.component = Layout;
//       } else if (route.component === "ParentView") {
//         route.component = ParentView;
//       } else if (route.component === "InnerLink") {
//         route.component = InnerLink;
//       } else {
//         route.component = loadView(route.component);
//       }
//     }
//     if (route.children != null && route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children, route, type);
//     } else {
//       delete route["children"];
//       delete route["redirect"];
//     }
//     return true;
//   });
// }

// function filterChildren(childrenMap, lastRouter = false) {
//   var children = [];
//   childrenMap.forEach((el, index) => {
//     if (el.children && el.children.length) {
//       if (el.component === "ParentView" && !lastRouter) {
//         el.children.forEach((c) => {
//           c.path = el.path + "/" + c.path;
//           if (c.children && c.children.length) {
//             children = children.concat(filterChildren(c.children, c));
//             return;
//           }
//           children.push(c);
//         });
//         return;
//       }
//     }
//     if (lastRouter) {
//       el.path = lastRouter.path + "/" + el.path;
//     }
//     children = children.concat(el);
//   });
//   return children;
// }

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve);
  // if (process.env.NODE_ENV === "development") {
  //   return (resolve) => require([`@/views/${view}`], resolve);
  // } else {
  //   return () => import(`@/views/${view}`);
  // }
};

export default permission;
