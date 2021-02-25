/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598256321700_3790';
  // add your middleware config here
  config.middleware = [

  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: '127.0.0.1',
      // host:'cdb-73goqjuo.bj.tencentcdb.com',
      // port
      port: '3306',
      // port: '10094',
      // username
      user: 'root',
      // password
      password: '123258',
      // password:'xtabc!1815',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf:{
      enable:false
    },
    domainWhiteList:['*']
  }
  config.cors = {
    // origin:'http://localhost:3000',
    origin:'*',
    credentials:true,  // 允许Cookies跨域
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  return {
    ...config,
    ...userConfig,
  };
};
