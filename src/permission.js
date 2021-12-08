import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";

NProgress.configure({
  showSpinner: false,
});

const whiteList = ["/login", "/auth-redirect", "/bind", "/register"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    to.meta.title && store.dispatch("settings/setTitle", to.meta.title);
    /* has token*/
    if (to.path === "/login") {
      next({
        path: "/",
      });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetInfo")
          .then(() => {
            store.dispatch("GenerateRoutes").then((accessRoutes) => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(accessRoutes); // 动态添加可访问路由表
              next({
                ...to,
                replace: true,
              }); // hack方法 确保addRoutes已完成
            });
          })
          .catch((err) => {
            store.dispatch("LogOut").then(() => {
              Message.error(err);
              next({
                path: "/",
              });
            });
          });
      } else {
        next();
      }
    }
  } else {
    // 没有token，单点登录，前端拦截处理
    console.log("to", to.query);
    if (
      to.query &&
      to.query.access_token &&
      to.query.privateKey &&
      to.query.publicKey
    ) {
      //拦截到url中所需要的参数并存储到cookie中,然后跳转到启动页
      setToken(to.query.access_token);
      setPrivateKey(to.query.privateKey);
      setPublicKey(to.query.publicKey);
      store.commit("SET_TOKEN", to.query.access_token);
      next({
        path: "/launchpad",
      });
    } else if (
      window.location.pathname !== "/" &&
      !to.query.ticket &&
      window.location.pathname !== "login"
    ) {
      //如果地址中输入了其他东西，并且ticket为空的时候，直接跳转到一个链接地址
      const url = `http://12.254.33.12/portal/demo.login?service=${window.location.href}`;
      window.location.href = url;
    } else if (to.query.ticket) {
      const url = window.location.origin + window.location.pathname;
      loginTicket(to.query.ticket, url)
        .then((res) => {
          setToken(res.data.access_token);
          setPrivateKey(res.data.privateKey);
          setPublicKey(res.data.publicKey);
          store.commit("SET_TOKEN", res.data.access_token);
          store
            .dispatch("GetInfo")
            .then((res) => {
              // 拉取user_info
              const roles = res.roles;
              store
                .dispatch("GenerateRoutes", {
                  roles,
                })
                .then((accessRoutes) => {
                  // 测试 默认静态页面
                  // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
                  // 根据roles权限生成可访问的路由表
                  router.addRoutes(accessRoutes); // 动态添加可访问路由表
                  next({
                    path: "/launchpad",
                    replace: true,
                  }); // hack方法 确保addRoutes已完成
                });
            })
            .catch((err) => {
              store.dispatch("FedLogOut").then(() => {
                Message.error(err);
                next({
                  path: "/launchpad",
                });
              });
            });
        })
        .catch((err) => console.log(err));
    } else if (
      !(to.query.access_token || to.query.privateKey || to.query.publicKey) &&
      whiteList.indexOf(to.path) !== -1
    ) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }

    // 没有token
    // if (whiteList.indexOf(to.path) !== -1) {
    //   // 在免登录白名单，直接进入
    //   next()
    // } else {
    //   next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    //   NProgress.done()
    // }
  }
});

router.afterEach(() => {
  NProgress.done();
});
