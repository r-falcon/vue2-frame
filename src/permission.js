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
    console.log(window.location);
    console.log(window.location.pathname);
    if (
      to.query &&
      to.query.access_token &&
      to.query.privateKey &&
      to.query.publicKey
    ) {
      // ?access_token=123&privateKey=456&publicKey=789
      console.log("sort111");
      setToken(to.query.access_token);
      setPrivateKey(to.query.privateKey);
      setPublicKey(to.query.publicKey);
      store.commit("SET_TOKEN", to.query.access_token);
      next({
        path: "/",
      });
    } else if (to.query && to.query.ticket) {
      // ?ticket=abc
      const url = window.location.origin + window.location.pathname;
      loginTicket(to.query.ticket, url).then((res) => {
        setToken(res.data.access_token);
        setPrivateKey(res.data.privateKey);
        setPublicKey(res.data.publicKey);
        store.commit("SET_TOKEN", res.data.access_token);
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
      });
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/login"
      ) {
        const url = `http://18.254.33.12/honesty/ssh.login?service=${window.location.href}`;
        window.location.href = url;
      } else {
        next("/login");
        NProgress.done();
      }
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
