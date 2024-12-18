const {
  getRecommendedCourses,
  getPopularCourses,
  getBeginnerCourses,
  getCategories,
  getCourses,
  getCourseDetail,
  likeCourse,
  createLike,
  getLikeUsers,
} = require('../../service/front/frontService');
const { Category, Chapter, User, Course } = require('../../models');
const handleResponse = async (
  res,
  serviceFunction,
  params,
  successMessage,
  errorMessage
) => {
  try {
    const data = await serviceFunction(params);
    res.success({ data }, successMessage);
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    res.error(errorMessage);
  }
};

exports.recommendedCourses = (req, res) => {
  const params = {
    attributes: {
      exclude: ['userId', 'categoryId', 'content'],
    },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'nickname', 'avatar', 'company'],
      },
    ],
    where: {
      recommended: true,
    },
    order: [['id', 'asc']],
    limit: 10,
  };
  handleResponse(
    res,
    getRecommendedCourses,
    params,
    '获取推荐课程成功',
    '获取推荐课程失败'
  );
};

exports.popularCourses = (req, res) => {
  const params = {
    attributes: {
      exclude: ['userId', 'categoryId', 'content'],
    },
    order: [
      ['likesCount', 'desc'],
      ['id', 'asc'],
    ],
    limit: 10,
  };
  handleResponse(
    res,
    getPopularCourses,
    params,
    '获取人气课程成功',
    '获取人气课程失败'
  );
};

exports.beginnerCourses = (req, res) => {
  const params = {
    attributes: {
      exclude: ['userId', 'categoryId', 'content'],
    },
    where: {
      introductory: true,
    },
    order: [['id', 'asc']],
    limit: 10,
  };
  handleResponse(
    res,
    getBeginnerCourses,
    params,
    '获取入门课程成功',
    '获取入门课程失败'
  );
};

exports.categories = (req, res) => {
  const params = {
    order: [
      ['rank', 'asc'],
      ['id', 'desc'],
    ],
  };
  handleResponse(res, getCategories, params, '获取分类成功', '获取分类失败');
};

exports.courses = async (req, res) => {
  try {
    const { page = 1, limit = 10, categoryId } = req.query;
    if (!categoryId) {
      return res.error('课程分类ID不能为空', 400);
    }
    const params = {
      attributes: {
        exclude: ['userId', 'categoryId', 'content'],
      },
      order: [['id', 'desc']],
      offset: Math.abs(page - 1) * Math.abs(limit),
      limit,
      where: {
        categoryId,
      },
    };
    const { count, rows } = await getCourses(params);
    res.success({ count, rows }, '获取课程成功');
  } catch (error) {
    console.error('获取课程失败:', error);
    res.error('获取课程失败');
  }
};

exports.courseDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const params = {
      attributes: {
        exclude: ['userId', 'categoryId', 'content'],
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: Chapter,
          as: 'chapters',
          attributes: ['id', 'title', 'rank', 'createdAt'],
          order: [
            ['rank', 'asc'],
            ['id', 'desc'],
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'nickname', 'avatar', 'company'],
        },
      ],
    };
    const data = await getCourseDetail(id, params);
    if (!data) {
      return res.error('课程不存在', 404);
    }
    res.success({ data }, '获取课程详情成功');
  } catch (error) {
    console.error('获取课程详情失败:', error);
    res.error('获取课程详情失败');
  }
};

// 点赞、取消赞
exports.like = async (req, res) => {
  try {
    const { courseId } = req.body;
    const params = {
      courseId,
      userId: req.user.id,
    };
    // 先判断课程是否存在
    const course = await getCourseDetail(courseId, {});
    if (!course) {
      return res.error('课程不存在', 404);
    }
    // 判断用户是否已点赞 如果已点赞则删除点赞记录，否则添加点赞记录
    const like = await likeCourse(params);
    if (like) {
      await like.destroy();
      await course.decrement('likesCount');
      res.success({ data: null }, '取消点赞成功');
    } else {
      await createLike(params);
      await course.increment('likesCount');
      res.success({ data: null }, '点赞成功');
    }
  } catch (error) {
    console.error('点赞失败:', error);
    res.error('点赞失败');
  }
};

// 获取用户点赞的课程
exports.getLikeCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, pageSize = 10 } = req.query;
    // 查询当前用户
    const user = await User.findByPk(userId);
    // 查询用户点赞的课程
    const params = {
      joinTableAttributes: [],
      attributes: ['categoryId', 'userId', 'name'],
      order: [['id', 'desc']],
      limit: pageSize,
      offset: Math.abs(page - 1) * Math.abs(pageSize),
    };
    const likeCourses = await user.getLikeCourses(params);
    console.log(likeCourses);
    // 查询当前用户点赞过得课程总数
    const total = await user.countLikeCourses();
    res.success({ data: likeCourses, total }, '获取用户点赞的课程成功');
  } catch (error) {
    console.error('获取用户点赞的课程失败:', error);
    res.error('获取用户点赞的课程失败');
  }
};

// 获取课程点赞的用户
exports.getLikeUsers = async (req, res) => {
  try {
    const { courseId } = req.query;
    const params = {
      include: {
        model: User,
        as: 'likeUsers',
      },
    };
    const likeUsers = await getLikeUsers(courseId, params);
    res.success({ data: likeUsers }, '获取课程点赞的用户成功');
  } catch (error) {
    console.error('获取课程点赞的用户失败:', error);
    res.error('获取课程点赞的用户失败');
  }
};
