const { jwtVerify } = require('../utils/passwordEncrypt');

// 鉴权
exports.adminAuth = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.error('未登录', 401);
      }
      const decoded = await jwtVerify(token);
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      return res.error('token验证失败', 401);
    }
  };
};
