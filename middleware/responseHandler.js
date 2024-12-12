// 响应处理中间件
const responseHandler = () => {
  return (req, res, next) => {
    res.success = (data = null, message = '请求成功', status = 200) => {
      res.status(status).json({
        code: status,
        data,
        message,
        success: true,
      });
    };
    res.error = (message = '请求失败', code = 500) => {
      res.status(code).json({
        code,
        message,
        success: false,
      });
    };
    // 执行下一个中间件
    next();
  };
};

module.exports = responseHandler;
