import { constantRoutes } from "@/router";
// import { getRouters } from "@/api/menu";
import Layout from "@/layout/index";
import store from "@/store";
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
            // 系统管理
            {
              name: "System",
              path: "/system",
              redirect: null,
              component: "Layout",
              meta: {
                title: "系统管理",
                icon: null,
                roles: ["user"],
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
              ],
            },

            // 用户操作
            {
              name: "Options",
              path: "/options",
              redirect: null,
              component: "Layout",
              meta: {
                title: "项目样例",
                icon: null,
                roles: ["admin"],
              },
              children: [
                {
                  name: "InputNumber",
                  path: "/options/input-number",
                  redirect: null,
                  component: "options/input-number",
                  hidden: false,
                  meta: {
                    title: "数字输入框",
                    icon: null,
                  },
                },
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
                  name: "RowMove",
                  path: "/options/row-move",
                  redirect: null,
                  component: "options/row-move",
                  hidden: false,
                  meta: {
                    title: "行移动表格",
                    icon: null,
                  },
                },
                {
                  name: "DragTable",
                  path: "/options/drag-table",
                  redirect: null,
                  component: "options/drag-table",
                  hidden: false,
                  meta: {
                    title: "表格行列拖拽",
                    icon: null,
                  },
                },
                {
                  name: "TableCrud",
                  path: "/options/table-crud",
                  redirect: null,
                  component: "options/table-crud",
                  hidden: false,
                  meta: {
                    title: "表格假crud",
                    icon: null,
                  },
                },
                {
                  name: "DynamicTable",
                  path: "/options/dynamic-table",
                  redirect: null,
                  component: "options/dynamic-table",
                  hidden: false,
                  meta: {
                    title: "动态表格",
                    icon: null,
                  },
                },
                {
                  name: "DynamicForm",
                  path: "/options/dynamic-form",
                  redirect: null,
                  component: "options/dynamic-form",
                  hidden: false,
                  meta: {
                    title: "动态表单",
                    icon: null,
                  },
                },
                {
                  name: "DynamicComponent",
                  path: "/options/dynamic-component",
                  redirect: null,
                  component: "options/dynamic-component",
                  hidden: false,
                  meta: {
                    title: "动态组件",
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
                  name: "Echarts",
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
                  name: "Tree",
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
                  name: "Select",
                  path: "/options/select",
                  redirect: null,
                  component: "options/tree-select",
                  hidden: false,
                  meta: {
                    title: "树形菜单选择",
                    icon: null,
                  },
                },
                {
                  name: "Render",
                  path: "/options/render",
                  redirect: null,
                  component: "options/tree-render",
                  hidden: false,
                  meta: {
                    title: "树形列表操作",
                    icon: null,
                  },
                },
                {
                  name: "Immer",
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
                  name: "Upload",
                  path: "/options/upload",
                  redirect: null,
                  component: "options/upload-demo",
                  hidden: false,
                  meta: {
                    title: "文件相关操作",
                    icon: null,
                  },
                },
                {
                  name: "Page",
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
                  name: "PageDetail",
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
                  name: "Chain",
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
                  name: "Dict",
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
                  name: "Editor",
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
                  name: "Axios",
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
                  name: "Mixin",
                  path: "/options/mixin",
                  redirect: null,
                  component: "options/mixin-demo",
                  hidden: false,
                  meta: {
                    title: "mixin混入",
                    icon: null,
                  },
                },
                {
                  name: "Qs",
                  path: "/options/qs",
                  redirect: null,
                  component: "options/qs-demo",
                  hidden: false,
                  meta: {
                    title: "qs妙用",
                    icon: null,
                  },
                },
                {
                  name: "Websocket",
                  path: "/options/websocket",
                  redirect: null,
                  component: "options/websocket-demo",
                  hidden: false,
                  meta: {
                    title: "使用websocket",
                    icon: null,
                  },
                },
                {
                  name: "QrCode",
                  path: "/options/qrcode",
                  redirect: null,
                  component: "options/qrcode-demo",
                  hidden: false,
                  meta: {
                    title: "二维码",
                    icon: null,
                  },
                },
                {
                  name: "Map",
                  path: "/options/map",
                  redirect: null,
                  component: "options/map-demo",
                  hidden: false,
                  meta: {
                    title: "地图下钻（中国）",
                    icon: null,
                  },
                },
                {
                  name: "province",
                  path: "/options/province",
                  redirect: null,
                  component: "options/map-demo/province",
                  hidden: true,
                  meta: {
                    title: "省份",
                    icon: null,
                  },
                },
                {
                  name: "city",
                  path: "/options/city",
                  redirect: null,
                  component: "options/map-demo/city",
                  hidden: true,
                  meta: {
                    title: "城市",
                    icon: null,
                  },
                },
              ],
            },

            // vue基础
            {
              name: "Basic",
              path: "/basic",
              redirect: null,
              component: "Layout",
              meta: {
                title: "vue基础",
                icon: null,
                roles: ["admin"],
              },
              children: [
                {
                  name: "SyncDemo",
                  path: "/basic/syncPanel",
                  redirect: null,
                  component: "basic/sync",
                  hidden: false,
                  meta: {
                    title: "sync原理",
                    icon: null,
                  },
                },
              ],
            },
          ],
        };
        // ---鉴定权限开始
        let key = store.getters.roles[0];
        let list = [];
        res.data.map((item) =>
          item.meta.roles.includes(key) ? list.push(item) : null
        );
        res.data = list;
        // ---鉴定权限结束
        const accessedRoutes = filterAsyncRouter(res.data);
        accessedRoutes.push({
          path: "*",
          redirect: "/404",
          hidden: true,
          meta: { roles: ["admin", "user"] },
        });
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
