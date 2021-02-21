module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/_variables.scss"; @import "@/styles/base.scss";`
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Hacker News';
      return args;
    });
  }
};
