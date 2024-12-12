const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const responseHandler = require('./middleware/responseHandler');

const indexRouter = require('./routes/index');

const app = express();

// 初始化中间件
const initMiddleware = () => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(responseHandler());
};

// 初始化路由
const initRoutes = () => {
  // 路由添加版本规范
  app.use('/api/v1', indexRouter);
};

initMiddleware();
initRoutes();

module.exports = app;
