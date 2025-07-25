import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  speed: 500,
  minimum: 0.1,
});

export const startLoader = (): void => {
  NProgress.start();
};

export const stopLoader = (): void => {
  NProgress.done();
};
