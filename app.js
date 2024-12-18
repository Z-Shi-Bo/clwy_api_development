const path = require('path');
const dotenv = require('dotenv');
// 根据环境变量加载.env文件
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
console.log(envFile);
dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
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
  app.use(cors());
};

// 初始化路由
const initRoutes = () => {
  // 路由添加版本规范
  app.use('/api/v1', indexRouter);
};

initMiddleware();
initRoutes();

module.exports = app;
